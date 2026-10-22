#!/usr/bin/env node
'use strict';
// v0.2 approval precondition. Verify human GitHub reviews with the public GitHub API.
// A handwritten reviewer name, commit-looking string, PR URL or simulated response is NOT approval.
// This library validates real API responses; callers must use the trusted fetchGitHubApproval
// routine with an authenticated trusted environment for accepted score decisions.
const repo='nikahanghojjati-oss/worldline-lab';
const sha=/^[a-f0-9]{40}$/;
const str=v=>typeof v==='string'&&v.trim().length>0;
function apiApproval(p,receipt,pr,reviews){
 const fail=why=>{throw new Error('Unverified scientific review: '+why)};
 if(!p||!receipt||!Number.isSafeInteger(receipt.prNumber)||receipt.prNumber<1)fail('PR number');
 if(!Number.isSafeInteger(receipt.reviewId)||receipt.reviewId<1)fail('review ID');
 if(!sha.test(p.reviewedEvidenceCommit||''))fail('evidence commit');
 if(!pr||pr.number!==receipt.prNumber||pr.base?.repo?.full_name!==repo||pr.head?.repo?.full_name!==repo)fail('same-repository PR');
 if(pr.head?.sha!==p.reviewedEvidenceCommit)fail('PR changed after evidence commit');
 if(!Array.isArray(reviews))fail('GitHub review list');
 const author=pr.user?.login?.toLowerCase();
 const candidate=reviews.find(x=>x.id===receipt.reviewId);
 if(!candidate||candidate.state!=='APPROVED'||!str(candidate.submitted_at))fail('actual approved GitHub review');
 if(candidate.commit_id!==p.reviewedEvidenceCommit)fail('approval for old commit');
 const reviewer=candidate.user?.login?.toLowerCase();
 if(!reviewer||reviewer===author||reviewer!==(p.reviewer||'').toLowerCase())fail('distinct reviewer identity');
 // Later dismissals or requests for changes from the same reviewer invalidate old approval.
 const ordered=reviews.filter(x=>x.user?.login?.toLowerCase()===reviewer&&str(x.submitted_at))
   .sort((a,b)=>String(a.submitted_at).localeCompare(String(b.submitted_at))||a.id-b.id);
 if(ordered.at(-1)?.id!==candidate.id)fail('newer reviewer decision overrides approval');
 if(candidate.author_association==='NONE'&&!receipt.allowExternalReviewer)fail('untrusted external reviewer');
 return Object.freeze({kind:'github-human-approval',verifiedVia:'github-rest',evidenceCommit:p.reviewedEvidenceCommit,reviewer:p.reviewer,prNumber:pr.number,reviewId:candidate.id,approvalDate:candidate.submitted_at,reviewUrl:pr.html_url||'https://github.com/'+repo+'/pull/'+pr.number});
}
async function fetchGitHubApproval(p,receipt,fetchJson){
 // fetchJson must be injected by a trusted environment; no private tokens or writes go to the client.
 const grab=fetchJson||(async(url)=>{
  const token=process.env.GITHUB_TOKEN;const headers={'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28'};
  if(token)headers.Authorization='Bearer '+token;
  const response=await fetch(url,{headers});if(!response.ok)throw Error('GitHub approval HTTP '+response.status);
  return response.json();
 });
 const base='https://api.github.com/repos/'+repo+'/pulls/'+receipt.prNumber;
 return apiApproval(p,receipt,await grab(base),await grab(base+'/reviews?per_page=100'));
}
module.exports={apiApproval,fetchGitHubApproval};
