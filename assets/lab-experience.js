/* Worldline Lab: field presentation rooms and illustrative interactive instruments.
   No physical experiment is run here, and no control changes the evidence ledger. */
(function(){
'use strict';
const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=(n,d=2)=>Number.isFinite(n)?n.toLocaleString('en-US',{maximumFractionDigits:d}):'—';
const $=id=>document.getElementById(id);
function instrument(d){
 const name=d.name;
 const configs={
 'Physics':{title:'Special relativity time-dilation explorer',label:'Travel speed as a fraction of light speed',min:0,max:95,step:1,start:50,unit:'% of c',
  model:v=>{const beta=v/100,gamma=1/Math.sqrt(1-beta*beta);return ['Lorentz factor γ = '+fmt(gamma,4),'For a hypothetical traveler aging 10 years, the stationary-frame time is '+fmt(gamma*10,2)+' years under constant-speed idealization.'];},
  caution:'This is a basic inertial relativity calculation, not backward travel or a branching timeline.',sources:'Related source: Einstein, 1905 (SRC-001).'},
 'Mathematics':{title:'A tiny fixed-point consistency test',label:'Rule selector: 0 is identity, 1 is binary negation',min:0,max:1,step:1,start:0,unit:'rule',
  model:v=>v===0?['Rule f(x)=x has fixed points x=0 and x=1.','Logical self-consistency holds for both binary states.']:['Rule f(x)=1−x has no fixed point over {0,1}.','A binary self-contradiction in this toy rule does not prove that real spacetime contains a loop.'],
  caution:'A logical toy problem, not a general no-go theorem for chronology.',sources:'Relevant reading: time-travel logic and Deutsch consistency (SRC-023, SRC-019).'},
 'Quantum computing':{title:'Idealized interference visibility',label:'Illustrative decoherence strength λ',min:0,max:50,step:1,start:12,unit:'λ / 10',
  model:v=>['Illustrative visibility V = exp(−λ) = '+fmt(Math.exp(-v/10),4),'Stronger hypothetical environmental coupling reduces visible interference in this simple teaching model.'],
  caution:'This pedagogical exponential is not a fitted laboratory measurement and says nothing about actual alternate universes.',sources:'Related reading: Zurek and indefinite causal order (SRC-011, SRC-020).'},
 'AI & computer science':{title:'Evidence-gate checklist',label:'Evidence gate count (0 to 3 fulfilled)',min:0,max:3,step:1,start:1,unit:'gates',
  model:v=>['Documented evidence gates: '+v+' of 3','Three questions: primary source verified? Independent confirmation? Distinct model predictions? A high count is not a probability or scientific verdict.'],
  caution:'A research-process checklist, not an algorithm that converts citations into truth.',sources:'Related reading: Pearl, Causality (SRC-024).'},
 'Neuroscience':{title:'Perceived ordering versus event timing',label:'Illustrative perceptual offset',min:-200,max:200,step:10,start:40,unit:'ms',
  model:v=>['Perceived interval shift: '+(v>0?'+':'')+v+' milliseconds',v===0?'No modeled perceptual offset.':v>0?'Event may be judged later than its physical timestamp.':'Event may be judged earlier than its physical timestamp.'],
  caution:'A made-up offset to teach the distinction. No subject data are collected and no neural model is being validated.',sources:'Related reading: Eagleman time-perception review (SRC-030).'},
 'Chemistry':{title:'Coherence decay illustration',label:'Hypothetical environmental exposure',min:0,max:50,step:1,start:10,unit:'arbitrary units',
  model:v=>['Toy coherence fraction: '+fmt(100*Math.exp(-v/10),1)+'%','A larger exposure parameter suppresses model coherence; no chemical molecule or environment is simulated.'],
  caution:'Not an empirical prediction for a specific molecule or proof of wavefunction collapse.',sources:'Related reading: molecular interference (SRC-032, SRC-048).'},
 'Biology':{title:'Circadian phase illustration',label:'Time after reference point',min:0,max:48,step:1,start:12,unit:'hours',
  model:v=>['Illustrative phase angle: '+fmt((v%24)*15,0)+'°','A 24-hour idealized cycle completes '+fmt(v/24,2)+' rotations at '+v+' hours.'],
  caution:'Biological clocks have entrainment and variability; a periodic cycle is not a relativistic spacetime clock.',sources:'Related reading: Nobel circadian-mechanism overview (SRC-033).'},
 'History':{title:'Independent corroboration toy model',label:'Independent source count',min:1,max:10,step:1,start:3,unit:'records',
  model:v=>['Hypothetical chance of at least one accurate report: '+fmt(100*(1-Math.pow(.5,v)),2)+'%','Only for an explicitly invented model of '+v+' independent reports, each with 50% accuracy. Actual documents are often dependent.'],
  caution:'Never use this teaching percentage as the probability that a historical claim is true.',sources:'Related reading: Kuhn and source-criticism methods (SRC-038).'},
 'Astronomy':{title:'Light-travel-time illustration',label:'Distance to a hypothetical source',min:1,max:100,step:1,start:10,unit:'million light-years',
  model:v=>['Light-travel time ≈ '+v+' million years in a static idealized geometry.','A distant observation shows light emitted in the past, not a view into a different physical history.'],
  caution:'The simple light-year model ignores cosmological expansion, peculiar velocities and realistic distance inference.',sources:'Related reading: Hubble and modern cosmology (SRC-035, SRC-036).'}
 };
 return configs[name]||configs.Physics;
}
function roomDeck(d,works){
 const source=works.slice(0,4).map(w=>'<a target="_blank" rel="noopener noreferrer" href="'+esc(w.url)+'">'+esc(w.title)+' ↗</a>').join('');
 return '<div class="room-cover"><div class="kicker">FIELD PRESENTATION ROOM · VOL. 01</div><h3>'+esc(d.name)+'</h3><p>'+esc(d.goal||d.work)+'</p><div class="room-cover-mark">'+esc(d.symbol)+'</div></div>'+
 '<div class="room-deck"><div class="room-deck-top"><span class="micro">A FACULTY-STYLE RESEARCH PRESENTATION</span><span class="micro" id="deck-index">01 / 06</span></div><div id="deck-slide" class="room-slide" aria-live="polite"></div><div class="room-deck-controls"><button type="button" id="deck-prev">← Previous</button><button type="button" id="deck-next">Next topic →</button></div></div>'+
 '<div class="room-sources"><div class="micro">START WITH THE ORIGINAL WORKS</div><p>Each presentation is a navigational overview, not a claim that the underlying papers have been read completely.</p>'+source+'</div>';
}
function bindDeck(d){
 const slides=(d.topics||[]);let i=0;
 const draw=()=>{
  const t=slides[i];if(!t)return;
  $('deck-index').textContent=String(i+1).padStart(2,'0')+' / '+String(slides.length).padStart(2,'0');
  $('deck-slide').innerHTML='<span class="slide-number">'+String(i+1).padStart(2,'0')+'</span><h3>'+esc(t.title)+'</h3><p>'+esc(t.scope)+'</p><div class="slide-inquiry"><span class="micro">WORK TO BE DONE</span><p>'+esc(t.studyGoal)+'</p></div><div class="slide-disclaimer">Research topic planned · no completed full-text studies claimed by this slide.</div>';
  $('deck-prev').disabled=i===0;$('deck-next').disabled=i===slides.length-1;
 };
 $('deck-prev').addEventListener('click',()=>{i=Math.max(0,i-1);draw()});
 $('deck-next').addEventListener('click',()=>{i=Math.min(slides.length-1,i+1);draw()});
 draw();
}
function laboratory(d){
 const c=instrument(d);
 return '<div class="room-cover lab-instrument-cover"><div class="kicker">FIELD INSTRUMENT · EXPLORATORY v1</div><h3>'+esc(c.title)+'</h3><p>Manipulate one assumption to see how a mathematical or conceptual result changes. This model is for understanding, not for validating the Truth Compass.</p></div>'+
 '<div class="instrument"><label for="lab-control">'+esc(c.label)+'</label><div class="instrument-slider"><input type="range" id="lab-control" min="'+c.min+'" max="'+c.max+'" step="'+c.step+'" value="'+c.start+'"><output id="lab-control-value"></output></div><div id="lab-control-result" class="instrument-outcome" aria-live="polite"></div><div class="instrument-caution"><span class="micro">SCIENTIFIC BOUNDARY</span><p>'+esc(c.caution)+'</p><small>'+esc(c.sources)+'</small></div></div>'+
 '<section class="future-experiments"><h3>Future specialized instruments</h3><p>Planned subject-specific simulations will expose assumptions, equations, uncertainties, primary-source links and reproducible methods. This first instrument is an educational demonstration, not a completed research laboratory.</p><a href="#library">Consult the evidence before interpreting the model ↗</a></section>';
}
function bindLab(d){
 const c=instrument(d),input=$('lab-control'),output=$('lab-control-value'),result=$('lab-control-result');
 const render=()=>{
  const v=Number(input.value),messages=c.model(v);
  output.textContent=v+' '+c.unit;
  result.innerHTML='<strong>'+esc(messages[0])+'</strong><p>'+esc(messages[1])+'</p>';
 };
 input.addEventListener('input',render);render();
}
function enhance(d,works){
 const container=$('lab-detail');if(!container)return;
 let params=new URLSearchParams((location.hash.split('?')[1]||'')),requested=params.get('room')||'reading';
 if(!['reading','presentation','interactive'].includes(requested))requested='reading';
 const hero=container.querySelector('.lab-hero');
 if(!hero)return;
 const tabs=document.createElement('nav');tabs.className='lab-rooms-switcher';tabs.setAttribute('aria-label','Research laboratory rooms');
 const names=[['reading','01 / Source library'],['presentation','02 / Presentation room'],['interactive','03 / Interactive laboratory']];
 tabs.innerHTML=names.map(([key,label])=>'<a href="#disciplines?lab='+encodeURIComponent(d.slug)+'&room='+key+'" class="'+(key===requested?'chosen':'')+'" '+(key===requested?'aria-current="page"':'')+'>'+label+'</a>').join('');
 hero.insertAdjacentElement('afterend',tabs);
 const stage=document.createElement('div');stage.className='lab-room-stage';stage.id='lab-room-stage';tabs.insertAdjacentElement('afterend',stage);
 for (const child of [...container.children]) {
  if(child===tabs||child===stage||child===hero||child.classList.contains('lab-back'))continue;
  child.hidden=requested!=='reading';
 }
 if(requested==='presentation'){stage.innerHTML=roomDeck(d,works);bindDeck(d)}
 else if(requested==='interactive'){stage.innerHTML=laboratory(d);bindLab(d)}
 else stage.hidden=true;
}
window.WorldlineLabEnhance=enhance;
})();
