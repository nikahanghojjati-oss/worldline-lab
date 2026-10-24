'use strict';
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const assert = require('node:assert/strict');
const { sha, appendIndex, verify } = require('./check.cjs');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'wl-relay-'));
const dir = path.join(tmp, 'leads/relay');
fs.mkdirSync(path.join(dir, 'archive'), { recursive: true });
const fence = String.fromCharCode(96).repeat(3);
const feed0 = {schema:'worldline-relay-feed/v1',messages:[]};
const latest0 = {schema:'worldline-relay-latest/v1',id:null,archive:null,sha256:null};
function writeFile(name, data) {
  fs.writeFileSync(path.join(dir,name),'# Test\n\n'+fence+'json\n'+JSON.stringify(data,null,2)+'\n'+fence+'\n');
}
function writePointers(feed,latest) {
  writeFile('FEED.md',feed);writeFile('LATEST.md',latest);
}
function makeMessage(id='WL-RLY-20261022-L1-003') {
  const payload=id+'|FROM=LAB1|TO=LAB2|ACTION=CHECK';
  return {schema:'worldline-relay-message/v1',id,from:'LAB1',to:'LAB2',
    kind:'TEST',replyTo:null,createdAt:'2026-10-22T23:59:00Z',
    authorizedPaths:['leads/relay/'],action:'independent checksum verification',
    payload,sha256:sha(payload)};
}
let passes=0;
function test(name,run) {run();passes++;process.stdout.write('PASS '+name+'\n');}
try {
  writePointers(feed0,latest0);
  test('empty pointer files are consistent',()=>assert.deepEqual(verify(tmp),{archived:0,newest:null}));
  const msg=makeMessage();
  const updated=appendIndex(feed0,latest0,msg,null);
  fs.writeFileSync(path.join(dir,'archive',msg.id+'.json'),JSON.stringify(msg,null,2)+'\n');
  writePointers(updated.feed,updated.latest);
  test('archive + feed + latest match',()=>assert.equal(verify(tmp).archived,1));
  test('same message ID and hash is idempotent',()=>assert.equal(appendIndex(updated.feed,updated.latest,msg,null).replay,true));
  test('same ID with different payload is rejected',()=> {
    const altered={...msg,payload:msg.payload+'x',sha256:sha(msg.payload+'x')};
    assert.throws(()=>appendIndex(updated.feed,updated.latest,altered,null),/collision/);
  });
  test('stale expected index tail rejected',()=> {
    const second=makeMessage('WL-RLY-20261022-L2-003');
    second.from='LAB2';second.to='LAB1';
    assert.throws(()=>appendIndex(updated.feed,updated.latest,second,null),/stale feed tail/);
  });
  test('tampered archived payload detected',()=> {
    const target=path.join(dir,'archive',msg.id+'.json');
    fs.writeFileSync(target,JSON.stringify({...msg,payload:'tampered'}));
    assert.throws(()=>verify(tmp),/checksum mismatch/);
    fs.writeFileSync(target,JSON.stringify(msg));
  });
  test('wrong latest pointer detected',()=> {
    writePointers(updated.feed,latest0);
    assert.throws(()=>verify(tmp),/LATEST/);
    writePointers(updated.feed,updated.latest);
  });
  test('duplicate feed ID rejected',()=> {
    writePointers({...updated.feed,messages:[...updated.feed.messages,updated.feed.messages[0]]},updated.latest);
    assert.throws(()=>verify(tmp),/duplicate feed ID/);
    writePointers(updated.feed,updated.latest);
  });
  test('unindexed archive rejected',()=> {
    const other=makeMessage('WL-RLY-20261022-L2-004');
    other.from='LAB2';other.to='LAB1';
    fs.writeFileSync(path.join(dir,'archive',other.id+'.json'),JSON.stringify(other));
    assert.throws(()=>verify(tmp),/orphan archive/);
    fs.rmSync(path.join(dir,'archive',other.id+'.json'));
  });
  test('restored valid fixture passes',()=>assert.equal(verify(tmp).archived,1));
  process.stdout.write('All '+passes+' relay fixtures passed\n');
} finally {
  fs.rmSync(tmp,{recursive:true,force:true});
}
