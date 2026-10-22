/* Worldline Lab | GitHub-backed public research reader. No browser write credentials. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const allowed=['home','dashboard','ledger','journal','disciplines','atlas','library','sessions'];
let ledger=null,research=null,sessions=null,libraryIndex=null,filter='All';
const html=s=>String(s==null?'':s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
const trustedUrl=u=>typeof u==='string'&&/^https:\/\//.test(u)?u:'#ledger';
function navigate(){
 let key=(location.hash||'#home').slice(1).split('?')[0];
 if(!allowed.includes(key))key='home';
 document.querySelectorAll('.page').forEach(s=>s.classList.toggle('active',s.dataset.page===key));
 document.querySelectorAll('[data-route]').forEach(a=>{
  if(a.dataset.route===key)a.setAttribute('aria-current','page');
  else a.removeAttribute('aria-current');
 });
 document.title=(key==='home'?'One Timeline or Many?':key.charAt(0).toUpperCase()+key.slice(1))+' | Worldline Lab';
 if(research&&libraryIndex&&key==='disciplines')renderLabDetail();
 window.scrollTo({top:0,behavior:'instant'});
}
function compass(score){
 const v=Math.max(0,Math.min(100,Number(score)||50));
 if($('main-needle'))$('main-needle').style.transform='rotate('+((v-50)*1.44)+'deg)';
 if($('home-score'))$('home-score').textContent=String(v);
 if($('orientation-bar'))$('orientation-bar').style.width=v+'%';
 if($('orientation-copy'))$('orientation-copy').textContent='Exploratory editorial orientation: '+v+'/100. The score is not a measured probability. No existing experiment uniquely demonstrates single or branching physical histories.';
 const label='Research compass shows a provisional exploratory orientation of '+v+' out of 100. This is not a probability; the empirical verdict remains unresolved.';
 if($('home-compass'))$('home-compass').setAttribute('aria-label',label);
}
function compassTicks(){
 const g=$('compass-ticks');if(!g)return;
 const ns='http://www.w3.org/2000/svg';
 for(let i=0;i<72;i++){
  let a=(i*5-90)*Math.PI/180,major=i%6===0;
  let r=major?160:169,r2=177;
  let el=document.createElementNS(ns,'line');
  el.setAttribute('x1',String(200+r*Math.cos(a)));el.setAttribute('y1',String(200+r*Math.sin(a)));
  el.setAttribute('x2',String(200+r2*Math.cos(a)));el.setAttribute('y2',String(200+r2*Math.sin(a)));
  el.setAttribute('stroke-width',major?'2':'1');g.appendChild(el);
 }
}
function renderLedger(){
 const host=$('ledger-list');if(!host||!ledger)return;
 const q=($('ledger-search')?.value||'').trim().toLowerCase();
 const hits=ledger.entries.filter(e=>(filter==='All'||e.kind===filter)&&(!q||[e.title,e.field,e.finding,e.source,e.status,e.question].join(' ').toLowerCase().includes(q)));
 host.innerHTML=hits.length?hits.map(e=>{
   const kind=e.kind==='Experiment'?'blue':e.kind==='Interpretation'?'pink':'gray';
   return '<article class="evidence-card"><div class="evidence-meta"><span class="id">'+html(e.id)+'</span><span class="date">'+html(e.date)+'</span><p class="micro">'+html(e.field)+'</p></div><div><h3>'+html(e.title)+'</h3><span class="pill '+kind+'">'+html(e.kind)+'</span> <span class="pill">'+html(e.status)+'</span><p>'+html(e.finding)+'</p><p class="caption">Evidence grade: '+html(e.strength)+'</p><p><a class="sourcelink" target="_blank" rel="noopener noreferrer" href="'+html(trustedUrl(e.url))+'">'+html(e.source)+' ↗</a></p><p class="source-note">'+html(e.notes)+'</p></div><div><span class="pill">Compass impact: '+(Number(e.impact)>0?'+':'')+html(e.impact)+'</span><p class="caption">'+html(e.direction)+'</p></div></article>';
  }).join(''):'<div class="empty">No entries match those filters. Clear the search or select another category.</div>';
}

function renderVerdictAudit(){
 const h=$('verdict-monitor');if(!h||!libraryIndex||!ledger)return;
 const audit=libraryIndex.verdictAudit||{},works=libraryIndex.works||[],logs=audit.changeLog||[];
 const reviewed=works.filter(w=>w.access==='abstract-reviewed').length;
 const finished=works.filter(w=>w.access==='fully-studied').length;
 const mean=ledger.entries.reduce((sum,e)=>sum+Number(e.impact||0),0);
 const changed=logs.filter(v=>Number(v.delta||0)!==0).length;
 h.innerHTML='<div class="verdict-head"><div><span class="kicker">A TRANSPARENT VERDICT · VERSIONED HISTORY</span><h2>Why the compass moves — or does not</h2></div><span class="verdict-badge">'+html(ledger.editorialMeter.score)+'/100 · '+(changed?'Revision recorded':'UNCHANGED')+'</span></div>'+
 '<p>New articles, recorded research progress, and a changed verdict are three different things. The compass is still an editorial research illustration, never a measured probability of many worlds. We update the underlying verdict only when a methodologically sound source distinguishes competing physical predictions.</p>'+
 '<div class="verdict-metrics"><div><strong>'+works.length+'</strong><small>CATALOGUED WORKS · REAL REFERENCES</small></div><div><strong>'+reviewed+' abstract checks / '+finished+' full studies</strong><small>DOCUMENTED STUDY DEPTH</small></div><div><strong>'+(mean>0?'+':'')+mean+'</strong><small>COMBINED LEDGER-ENTRY METER IMPACT</small></div></div>'+
 '<p class="micro">CURRENT SCIENTIFIC JUDGMENT</p><p>'+html(audit.empiricalConclusion||ledger.editorialMeter.empiricalVerdict)+'</p>'+
 '<div class="verdict-history">'+logs.slice().reverse().map(log=>{
 const sourceLinks=(log.sourceIds||[]).slice(0,7).map(id=>{
  const w=works.find(x=>x.id===id);return w?'<a href="'+html(trustedUrl(w.url))+'" target="_blank" rel="noopener noreferrer">'+html(w.id)+' ↗</a>':'<span>'+html(id)+'</span>';
 }).join(' · ');
 return '<article><div class="micro">'+html(log.date)+' · '+html(log.id)+' · '+(Number(log.delta||0)===0?'NO VERDICT CHANGE':'VERDICT REVISED')+' · '+html(log.oldScore)+' → '+html(log.newScore)+'</div><p>'+html(log.trigger||'Research reassessment')+': '+html(log.justification||'No explanation recorded.')+'</p><div>'+sourceLinks+'</div></article>';
 }).join('')+'</div><p class="caption">What can move next? A review that supplies a distinguishing prediction, actual relevant measurements, uncertainty and independent comparison — documented in the versioned audit. Otherwise the meter stays put for an explicit reason.</p>';
}
function renderResearchExpansion(){
 const h=$('lab-program-overview');if(!h||!research||!libraryIndex)return;
 const all=libraryIndex.works||[],targets=libraryIndex.expansionTargets||{},minimum=targets.minimumCataloguedWorks||400,stretch=targets.stretchCataloguedWorks||4000;
 const summaries=all.filter(x=>x.access==='abstract-reviewed').length,fully=all.filter(x=>x.access==='fully-studied').length;
 if($('home-reviewed-heading'))$('home-reviewed-heading').textContent=String(fully); if($('home-reviewed-count'))$('home-reviewed-count').textContent=String(fully);
 const tasks=research.disciplines.reduce((n,d)=>n+(d.topics||[]).length,0);
 h.innerHTML='<span class="kicker">THE LITERATURE EXPANSION · DISCIPLINED GROWTH</span><h2>Tenfold research depth, with a hundredfold horizon.</h2><p>Our original library began with 40 works. The first corpus target is 400 unique verified works, with an ambitious 4,000-work stretch target. More importantly, we aim for 400 substantive full-text critical studies before claiming a mature synthesis; today’s completed count remains honestly separate.</p>'+
 '<div class="program-stats"><div class="program-stat"><strong>'+all.length+' / '+minimum+'</strong><small>CATALOGUED / FIRST TARGET</small></div><div class="program-stat"><strong>'+fully+' / 400</strong><small>FULL SCIENTIFIC REVIEWS / INITIAL TARGET</small></div><div class="program-stat"><strong>'+summaries+'</strong><small>ABSTRACT / SUMMARY CHECKS</small></div><div class="program-stat"><strong>'+tasks+'</strong><small>SUBJECT TOPICS MAPPED</small></div></div>'+
 '<div class="program-track" role="progressbar" aria-label="Catalogue growth toward first 400 works" aria-valuemin="0" aria-valuemax="'+minimum+'" aria-valuenow="'+all.length+'"><span style="width:'+Math.min(100,100*all.length/minimum)+'%"></span></div>'+
 '<p class="caption">'+all.length+' distinct references catalogued. Stretch ambition: '+stretch+' sources. Targets are research plans, not completed readings. No dates or percentages of future study completion are implied.</p>';
 const bridge=$('cross-lab-overview');if(!bridge)return;
 const rooms=research.interdisciplinaryLabs||[];
 bridge.innerHTML='<div class="kicker">BEYOND SPECIALIZATION</div><h2>Interdisciplinary research studios</h2><p>Some questions cross disciplines. The bridge rooms link to the constituent subject research, and future shared simulations will build on those independently documented findings.</p><div class="cross-lab-list">'+rooms.map(room=>{
  const links=(room.fields||[]).map(field=>{
   const d=research.disciplines.find(x=>x.name===field);
   return d?'<a href="#disciplines?lab='+encodeURIComponent(d.slug)+'&room=presentation">'+html(field)+' ↗</a>':'';
  }).join('');
  return '<article class="cross-lab-card"><div class="micro">INTERDISCIPLINARY STUDIO · SCOPING STAGE</div><h3>'+html(room.name)+'</h3><p>'+html(room.question)+'</p><div class="micro">INITIAL COMPARATIVE INSTRUMENT</div><p>'+html(room.instrument)+'</p><div class="cross-lab-links">'+links+'</div></article>';
 }).join('')+'</div>';
}

function renderMilestones(){
 const h=$('milestone-list');if(!h||!research)return;
 h.innerHTML=research.milestones.map(m=>'<div class="step"><div class="step-n">'+html(m.id.slice(1))+'</div><div style="flex:1"><h3>'+html(m.name)+'</h3><p>'+html(m.completion)+'</p><p class="caption">Acceptance gate: '+html(m.acceptance)+'</p></div><span class="status-tag">'+html(m.state.toUpperCase())+'</span></div>').join('');
}
function plannedWorks(d){
 if(!libraryIndex?.works)return [];
 const fields=new Set(d.readingFields||[]), ids=new Set(d.additionalSourceIds||[]);
 const works=libraryIndex.works.filter(w=>fields.has(w.field)||ids.has(w.id));
 const priority=new Map((d.prioritySourceIds||[]).map((id,i)=>[id,i]));
 return works.sort((a,b)=>(priority.get(a.id)??1000)-(priority.get(b.id)??1000)||a.id.localeCompare(b.id));
}
function statusInfo(w){
 if(w.access==='fully-studied')return {icon:'✓',label:'Full study documented',css:'finished'};
 if(w.access==='partially-studied')return {icon:'◐',label:'Partially studied',css:'partial'};
 if(w.access==='abstract-reviewed')return {icon:'◇',label:'Abstract / summary checked',css:'abstract'};
 return {icon:'○',label:'Planned · not yet studied',css:'queued'};
}
function renderProgram(){
 const h=$('research-program');if(!h||!research)return;
 h.innerHTML=(research.programStages||[]).map(s=>'<article class="research-stage"><span class="stage-index">'+html(s.id)+'</span><div><span class="stage-status">'+html(s.state)+'</span><h3>'+html(s.title)+'</h3><p>'+html(s.deliverable)+'</p><div class="stage-gate">Exit gate: '+html(s.gate)+'</div></div></article>').join('');
}
function renderLabDetail(){
 const cards=$('disciplines-list'),detail=$('lab-detail'),program=$('research-program-wrap');
 if(!cards||!detail||!research)return;
 const params=new URLSearchParams((location.hash.split('?')[1]||''));
 const slug=params.get('lab');
 const d=research.disciplines.find(x=>x.slug===slug);
 if(!d){cards.hidden=false;detail.hidden=true;if(program)program.hidden=false;return;}
 cards.hidden=true;detail.hidden=false;if(program)program.hidden=true;
 document.title=d.name+' Research Lab | Worldline Lab';
 const works=plannedWorks(d),done=works.filter(x=>x.access==='fully-studied').length;
 const summaries=works.filter(x=>x.access==='abstract-reviewed').length;
 detail.innerHTML='<a class="lab-back" href="#disciplines">← All research laboratories</a><div class="lab-hero"><div><span class="kicker">THE WORLDLINE READING PROGRAM / '+html(d.symbol)+'</span><h2>'+html(d.name)+'</h2><p>'+html(d.goal||d.work)+'</p><p class="lab-question">Research question: '+html(d.question||d.theme)+'</p></div><div class="lab-stats"><strong>'+works.length+'</strong><span>WORKS IN CURRENT SYLLABUS</span><strong>'+done+' / '+works.length+'</strong><span>COMPLETE FULL-TEXT STUDIES</span><span class="lab-summary-count">'+summaries+' abstract or overview checks</span></div></div><div class="lab-guidance">The list below is the full current research queue for this lab, ordered with priority sources first. Each title links to its publisher, DOI or archived source. ✓ means a full study has documented notes; ◇ means only an abstract or summary was examined. Cross-disciplinary works may appear in more than one lab.</div><label class="lab-search-label" for="lab-source-search">Filter this reading list</label><input id="lab-source-search" class="lab-search" type="search" placeholder="Find an author, paper, source ID…" autocomplete="off"><div id="lab-source-list" class="lab-source-list"></div><div class="lab-footer"><a href="#library">Explore the full Scholar Library ↗</a><a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/data/library.json" target="_blank" rel="noopener noreferrer">View versioned catalogue ↗</a></div>';
 const highlights=Array.isArray(d.caseHighlights)?d.caseHighlights:[];
 if(highlights.length){
  const cards=highlights.map(f=>{
   const links=(f.sourceIds||[]).map(id=>{const w=libraryIndex.works.find(v=>v.id===id);return w?'<a target="_blank" rel="noopener noreferrer" href="'+html(trustedUrl(w.url))+'">'+html(id)+' · Original source ↗</a>':''}).join(' · ');
   return '<article class="library-note-card"><div class="micro">SOURCE-LINKED CURRENT RESEARCH · '+html((f.readingNoteIds||[]).join(', '))+'</div><h3>'+html(f.title)+'</h3><p>'+html(f.summary)+'</p><p class="caption">Scope and limitation: '+html(f.limitation)+'</p><div class="library-ledger-links">'+links+'</div></article>';
  }).join('');
  const fieldNote=typeof d.fieldNote==='string'&&d.fieldNote.startsWith('research/field-note-')&&d.fieldNote.endsWith('.md')?'<a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/'+d.fieldNote+'" target="_blank" rel="noopener noreferrer">Read detailed field note ↗</a>':'';
  $('lab-source-list').insertAdjacentHTML('beforebegin','<section class="lab-research-updates"><div class="kicker">RESEARCH FINDINGS · VERIFIED SCOPE</div><h3>What the current source review establishes</h3><p class="caption">'+done+' full main-text critical review(s) documented in this lab’s reading list. Other source statuses remain partial, abstract-reviewed or planned; full review is not independent experiment replication or proof of multiple timelines.</p>'+cards+fieldNote+'</section>');
 }
 const list=$('lab-source-list'),search=$('lab-source-search');
 function draw(){
  const q=search.value.trim().toLowerCase();
  const hits=works.filter(w=>[w.id,w.title,w.field,w.type,...(w.authors||[])].join(' ').toLowerCase().includes(q));
  list.innerHTML=hits.length?hits.map((w,i)=>{
   const s=statusInfo(w);
   return '<article class="lab-source"><div class="lab-source-n">'+String(i+1).padStart(2,'0')+'</div><div class="lab-source-body"><div class="lab-source-meta">'+html(w.id)+' · '+html(w.type)+' · '+html(w.year)+' · '+html(w.field)+'</div><h3><a href="'+html(trustedUrl(w.url))+'" target="_blank" rel="noopener noreferrer">'+html(w.title)+' ↗</a></h3><p>'+html((w.authors||[]).join(', '))+'</p><div class="lab-source-role">'+html(w.role||'Related research source')+'</div></div><span class="lab-source-status '+s.css+'" aria-label="'+html(s.label)+'"><span aria-hidden="true">'+s.icon+'</span> '+html(s.label)+'</span></article>';
  }).join(''):'<div class="empty">No sources match this search. Clear the filter to see the full planned list.</div>';
 }
 search.addEventListener('input',draw);draw();
 if(window.WorldlineLabEnhance)window.WorldlineLabEnhance(d,works);
}
function renderDisciplines(){
 const h=$('disciplines-list');if(!h||!research||!libraryIndex)return;
 h.innerHTML=research.disciplines.map(d=>{
  const works=plannedWorks(d),completed=works.filter(w=>w.access==='fully-studied').length;
  return '<a class="discipline lab-tile-link" href="#disciplines?lab='+encodeURIComponent(d.slug)+'" aria-label="Open '+html(d.name)+' lab reading plan with '+works.length+' sources"><span class="symbol" aria-hidden="true">'+html(d.symbol)+'</span><span class="tag">'+html(d.state)+'</span><h3>'+html(d.name)+'</h3><div class="micro">'+html(d.theme)+'</div><p>'+html(d.work)+'</p><div class="discipline-reading"><span>'+works.length+' planned sources · '+completed+' fully studied</span><span aria-hidden="true">Explore →</span></div></a>';
 }).join('');
 renderProgram();renderResearchExpansion();renderLabDetail();
}
function renderJournal(){
 const h=$('journal-body');if(!h||!research)return;
 const j=research.journal[0];if(!j)return;
 let parts='<div class="kicker">'+html(j.category)+'</div><div class="micro">'+html(j.date)+'</div><h2>'+html(j.title)+'</h2><p class="intro">'+html(j.intro)+'</p>';
 j.sections.forEach((s,i)=>{parts+='<h3>'+html(s.heading)+'</h3><p class="'+(i===0?'dropcap':'')+'">'+html(s.text)+'</p>'});
 if(j.fullReport&&/^research\/[a-z0-9-]+\.md$/.test(j.fullReport)){parts+='<p class="research-review-link"><a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/'+html(j.fullReport)+'" target="_blank" rel="noopener noreferrer">Read the complete ten-study research report and methods ↗</a></p>';}
 parts+='<hr style="border:0;border-top:1px solid #d3ddda;margin:35px 0"><div class="micro">OPEN EVIDENCE INDEX</div><p class="caption">Related ledger records: '+j.sourceIds.map(id=>html(id)).join(' · ')+'. <a href="#ledger" style="color:#337d89;text-decoration:underline">Open the source ledger →</a></p>';
 h.innerHTML=parts;
}
function renderSessions(){
 if(!sessions)return;
 if($('session-state'))$('session-state').textContent=sessions.state;
 if($('session-task'))$('session-task').textContent=sessions.activeWork;
 if($('session-next'))$('session-next').textContent='Next verification: '+sessions.nextStep;
 const format=n=>typeof n==='number'?String(n):'N/A';
 if($('session-tokens'))$('session-tokens').textContent=format(sessions.liveUsage.tokens);
 if($('session-context'))$('session-context').textContent=format(sessions.liveUsage.contextWindow);
 if($('session-minutes'))$('session-minutes').textContent=format(sessions.liveUsage.minutes);
 const h=$('session-rows');if(!h)return;
 h.innerHTML=sessions.sessionHistory.map(s=>'<tr><td>'+html(s.id)+'<br><small>'+html(s.date)+'</small></td><td>'+html(s.label)+'<p class="caption">'+html(s.work)+'</p></td><td>'+html(s.status)+'</td><td>'+html(s.elapsedMinutes==null?'Time unmeasured':s.elapsedMinutes+' min')+'<br>'+html(s.tokenCount==null?'Tokens unmeasured':s.tokenCount+' tokens')+'</td></tr>').join('');
}
function setFocus(title,desc,url){
 if($('atlas-focus-title'))$('atlas-focus-title').textContent=title;
 if($('atlas-focus-desc'))$('atlas-focus-desc').textContent=desc;
 const link=$('atlas-focus-link');
 if(link){link.href=trustedUrl(url);link.textContent=url&&url.startsWith('https://')?'Reference ↗':'Browse research →';}
}
function bindAtlas(){
 const nist='https://www.nist.gov/atomic-clocks/a-powerful-tool-for-science/putting-einstein-test';
 $('map-boulder')?.addEventListener('click',()=>setFocus('Boulder, Colorado','NIST research associated with atomic-clock tests of relativistic time dilation. This is an institutional reference, not precise experiment geolocation.',nist));
 $('map-europe')?.addEventListener('click',()=>setFocus('European research context','European research institutions are relevant to quantum mechanics and foundations, but this edition has not verified an exact institution-location link for an atlas pin. No additional evidence is claimed.','#ledger'));
 $('planet-earth')?.addEventListener('click',()=>setFocus('Earth · measured clocks','Laboratory clocks provide established relativity measurements. They do not reveal other inhabited timelines.',nist));
 $('planet-mars')?.addEventListener('click',()=>setFocus('Mars · future research lane','Potential future comparisons of gravitational environments require sourced astronomical observations. No Worldline Lab evidence entry currently originates from Mars.','#ledger'));
 $('planet-outer')?.addEventListener('click',()=>setFocus('Outer solar system · future research lane','Navigation, clocks, and gravitational models may yield future research questions. Current atlas markers are conceptual and not records of observations there.','#ledger'));
}
async function load(){
 const targets=['data/ledger.json','data/research.json','data/sessions.json','data/library.json'];
 try{
  const res=await Promise.all(targets.map(u=>fetch(u,{cache:'no-store'})));
  if(res.some(r=>!r.ok))throw Error('Missing source JSON');
  const data=await Promise.all(res.map(r=>r.json()));
  [ledger,research,sessions,libraryIndex]=data;
  compass(ledger.editorialMeter.score);
  if($('hero-count'))$('hero-count').textContent=String(ledger.entries.length);
  renderLedger();renderVerdictAudit();renderMilestones();renderDisciplines();renderJournal();renderSessions();
 }catch(e){
  const message='<div class="empty">The public research files could not be loaded. Try refreshing; the source record is also available in the GitHub repository.</div>';
  for(const id of ['ledger-list','milestone-list','disciplines-list','journal-body'])if($(id))$(id).innerHTML=message;
  if($('session-task'))$('session-task').textContent='Session data unavailable. Inspect data/sessions.json on GitHub.';
 }
}
window.addEventListener('hashchange',navigate);
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{
 filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('active',x===b));renderLedger();
}));
$('ledger-search')?.addEventListener('input',renderLedger);
compassTicks();bindAtlas();navigate();load();
})();