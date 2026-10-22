#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const {load,validate}=require('./validate.cjs');
const base=load();
const clone=()=>structuredClone(base);
const pass=validate(base);
assert.equal(pass.errors.length,0,'Repository baseline must pass integrity gate: '+JSON.stringify(pass.errors));
function fails(name,mutation,expected){
 const d=clone();mutation(d);const r=validate(d);assert.ok(r.errors.length>0,name+' must fail');assert.ok(r.errors.some(e=>e.message.includes(expected)),name+' should report '+expected+' but got '+JSON.stringify(r.errors));
 console.log('PASS negative fixture: '+name);
}
fails('duplicate source ID',d=>d.library.works.push(structuredClone(d.library.works[0])),'duplicated');
fails('duplicate DOI',d=>{d.library.works[1].url=d.library.works[0].url},'duplicate DOI');
fails('bad source URL',d=>{d.library.works[0].url='javascript:alert(1)'},'invalid original source URL');
fails('bad citation dependency',d=>d.research.disciplines[0].prioritySourceIds.push('SRC-999999'),'dangling lab source');
fails('unverified full study',d=>{d.notes.notes=d.notes.notes.filter(n=>n.workId!=='SRC-007' || n.stage!=='fully-studied')},'full-study flag requires');
fails('invalid place coordinate',d=>{d.ledger.entries[0].lat=120},'out-of-range');
fails('missing claim class',d=>{d.ledger.entries[0].question=''},'missing claim classification');
fails('invalid review date',d=>{d.notes.notes[0].date='2026-02-30'},'invalid review date');
fails('score mismatch',d=>{d.ledger.editorialMeter.score=80},'editorial meter');
if(base.truthEngine){
 fails('proposal missing counterevidence',d=>d.truthEngine.proposals.push({
  id:'P-TEST',claimClass:'Experiment',hypothesis:'one versus many',nullHypothesis:'no change',
  prediction:'test',counterevidenceSearch:'',alternativeExplanations:'named alternatives',
  sourceIds:['SRC-007'],readingNoteIds:['NOTE-050'],uncertainty:'noise',
  impactRationale:'conditional',priorAuditId:'VC-009',
  reviewedEvidenceCommit:'959e3df0b0031201742cd1019ad6a15db514d18d',oldScore:59,proposedScore:60
 }), 'counterevidenceSearch');
}
console.log('Truth Engine fixtures PASS, baseline: '+JSON.stringify(pass.counts));
