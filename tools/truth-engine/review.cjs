'use strict';
// Trusted local proposal gate; never a browser mutation or an auto-scoring mechanism.
const hex40=/^[0-9a-f]{40}$/;
// Private in-process gate: untrusted JSON receipts cannot authorize a score revision.
const apiSeal=Symbol('fetchGitHubApproval-executed');
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
  if(stamp[apiSeal]!==true||!a||a.kind!=='github-human-approval'||a.verifiedVia!=='github-rest'||a.evidenceCommit!==p.reviewedEvidenceCommit||a.reviewer!==p.reviewer||!Number.isSafeInteger(a.reviewId)||!Number.isSafeInteger(a.prNumber))
   throw Error('directional score revision requires an API-verified human approval for the exact evidence commit');
 }
 return {id:stamp.id,kind:'decision',date:stamp.date,oldScore:p.oldScore,newScore:p.proposedScore,priorJudgment:p.priorAuditId,evidenceCommit:p.reviewedEvidenceCommit,decisionCommit:stamp.sha,sourceIds:p.sourceIds,readingNoteIds:p.readingNoteIds,reason:stamp.reason,approvalEvidence:stamp.approval||null,reverses:null};
}
async function recordReviewed(p,db,stamp,receipt){
 if(arguments.length!==4)throw Error('No injected GitHub responses accepted in production reviewer path');
 const priorProblems=check(p,db);if(priorProblems.length)throw Error(priorProblems.join(', '));
 const {fetchGitHubApproval}=require('./github-approval.cjs');
 if(!Number.isFinite(p.oldScore)||!Number.isFinite(p.proposedScore)||p.oldScore===p.proposedScore)
  throw Error('recordReviewed exclusively processes directional changes');
 const approval=await fetchGitHubApproval(p,receipt);
 // Only this module can set the private seal; the JSON ledger stores a serializable receipt.
 return record(p,db,{...stamp,approval,[apiSeal]:true});
}
function reverse(entry,score,stamp){
 if(entry.newScore!==score||!hex40.test(stamp.sha)||!stamp.reason||!stamp.id)throw Error('stale or unsupported reversal');
 if(entry.oldScore!==entry.newScore){
  const a=stamp.approval;
  if(stamp[apiSeal]!==true||!a||a.kind!=='github-human-approval'||a.verifiedVia!=='github-rest'||a.evidenceCommit!==stamp.reviewedEvidenceCommit||!Number.isSafeInteger(a.reviewId)||!Number.isSafeInteger(a.prNumber))
   throw Error('directional reversal requires independent API-verified scientific PR approval');
 }
 return {id:stamp.id,kind:'reversal',date:stamp.date,oldScore:score,newScore:entry.oldScore,priorJudgment:entry.id,evidenceCommit:stamp.sha,decisionCommit:stamp.sha,sourceIds:entry.sourceIds,readingNoteIds:entry.readingNoteIds,reason:stamp.reason,reverses:entry.id};
}
async function reverseReviewed(entry,score,stamp,proposal,receipt){
 if(arguments.length!==5)throw Error('No injected GitHub responses accepted in production reviewer path');
 if(entry.newScore!==score||entry.oldScore===entry.newScore||proposal.oldScore!==score||proposal.proposedScore!==entry.oldScore||proposal.reviewedEvidenceCommit!==stamp.reviewedEvidenceCommit)
  throw Error('reversal requires exact prior decision, proposed inverse score and reviewed evidence commit');
 const {fetchGitHubApproval}=require('./github-approval.cjs');
 const approval=await fetchGitHubApproval(proposal,receipt);
 return reverse(entry,score,{...stamp,approval,[apiSeal]:true});
}
module.exports={check,record,recordReviewed,reverse,reverseReviewed};
