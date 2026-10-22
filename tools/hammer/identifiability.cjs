#!/usr/bin/env node
'use strict';
/* HAMMER Scientific Workbench v0.3
 * Analytic Fisher identifiability for TWO specified damping mechanisms.
 * Generic rate-sensitivity model, NOT a calibrated CSL master equation.
 * No experimental results, no automated Truth Compass movement.
 */
const EPS=1e-11;
function requireCondition(test,msg){if(!test)throw Error('HAMMER identifiability: '+msg)}
function finite(x){return typeof x==='number'&&Number.isFinite(x)}
function validate(config){
 requireCondition(config&&config.schema==='worldline-hammer-two-rate/v1','schema');
 requireCondition(config.evidenceClass==='synthetic-theory-only','measured-data claims are not accepted by this module');
 requireCondition(finite(config.gamma)&&config.gamma>0&&finite(config.lambda)&&config.lambda>0,'positive toy rates');
 requireCondition(Array.isArray(config.arms)&&config.arms.length>=2&&config.arms.length<=10,'need 2–10 arms');
 const names=new Set();
 for(const x of config.arms){
  requireCondition(x&&typeof x.id==='string'&&/^[A-Za-z0-9-]{2,30}$/.test(x.id)&&!names.has(x.id),'invalid or duplicate arm');
  names.add(x.id);
  requireCondition(finite(x.environment)&&x.environment>=0&&finite(x.intrinsic)&&x.intrinsic>=0&&(x.environment+x.intrinsic)>0,'nonnegative distinct sensitivities');
  requireCondition(finite(x.time)&&x.time>0&&x.time<=1000,'positive time');
  requireCondition(Number.isSafeInteger(x.shots)&&x.shots>0&&x.shots<=1e7,'positive finite integer shot budget');
  requireCondition(finite(x.baseline)&&x.baseline>0&&x.baseline<=1,'known baseline visibility');
 }
 return config;
}
function armPrediction(config,x){
 const rate=config.gamma*x.environment+config.lambda*x.intrinsic;
 const visibility=x.baseline*Math.exp(-x.time*rate);
 requireCondition(visibility>0&&visibility<1-EPS,'visibility must stay in open interior of (0,1)');
 const p=(1+visibility)/2;
 const informationPerShot=x.time*x.time*visibility*visibility/(1-visibility*visibility);
 return {arm:x.id,rate,visibility,positiveProbability:p,informationPerShot,
  derivatives:{gamma:-.5*x.time*x.environment*visibility,lambda:-.5*x.time*x.intrinsic*visibility}};
}
function fisher(config){
 validate(config);
 let gg=0,gl=0,ll=0;
 const predictions=[];
 for(const arm of config.arms){
  const v=armPrediction(config,arm);predictions.push(v);
  const weight=arm.shots*v.informationPerShot;
  gg+=weight*arm.environment*arm.environment;
  gl+=weight*arm.environment*arm.intrinsic;
  ll+=weight*arm.intrinsic*arm.intrinsic;
 }
 const determinant=Math.max(0,gg*ll-gl*gl);
 const relative=gg*ll?determinant/(gg*ll):0;
 const identifiable=gg>0&&ll>0&&relative>1e-10;
 const lambdaVarianceLowerBound=identifiable?gg/determinant:null;
 const gammaVarianceLowerBound=identifiable?ll/determinant:null;
 return {status:identifiable?'LOCALLY_IDENTIFIABLE':'NONIDENTIFIABLE',
  fisher:[[gg,gl],[gl,ll]],determinant,relativeDeterminant:relative,
  lambdaVarianceLowerBound,gammaVarianceLowerBound,
  lambdaStandardErrorFloor:identifiable?Math.sqrt(lambdaVarianceLowerBound):null,
  predictions,scientificScope:'conditional two-rate toy dynamics; no branch ontology',
  interpretation:'Cramer–Rao lower bound at nominal parameters only. Not experimental confidence or significance.',
  ledgerChange:0};
}
function analyticTwoArmDeterminant(config){
 validate(config);
 requireCondition(config.arms.length===2,'exactly two arms needed');
 const [a,b]=config.arms,[p,q]=[armPrediction(config,a),armPrediction(config,b)];
 const cross=a.environment*b.intrinsic-b.environment*a.intrinsic;
 return a.shots*b.shots*p.informationPerShot*q.informationPerShot*cross*cross;
}
function optimize(config,total){
 validate(config);
 requireCondition(config.arms.length===2,'allocation search requires two arms');
 requireCondition(Number.isSafeInteger(total)&&total>=4&&total<=200000,'2-arm shot budget 4..200000');
 let best=null;
 // Exhaustive finite integer design search; no black-box AI claims.
 for(let n=1;n<total;n++){
  const arms=[{...config.arms[0],shots:n},{...config.arms[1],shots:total-n}];
  const analysis=fisher({...config,arms});
  if(analysis.status!=='LOCALLY_IDENTIFIABLE')continue;
  const x={shots:[n,total-n],variance:analysis.lambdaVarianceLowerBound};
  if(!best||x.variance<best.variance)best=x;
 }
 return {objective:'minimum conditional lambda CRLB, fixed known response model',
  best,budget:total,ledgerChange:0};
}
function predictCounts(config){
 const f=fisher(config);
 return {evidenceClass:'synthetic-theory-only',
  records:config.arms.map((x,i)=>({
   arm:x.id,shots:x.shots,
   expectedPositive:x.shots*f.predictions[i].positiveProbability,
   roundedSyntheticPositive:Math.round(x.shots*f.predictions[i].positiveProbability)
  })),
  caution:'Synthetic rounded counts are not observed detector measurements.'};
}
function logLikelihood(config,records){
 validate(config);
 requireCondition(Array.isArray(records)&&records.length===config.arms.length,'one count per arm');
 let log=0;
 for(let i=0;i<config.arms.length;i++){
  const {shots}=config.arms[i],x=records[i];
  requireCondition(x.arm===config.arms[i].id&&x.shots===shots&&Number.isSafeInteger(x.positive)&&x.positive>=0&&x.positive<=shots,'count mismatch');
  const p=armPrediction(config,config.arms[i]).positiveProbability;
  log+=x.positive*Math.log(p)+(shots-x.positive)*Math.log1p(-p);
 }
 return log; // binomial coefficients omitted; valid only for comparing same recorded trial counts
}
function gridFit(config,records,limits){
 validate(config);
 requireCondition(limits&&limits.gamma&&limits.lambda,'bounded grid limits');
 const valid=b=>Array.isArray(b)&&b.length===2&&b.every(x=>finite(x)&&x>0)&&b[0]<b[1];
 requireCondition(valid(limits.gamma)&&valid(limits.lambda),'positive finite parameter limits');
 const steps=limits.steps??50;
 requireCondition(Number.isSafeInteger(steps)&&steps>=2&&steps<=150,'grid size 2..150');
 let best=null;
 for(let i=0;i<=steps;i++)for(let j=0;j<=steps;j++){
  const gamma=limits.gamma[0]+(limits.gamma[1]-limits.gamma[0])*i/steps;
  const lambda=limits.lambda[0]+(limits.lambda[1]-limits.lambda[0])*j/steps;
  const candidate={...config,gamma,lambda},score=logLikelihood(candidate,records);
  if(!best||score>best.logLikelihood)best={gamma,lambda,logLikelihood:score};
 }
 return {best,evidenceClass:'input-counts-unverified',
  caveat:'Grid maximum is descriptive; does not certify measurement provenance, likelihood accuracy, nuisance priors or novelty.',
  ledgerChange:0};
}
const example={schema:'worldline-hammer-two-rate/v1',evidenceClass:'synthetic-theory-only',
 gamma:.20,lambda:.10,
 arms:[{id:'recovery',environment:1,intrinsic:1,time:1,shots:1000,baseline:1},
       {id:'reference',environment:2,intrinsic:.5,time:1,shots:1000,baseline:1}]};
module.exports={validate,armPrediction,fisher,analyticTwoArmDeterminant,optimize,predictCounts,logLikelihood,gridFit,example};
if(require.main===module){
 const fixture=example,counts=predictCounts(fixture);
 console.log(JSON.stringify({schema:'worldline-hammer-identifiability/v1',source:'toy mathematical research',
  model:'p_plus=(1+V0*exp[-t*(gamma*a+lambda*b)])/2',
  example:fisher(fixture),analyticDeterminant:analyticTwoArmDeterminant(fixture),
  optimalShots:optimize(fixture,2000),synthetic:counts,
  fitToRoundedSynthetic: gridFit(fixture,counts.records.map(x=>({arm:x.arm,shots:x.shots,positive:x.roundedSyntheticPositive})),
  {gamma:[.02,.4],lambda:[.02,.4],steps:50}),
  empiricalDiscovery:false,reviewedOriginalPhysics:false,truthCompassChange:0},null,2));
}
