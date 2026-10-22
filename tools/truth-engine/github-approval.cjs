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
 if(pr.base?.ref!=='main'||pr.state!=='open'||pr.draft===true)fail('PR must be open, non-draft, targeting main');
 if(pr.head?.sha!==p.reviewedEvidenceCommit)fail('PR changed after evidence commit');
 if(!Array.isArray(reviews))fail('GitHub review list');
 if(reviews.length>=100)fail('incomplete review history (>one page); do not certify');
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
 if(!['OWNER','MEMBER','COLLABORATOR'].includes(candidate.author_association))fail('GitHub reviewer must be recognized by repository');
 return Object.freeze({kind:'github-human-approval',verifiedVia:'github-rest',evidenceCommit:p.reviewedEvidenceCommit,reviewer:p.reviewer,prNumber:pr.number,reviewId:candidate.id,approvalDate:candidate.submitted_at,reviewUrl:pr.html_url||'https://github.com/'+repo+'/pull/'+pr.number});
}
async function fetchGitHubApproval(p,receipt){
 if(arguments.length!==2)throw Error('No injected GitHub responses accepted in production reviewer path');
 const token=process.env.GITHUB_TOKEN;
 if(!token)throw Error('Real GitHub API scientific approval requires GITHUB_TOKEN in a trusted server/CI runner');
 const headers={'Accept':'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28','Authorization':'Bearer '+token};
 const grab=async url=>{
  const response=await fetch(url,{headers,redirect:'error'});
  if(!response.ok)throw Error('GitHub approval HTTP '+response.status);
  return response.json();
 };
 const base='https://api.github.com/repos/'+repo+'/pulls/'+receipt.prNumber;
 const [pr,reviews]=await Promise.all([grab(base),grab(base+'/reviews?per_page=100')]);
 return apiApproval(p,receipt,pr,reviews);
}
module.exports={apiApproval,fetchGitHubApproval};
