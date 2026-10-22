/* HAMMER v0.2 — recursive research-question fusion, epistemic guardrails and falsifier search.
   Reuses vetted HAMMER theory core; this is a deterministic reasoning scaffold,
   not a general intelligence, experiment, publication, or evidence-based score revision. */
(function(root,factory){
 'use strict';
 const math=typeof module==='object'&&module.exports?require('./hammer-core.js'):root.WorldlineHammer;
 const api=factory(math);
 if(typeof module==='object'&&module.exports)module.exports=api;
 else root.WorldlineHammerDiscovery=api;
})(typeof globalThis!=='undefined'?globalThis:this,function(core){
 'use strict';
 const fail=message=>{throw Error('HAMMER Discovery: '+message)};
 const assert=(x,message)=>{if(!x)fail(message)};
 const maxOutcomes=64,maxVariants=36;
 const safeId=x=>typeof x==='string'&&/^H[FMP]-\d{3,}$/.test(x);
 const multiply=(p,q)=>p.flatMap(x=>q.map(y=>x*y));
 function validate(frontier,library){
  core.validate(library);
  assert(frontier&&frontier.schema==='worldline-hammer-frontier/v1','invalid schema');
  assert(frontier.evidenceClass==='synthetic-theory-only','unexpected measured evidence');
  assert(Array.isArray(frontier.missions)&&frontier.missions.length>0,'missions missing');
  const ids=new Set(),known=new Set(library.designs.map(d=>d.id));
  for(const m of frontier.missions){
   assert(safeId(m.id)&&!ids.has(m.id),'duplicate or invalid mission ID');ids.add(m.id);
   assert(known.has(m.left)&&known.has(m.right),'mission has unknown source design');
   assert(m.independence==='conditional-assumption-not-verified','missing unverified independence label');
   assert(typeof m.question==='string'&&m.question.length>=40,'missing reasoned question');
   assert(typeof m.falsifier==='string'&&m.falsifier.length>=40,'missing proposed falsifier');
   assert(typeof m.confounder==='string'&&m.confounder.length>=30,'missing confounder challenge');
   assert(['fuse','veto'].includes(m.action),'unsupported research action');
  }
  return frontier;
 }
 function jointDesign(a,b,mission){
  if(a.impactScope!==b.impactScope)fail('incompatible scientific scope: ontology and dynamics must not be conflated');
  const aIds=a.models.map(m=>m.id),bIds=b.models.map(m=>m.id);
  if(aIds.length!==2||aIds.some((x,i)=>x!==bIds[i]))fail('incompatible rival physical models: cannot transfer one claim as evidence for another');
  if(a.outcomes.length*b.outcomes.length>maxOutcomes)fail('outcome-space explosion; explicitly coarse-grain with documented mapping');
  const models=a.models.map((ma,i)=>{
   const mb=b.models[i];
   if(ma.variants.length*mb.variants.length>maxVariants)fail('nuisance-state explosion; use a preregistered bounded subset');
   return {id:ma.id,label:ma.label,variants:ma.variants.flatMap(va=>mb.variants.map(vb=>({
    assumptions:'['+a.id+'] '+va.assumptions+'; ['+b.id+'] '+vb.assumptions+' (independence hypothesized)',
    p:multiply(va.p,vb.p)
   })))};
  });
  return {id:mission.id,title:'Fusion: '+a.title+' + '+b.title,question:mission.question,
   researchReport:a.researchReport,impactScope:a.impactScope,evidenceClass:'synthetic-theory-only',
   costUnits:a.costUnits+b.costUnits,outcomes:a.outcomes.flatMap(x=>b.outcomes.map(y=>x+' + '+y)),
   sources:[...new Set([...a.sources,...b.sources])],
   caveats:[...a.caveats,...b.caveats,'Hypothesis: conditional independence of outcomes given model and nuisance; not verified.','Failure of physical controls or shared drift invalidates product-form fusion.'],
   models};
 }
 function evaluateMission(m,byId){
  const a=byId.get(m.left),b=byId.get(m.right);
  const trace=[{step:'decompose',result:'Question A '+a.id+'; question B '+b.id},
   {step:'challenge',result:m.confounder}];
  if(m.action==='veto'){
   let reason;
   try{jointDesign(a,b,m);reason='owner-declared veto despite compatible mathematical form';}
   catch(e){reason=e.message;}
   return {id:m.id,question:m.question,status:'VETO',reason,trace,proposedLedgerScoreChange:0,
    verdictImpact:'NONE',hypothesisNovelty:'UNASSESSED'};
  }
  try{
   const fused=jointDesign(a,b,m);
   const result=core.analyze(fused),left=core.analyze(a),right=core.analyze(b);
   const informationGain=result.robustJSBits-Math.max(left.robustJSBits,right.robustJSBits);
   const safeGain=informationGain<1e-10?0:informationGain;
   trace.push({step:'combine',result:'Conditional product of both outcome distributions; no correlation data supplied'});
   trace.push({step:'calculate',result:'Nominal JSD '+result.nominalJSBits.toFixed(6)+' bits; worst-case JSD '+result.robustJSBits.toFixed(6)+' bits'});
   trace.push({step:'falsify',result:m.falsifier});
   const status=result.robustJSBits===0?'NO_IDENTIFIABLE_WEDGE':'CONDITIONAL_WEDGE';
   return {id:m.id,question:m.question,components:[a.id,b.id],status,scope:a.impactScope,
    nominalJSBits:result.nominalJSBits,robustJSBits:result.robustJSBits,
    improvementOverBestComponentBits:safeGain,planningPriority:result.robustInformationPerCost,
    falsifier:m.falsifier,confounder:m.confounder,nuisanceCounterexample:result.worstCase,
    trace,independenceUnverified:true,hypothesisNovelty:'UNASSESSED',proposedLedgerScoreChange:0,
    verdictImpact:'NONE',sourceIds:fused.sources,
    caution:'Theory-only product assumptions; joint correlations, actual rates, calibration, literature novelty and physical feasibility not established.'};
  }catch(e){
   return {id:m.id,question:m.question,status:'VETO',reason:e.message,trace,proposedLedgerScoreChange:0,
    verdictImpact:'NONE',hypothesisNovelty:'UNASSESSED'};
  }
 }
 // A mathematical firewall: identical operational distributions remain identical
 // after shared classical processing. This DOES NOT prove physics models identical.
 function postprocess(p,channel){
  assert(Array.isArray(p)&&p.length>0,'missing input probabilities');
  assert(Array.isArray(channel)&&channel.length===p.length,'channel rows');
  const n=channel[0]?.length;
  assert(Number.isSafeInteger(n)&&n>0&&n<=maxOutcomes,'channel output size');
  const output=Array(n).fill(0);
  for(let i=0;i<p.length;i++){
   assert(Number.isFinite(p[i])&&p[i]>=0,'input probability');
   assert(Array.isArray(channel[i])&&channel[i].length===n,'channel row size');
   assert(channel[i].every(v=>Number.isFinite(v)&&v>=0),'channel stochasticity');
   assert(Math.abs(channel[i].reduce((s,x)=>s+x,0)-1)<1e-10,'unnormalized channel');
   for(let j=0;j<n;j++)output[j]+=p[i]*channel[i][j];
  }
  assert(Math.abs(p.reduce((s,x)=>s+x,0)-1)<1e-10,'input distribution not normalized');
  return output;
 }
 function discover(frontier,library){
  validate(frontier,library);
  const byId=new Map(library.designs.map(d=>[d.id,d]));
  const missions=frontier.missions.map(m=>evaluateMission(m,byId));
  const best=missions.filter(x=>x.status==='CONDITIONAL_WEDGE')
   .sort((a,b)=>b.planningPriority-a.planningPriority||a.id.localeCompare(b.id));
  return {schema:'worldline-hammer-discoveries/v1',mode:'theory-only',
   researchQuestion:'One physically real history or multiple physically real branches?',
   missions,topTheoryCandidateId:best[0]?.id||null,
   candidateCount:best.length,vetoCount:missions.filter(x=>x.status==='VETO').length,
   originalDiscoveryCount:0,actualMeasurementsUsed:0,actualAIPanelsRun:0,
   scienceVerdict:'UNRESOLVED',proposedLedgerScoreChange:0,
   note:'HAMMER recombines question structures and hunts mathematical counterexamples. This does not establish novelty, physical feasibility, causal independence, measured data, AGI or actual ontology.'};
 }
 return Object.freeze({validate,jointDesign,evaluateMission,postprocess,discover});
});