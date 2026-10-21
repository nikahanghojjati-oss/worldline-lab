/* Worldline Lab | GitHub-backed public research reader. No browser write credentials. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const allowed=['home','dashboard','ledger','journal','disciplines','atlas','sessions'];
let ledger=null,research=null,sessions=null,filter='All';
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
 document.title=(key==='home'?'An Atlas of Possible Histories':key.charAt(0).toUpperCase()+key.slice(1))+' | Worldline Lab';
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
function renderMilestones(){
 const h=$('milestone-list');if(!h||!research)return;
 h.innerHTML=research.milestones.map(m=>'<div class="step"><div class="step-n">'+html(m.id.slice(1))+'</div><div style="flex:1"><h3>'+html(m.name)+'</h3><p>'+html(m.completion)+'</p><p class="caption">Acceptance gate: '+html(m.acceptance)+'</p></div><span class="status-tag">'+html(m.state.toUpperCase())+'</span></div>').join('');
}
function renderDisciplines(){
 const h=$('disciplines-list');if(!h||!research)return;
 h.innerHTML=research.disciplines.map(d=>'<article class="discipline"><span class="symbol" aria-hidden="true">'+html(d.symbol)+'</span><span class="tag">'+html(d.state)+'</span><h3>'+html(d.name)+'</h3><div class="micro">'+html(d.theme)+'</div><p>'+html(d.work)+'</p></article>').join('');
}
function renderJournal(){
 const h=$('journal-body');if(!h||!research)return;
 const j=research.journal[0];if(!j)return;
 let parts='<div class="kicker">'+html(j.category)+'</div><div class="micro">'+html(j.date)+'</div><h2>'+html(j.title)+'</h2><p class="intro">'+html(j.intro)+'</p>';
 j.sections.forEach((s,i)=>{parts+='<h3>'+html(s.heading)+'</h3><p class="'+(i===0?'dropcap':'')+'">'+html(s.text)+'</p>'});
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
 const targets=['data/ledger.json','data/research.json','data/sessions.json'];
 try{
  const res=await Promise.all(targets.map(u=>fetch(u,{cache:'no-store'})));
  if(res.some(r=>!r.ok))throw Error('Missing source JSON');
  const data=await Promise.all(res.map(r=>r.json()));
  [ledger,research,sessions]=data;
  compass(ledger.editorialMeter.score);
  if($('hero-count'))$('hero-count').textContent=String(ledger.entries.length);
  renderLedger();renderMilestones();renderDisciplines();renderJournal();renderSessions();
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