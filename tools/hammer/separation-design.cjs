#!/usr/bin/env node
'use strict';
// Generic spatial-localization-inspired toy model. Not an exact CSL prediction.
// Environmental sensitivity ~ (d/r)^2; saturating intrinsic localization response
// ~ 1-exp[-(d/r)^2/4]. Both need derivation/calibration before mapping to any experiment.
const ham=require('./identifiability.cjs');
function arm(x,shots,baseline=.98){
 if(!Number.isFinite(x)||x<=0||x>20)throw Error('dimensionless separation must be 0 < x <= 20');
 const a=x*x,b=-Math.expm1(-x*x/4);
 return {id:'sep-'+x.toFixed(4).replace('.','p'),environment:a,intrinsic:b,time:1,shots,baseline};
}
function config(x,y,shots=1000,rates={gamma:.09,lambda:.12}){
 return {schema:'worldline-hammer-two-rate/v1',evidenceClass:'synthetic-theory-only',
  gamma:rates.gamma,lambda:rates.lambda,arms:[{...arm(x,shots),id:'arm-one'},{...arm(y,shots),id:'arm-two'}]};
}
function scan(options={}){
 const xs=options.separations||Array.from({length:30},(_,i)=>Number(((i+1)*.15).toFixed(4)));
 const shots=options.shots??1000;
 const rates=options.rates??{gamma:.09,lambda:.12};
 if(!Array.isArray(xs)||xs.length<2||xs.length>100)throw Error('2..100 candidate separations required');
 let best=null,nonidentifiable=0,examined=0;
 for(let i=0;i<xs.length;i++)for(let j=i+1;j<xs.length;j++){
  const c=config(xs[i],xs[j],shots,rates),fit=ham.fisher(c);examined++;
  if(fit.status==='NONIDENTIFIABLE'){nonidentifiable++;continue;}
  const candidate={separations:[xs[i],xs[j]],lambdaStandardErrorFloor:fit.lambdaStandardErrorFloor,
   determinant:ham.analyticTwoArmDeterminant(c),relativeDeterminant:fit.relativeDeterminant,
   lambdaVarianceLowerBound:fit.lambdaVarianceLowerBound};
  if(!best||candidate.lambdaStandardErrorFloor<best.lambdaStandardErrorFloor)best=candidate;
 }
 return {schema:'worldline-hammer-separation-design/v1',method:'grid-search conditional asymptotic Fisher lower bound',
  assumedModel:'V=V0 exp[-gamma*(d/r)^2 - lambda*(1-exp(-(d/r)^2/4))], t=1 normalized',
  ratesAreToy:true,shotsPerArm:shots,examined,nonidentifiable,best,
  nearDegenerate:ham.fisher(config(.15,.30,shots,rates)),
  sourceDepth:'literature-informed conceptual shape, NOT calibrated CSL geometry or measured rates',
  empiricalFinding:false,ledgerScoreChange:0};
}
module.exports={arm,config,scan};
if(require.main===module)console.log(JSON.stringify(scan(),null,2));
