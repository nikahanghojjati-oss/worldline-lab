/* Worldline Lab | evidence-based session continuity, v2. Browser state is explicitly local. */
(function(){
'use strict';
var section=document.getElementById('page-sessions');if(!section)return;
var repo='https://github.com/nikahanghojjati-oss/worldline-lab';
var cacheKey='worldline-lab-session-readiness-v2';
var store={};try{store=JSON.parse(localStorage.getItem(cacheKey)||'{}')||{}}catch(e){store={}}
var $=function(id){return document.getElementById(id)};
var esc=function(t){return String(t==null?'':t).replace(/[&<>"']/g,function(x){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]})};
var data=null;
section.innerHTML=[
'<div class="page-head"><div class="kicker">06 / RESEARCH CONTINUITY</div><h1 class="page-title">The <em>Session Observatory</em></h1><p class="dek">A verifiable work log and an intentional handoff system. We continue working while context is healthy and hand off at a meaningful milestone, a serious continuity warning, or a genuine blocker.</p></div>',
'<div class="session-hero"><div><div class="session-kicker">CURRENT FIELD SESSION · THE FOUNDING EDITION</div><h2 id="s-hero-title">Session 001 · Foundation and continuity</h2><p id="s-hero-desc">Loading the versioned session record from GitHub.</p><div class="session-chips"><span class="session-chip" id="s-state">Loading</span><span class="session-chip navy">ONE LEAD · ONE RESEARCH RECORD</span><span class="session-chip rose">EVIDENCE-BASED HANDOFFS</span></div></div><div class="session-number"><strong id="s-display-id">001</strong><span>THE ACTIVE STUDY SESSION</span></div></div>',
'<div class="session-grid">',
'<article class="session-frame"><div class="session-mini">I / VERIFIED RESEARCH STATE</div><h2>What this session has achieved</h2><p id="s-verified-note">Reading the public project record…</p><ol class="session-timeline" id="s-achievements"></ol><div class="session-facts"><div class="session-fact"><span>Sessions recorded</span><strong id="s-count">—</strong></div><div class="session-fact"><span>Research continuity</span><strong>Verified record</strong></div><div class="session-fact"><span>Next stage</span><strong>Milestone based</strong></div></div><h3>Current objective</h3><p class="session-ink" id="s-current-work">Loading…</p><h3>Next verifiable action</h3><p id="s-next-work">Loading…</p></article>',
'<article class="session-frame"><div class="session-mini">II / THE HANDOFF SIGNAL</div><h2>Should this chat continue?</h2><p>This assessment uses your explicit checks and observable research checkpoints, not an arbitrary timer.</p><div role="status" aria-live="polite" class="session-decision" id="s-decision"><div class="session-mini">RECOMMENDATION</div><strong>Continue the research</strong><p>Complete a meaningful milestone before considering a handoff.</p></div><div class="session-mini">HANDOFF QUALITY · REQUIREMENTS SATISFIED</div><div class="session-status-track" aria-hidden="true"><div class="session-status-fill" id="s-readiness-bar"></div></div><p id="s-readiness-count" class="session-help">0 of 4 checklist items confirmed.</p><div class="session-readiness" id="s-checks">',
'<label class="session-check"><input type="checkbox" data-assess="milestone">A meaningful deliverable or reviewable research milestone is finished.</label>',
'<label class="session-check"><input type="checkbox" data-assess="committed">The relevant changes and verified evidence are saved in GitHub.</label>',
'<label class="session-check"><input type="checkbox" data-assess="open">Open questions, limitations and blockers are recorded.</label>',
'<label class="session-check"><input type="checkbox" data-assess="next">The successor has one specific, actionable next step.</label>',
'</div><label class="session-form-label" for="s-friction">Observable context condition · your assessment</label><select id="s-friction" class="session-select"><option value="clear">Healthy: instructions and evidence remain coherent</option><option value="moderate">Warning: repeated explanations or growing confusion</option><option value="high">Severe: important facts are being lost or misapplied</option></select>',
'<label class="session-check" style="margin-top:12px"><input type="checkbox" id="s-boundary">This is a natural boundary: a different topic or research stage begins next.</label>',
'<p class="session-help">No arbitrary short session limit. Handoff timing follows actual milestones and quality signals. These selections save only in this browser until explicitly committed to the repository.</p></article>',
'</div>',
'<div class="session-subsection"><h2>Research session history</h2><p class="caption">This history is loaded from the versioned repository record; it does not claim to list chats that have never been reported.</p><div class="session-history" id="s-history"><div class="empty">Loading sessions…</div></div></div>',
'<div class="session-subsection"><h2>A successor should need less than a page.</h2><div class="session-grid"><article class="session-frame"><div class="session-mini">III / THE HANDOFF WORKBENCH</div><h2>Prepare the restart packet</h2><p>Keep the authoritative research in GitHub. This packet is an index to evidence, not a replacement for evidence.</p><label class="session-form-label" for="s-changes">Latest verified change or completed deliverable</label><textarea id="s-changes" class="session-textarea" placeholder="Describe only what is verified in the repository."></textarea><label class="session-form-label" for="s-questions">Known limitation or open question</label><textarea id="s-questions" class="session-textarea"></textarea><label class="session-form-label" for="s-next">One highest-value next action</label><textarea id="s-next" class="session-textarea"></textarea><div class="session-actions"><button type="button" id="s-refresh">Refresh packet</button><button type="button" class="primary" id="s-copy">Copy starter</button><button type="button" id="s-download">Download note</button></div><p class="session-feedback" id="s-feedback" role="status" aria-live="polite"></p><div class="session-alert">Research facts shown above come from GitHub. Edits in this form are private browser drafts; copying or downloading does not publish them. To update the public registry, commit reviewed changes to <a target="_blank" rel="noopener noreferrer" style="text-decoration:underline" href="'+repo+'/edit/main/data/sessions.json">data/sessions.json ↗</a> or have a connected assistant commit them.</div></article>',
'<article class="session-frame"><div class="session-mini">IV / THE ACTUAL HANDOFF</div><h2>Minimum truthful context</h2><pre id="s-packet" class="session-packet">Loading packet…</pre><div class="session-mini">SAFE CONTINUITY PRINCIPLES</div><ol style="font-size:13px;color:#4b6871;padding-left:20px;line-height:1.9"><li>Read the active checkpoint, then retrieve only the relevant evidence records.</li><li>Verify new claims, changed sources, and latest GitHub commits.</li><li>Never treat simulated proof as physical observation.</li><li>Choose the highest-information-gain next study, then update the record.</li><li>Hand off when continuity risk or a real stage boundary justifies it, not on a timer.</li></ol><p><a class="btn" target="_blank" rel="noopener noreferrer" href="'+repo+'/blob/main/SESSION_START.md">Official session starter ↗</a></p></article></div></div>'
].join('');
function field(id){return ($(id)&&$(id).value||'').trim()}
function save(){
 var obj={checks:{},friction:field('s-friction'),boundary:$('s-boundary').checked,changes:field('s-changes'),questions:field('s-questions'),next:field('s-next')};
 document.querySelectorAll('[data-assess]').forEach(function(x){obj.checks[x.dataset.assess]=x.checked});
 try{localStorage.setItem(cacheKey,JSON.stringify(obj))}catch(e){}
 return obj;
}
function getAssessment(){
 var checks={};document.querySelectorAll('[data-assess]').forEach(function(x){checks[x.dataset.assess]=x.checked});
 return {checks:checks,friction:field('s-friction'),boundary:$('s-boundary').checked};
}
function decision(){
 var a=getAssessment(),c=a.checks,total=Object.keys(c).filter(function(k){return c[k]}).length;
 var safe=c.committed&&c.open&&c.next,finished=c.milestone;
 var head='Continue this session',detail='Context appears healthy and there is no confirmed natural handoff point. Keep working on the present research milestone.',tone='';
 if(a.friction==='high'){
  if(safe){head='Handoff recommended';detail='You reported serious loss of continuity and the essential restart facts are captured. Save the final checkpoint in GitHub, then start the next chat.';tone='switch'}
  else{head='Checkpoint immediately';detail='You reported serious continuity problems. Capture and commit verified changes, open questions and the next action before changing chats.';tone='caution'}
 }else if(finished&&safe&&a.boundary){
  head='Handoff recommended';detail='A meaningful milestone is complete, a new research phase begins, and the minimum truthful handoff is prepared. Commit it and switch at this natural boundary.';tone='switch';
 }else if(finished&&safe){
  head='Handoff optional, not urgent';detail='This milestone and the restart essentials are ready. Continue if reasoning is still productive; switch when a new stage begins.';tone='caution';
 }else if(a.friction==='moderate'||(finished&&!safe)||a.boundary){
  head='Prepare a checkpoint soon';detail='A warning or potential stage boundary exists, but essential handoff conditions are incomplete. Save the evidence and next action before switching.';tone='caution';
 }
 var target=$('s-decision');target.className='session-decision '+tone;target.querySelector('strong').textContent=head;target.querySelector('p').textContent=detail;
 $('s-readiness-count').textContent=total+' of 4 checklist items confirmed. These are explicit user checks, not detected ChatGPT telemetry.';
 $('s-readiness-bar').style.width=(25*total)+'%';
 return {head:head,detail:detail};
}
function bulletItems(arr,stage,pending){return (arr||[]).map(function(x){return '<li class="'+(pending?'pending':'')+'"><span class="session-stage">'+stage+'</span>'+esc(x)+'</li>'}).join('')}
function packet(){
 if(!data)return 'Session record unavailable. Check the public repository.';
 var a=decision(),s=(data.sessionHistory||[]).filter(function(x){return x.id===data.activeSession})[0]||{};
 return [
 'WORLDLINE LAB · COMPACT SESSION HANDOFF',
 'Source of truth: '+repo,
 'Active session: '+(data.activeSession||'Unrecorded')+' · '+(s.date||data.updated||'date unverified'),
 'Research objective: '+(data.activeWork||s.objective||'Not recorded'),
 'Last verified: '+field('s-changes'),
 'Open evidence / blocker: '+field('s-questions'),
 'One next action: '+field('s-next'),
 'Handoff status (locally assessed): '+a.head,
 'Before new claims: read data/sessions.json and the relevant entries in data/ledger.json; inspect commits, reverify sources.',
 'Scientific guardrail: do not confuse mathematical interpretations, simulations, and experimentally discriminating observations.',
 'Note: Local edits and assessment are not published until explicitly committed.'
 ].join('\n');
}
function refresh(){decision();$('s-packet').textContent=packet()}
function render(dataIn){
 data=dataIn;
 var history=Array.isArray(data.sessionHistory)?data.sessionHistory:[];
 var active=history.filter(function(x){return x.id===data.activeSession})[0]||history[history.length-1]||{};
 $('s-hero-title').textContent=(active.id||'S-001')+' · '+(active.label||'Research continuity');
 $('s-hero-desc').textContent=active.objective||data.activeWork||'Review the active project.';
 $('s-state').textContent=active.status||data.state||'Unverified';
 $('s-display-id').textContent=String((active.id||'S-001').replace(/\D/g,'')||'001').padStart(3,'0');
 $('s-count').textContent=String(history.length);
 $('s-verified-note').textContent=data.lastVerified||'No verification record present.';
 $('s-current-work').textContent=data.activeWork||active.work||'No active work recorded.';
 $('s-next-work').textContent=data.nextStep||'No next step recorded.';
 var checkpoint=active.checkpoint||{};
 $('s-achievements').innerHTML=bulletItems(checkpoint.verified||active.completed||[],'REPOSITORY RECORD',false)+bulletItems(checkpoint.unresolved||active.ongoing||[],'OPEN / TO VERIFY',true);
 if(!$('s-achievements').innerHTML)$('s-achievements').innerHTML='<li class="pending">No completed work reported.</li>';
 $('s-history').innerHTML=history.slice().reverse().map(function(x){
  var cp=x.checkpoint||{};
  var done=cp.verified||x.completed||[];
  var pending=cp.unresolved||x.ongoing||[];
  return '<article class="session-history-card"><div><span class="session-code">'+esc(x.id)+'</span><span class="session-date">'+esc(x.date||'Undated')+'</span></div><div><h3>'+esc(x.label||x.objective||'Session')+'</h3><p>'+esc(x.work||x.objective||'No work description')+'</p><details class="session-history-details"><summary>View accomplishments and remaining work</summary><div class="session-mini">VERIFIED / REPORTED DELIVERABLES</div><ul>'+done.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul><div class="session-mini">OPEN TASKS</div><ul>'+pending.map(function(t){return '<li>'+esc(t)+'</li>'}).join('')+'</ul></details></div><div class="session-badge">'+esc(x.status||'Recorded')+'</div></article>'
 }).join('')||'<div class="empty">No sessions recorded in GitHub yet.</div>';
 $('s-changes').value=typeof store.changes==='string'?store.changes:(data.lastVerified||'');
 $('s-questions').value=typeof store.questions==='string'?store.questions:((checkpoint.unresolved||[]).join('; ')||(data.blocking||[]).join('; ')||'No unresolved issue reported');
 $('s-next').value=typeof store.next==='string'?store.next:(data.nextStep||'');
 document.querySelectorAll('[data-assess]').forEach(function(x){x.checked=!!(store.checks&&store.checks[x.dataset.assess])});
 if(store.friction&&['clear','moderate','high'].includes(store.friction))$('s-friction').value=store.friction;
 $('s-boundary').checked=!!store.boundary;
 refresh();
}
document.querySelectorAll('#page-sessions input,#page-sessions select,#page-sessions textarea').forEach(function(n){
 n.addEventListener('change',function(){save();refresh()});
 n.addEventListener('input',function(){save();refresh()});
});
$('s-refresh').addEventListener('click',function(){refresh();$('s-feedback').textContent='Packet rebuilt from the current browser draft.'});
$('s-copy').addEventListener('click',function(){
 var t=packet();
 if(!navigator.clipboard||!navigator.clipboard.writeText){$('s-feedback').textContent='Clipboard access unavailable. Select and copy the packet from the right.';return}
 navigator.clipboard.writeText(t).then(function(){$('s-feedback').textContent='Starter copied. Commit changed research facts to GitHub before handing off.'}).catch(function(){$('s-feedback').textContent='Clipboard permission denied. Copy the visible starter manually.'})
});
$('s-download').addEventListener('click',function(){
 var link=document.createElement('a'),blob=new Blob([packet()+'\n'],{type:'text/markdown;charset=utf-8'});var url=URL.createObjectURL(blob);
 link.href=url;link.download='worldline-'+(data&&data.activeSession||'session')+'-handoff.md';document.body.appendChild(link);link.click();link.remove();setTimeout(function(){URL.revokeObjectURL(url)},3000);
 $('s-feedback').textContent='Handoff note downloaded locally; this does not commit or sync with GitHub.';
});
fetch('data/sessions.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('Unable to load session registry');return r.json()}).then(render).catch(function(e){
 $('s-history').innerHTML='<div class="empty">Could not load the public session record. Please refresh or check data/sessions.json in GitHub.</div>';
 $('s-verified-note').textContent='GitHub record unavailable; no verified session data loaded.';
 $('s-feedback').textContent=e.message;
 $('s-packet').textContent='The versioned source is unavailable. Do not trust the handoff until it is retrieved.';
});
})();
