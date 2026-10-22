/* Worldline Lab session control v3. Official status from GitHub JSON, latest commits from public API. */
(function(){
'use strict';
const host=document.getElementById('page-sessions');if(!host)return;
const $=id=>document.getElementById(id);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const repo='nikahanghojjati-oss/worldline-lab',base='https://github.com/'+repo;
let state=null,commitsLast=0,commitsLoading=false;
const storageKey='worldline-lab-continuity-signal-v3';
function readSignal(){try{return localStorage.getItem(storageKey)||'unknown'}catch(e){return 'unknown'}}
function writeSignal(v){try{localStorage.setItem(storageKey,v)}catch(e){}}
host.innerHTML=[
'<div class="page-head"><div class="kicker">06 / RESEARCH CONTINUITY CONTROL</div><h1 class="page-title">The <em>Session Observatory</em></h1><p class="dek">The decision to continue comes from research milestones, source control and the completeness of the restart record. A genuine handoff should preserve every verified finding without prematurely cutting short good research.</p></div>',
'<div class="session-hero"><div><div class="session-kicker">CURRENT FIELD SESSION · VERSIONED RESEARCH</div><h2 id="sc-title">Reading the project checkpoint…</h2><p id="sc-objective">Loading the current research assignment.</p><div class="session-chips"><span class="session-chip" id="sc-state">Loading</span><span class="session-chip navy">GITHUB RECORD OF TRUTH</span><span class="session-chip rose">EVENT-BASED HANDOFF</span></div></div><div class="session-number"><strong id="sc-number">001</strong><span>REGISTERED SESSION</span></div></div>',
'<div class="sc-dashboard">',
'<article class="session-frame sc-dashboard-panel"><div class="session-mini">LEAD RECOMMENDATION</div><h2>Should we start another chat?</h2><div class="sc-meter-row"><div class="sc-meter" id="sc-meter" role="img" aria-label="Checkpoint preparation completeness"><div><strong id="sc-numerator">— / 4</strong><span>RESTART PACKET<br>COMPLETE</span></div></div><div class="sc-meter-text"><h3 id="sc-recommendation">Reading saved milestones…</h3><p id="sc-explanation">Loading evidence-based decision.</p><p class="sc-meter-note">This measures completed handoff requirements, not a percentage of chat capacity or a deadline.</p></div></div><div id="sc-stages" class="sc-stages"><span>01 · RESEARCH</span><span>02 · CHECKPOINT</span><span>03 · BOUNDARY</span><span>04 · TRANSITION</span></div><p id="sc-assessed" class="caption">Reading last reviewed status…</p></article>',
'<article class="session-frame"><div class="session-mini">RESEARCH-BASED CHECKPOINT CONDITIONS</div><h2>What is ready?</h2><div id="sc-gates" class="sc-gates"></div><label class="session-form-label" for="sc-warning">Optional continuity observation</label><select id="sc-warning" class="session-select"><option value="unknown">No quality concern reported</option><option value="healthy">Reasoning is coherent</option><option value="moderate">Some repeated instructions or confusion</option><option value="high">Important information is being lost</option></select><p class="session-help">The optional observation is stored in this browser only. It does not pretend to measure actual GPT context usage or change the repository without a commit.</p><div id="sc-boundary" class="sc-boundary">Reading the next milestone…</div></article>',
'</div>',
'<div class="session-subsection"><div class="sc-heading"><div><div class="kicker">PUBLIC COMMIT ACTIVITY</div><h2>Recent updates to every project section</h2></div><button class="sc-refresh" type="button" id="sc-refresh">Refresh activity ↻</button></div><p class="caption">The latest repository commits are retrieved when the Sessions page opens and refreshed while this page remains open. A commit means saved project activity, not that a new GPT chat has started or that a scientific conclusion is proven.</p><p class="session-help" id="sc-activity-status">Fetching repository changes…</p><div id="sc-activity" class="sc-activity"><div class="empty">Loading activity…</div></div></div>',
'<div class="session-subsection"><div class="kicker">WORKSTREAM REPORT</div><h2>Progress by research section</h2><div id="sc-workstreams" class="sc-stream-grid"><div class="empty">Loading workstream status…</div></div></div>',
'<div class="session-subsection"><div class="kicker">DURABLE SESSION HISTORY</div><h2>What each chat contributed</h2><p class="caption">Only GPT sessions explicitly saved in GitHub appear in this archive.</p><div id="sc-history" class="session-history"><div class="empty">Loading session registry…</div></div></div>',
'<div class="session-subsection"><div class="sc-heading"><div><div class="kicker">MINIMAL CONTEXT · MAXIMUM PROVENANCE</div><h2>Verified handoff packet</h2></div><a class="sc-refresh" href="SESSION_START.md" target="_blank" rel="noopener noreferrer">Official starter ↗</a></div><div class="session-grid"><article class="session-frame"><h2>Last known verified state</h2><p id="sc-last" class="session-ink">Loading…</p><div class="session-mini">OUTSTANDING QUESTIONS</div><ul class="sc-open" id="sc-open"></ul><div class="session-mini">NEXT CONCRETE ACTION</div><p id="sc-next">Loading…</p></article><article class="session-frame"><h2>Resume without a long prompt</h2><pre class="session-packet" id="sc-packet">Loading…</pre><div class="session-actions"><button type="button" class="primary" id="sc-copy">Copy starter</button><button type="button" id="sc-download">Download packet</button></div><p class="session-feedback" id="sc-feedback" role="status"></p></article></div><p class="session-alert">GitHub saves project work. The site can automatically show recent commits while open, but a GPT conversation cannot report its unseen internal state from a static webpage. Every substantial change should also update the authoritative session record at a research milestone.</p></div>'
].join('');
const roundSection=document.createElement('section');roundSection.className='session-subsection';
roundSection.innerHTML='<div class="kicker">ROUND-BY-ROUND DECISION ARCHIVE</div><h2>Scientific progress, all workstreams & handoff decisions</h2><p class="caption">Saved round reports from the authoritative session JSON. Research without empirical discrimination does not alter the editorial compass.</p><div id="sc-round-log"></div>';
$('sc-history').closest('.session-subsection').before(roundSection);
function active(){return (state.sessionHistory||[]).find(x=>x.id===state.activeSession)||{}}
function readiness(){
 const t=state.transition||{},a=active(),cp=a.checkpoint||{};
 return {
  milestone:t.milestoneComplete===true,
  committed:t.checkpointCommitted===true,
  questions:t.openQuestionsRecorded===true&&(cp.unresolved||[]).length>0,
  next:t.nextActionDefined===true&&!!String(state.nextStep||'').trim()
 };
}
function evaluate(){
 const t=state.transition||{},g=readiness(),count=Object.values(g).filter(Boolean).length,signal=readSignal(),adequate=g.committed&&g.questions&&g.next;
 let title='CONTINUE THIS SESSION',reason='The next significant research milestone is underway. Keep studying while the conversation stays coherent; the verified checkpoint is already saved.',stage=1;
 if(g.milestone&&adequate&&t.naturalBoundary){title='TRANSITION RECOMMENDED';reason='A meaningful milestone has been completed, the next research stage is distinct, and the verified handoff is committed. The next chat can resume from GitHub.';stage=4}
 else if(signal==='high'){if(adequate){title='TRANSITION RECOMMENDED';reason='You reported serious continuity loss and the essential verified handoff is already saved. Start the next chat after final verification.';stage=4}else{title='CHECKPOINT IMMEDIATELY';reason='You reported serious continuity problems, but the essential saved handoff is incomplete. Save verified work before switching.';stage=2}}
 else if(signal==='moderate'){title='PREPARE HANDOFF';reason='You reported warning signs. Save new claims and the exact next action; continue only if reasoning remains reliable.';stage=2}
 else if(g.milestone&&adequate){title='HANDOFF OPTIONAL';reason='A meaningful deliverable and restart packet are ready. Continue if the current research thread is still productive, or switch when a new stage begins.';stage=3}
 else if(adequate){title='CONTINUE THIS SESSION';reason='The handoff documentation is ready, but the next study has not yet reached a natural stopping point. Continue rather than creating a premature new chat.';stage=2}
 return {t,g,count,title,reason,stage};
}
function packet(){
 const a=active(),cp=a.checkpoint||{},d=evaluate();
 return [
 'WORLDLINE LAB · SHORT VERIFIED SESSION HANDOFF',
 'Repository: '+base,
 'Active session: '+(state.activeSession||'unavailable')+' · '+(a.date||'date unverified'),
 'Current work: '+(state.activeWork||a.work||'not reported'),
 'Last verified: '+(state.lastVerified||'not recorded'),
 'Known limitations: '+(cp.unresolved||state.blocking||[]).slice(0,3).join(' | '),
 'Next precise action: '+(state.nextStep||'not recorded'),
 'Transition status: '+d.title+' · '+d.count+' of 4 checkpoint conditions',
 'Milestone: '+(d.t.milestoneName||'not recorded')+' · '+(d.t.milestoneComplete?'complete':'in progress'),
 'Prepared successor handoff: '+(state.handoff?.url||'SESSION_START.md'),
 'Successor target: '+(state.handoff?.targetSessionId||'not assigned')+' · do not claim it exists until the real new chat starts.',
 'On entry: read data/sessions.json, then relevant data/library.json and ledger source IDs.',
 'Do not equate mathematical models, simulations or interpretations with observed branching realities.'
 ].join('\n');
}
function render(){
 const a=active(),cp=a.checkpoint||{},d=evaluate(),g=d.g;
 $('sc-title').textContent=(a.id||'S-001')+' · '+(a.label||'Active research');
 $('sc-objective').textContent=state.activeWork||a.objective||'No current objective recorded';
 $('sc-state').textContent=state.state||'Active';
 $('sc-number').textContent=String((state.activeSession||'S-001').replace(/\D/g,'')||'001').padStart(3,'0');
 $('sc-warning').value=readSignal();
 $('sc-numerator').textContent=d.count+' / 4';
 $('sc-meter').style.setProperty('--sc-value',(d.count*25)+'%');
 $('sc-meter').setAttribute('aria-label',d.count+' of 4 restart packet requirements complete; this does not measure GPT context.');
 $('sc-recommendation').textContent=d.title;$('sc-recommendation').dataset.stage=String(d.stage);
 $('sc-explanation').textContent=d.reason;
 document.querySelectorAll('#sc-stages span').forEach((el,i)=>el.classList.toggle('active',i<d.stage));
 $('sc-assessed').textContent='Reviewed '+(d.t.assessedOn||state.updated||'undated')+' · '+(d.t.milestoneName||'Research stage');
 const definitions=[
 ['milestone','A meaningful deliverable is completed','Check the current stage, not the age of the chat.'],
 ['committed','Checkpoint and evidence committed to GitHub','The successor can find the permanent record.'],
 ['questions','Unresolved limitations explicitly recorded','The next session knows what is uncertain.'],
 ['next','One next action documented','No full transcript rereading required.']
 ];
 $('sc-gates').innerHTML=definitions.map(x=>'<div class="sc-gate '+(g[x[0]]?'ready':'open')+'"><span aria-hidden="true">'+(g[x[0]]?'✓':'○')+'</span><div><strong>'+esc(x[1])+'</strong><p>'+esc(x[2])+'</p></div></div>').join('');
 $('sc-boundary').textContent=d.t.naturalBoundary?'A new research stage is marked. A handoff is reasonable when the restart packet is complete.':d.t.milestoneComplete?'A substantial milestone is complete. Transition remains optional unless a natural boundary or problem is identified.':'The next significant research milestone is still in progress; continue while the work is coherent.';
 $('sc-last').textContent=state.lastVerified||'No verified state.';
 $('sc-next').textContent=state.nextStep||'No actionable next step recorded.';
 $('sc-open').innerHTML=(cp.unresolved||state.blocking||[]).map(x=>'<li>'+esc(x)+'</li>').join('')||'<li>No limitation currently recorded.</li>';
 $('sc-packet').textContent=packet();
 $('sc-history').innerHTML=(state.sessionHistory||[]).slice().reverse().map(x=>{
  const c=x.checkpoint||{},completed=c.verified||[],unresolved=c.unresolved||[];
  return '<article class="session-history-card"><div><span class="session-code">'+esc(x.id)+'</span><span class="session-date">'+esc(x.date||'undated')+'</span></div><div><h3>'+esc(x.label||'Research session')+'</h3><p>'+esc(x.work||x.objective||'No work recorded')+'</p><details class="session-history-details"><summary>'+completed.length+' documented achievements · '+unresolved.length+' open items</summary><ul>'+completed.map(a=>'<li>'+esc(a)+'</li>').join('')+'</ul><div class="session-mini">REMAINING</div><ul>'+unresolved.map(a=>'<li>'+esc(a)+'</li>').join('')+'</ul></details></div><span class="session-badge">'+esc(x.status||'Recorded')+'</span></article>';
 }).join('');
 const audits=Array.isArray(state.roundLog)?state.roundLog:[];
 $('sc-round-log').innerHTML=audits.slice().reverse().map(r=>{
  const v=r.verdict||{},streams=r.workstreamsReviewed||[];
  return '<article class="session-history-card"><div><span class="session-code">'+esc(r.id)+'</span><span class="session-date">'+esc(r.date||'undated')+'</span></div><div><h3>'+esc(r.scope||'Research round')+'</h3><p>'+esc(typeof r.verified==='string'?r.verified:'See verified record')+'</p><p class="caption">Verdict: '+esc(v.oldScore)+' → '+esc(v.newScore)+' · '+esc(v.status||'unreported')+' · '+esc(v.auditId||'no audit ID')+'</p><p class="caption">Session decision: '+esc(r.transitionDecision||'not recorded')+' · '+esc(r.transitionReason||'')+'</p><details class="session-history-details"><summary>'+streams.length+' workstream assessments · full evidence rationale</summary><p>'+esc(v.why||'No rationale supplied')+'</p><ul>'+streams.map(x=>'<li>'+esc(x.area)+': '+esc(x.change||x.latest||'reviewed')+'</li>').join('')+'</ul><div class="session-mini">NEXT CONCRETE ACTION</div><p>'+esc(r.nextAction||'not supplied')+'</p></details></div><span class="session-badge">'+esc(r.transitionDecision||'Recorded')+'</span></article>';
 }).join('')||'<div class="empty">No versioned rounds registered.</div>';
 const streams=Array.isArray(state.workstreams)?state.workstreams:[];
 $('sc-workstreams').innerHTML=streams.map(x=>{
  let route=['home','dashboard','ledger','journal','disciplines','atlas','library','sessions'].includes(x.route)?x.route:'home';
  return '<a href="#'+route+'" class="sc-stream"><div><div class="sc-stream-label">'+esc(x.area)+'</div><h3>'+esc(x.latest)+'</h3><p>'+esc(x.next||'Next action not recorded')+'</p></div><span class="sc-stream-badge '+esc(x.status)+'">'+esc(x.status)+'</span></a>';
 }).join('')||'<div class="empty">No workstreams recorded.</div>';
}
async function load(){try{let response=await fetch('data/sessions.json',{cache:'no-store'});if(!response.ok)throw Error('Could not load state file');state=await response.json();render();fetchCommits(false);}catch(e){$('sc-recommendation').textContent='SOURCE UNAVAILABLE';$('sc-explanation').textContent='The public record could not be loaded. Do not transition using an unverified checkpoint.';$('sc-activity-status').textContent='Inspect the GitHub repository directly.'}}
function prettyTime(s){let d=new Date(s);return Number.isFinite(d.getTime())?d.toLocaleString([], {month:'short',day:'numeric',hour:'numeric',minute:'2-digit'}):'Date unknown'}
async function fetchCommits(force){
 if(commitsLoading||document.hidden||location.hash.split('?')[0]!=='#sessions')return;
 if(!force&&Date.now()-commitsLast<180000)return;
 commitsLoading=true;$('sc-activity-status').textContent='Checking GitHub commits…';
 try{
  const ctrl=new AbortController(),timer=setTimeout(()=>ctrl.abort(),9000);let res;
  try{res=await fetch('https://api.github.com/repos/'+repo+'/commits?per_page=12',{cache:'no-store',signal:ctrl.signal,headers:{Accept:'application/vnd.github+json'}})}finally{clearTimeout(timer)}
  if(!res.ok)throw Error('GitHub returned '+res.status);
  const list=await res.json();if(!Array.isArray(list))throw Error('Unexpected GitHub data');
  $('sc-activity').innerHTML=list.map(x=>{
   const m=String(x.commit&&x.commit.message||'Repository update').split('\n')[0];
   return '<div class="sc-commit"><div><span>'+esc(prettyTime(x.commit&&x.commit.committer&&x.commit.committer.date))+'</span><small>'+esc(String(x.sha||'').slice(0,7))+'</small></div><div><a target="_blank" rel="noopener noreferrer" href="'+esc(x.html_url||base)+'">'+esc(m)+'</a><p>Saved to the Worldline Lab repository</p></div></div>';
  }).join('')||'<div class="empty">No commits returned.</div>';
  commitsLast=Date.now();$('sc-activity-status').textContent='GitHub commits checked at '+new Date().toLocaleTimeString([],{hour:'numeric',minute:'2-digit'})+' · refreshes every 3 minutes while this page is open.';
 }catch(e){$('sc-activity-status').textContent='Live commit listing unavailable. Saved milestone data remains available.';$('sc-activity').innerHTML='<a href="'+base+'/commits/main" target="_blank" rel="noopener noreferrer">Open the repository commit history ↗</a>'}
 finally{commitsLoading=false}
}
$('sc-warning').addEventListener('change',function(){writeSignal(this.value);if(state)render()});
$('sc-refresh').addEventListener('click',()=>{load();fetchCommits(true)});
$('sc-copy').addEventListener('click',async()=>{if(!state)return;try{await navigator.clipboard.writeText(packet());$('sc-feedback').textContent='Copied the committed checkpoint.'}catch(e){$('sc-feedback').textContent='Copy the displayed text manually; clipboard access unavailable.'}});
$('sc-download').addEventListener('click',()=>{if(!state)return;let b=new Blob([packet()+'\n'],{type:'text/plain'}),u=URL.createObjectURL(b),a=document.createElement('a');a.href=u;a.download='worldline-'+(state.activeSession||'session')+'-handoff.txt';a.click();setTimeout(()=>URL.revokeObjectURL(u),3000)});
window.addEventListener('hashchange',()=>{if(location.hash==='#sessions'){load()}});
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&location.hash==='#sessions')fetchCommits(false)});
setInterval(()=>fetchCommits(false),180000);
load();
})();