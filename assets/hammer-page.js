/* HAMMER standalone public reader: all scientific counts and movements are read-only GitHub Pages JSON. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const safeLink=v=>typeof v==='string'&&/^https:\/\/[^\s<>"']+$/.test(v)?v:null;
const repo='https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/';
const researchPath=v=>typeof v==='string'&&/^research\/[A-Za-z0-9-]+\.md$/.test(v)?v:null;
let lastVersion='',lastCheck=0,loading=false;
function setValue(id,value){const el=$(id);if(el)el.textContent=String(value)}
async function getJSON(path,revision){
 const response=await fetch(path+'?publishedCheck='+revision,{cache:'no-store'});
 if(!response.ok)throw Error('Unable to read '+path+' ('+response.status+')');
 return response.json();
}
function renderMeter(ledger){
 const meter=ledger?.editorialMeter||{};
 const n=Number(meter.score),valid=Number.isFinite(n)&&n>=0&&n<=100;
 setValue('hp-score',valid?n.toFixed(n%1===0?0:1):'—');
 const dial=$('hp-dial-needle'),label=$('hp-compass-graphic');
 if(valid){
  // A different officially stored value would point elsewhere, but refresh never fabricates score movement.
  dial.style.setProperty('--hp-angle',(n-50)*1.6+'deg');
  label.setAttribute('aria-label','Truth Compass officially records '+n+' out of 100. This is an editorial indicator, not a probability of real histories.');
 }
 const verdict=typeof meter.empiricalVerdict==='string'?meter.empiricalVerdict:'Empirical count of physically realized histories remains unresolved.';
 $('hp-central-status').textContent=(meter.label||'Research verdict')+' · '+(valid?n+'/100':'not available');
 $('hp-central-status').title=verdict;
}
function movementMarkup(m,byId){
 const e=byId.get(m.ledgerId),sourceUrl=safeLink(e?.url),files=researchPath(m.researchReport);
 const date=esc(m.date||e?.date||'Undated');
 return '<article class="hp-movement"><div><div class="hp-movement-id">'+esc(m.id)+' / '+date+'</div><span class="hp-tag">CLAIM-SPECIFIC SCIENTIFIC MOVEMENT</span></div>'+
 '<div><h3>'+esc(e?.title||m.claim||'Evidence movement')+'</h3>'+
 '<p><strong>What changed:</strong> '+esc(m.modelDirection||'See original source')+'</p>'+
 '<p>'+esc(m.to||'See underlying claim and evidence status')+'</p>'+
 '<p><strong>Central Compass implication:</strong> '+esc(m.centralHistoryDirection||'Not established')+'</p>'+
 '<div class="hp-links">'+
 (sourceUrl?'<a href="'+esc(sourceUrl)+'" target="_blank" rel="noopener noreferrer">Original source ↗</a>':'')+
 (files?'<a href="'+esc(repo+files)+'" target="_blank" rel="noopener noreferrer">Reproduction / report ↗</a>':'')+
 '<a href="index.html#ledger">Explore Ledger ↗</a></div></div></article>';
}
function renderMovements(ledger){
 const host=$('hp-movement-feed');const moves=ledger?.scientificMovements,entries=ledger?.entries;
 if(!Array.isArray(moves)||!Array.isArray(entries)){host.textContent='The published evidence format is currently unavailable.';return;}
 const byId=new Map(entries.map(e=>[e.id,e]));
 host.innerHTML=moves.length?moves.slice(-7).reverse().map(m=>movementMarkup(m,byId)).join(''):'<p class="hp-loading">No recorded scientific movements yet. Absence of evidence is not a directional result.</p>';
}
function renderSessions(sessions){
 const host=$('hp-round-feed'),rounds=sessions?.roundLog;
 if(!Array.isArray(rounds)){host.textContent='The versioned Session Observatory is currently unavailable.';return;}
 host.innerHTML=rounds.slice(-9).reverse().map(r=>{
   const report=researchPath(r.research?.report)||researchPath(r.website?.report);
   const sc=r.scope||r.milestone||'Documented research round';
   const verdict=r.verdict?.status||'See scientific decision';
   return '<article class="hp-round"><span class="hp-date">'+esc(r.date||'')+' / '+esc(r.id||'')+'</span>'+
    '<h3>'+esc(sc.length>91?sc.slice(0,88)+'…':sc)+'</h3>'+
    '<p class="hp-verdict-tag">Evidence verdict: '+esc(verdict)+'</p>'+
    '<p>'+esc(r.verdict?.why||r.verified||'Source-bound progress recorded in GitHub.').slice(0,280)+'</p>'+
    (report?'<a class="hp-inline" target="_blank" rel="noopener noreferrer" href="'+esc(repo+report)+'">Read research record ↗</a>':'<a class="hp-inline" href="index.html#sessions">Inspect session ↗</a>')+
    '</article>';
 }).join('');
}
function setCheckState(message,error){
 const el=$('hp-freshness');
 if(el)el.textContent=message;
 const button=$('hp-refresh');if(button)button.disabled=false;
 if(error){$('hp-movement-feed').setAttribute('data-error','true');}
}
async function refresh(){
 if(loading)return;
 loading=true;
 const button=$('hp-refresh');if(button)button.disabled=true;
 try{
  const revision=Date.now();
  const [ledger,session,library,reading]=await Promise.all([
   getJSON('data/ledger.json',revision),getJSON('data/sessions.json',revision),
   getJSON('data/library.json',revision),getJSON('data/reading-notes.json',revision)]);
  if(!Array.isArray(ledger.entries)||!Array.isArray(ledger.scientificMovements)||
     !Array.isArray(session.roundLog)||!Array.isArray(library.works)||!Array.isArray(reading.notes))
    throw Error('The public research dataset has an unexpected structure.');
  setValue('hp-findings',ledger.entries.length);
  setValue('hp-movement-count',ledger.scientificMovements.length);
  setValue('hp-sources',library.works.length);
  setValue('hp-studies',library.works.filter(w=>w.access==='fully-studied').length);
  setValue('hp-round',session.roundLog.at(-1)?.id||'—');
  renderMeter(ledger);renderMovements(ledger);renderSessions(session);
  const version=(session.roundLog.at(-1)?.id||'?')+'/'+(ledger.scientificMovements.at(-1)?.id||'none')+'/'+ledger.editorialMeter?.score;
  const updated=version===lastVersion?'No change since previous check. ':'Updated research dataset loaded. ';
  lastVersion=version;lastCheck=Date.now();
  setCheckState(updated+'Published data checked '+new Date(lastCheck).toLocaleString()+'. Sources: data/ledger.json, data/sessions.json, data/library.json and data/reading-notes.json. Recheck on page focus or use Refresh. Scientific conclusions change only after GitHub commits and deployment.',false);
 }catch(e){setCheckState('Unable to refresh published research: '+String(e.message)+'. The website does not substitute invented data. Try refreshing again.',true);}
 finally{loading=false;if(button)button.disabled=false;}
}
$('hp-refresh')?.addEventListener('click',refresh);
document.addEventListener('visibilitychange',()=>{if(!document.hidden&&Date.now()-lastCheck>30000)refresh();});
window.addEventListener('pageshow',e=>{if(e.persisted)refresh();});
setInterval(()=>{if(!document.hidden&&Date.now()-lastCheck>120000)refresh();},120000);
refresh();
})();
