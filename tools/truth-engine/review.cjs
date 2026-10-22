'use strict';
// Trusted local proposal gate; never a browser mutation or an auto-scoring mechanism.
const hex40=/^[0-9a-f]{40}$/;
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
  if(!a||a.kind!=='github-human-approval'||a.verifiedVia!=='github-rest'||a.evidenceCommit!==p.reviewedEvidenceCommit||a.reviewer!==p.reviewer||!Number.isSafeInteger(a.reviewId)||!Number.isSafeInteger(a.prNumber))
   throw Error('directional score revision requires an API-verified human approval for the exact evidence commit');
 }
 return {id:stamp.id,kind:'decision',date:stamp.date,oldScore:p.oldScore,newScore:p.proposedScore,priorJudgment:p.priorAuditId,evidenceCommit:p.reviewedEvidenceCommit,decisionCommit:stamp.sha,sourceIds:p.sourceIds,readingNoteIds:p.readingNoteIds,reason:stamp.reason,approvalEvidence:stamp.approval||null,reverses:null};
}
function reverse(entry,score,stamp){
 if(entry.newScore!==score||!hex40.test(stamp.sha)||!stamp.reason)throw Error('stale or unsupported reversal');
 return {id:stamp.id,kind:'reversal',date:stamp.date,oldScore:score,newScore:entry.oldScore,priorJudgment:entry.id,evidenceCommit:stamp.sha,decisionCommit:stamp.sha,sourceIds:entry.sourceIds,readingNoteIds:entry.readingNoteIds,reason:stamp.reason,reverses:entry.id};
}
module.exports={check,record,reverse};
