/* Worldline Lab | GitHub-backed public research reader. No browser write credentials. */
(function(){
'use strict';
const $=id=>document.getElementById(id);
const allowed=['home','dashboard','ledger','journal','disciplines','atlas','library','sessions'];
let ledger=null,research=null,sessions=null,libraryIndex=null,comparison=null,pageFreshness=null,questionGates=null,truthEngine=null,filter='All';
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
 renderRoundBanner();
 window.scrollTo({top:0,behavior:'instant'});
}
function renderRoundBanner(){
 const host=$('research-round-banner');if(!host||!sessions||!pageFreshness)return;
 const latest=sessions.roundLog?.at(-1);
 const active=(location.hash||'#home').slice(1).split('?')[0];
 const audit=pageFreshness.pages.find(p=>p.route===active);
 const pageNote=audit?.lastContentRound?('Last substantive page change: '+audit.lastContentRound):'Full page refresh required';
 const due=pageFreshness.nextMandatorySweep;
 const status=ledger?.editorialMeter?.empiricalVerdict||'Central scientific assessment unresolved';
 const short=status.length>165?status.slice(0,162)+'…':status;
 host.innerHTML='<span class="micro">LIVE RESEARCH CHECKPOINT · '+html(latest?.id||sessions.activeSession)+'</span>'+
 '<p><strong>Decision: '+html(sessions.transition?.decision||'UNASSESSED')+'</strong> · '+html(short)+'</p>'+
 '<p class="caption">Current page: '+html(active)+' · '+html(pageNote)+' · Next required eight-page source refresh: '+html(due)+'. <a href="#sessions">Read the complete Session Observatory and next falsifiable test ↗</a></p>';
}
function renderQuestionGates(){
 const host=$('question-gates-view');if(!host||!questionGates)return;
 const items=(questionGates.candidates||[]).slice().sort((a,b)=>a.order-b.order);
 host.innerHTML='<div class="kicker">CENTRAL QUESTION · FALSIFIABLE RESEARCH PRIORITIES</div><h2>Which experiment could change what we believe about actual histories?</h2>'+
 '<p>Competing theories must predict different records before we award evidence toward one or many. Results that constrain collapse without distinguishing Everett and Bohm are still genuine model-specific science.</p>'+
 '<div class="question-gates-grid">'+items.map(g=>'<article class="question-gate-item"><span class="micro">GATE '+html(g.order)+' · '+html(g.scorePossible)+'</span><h3>'+html(g.program)+'</h3><p>'+html(g.candidateObservable)+'</p><p class="caption"><strong>Test:</strong> '+html(g.nextTask)+'</p><p class="caption"><strong>Result type:</strong> '+html(g.expectedOutcome)+'</p></article>').join('')+'</div>'+
 '<p class="caption">The existing 50/100 is an editorial neutral reference, NOT physical odds. A particular CSL parameter can be favored or disfavored by the same aggregate count data; score changes need predeclared hypothesis families and instrument uncertainties.</p>'+
 '<p><a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/research/central-question-discriminators-S002-R009.md" target="_blank" rel="noopener noreferrer">Read the mathematical identification check and original primary sources ↗</a></p>';
}
function compass(score){
 const v=Math.max(0,Math.min(100,Number(score)||50));
 if($('main-needle'))$('main-needle').style.transform='rotate('+((v-50)*1.44)+'deg)';
 if($('home-score'))$('home-score').textContent=String(v);
 if($('orientation-bar'))$('orientation-bar').style.width=v+'%';
 if($('orientation-copy'))$('orientation-copy').textContent='Neutral editorial anchor '+v+'/100, not a physical probability. The unsupported old 59 was retired. Model-specific measurements advance the claim ledger; Everett versus equilibrium Bohm remains unresolved.';
 const label='Research compass neutral editorial anchor '+v+' out of 100, not a physical probability. Multiple-real-history ontology remains unresolved.';
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

function renderTruthEngine(){
 const host=$('truth-engine-view');if(!host||!truthEngine||!ledger)return;
 const rules=truthEngine.proposalRules||{},decisions=truthEngine.changeLedger||[],proposals=truthEngine.proposals||[];
 const source='https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/data/truth-engine.json';
 const meter=Number(ledger.editorialMeter?.score);
 const baseline=Number(truthEngine.baseline?.score);
 // The baseline is a historical anchor, not necessarily the current score after a
 // legitimately reviewed future revision. Compare with the newest published revision.
 const newest=decisions.at(-1);
 const expected=Number(newest?.newScore??baseline);
 const aligned=Number.isFinite(meter)&&Number.isFinite(expected)&&expected===meter;
 const commitLink=sha=>typeof sha==='string'&&/^[0-9a-f]{40}$/.test(sha)
  ?'<a href="https://github.com/nikahanghojjati-oss/worldline-lab/commit/'+sha+'" target="_blank" rel="noopener noreferrer">Evidence commit '+html(sha.slice(0,10))+' ↗</a>'
  :'<span>No verified evidence commit reference</span>';
 const receipts=decisions.map(d=>{
  const a=d.approvalEvidence;
  const reviewed=a&&a.kind==='github-human-approval'&&a.verifiedVia==='github-rest';
  const reviewUrl=reviewed&&typeof a.reviewUrl==='string'&&/^https:\/\/github\.com\/nikahanghojjati-oss\/worldline-lab\/pull\/\d+$/.test(a.reviewUrl)?a.reviewUrl:null;
  return '<li><strong>'+html(d.id||'Unidentified record')+' · '+html(d.kind||'decision')+'</strong> · '+html(d.oldScore)+' → '+html(d.newScore)+
   '<p>'+html(d.reason||'No published reason')+'</p><p>'+commitLink(d.evidenceCommit)+
   (reviewUrl?' · <a href="'+html(reviewUrl)+'" target="_blank" rel="noopener noreferrer">Recorded review receipt (verify on GitHub) ↗</a>':' · No linked verified external reviewer receipt shown')+'</p></li>';
 }).join('');
 host.innerHTML='<div class="kicker">TRUTH ENGINE v0.2 · READ-ONLY PROVENANCE</div><h3>How a scientific verdict could be revised</h3>'+
 '<p>This page reads the versioned review data published in GitHub. Visitors cannot submit an approval, update a score, or authorize a reversal here. A stored receipt is an audit claim, not proof that this browser independently queried GitHub reviewers.</p>'+
 '<div class="truth-engine-status"><strong>Recorded directional decisions: '+decisions.length+'</strong><span>Proposals queued: '+proposals.length+'</span><span>Central editorial reference: '+html(meter)+'/100 (not an empirical probability)</span></div>'+
 '<p><strong>Review gate:</strong> '+(rules.humanScientificReviewRequired?'Independent human scientific GitHub review is required for directional changes.':'Review requirement needs verification.')+
 ' '+(rules.automaticMeterChange===false?'There is no automatic score promotion.':'Automatic decision policy requires inspection.')+'</p>'+
 (aligned?'':'<p class="truth-engine-warning" role="alert">The Truth Engine baseline and current published meter differ. Treat this as unresolved provenance until audited.</p>')+
 (decisions.length?'<ol class="truth-engine-records">'+receipts+'</ol>':
 '<p class="truth-engine-empty">No approved directional score-changing decision has been published in the Truth Engine ledger. Existing historical no-change audits and model-specific findings remain visible above.</p>')+
 '<p class="truth-engine-links"><a href="'+source+'" target="_blank" rel="noopener noreferrer">Inspect complete versioned review data on GitHub ↗</a> · <a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/tools/truth-engine/github-approval.cjs" target="_blank" rel="noopener noreferrer">Inspect trusted human-approval rules ↗</a></p>';
}

function renderVerdictAudit(){
 const h=$('verdict-monitor');if(!h||!libraryIndex||!ledger)return;
 const audit=libraryIndex.verdictAudit||{},works=libraryIndex.works||[],logs=audit.changeLog||[];
 const reviewed=works.filter(w=>w.access==='abstract-reviewed').length;
 const finished=works.filter(w=>w.access==='fully-studied').length;
 const mean=ledger.entries.reduce((sum,e)=>sum+Number(e.impact||0),0);
 const changed=logs.filter(v=>Number(v.delta||0)!==0&&v.status!=='methodology-reset').length;
 const movements=(ledger.scientificMovements||[]).slice().reverse().map(m=>{
 const item=ledger.entries.find(e=>e.id===m.ledgerId);
 return '<article class="wl-movement"><p class="micro">'+html(m.date)+' · '+html(m.id)+' · EXPERIMENTAL MODEL CONSTRAINT</p><h3>'+html(m.claim)+'</h3><p>'+html(m.from)+' → '+html(m.to)+'</p><p class="caption">What changed: '+html(m.modelDirection)+'. Central-history implication: '+html(m.centralHistoryDirection)+'.</p>'+(item?'<a href="'+html(trustedUrl(item.url))+'" target="_blank" rel="noopener noreferrer">Original experiment ↗</a>':'')+'</article>';
 }).join('');
 h.innerHTML='<div class="verdict-head"><div><span class="kicker">A TRANSPARENT VERDICT · VERSIONED HISTORY</span><h2>Why the compass moves — or does not</h2></div><span class="verdict-badge">'+html(ledger.editorialMeter.score)+'/100 · '+(changed?'SCIENTIFIC REVISION':'NEUTRAL EDITORIAL ANCHOR')+'</span></div>'+
 '<p>The old 59 had no justified +9 tilt toward multiple histories. VC-010 resets it to a neutral editorial anchor of 50, never 50% odds. Specific experiments can still change physical-model conclusions below, even when the Everett-versus-Bohm ontological question remains open.</p>'+
 '<div class="verdict-metrics"><div><strong>'+works.length+'</strong><small>CATALOGUED WORKS · REAL REFERENCES</small></div><div><strong>'+reviewed+' abstract checks / '+finished+' full studies</strong><small>DOCUMENTED STUDY DEPTH</small></div><div><strong>'+(mean>0?'+':'')+mean+'</strong><small>CENTRAL-HISTORY IMPACT; CLAIM ADVANCES BELOW</small></div></div>'+
 '<p class="micro">CURRENT SCIENTIFIC JUDGMENT</p><p>'+html(audit.empiricalConclusion||ledger.editorialMeter.empiricalVerdict)+'</p>'+
 '<section class="wl-model-movements" aria-label="Scientific findings that advanced"><h3>Where science has actually moved</h3><p>Model-specific measurements do constrain real physical hypotheses, without proving the number of Everett worlds.</p>'+movements+'</section><div class="verdict-history">'+logs.slice().reverse().map(log=>{
 const sourceLinks=(log.sourceIds||[]).slice(0,7).map(id=>{
  const w=works.find(x=>x.id===id);return w?'<a href="'+html(trustedUrl(w.url))+'" target="_blank" rel="noopener noreferrer">'+html(w.id)+' ↗</a>':'<span>'+html(id)+'</span>';
 }).join(' · ');
 return '<article><div class="micro">'+html(log.date)+' · '+html(log.id)+' · '+(log.status==='methodology-reset'?'BASELINE REPAIR · NOT EXPERIMENTAL EVIDENCE':Number(log.delta||0)===0?'CENTRAL VERDICT UNCHANGED':'SCIENTIFIC VERDICT REVISED')+' · '+html(log.oldScore)+' → '+html(log.newScore)+'</div><p>'+html(log.trigger||'Research reassessment')+': '+html(log.justification||'No explanation recorded.')+'</p><div>'+sourceLinks+'</div></article>';
 }).join('')+'</div><p class="caption">What can move next? A review that supplies a distinguishing prediction, actual relevant measurements, uncertainty and independent comparison — documented in the versioned audit. Otherwise the meter stays put for an explicit reason.</p>';
}
function renderCSLComparison(){
 const host=$('csl-exclusion-view');if(!host||!comparison||!libraryIndex)return;
 const works=libraryIndex.works||[];
 const rows=(comparison.channels||[]).map(c=>{
  const paper=works.find(w=>w.id===c.workId);
  const value=Number.isFinite(c.lambdaUpper)?Number(c.lambdaUpper).toExponential(3)+' s⁻¹':'No independently reconstructed numerical curve';
  return '<tr><td><a href="'+html(trustedUrl(paper?.url||'#ledger'))+'" target="_blank" rel="noopener noreferrer">'+html(c.id)+' ↗</a><small>'+html(c.observable)+'</small></td><td><strong>'+html(value)+'</strong><small>'+html(c.statistic)+'</small></td><td>'+html(c.status)+'<small>'+html(c.validity)+'</small></td></tr>';
 }).join('');
 host.innerHTML='<div class="micro">REPRODUCIBLE EXPERIMENT · MODEL-CONDITIONAL LIMITS</div>'+
 '<h2>Same CSL coordinates, different experimental evidence</h2>'+
 '<p>At correlation length r<sub>C</sub> = 10⁻⁷ m, compare upper limits on the nucleon-normalized, white-noise CSL rate λ. Two numerical limits are independently reconstructed from source-published inputs; the XENON value is a published-profile-likelihood bound converted to λ. Molecule and LISA rotation response curves are not fabricated.</p>'+
 '<div class="wl-csl-scroll" role="region" tabindex="0" aria-label="Five experiments with CSL rate bounds and statistical definitions"><table><thead><tr><th>Source experiment</th><th>Upper λ at 10⁻⁷ m</th><th>Inference method and limitations</th></tr></thead><tbody>'+rows+'</tbody></table></div>'+
 '<p class="caption">These are NOT one joint 90% probability or a score for how many histories exist: Ge uses a 95% Bayesian posterior with background model, XENON a 90% likelihood limit, LISA a conservative noise allocation, and the other source geometries remain incompletely reconstructed.</p>'+
 '<p><a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/research/csl-bound-reconstruction-S002-R008.md" target="_blank" rel="noopener noreferrer">See full derivations, numerical tests and the corrected +1 source terms ↗</a> · <a href="data/csl-exclusion-comparison.json" target="_blank" rel="noopener noreferrer">Inspect machine-readable experimental inputs ↗</a></p>';
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
 if(['physics','quantum-computing','chemistry'].includes(d.slug) && research.modelComparison?.rows?.length){
  const m=research.modelComparison;
  const modelRows=m.rows.map(r=>'<tr><th scope="row">'+html(r.model)+'</th><td>'+html(r.ontology)+'</td><td>'+html(r.observable)+'</td><td>'+html(r.sameAs)+'</td><td>'+html(r.difference)+'</td><td>'+html(r.status)+'</td></tr>').join('');
  const src=[...new Set(m.rows.flatMap(r=>r.sourceIds||[]))].map(id=>{const w=libraryIndex.works.find(v=>v.id===id);return w?'<a target="_blank" rel="noopener noreferrer" href="'+html(trustedUrl(w.url))+'">'+html(id)+' ↗</a>':''}).join(' · ');
  $('lab-source-list').insertAdjacentHTML('beforebegin','<section class="worldline-model-room" aria-labelledby="model-room-heading"><span class="kicker">S-002 · MODEL PREDICTIONS · '+html(m.version)+'</span><h3 id="model-room-heading">Everett, Bohm and GRW/CSL: same observations or different?</h3><p>Different physical ontologies do not automatically yield different observed data. Read the predictions and precise assumptions, not probabilities that worlds exist.</p><div class="worldline-model-scroll" role="region" tabindex="0" aria-label="Scrollable model prediction comparison"><table class="worldline-model-table"><caption>Model predictions and current evidentiary limitations. Swipe horizontally on mobile.</caption><thead><tr><th>Model</th><th>Ontology</th><th>Measurable prediction</th><th>When identical</th><th>Potential discriminator</th><th>Evidence status</th></tr></thead><tbody>'+modelRows+'</tbody></table></div><p class="caption">Analytic toy only, not experimental data: γ=0.2 yields P(+)=0.600000 (unitary); one specified independent-hit GRW toy gives P(+)=0.59990005. A real apparatus needs calibrated backgrounds and composite geometry; no branch is counted.</p><p class="worldline-model-links"><a target="_blank" rel="noopener noreferrer" href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/'+html(m.researchReport)+'">Full experimental prediction matrix ↗</a> · <a target="_blank" rel="noopener noreferrer" href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/'+html(m.fullStudyReport)+'">Three full original-source studies ↗</a></p><p class="micro">Source IDs: '+src+'</p></section>');
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
 if(j.fullReport&&/^research\/[a-z0-9-]+\.md$/.test(j.fullReport)){parts+='<p class="research-review-link"><a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/'+html(j.fullReport)+'" target="_blank" rel="noopener noreferrer">Read the complete source-based research report and methods ↗</a></p>';}
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
 const targets=['data/ledger.json','data/research.json','data/sessions.json','data/library.json','data/csl-exclusion-comparison.json','data/page-freshness.json','data/discriminator-program.json','data/truth-engine.json'];
 try{
  const res=await Promise.all(targets.map(u=>fetch(u,{cache:'no-store'})));
  if(res.some(r=>!r.ok))throw Error('Missing source JSON');
  const data=await Promise.all(res.map(r=>r.json()));
  [ledger,research,sessions,libraryIndex,comparison,pageFreshness,questionGates,truthEngine]=data;
  compass(ledger.editorialMeter.score);
  if($('hero-count'))$('hero-count').textContent=String(ledger.entries.length);
  renderLedger();renderVerdictAudit();renderTruthEngine();renderCSLComparison();renderQuestionGates();renderRoundBanner();renderMilestones();renderDisciplines();renderJournal();renderSessions();
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