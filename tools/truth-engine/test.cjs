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
const {check,record,recordReviewed,reverse}=require('./review.cjs');
const proposal={id:'TEST-P',target:'central-ontology',claimClass:'Experimental measurement',hypothesis:'Hmany',nullHypothesis:'Hone',prediction:'measured distribution',testedObservable:'pointer',measurement:'controlled count',controls:'preparation and detector',counterevidenceSearch:'search rival experiments',alternativeExplanations:'environmental noise',uncertainty:'finite counts',discriminationArgument:'requires distinct likelihood',impactRationale:'conditional only',reviewer:'test fixture',priorAuditId:base.library.verdictAudit.changeLog.at(-1).id,reviewedEvidenceCommit:'a'.repeat(40),scoreMapping:'explicit score mapping proposal',distinguishingLikelihood:'illustrative synthetic likelihoods',sourceIds:['SRC-066'],readingNoteIds:['NOTE-052'],oldScore:50,proposedScore:50};
assert.deepEqual(check(proposal,base),[]);
const invalid={...proposal,counterevidenceSearch:''};
assert.ok(check(invalid,base).some(x=>x.includes('counterevidenceSearch')));
const decision=record(proposal,base,{sha:'b'.repeat(40),id:'DEC-TEST',date:'2026-10-21',reason:'TEST FIXTURE NOT SCIENTIFIC APPROVAL'});
const reversed=reverse(decision,50,{sha:'c'.repeat(40),id:'DEC-UNDO',date:'2026-10-21',reason:'TEST reversal'});
assert.equal(reversed.reverses,'DEC-TEST');
const {apiApproval}=require('./github-approval.cjs');
const approvalCandidate={...proposal,proposedScore:51,reviewer:'science-reviewer'};
assert.throws(()=>record(approvalCandidate,base,{sha:'c'.repeat(40),id:'DEC-NO-REVIEW',date:'2026-10-22',reason:'Unapproved directional test'}),/API-verified human approval/);
const signedPr={
 number:72,
 base:{repo:{full_name:'nikahanghojjati-oss/worldline-lab'}},
 head:{repo:{full_name:'nikahanghojjati-oss/worldline-lab'},sha:'a'.repeat(40)},
 user:{login:'independent-proposer'},
 html_url:'https://github.com/nikahanghojjati-oss/worldline-lab/pull/72'
};
const signedReview={id:491,state:'APPROVED',commit_id:'a'.repeat(40),submitted_at:'2026-10-22T12:00:00Z',user:{login:'science-reviewer'},author_association:'COLLABORATOR'};
const receipt={prNumber:72,reviewId:491};
const verified=apiApproval(approvalCandidate,receipt,signedPr,[signedReview]);
assert.throws(()=>record(approvalCandidate,base,{sha:'b'.repeat(40),id:'DEC-FORGED',date:'2026-10-22',reason:'Forged object',approval:verified}),/API-verified human approval/);
recordReviewed(approvalCandidate,base,{sha:'b'.repeat(40),id:'DEC-VERIFIED-FIXTURE',date:'2026-10-22',reason:'Synthetic API fixture only'},receipt,async(url)=>url.includes('/reviews?')?[signedReview]:signedPr)
 .then(signed=>{assert.equal(signed.approvalEvidence.reviewId,491);console.log('PASS async trusted review flow (synthetic API fixture; no human approval claimed)')})
 .catch(err=>{console.error('FAIL trusted async review',err);process.exitCode=1;});
assert.throws(()=>apiApproval(approvalCandidate,receipt,{...signedPr,head:{...signedPr.head,sha:'c'.repeat(40)}},[signedReview]),/changed after evidence commit/);
assert.throws(()=>apiApproval(approvalCandidate,receipt,{...signedPr,user:{login:'science-reviewer'}},[signedReview]),/distinct reviewer/);
assert.throws(()=>apiApproval(approvalCandidate,receipt,signedPr,[{...signedReview,state:'COMMENTED'}]),/actual approved/);
assert.throws(()=>apiApproval(approvalCandidate,receipt,signedPr,[signedReview,{...signedReview,id:492,state:'CHANGES_REQUESTED',submitted_at:'2026-10-22T12:01:00Z'}]),/newer reviewer decision/);
console.log('PASS source-commit matched distinct-human GitHub approval fixtures, fail closed on stale/dismissed decisions');
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
const csl=require('./csl-reproduce.cjs');
const a95=csl.germanium(),lin=csl.lisa();
const close=(a,b,tol)=>Math.abs(a-b)/Math.abs(b)<tol;
assert.ok(close(csl.gammaCdf(577,a95.totalUpper),.95,1e-9),'gamma 95% posterior quantile');
assert.ok(close(a95.lambdaUpper,5.197323624630836e-13,1e-9),'source Eq11 BOTH pseudocounts reproduced');
assert.ok(close(a95.lambdaUpper,5.2e-13,.001),'Ge published rounded 5.2e-13 bound reproduced');
assert.ok(close(lin.lambdaUpper,8.3e-11,.012),'independent LISA published rounded bound');
assert.ok(csl.germanium({conditionOnPositive:true}).lambdaUpper>a95.lambdaUpper,'positive signal truncation matters slightly');
assert.ok(close(csl.xenon(1e-7).lambdaUpper,3e-17,1e-12),'XENON published bound conversion');
assert.ok(close(csl.germanium({r:1e-6}).lambdaUpper,100*a95.lambdaUpper,1e-12),'Ge scales with r squared at fixed detector coefficient');
assert.ok(close(csl.lisa({r:1e-6}).lambdaUpper,lin.lambdaUpper/100,1e-12),'LISA translational approximate bound scales inverse r squared');
assert.ok(csl.run().grid.at(-1).germanium95lambda===null,'no unsourced 1e-5 Ge extrapolation');
const comparison=require('../../data/csl-exclusion-comparison.json');
assert.equal(comparison.channels.length,5,'all molecule, Ge, xenon, LISA translation and rotation data covered');
assert.ok(close(comparison.reproductions.germanium.lambda95,a95.lambdaUpper,1e-9),'published reproducible Ge data agrees with tested code');
assert.ok(close(comparison.reproductions.lisa.computedLambdaUpper,lin.lambdaUpper,1e-9),'LISA dataset agrees with tested code');
assert.equal(comparison.referenceGrid.at(-1).germaniumUpper,null,'do not extrapolate Ge beyond original domain');
assert.equal(comparison.channels.filter(s=>s.lambdaUpper===null).length,2,'no invented molecule or rotational CSL upper bounds');
assert.equal(comparison.scientificVerdict.includes('none of these observations distinguish'),true,'ontology caveat required');
console.log('PASS versioned five-channel bound comparison and original source-data reproduction integration');
console.log('PASS original Ge posterior and LISA acceleration-noise numerical reproductions; no detector-level data claimed');
const macro=require('./macrorealism-reproduce.cjs').reproduce();
assert.ok(Math.abs(macro.z+83.9146113203905)<1e-9,'Knee original paper ~84sigma conditional');
assert.ok(macro.rho.delta<macro.bound[0],'macrorealist Eq7 control bound violated');
assert.equal(base.library.works.find(w=>w.id==='SRC-077').access,'fully-studied');
console.log('PASS source-Fig2 experimental 84sigma and GRW benchmark model safeguards');
const mainQuestion=base.discriminator;
assert.equal(mainQuestion.candidates.length,5,'five primary ontology-discrimination research gates');
assert.equal(mainQuestion.scorePolicy.centralScore,base.ledger.editorialMeter.score,'candidate score must match real scoreboard');
const counts={n:mainQuestion.fixedBackgroundDiagnostic.observedCounts,b:mainQuestion.fixedBackgroundDiagnostic.backgroundFixedAt,k:mainQuestion.fixedBackgroundDiagnostic.coefficient,r:mainQuestion.fixedBackgroundDiagnostic.referenceRCm};
const conditionalLogLR=lambda=>{const s=counts.k*lambda/(counts.r*counts.r);return counts.n*Math.log1p(s/counts.b)-s};
assert.ok(conditionalLogLR(3.34e-13)>0,'fixed background can favor some specific CSL strengths');
assert.ok(conditionalLogLR(1e-12)<0,'same data can disfavor other preselected CSL strengths');
assert.ok(Math.abs(conditionalLogLR(1e-12)+10.017982050900116)<1e-9,'original Ge count-level likelihood diagnostics reproduce');
assert.ok(mainQuestion.fixedBackgroundDiagnostic.warning.includes('NOT'),'conditional calculation must not masquerade as score');
assert.equal(base.pageFreshness.pages.length,8,'eight public routes require freshness inventory');
assert.equal(base.pageFreshness.nextMandatorySweepRoundLogCount,17,'first mandatory full sweep R010');
assert.ok(base.pageFreshness.lastCompletedSweepRoundLogCount>=17,'R010 source audit must be recorded');
assert.ok(base.sessions.roundLog.length>=17,'R010 first mandatory website sweep must be preserved');
fails('freshness missing at next fifth round',d=>{
 for(let i=11;i<=15;i++)d.sessions.roundLog.push({...d.sessions.roundLog.at(-1),id:'S-002-R0'+i});
},'five-round website sweep missing');
fails('unpaired central test',d=>{
 d.discriminator.candidates[0].candidateObservable='';
},'missing paired hypotheses');
console.log('PASS central-question opposite-direction conditional likelihood and five-round publication freshness fail-closed tests');
console.log('Truth Engine fixtures PASS, baseline: '+JSON.stringify(pass.counts));
