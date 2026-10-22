/* HAMMER Forge: read-only research-design laboratory. No browser writes, no AI calls or empirical-scoring authority. */
(function(){
 'use strict';
 const root=document.getElementById('hammer-forge');if(!root)return;
 const math=window.WorldlineHammer;
 const esc=v=>String(v==null?'':v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const fmt=x=>Number.isFinite(x)?x.toFixed(5):'—';
 async function start(){
  try{
   if(!math)throw Error('Mathematical HAMMER core unavailable');
   const r=await fetch('data/hammer.json',{cache:'no-store'});if(!r.ok)throw Error('HAMMER model file unavailable');
   const data=math.validate(await r.json()),report=math.forge(data);
   root.innerHTML='<div class="hammer-intro"><div class="kicker">HAMMER / THEORY FORGE / v0.1</div>'+
    '<h2>Find the experiment. Attack the theory. Earn the evidence.</h2>'+
    '<p>Compare rival predictions, mutate their nuisance assumptions and find whether an apparent discovery survives its strongest counterexample. These are <strong>synthetic models, not observations or AGI discoveries.</strong></p></div>'+
    '<div class="hammer-controls"><label for="hammer-design">Research challenge</label><select id="hammer-design">'+
    data.designs.map(d=>'<option value="'+esc(d.id)+'">'+esc(d.id+' · '+d.title)+'</option>').join('')+'</select></div>'+
    '<div id="hammer-workbench" aria-live="polite"></div>'+
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
   select.addEventListener('change',update);update();
  }catch(e){root.textContent='HAMMER model unavailable: '+e.message+'. Consult the repository for the versioned theory packets.';}
 }
 start();
})();
