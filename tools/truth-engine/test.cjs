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
  impactRationale:'conditional',priorAuditId:'VC-010',
  reviewedEvidenceCommit:'959e3df0b0031201742cd1019ad6a15db514d18d',oldScore:50,proposedScore:51
 }), 'counterevidenceSearch');
}
const {check,record,reverse}=require('./review.cjs');
const proposal={id:'TEST-P',target:'central-ontology',claimClass:'Experimental measurement',hypothesis:'Hmany',nullHypothesis:'Hone',prediction:'measured distribution',testedObservable:'pointer',measurement:'controlled count',controls:'preparation and detector',counterevidenceSearch:'search rival experiments',alternativeExplanations:'environmental noise',uncertainty:'finite counts',discriminationArgument:'requires distinct likelihood',impactRationale:'conditional only',reviewer:'test fixture',priorAuditId:base.library.verdictAudit.changeLog.at(-1).id,reviewedEvidenceCommit:'a'.repeat(40),scoreMapping:'explicit score mapping proposal',distinguishingLikelihood:'illustrative synthetic likelihoods',sourceIds:['SRC-066'],readingNoteIds:['NOTE-052'],oldScore:50,proposedScore:50};
assert.deepEqual(check(proposal,base),[]);
const invalid={...proposal,counterevidenceSearch:''};
assert.ok(check(invalid,base).some(x=>x.includes('counterevidenceSearch')));
const decision=record(proposal,base,{sha:'b'.repeat(40),id:'DEC-TEST',date:'2026-10-21',reason:'TEST FIXTURE NOT SCIENTIFIC APPROVAL'});
const reversed=reverse(decision,50,{sha:'c'.repeat(40),id:'DEC-UNDO',date:'2026-10-21',reason:'TEST reversal'});
assert.equal(reversed.reverses,'DEC-TEST');
console.log('PASS provisional review and reversible append-only decision fixtures');
const labRooms=base.research.disciplines,stages=base.research.programStages;
assert.equal(labRooms.length,9,'nine discipline syllabi expected');
assert.equal(new Set(labRooms.map(x=>x.slug)).size,9,'unique lab slug');
assert.equal(stages.length,8,'eight research stages expected');
for(const s of stages)assert.ok(s.gate&&s.deliverable,'explicit acceptance gate '+s.id);
const roomTotals=[];
for(const room of labRooms){
 assert.ok(room.venue.readingPlan&&room.venue.presentationRoom&&room.venue.interactiveLaboratory,'three preserved room views '+room.slug);
 const sourceSet=new Set(room.additionalSourceIds||[]);
 const indexed=base.library.works.filter(w=>room.readingFields.includes(w.field)||sourceSet.has(w.id));
 assert.ok(indexed.length>0,'room has source reading list '+room.slug);
 for(const w of indexed)if(w.access==='fully-studied')assert.ok(base.notes.notes.some(n=>n.workId===w.id&&n.stage==='fully-studied'&&n.fullTextRead===true),'genuine completed work '+w.id);
 roomTotals.push(room.slug+':'+indexed.length);
}
console.log('PASS v0.25 nine reading room data QA and eight stage check: '+roomTotals.join(', '));
console.log('Truth Engine fixtures PASS, baseline: '+JSON.stringify(pass.counts));
