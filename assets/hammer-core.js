/* HAMMER v0.1 — Hypothesis Adversarial Mapping, Measurement & Evidence Refinement.
   Shared pure mathematical core for Node CI and read-only public research UI.
   Computed values are experiment DESIGN metrics, never measured evidence. */
(function(root,factory){
 'use strict';
 const api=factory();
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.WorldlineHammer=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(){
 'use strict';
 const EPS=1e-11;
 function invariant(ok,message){if(!ok)throw Error('HAMMER: '+message)}
 function distribution(p,n,context){
  invariant(Array.isArray(p)&&p.length===n,context+' outcome count');
  invariant(p.every(x=>typeof x==='number'&&Number.isFinite(x)&&x>=0&&x<=1),context+' invalid probability');
  invariant(Math.abs(p.reduce((a,b)=>a+b,0)-1)<1e-9,context+' distribution not normalized');
 }
 function validate(data){
  invariant(data&&data.schema==='worldline-hammer/v1','schema');
  invariant(data.mode==='theory-only','only theory-only phase is supported');
  invariant(Array.isArray(data.designs)&&data.designs.length>0,'missing designs');
  const ids=new Set();
  for(const d of data.designs){
   invariant(/^HM-[0-9]{3,}$/.test(d.id)&&!ids.has(d.id),'invalid/duplicate design ID');ids.add(d.id);
   invariant(typeof d.question==='string'&&d.question.length>=30,'specific research question');
   invariant(typeof d.title==='string'&&d.title.length>=8,'named experiment');
   invariant(typeof d.researchReport==='string'&&/^research\/[a-z0-9-]+\.md$/.test(d.researchReport),'safe source report path');
   invariant(d.evidenceClass==='synthetic-theory-only','unverified measurements prohibited');
   invariant(['central-ontology','model-dynamics'].includes(d.impactScope),'impact scope');
   invariant(Array.isArray(d.outcomes)&&d.outcomes.length>=2&&new Set(d.outcomes).size===d.outcomes.length,'distinct outcomes');
   invariant(typeof d.costUnits==='number'&&Number.isFinite(d.costUnits)&&d.costUnits>0,'positive abstract cost');
   invariant(Array.isArray(d.sources)&&d.sources.length>0&&d.sources.every(s=>/^SRC-\d{3,}$/.test(s)),'source IDs');
   invariant(Array.isArray(d.caveats)&&d.caveats.length>0,'scientific caveats');
   invariant(Array.isArray(d.models)&&d.models.length===2&&d.models[0].id!==d.models[1].id,'exactly two rival models');
   for(const m of d.models){
    invariant(typeof m.label==='string'&&m.label.length>4,'named model');
    invariant(Array.isArray(m.variants)&&m.variants.length>0,'model requires nuisance variants');
    for(const v of m.variants){
     invariant(typeof v.assumptions==='string'&&v.assumptions.length>6,'declared nuisance assumptions');
     distribution(v.p,d.outcomes.length,d.id+' '+m.id);
    }
   }
  }
  return data;
 }
 function kl(p,q){let x=0;for(let i=0;i<p.length;i++){if(p[i]===0)continue;if(q[i]===0)return Infinity;x+=p[i]*Math.log2(p[i]/q[i]);}return x;}
 function jsd(p,q){distribution(p,q.length,'JSD p');distribution(q,p.length,'JSD q');const m=p.map((x,i)=>(x+q[i])/2);return Math.max(0,(kl(p,m)+kl(q,m))/2);}
 function tv(p,q){return p.reduce((a,x,i)=>a+Math.abs(x-q[i]),0)/2;}
 function analyze(d){
  const [a,b]=d.models;const nominal=jsd(a.variants[0].p,b.variants[0].p);
  let minimum=Infinity,maximum=0,worst=null;
  for(const x of a.variants)for(const y of b.variants){
   const info=jsd(x.p,y.p);if(info<minimum){minimum=info;worst={left:x.assumptions,right:y.assumptions,variationA:x.p,variationB:y.p,totalVariation:tv(x.p,y.p)};}maximum=Math.max(maximum,info);
  }
  if(minimum<EPS)minimum=0;
  const identifiability=minimum===0?'not-robustly-identifiable':'conditional-prediction-wedge';
  return {id:d.id,title:d.title,scope:d.impactScope,nominalJSBits:nominal,robustJSBits:minimum,maxJSBits:maximum,
   robustInformationPerCost:minimum/d.costUnits,identifiability,worstCase:worst,
   ledgerImpact:'NO_CHANGE',reason:d.impactScope==='central-ontology'?
    'Theory-only predictions and simulated nuisance scenarios do not establish measured evidence about physically real histories.':
    'A potential test of specified dynamics is not, by itself, a test counting physically real histories.'};
 }
 function forge(data){validate(data);
  const results=data.designs.map(analyze).sort((a,b)=>b.robustInformationPerCost-a.robustInformationPerCost||a.id.localeCompare(b.id));
  return {schema:'worldline-hammer-analysis/v1',mode:'theory-only',results,
   recommendedDesignId:results[0].id,centralVerdict:'UNRESOLVED',proposedLedgerScoreChange:0,
   warning:'All outcomes, costs and nuisance variants are declared theory exercises. No original measured data, independent reproduction or authorized AI reviews were collected by this analysis.'};
 }
 return Object.freeze({validate,kl,jsd,tv,analyze,forge});
});