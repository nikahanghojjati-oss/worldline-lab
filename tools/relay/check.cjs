'use strict';
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');

const ROOT = path.resolve(__dirname, '../..');
const HEX = /^[a-f0-9]{64}$/;
const ID = /^WL-RLY-[0-9]{8}-L[12]-[0-9]{3}$/;

function sha(payload) {
  assert.equal(typeof payload, 'string', 'payload must be text');
  return crypto.createHash('sha256').update(Buffer.from(payload, 'utf8')).digest('hex');
}
function parseMarkdownJson(root, name) {
  const document = fs.readFileSync(path.join(root, 'leads/relay', name), 'utf8');
  const blocks = [...document.matchAll(/```json[ \t]*\r?\n([\s\S]*?)\r?\n```/g)];
  assert.equal(blocks.length, 1, name + ' must contain one JSON block');
  return JSON.parse(blocks[0][1]);
}
function verifyEnvelope(msg) {
  assert.equal(msg.schema, 'worldline-relay-message/v1');
  assert.match(msg.id, ID);
  assert.ok(['LAB1', 'LAB2'].includes(msg.from));
  assert.ok(['LAB1', 'LAB2'].includes(msg.to));
  assert.notEqual(msg.from, msg.to);
  assert.ok(['TEST','REQUEST','ACK','DECISION','REPORT'].includes(msg.kind));
  assert.ok(msg.replyTo === null || (typeof msg.replyTo === 'string' && msg.replyTo.length > 0));
  assert.ok(typeof msg.createdAt === 'string' && /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/.test(msg.createdAt));
  assert.ok(Array.isArray(msg.authorizedPaths) && msg.authorizedPaths.every(v => typeof v === 'string'));
  assert.ok(typeof msg.action === 'string' && msg.action.length > 0);
  assert.equal(typeof msg.payload, 'string');
  assert.match(msg.sha256, HEX);
  assert.equal(sha(msg.payload), msg.sha256, 'archive payload checksum mismatch');
  return true;
}
function appendIndex(feed, latest, msg, expectedTail) {
  verifyEnvelope(msg);
  assert.equal(feed.schema, 'worldline-relay-feed/v1');
  assert.equal(latest.schema, 'worldline-relay-latest/v1');
  assert.ok(Array.isArray(feed.messages));
  const previous = feed.messages.find(item => item.id === msg.id);
  if (previous) {
    assert.equal(previous.sha256, msg.sha256, 'ID collision with different hash');
    assert.equal(previous.archive, 'leads/relay/archive/' + msg.id + '.json');
    return { feed, latest, replay: true };
  }
  const tail = feed.messages.length ? feed.messages[feed.messages.length - 1].id : null;
  assert.equal(expectedTail, tail, 'stale feed tail: refetch and retry');
  const entry = { id: msg.id, archive: 'leads/relay/archive/' + msg.id + '.json', sha256: msg.sha256 };
  return {
    feed: { ...feed, messages: [...feed.messages, entry] },
    latest: { schema: 'worldline-relay-latest/v1', ...entry },
    replay: false
  };
}
function verify(root=ROOT) {
  const feed = parseMarkdownJson(root, 'FEED.md');
  const latest = parseMarkdownJson(root, 'LATEST.md');
  assert.equal(feed.schema, 'worldline-relay-feed/v1');
  assert.equal(latest.schema, 'worldline-relay-latest/v1');
  assert.ok(Array.isArray(feed.messages));
  const observed = new Set();
  for (const item of feed.messages) {
    assert.match(item.id, ID);
    assert.ok(!observed.has(item.id), 'duplicate feed ID: ' + item.id);
    observed.add(item.id);
    const expectedPath = 'leads/relay/archive/' + item.id + '.json';
    assert.equal(item.archive, expectedPath, 'unexpected archive path');
    assert.match(item.sha256, HEX);
    const envelope = JSON.parse(fs.readFileSync(path.join(root, expectedPath), 'utf8'));
    verifyEnvelope(envelope);
    assert.equal(envelope.id, item.id, 'index/envelope ID mismatch');
    assert.equal(envelope.sha256, item.sha256, 'index/archive hash mismatch');
  }
  const archiveDir = path.join(root,'leads/relay/archive');
  const actualArchives = fs.readdirSync(archiveDir).filter(name => name.endsWith('.json'));
  assert.equal(actualArchives.length, observed.size, 'orphan archive or missing index entry');
  for (const archive of actualArchives) {
    assert.ok(observed.has(archive.slice(0,-5)), 'unindexed archive: ' + archive);
  }
  if (feed.messages.length === 0) {
    assert.equal(latest.id, null);
    assert.equal(latest.archive, null);
    assert.equal(latest.sha256, null);
  } else {
    const tail = feed.messages[feed.messages.length - 1];
    assert.deepEqual(
      { id: latest.id, archive: latest.archive, sha256: latest.sha256 },
      tail,
      'LATEST must point to the newest indexed archive'
    );
  }
  return { archived: observed.size, newest: latest.id };
}
if (require.main === module) {
  try { process.stdout.write(JSON.stringify(verify()) + '\n'); }
  catch(err) { console.error('RELAY VALIDATION FAILED: ' + err.message); process.exitCode = 1; }
}
module.exports = { sha, parseMarkdownJson, verifyEnvelope, appendIndex, verify };
