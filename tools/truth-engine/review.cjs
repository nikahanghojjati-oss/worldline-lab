'use strict';
// Trusted local proposal gate; never a browser mutation or an auto-scoring mechanism.
const hex40=/^[0-9a-f]{40}$/;
// Private in-process gate: untrusted JSON receipts cannot authorize a score revision.
// No human scientific review will be requested for this project.
// The retired legacy approval machinery cannot authorize directional writes.
// HAMMER's actual provider-backed AI reviews are advisory until reproduced
// physical evidence and commit-bound science validation are verified separately.
const apiSeal=Symbol('retired-legacy-gate-never-issued');
function check(p,db){
 const problems=[];
 const fields=['claimClass','hypothesis','nullHypothesis','prediction','testedObservable','measurement','controls','counterevidenceSearch','alternativeExplanations','uncertainty','discriminationArgument','impactRationale','reviewer','priorAuditId','reviewedEvidenceCommit','scoreMapping'];
 for(const f of fields)if(typeof p[f]!=='string'||!p[f].trim())problems.push('required '+f);
 if(!hex40.test(p.reviewedEvidenceCommit||''))problems.push('evidence SHA');
 if(!db.library.verdictAudit.changeLog.some(x=>x.id===p.priorAuditId))problems.push('prior audit');
 if(!Number.isFinite(p.oldScore)||!Number.isFinite(p.proposedScore)||p.oldScore!==db.ledger.editorialMeter.score)problems.push('score baseline');
 if(!Array.isArray(p.sourceIds)||!p.sourceIds.length||p.sourceIds.some(id=>!db.library.works.some(w=>w.id===id)))problems.push('sources');
 if(!Array.isArray(p.readingNoteIds)||!p.readingNoteIds.length||p.readingNoteIds.some(id=>!db.notes.notes.some(n=>n.id===id&&n.stage==='fully-studied')))problems.push('readings');
 if(!['model-specific','central-ontology'].includes(p.target))problems.push('target');
 if(p.target==='central-ontology'&&!p.distinguishingLikelihood)problems.push('measured discriminator');
 return problems;
}
function record(p,db,stamp){
 const issues=check(p,db);if(issues.length)throw Error(issues.join(', '));
 if(!hex40.test(stamp.sha)||!stamp.reason||!stamp.id)throw Error('review record requires actual commit, ID and reason');
 if(db.truthEngine.changeLedger.some(x=>x.id===stamp.id))throw Error('duplicate');
 if(p.oldScore!==p.proposedScore){
  const a=stamp.approval;
  if(stamp[apiSeal]!==true)throw Error('directional score revision requires verified HAMMER AI research and external reproducible evidence; direct JSON receipts and retired human gate cannot authorize a change');
 }
 return {id:stamp.id,kind:'decision',date:stamp.date,oldScore:p.oldScore,newScore:p.proposedScore,priorJudgment:p.priorAuditId,evidenceCommit:p.reviewedEvidenceCommit,decisionCommit:stamp.sha,sourceIds:p.sourceIds,readingNoteIds:p.readingNoteIds,reason:stamp.reason,approvalEvidence:stamp.approval||null,reverses:null};
}
async function recordReviewed(p,db,stamp,receipt){
 if(arguments.length!==4)throw Error('No injected GitHub responses accepted in production reviewer path');
 const priorProblems=check(p,db);if(priorProblems.length)throw Error(priorProblems.join(', '));
 // Retained signature solely so old callers fail closed rather than silently
 // accepting a human GitHub approval against the owner's new AI-only policy.
 throw Error('Legacy human-scientist approval disabled; use HAMMER AI-only source-first advisory workflow');
}
function reverse(entry,score,stamp){
 if(entry.newScore!==score||!hex40.test(stamp.sha)||!stamp.reason||!stamp.id)throw Error('stale or unsupported reversal');
 if(entry.oldScore!==entry.newScore){
  const a=stamp.approval;
  if(stamp[apiSeal]!==true)throw Error('directional reversal requires verified HAMMER AI research and a reproducible evidence audit; forged receipts are rejected');
 }
 return {id:stamp.id,kind:'reversal',date:stamp.date,oldScore:score,newScore:entry.oldScore,priorJudgment:entry.id,evidenceCommit:stamp.sha,decisionCommit:stamp.sha,sourceIds:entry.sourceIds,readingNoteIds:entry.readingNoteIds,reason:stamp.reason,reverses:entry.id};
}
async function reverseReviewed(entry,score,stamp,proposal,receipt){
 if(arguments.length!==5)throw Error('No injected GitHub responses accepted in production reviewer path');
 if(entry.newScore!==score||entry.oldScore===entry.newScore||proposal.oldScore!==score||proposal.proposedScore!==entry.oldScore||proposal.reviewedEvidenceCommit!==stamp.reviewedEvidenceCommit)
  throw Error('reversal requires exact prior decision, proposed inverse score and reviewed evidence commit');
 throw Error('Legacy human-scientist reversal disabled; use HAMMER AI-only source-first review and independently reproduced evidence');
}
async function reviewWithHammer(p,db,packet){
 if(arguments.length!==3)throw Error('HAMMER: injected review transport or fake model response is not accepted');
 const problems=check(p,db);if(problems.length)throw Error(problems.join(', '));
 if(packet?.evidenceCommit!==p.reviewedEvidenceCommit)throw Error('HAMMER: review packet must match exact evidence commit');
 const {runReview}=require('../hammer/ai-panel.cjs');
 const advisory=await runReview(packet); // actual trusted provider API, not a supplied review object
 return Object.freeze({...advisory,proposalId:p.id||null,
  scienceStatus:'ADVISORY_ONLY',scoreChangeAuthorized:false,
  next:'Run and source-verify independent empirical reproduction before drafting a reversible direction-changing Ledger PR.'});
}
module.exports={check,record,recordReviewed,reverse,reverseReviewed,reviewWithHammer};
