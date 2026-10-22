/* HAMMER Forge: read-only research-design laboratory. No browser writes, no AI calls or empirical-scoring authority. */
(function(){
 'use strict';
 const root=document.getElementById('hammer-forge');if(!root)return;
 const math=window.WorldlineHammer;
 const discovery=window.WorldlineHammerDiscovery;
 const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const fmt=x=>Number.isFinite(x)?x.toFixed(5):'—';
 async function start(){
  try{
   if(!math||!discovery)throw Error('HAMMER mathematical or discovery core unavailable');
   const [r,frontierResponse]=await Promise.all(['data/hammer.json','data/hammer-frontier.json'].map(u=>fetch(u,{cache:'no-store'})));
   if(!r.ok||!frontierResponse.ok)throw Error('HAMMER source or mission model file unavailable');
   const data=math.validate(await r.json()),frontier=discovery.validate(await frontierResponse.json(),data),
     report=math.forge(data),research=discovery.discover(frontier,data),automatic=discovery.search(data,{depth:2,beamWidth:3}),correlations=discovery.correlationWitness();
   root.innerHTML='<div class="hammer-intro"><div class="kicker">HAMMER / RECURSIVE DISCOVERY FORGE / v0.2</div>'+
    '<h2>Find the experiment. Attack the theory. Earn the evidence.</h2>'+
    '<p>Compare rival predictions, mutate their nuisance assumptions and find whether an apparent discovery survives its strongest counterexample. These are <strong>synthetic models, not observations or AGI discoveries.</strong></p></div>'+
    '<div class="hammer-controls"><label for="hammer-design">Research challenge</label><select id="hammer-design">'+
    data.designs.map(d=>'<option value="'+esc(d.id)+'">'+esc(d.id+' · '+d.title)+'</option>').join('')+'</select></div>'+
    '<div id="hammer-workbench" aria-live="polite"></div>'+
    '<section class="hammer-frontier" aria-label="HAMMER cross-question discovery research">'+
    '<div class="kicker">QUESTION FUSION · SELF-CRITIQUE · SCIENTIFIC MEMORY</div>'+
    '<h3>Combine questions. Find a flaw. Generate the next test.</h3>'+
    '<p>HAMMER constructs joint predictions from separate thought experiments, refuses incompatible hypotheses and writes down what could falsify each proposal. All novelty remains unverified.</p>'+
    '<label for="hammer-mission">Research mission</label><select id="hammer-mission">'+
    frontier.missions.map(m=>'<option value="'+esc(m.id)+'">'+esc(m.id+' · '+m.question.slice(0,78))+'</option>').join('')+'</select>'+
    '<div id="hammer-mission-results" aria-live="polite"></div>'+
    '<div class="hammer-auto-memory" aria-label="Bounded autonomous research search">'+
    '<strong>Autonomous question search</strong><p>HAMMER tested '+esc(automatic.explored)+' candidate combinations through two bounded levels, including incompatible theories and nuisance-counterfeits. No new physical data were used.</p>'+
    (automatic.topCandidate?'<p>Top theory-only candidate: <strong>'+esc(automatic.topCandidate.lineage.join(' × '))+'</strong>; worst-case separation '+fmt(automatic.topCandidate.robustJSBits)+' bits under explicitly unverified conditional independence.</p>':'<p>No surviving conditional experiment.</p>')+
    '<p><strong>Hidden-correlation thought experiment:</strong> individual records have '+fmt(correlations.marginals[0].divergenceBits)+' bits of predicted separation, while their hypothetical combined correlations have '+fmt(correlations.jointDivergenceBits)+' bit. '+esc(correlations.lesson)+'</p>'+
    '<p><strong>Generated new research question:</strong> '+esc(correlations.nextQuestion)+'</p>'+
    '<p>Verified novel discoveries: 0 · Scientific verdict: unresolved · Ledger change: 0</p></div></section>'+
    '<p class="hammer-boundary">AI scientific reviewing is intended to be model-led, with source-study and adversarial critique from separate AI models. None have been invoked by this public page. The current score remains editorial 50; no experiment here changes it.</p>'+
    '<p class="hammer-links"><a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/data/hammer.json" target="_blank" rel="noopener noreferrer">Inspect model assumptions ↗</a> · <a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/tools/hammer/ai-panel.cjs" target="_blank" rel="noopener noreferrer">Inspect the AI-review protocol ↗</a></p>';
   const select=root.querySelector('#hammer-design');
   function update(){
    const d=data.designs.find(x=>x.id===select.value)||data.designs[0],summary=report.results.find(x=>x.id===d.id),[a,b]=d.models;
    const host=root.querySelector('#hammer-workbench');
    host.innerHTML='<div class="hammer-summary"><p class="micro">'+esc(d.impactScope.replace('-',' '))+' · theory-only experiment · '+esc(d.id)+'</p>'+
      '<h3>'+esc(d.question)+'</h3>'+
      '<div class="hammer-metrics"><div><strong>'+fmt(summary.nominalJSBits)+'</strong><span>Nominal Jensen–Shannon bits</span></div>'+
      '<div><strong>'+fmt(summary.robustJSBits)+'</strong><span>Adversarial minimum bits</span></div>'+
      '<div><strong>'+esc(summary.identifiability==='not-robustly-identifiable'?'No reliable wedge':'Conditional wedge')+'</strong><span>Predicted discrimination</span></div></div>'+
      '<p>'+esc(summary.reason)+'</p></div>'+
      '<div class="hammer-scenarios"><div><label for="hammer-left">'+esc(a.label)+'</label><select id="hammer-left">'+a.variants.map((v,i)=>'<option value="'+i+'">'+esc(v.assumptions)+'</option>').join('')+'</select></div>'+
      '<div><label for="hammer-right">'+esc(b.label)+'</label><select id="hammer-right">'+b.variants.map((v,i)=>'<option value="'+i+'">'+esc(v.assumptions)+'</option>').join('')+'</select></div></div>'+
      '<div class="hammer-scenario-result" id="hammer-outcome" role="status"></div>'+
      '<div class="hammer-attack"><strong>Strongest adversarial match</strong><p>'+esc(summary.worstCase.left)+' versus '+esc(summary.worstCase.right)+'. Its total-variation distance is '+fmt(summary.worstCase.totalVariation)+'.</p></div>'+
      '<details><summary>Scientific limitations and falsification requirements</summary><ul>'+d.caveats.map(x=>'<li>'+esc(x)+'</li>').join('')+
      '</ul><p>Prior original work: <a href="https://github.com/nikahanghojjati-oss/worldline-lab/blob/main/'+encodeURI(d.researchReport)+'" target="_blank" rel="noopener noreferrer">operational identifiability and controlled synthetic loss ↗</a></p></details>';
    const redraw=()=>{
     const v=a.variants[Number(host.querySelector('#hammer-left').value)].p,w=b.variants[Number(host.querySelector('#hammer-right').value)].p;
     host.querySelector('#hammer-outcome').textContent='Selected assumptions: '+fmt(math.jsd(v,w))+
      ' bits Jensen–Shannon divergence. Model outputs: ['+v.join(', ')+'] versus ['+w.join(', ')+']. Changing a theoretical setting is not a physical observation.';
    };
    host.querySelector('#hammer-left').addEventListener('change',redraw);
    host.querySelector('#hammer-right').addEventListener('change',redraw);
    redraw();
   }
   const mselect=root.querySelector('#hammer-mission');
   function showMission(){
    const m=frontier.missions.find(x=>x.id===mselect.value)||frontier.missions[0],
      r=research.missions.find(x=>x.id===m.id),result=root.querySelector('#hammer-mission-results');
    const rejected=r.status==='VETO',silent=r.status==='NO_IDENTIFIABLE_WEDGE';
    result.innerHTML='<div class="hammer-quest-card"><p class="micro">'+esc(r.status.replaceAll('_',' '))+
     ' · '+esc(m.id)+' · '+(rejected?'Rejected theory fusion':'Joint thought experiment')+'</p>'+
     '<h4>'+esc(m.question)+'</h4>'+
     (rejected?'<p><strong>Scientific category error:</strong> '+esc(r.reason)+'</p>':
      '<p>Predicted nominal JSD: <strong>'+fmt(r.nominalJSBits)+'</strong> bits; adversarial joint JSD: <strong>'+fmt(r.robustJSBits)+'</strong> bits. '+(silent?'Additional data of this kind do not resolve the specified question.':'Conditional test only: independence and nuisance calibration remain unproven.')+'</p>')+
     '<p><strong>What would falsify it?</strong> '+esc(m.falsifier)+'</p>'+
     '<p><strong>What could counterfeit it?</strong> '+esc(m.confounder)+'</p>'+
     '<p><strong>Next research question:</strong> '+esc(r.nextQuestion||m.researchTask)+'</p>'+
     '<p class="micro">Source scenario IDs: '+esc(m.left)+' × '+esc(m.right)+' · No measured data, no verified scientific novelty, no Truth Compass movement.</p></div>';
   }
   mselect.addEventListener('change',showMission);showMission();
   select.addEventListener('change',update);update();
  }catch(e){root.textContent='HAMMER model unavailable: '+e.message+'. Consult the repository for the versioned theory packets.';}
 }
 start();
})();
