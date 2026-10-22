#!/usr/bin/env node
'use strict';
// Independent numeric reconstruction of reported aggregate-input bounds.
// Main-source summary data only. Not raw spectra, nuisance fits, or full experiments.
const hbar=1.054571817e-34,m0=1.67492749804e-27;
const lanczos=[.99999999999980993,676.5203681218851,-1259.1392167224028,771.32342877765313,-176.61502916214059,12.507343278686905,-.13857109526572012,9.984369578019572e-6,1.5056327351493116e-7];
function logGamma(z){if(z<.5)return Math.log(Math.PI)-Math.log(Math.sin(Math.PI*z))-logGamma(1-z);z-=1;let s=lanczos[0];for(let i=1;i<lanczos.length;i++)s+=lanczos[i]/(z+i);const t=z+7.5;return .5*Math.log(2*Math.PI)+(z+.5)*Math.log(t)-t+Math.log(s);}
function gammaCdf(a,x){
 if(x<=0)return 0;
 const k=Math.exp(a*Math.log(x)-x-logGamma(a));
 if(x<a+1){let d=1/a,s=d;for(let n=1;n<2000;n++){d*=x/(a+n);s+=d;if(Math.abs(d)<Math.abs(s)*1e-15)break;}return Math.min(1,Math.max(0,s*k));}
 let b=x+1-a,c=1e300,d=1/b,g=d;
 for(let n=1;n<2000;n++){const an=-n*(n-a);b+=2;d=an*d+b;if(Math.abs(d)<1e-300)d=1e-300;c=b+an/c;if(Math.abs(c)<1e-300)c=1e-300;d=1/d;const delta=d*c;g*=delta;if(Math.abs(delta-1)<2e-14)break;}
 return Math.min(1,Math.max(0,1-k*g));
}
function gammaQuantile(a,p){if(p<=0||p>=1)throw Error('p not in (0,1)');let lo=0,hi=Math.max(2*a,a+20*Math.sqrt(a));for(let i=0;i<110;i++){const mid=(lo+hi)/2;if(gammaCdf(a,mid)<p)lo=mid;else hi=mid;}return (lo+hi)/2;}
function germanium({observed=576,background=506,k=2.0986,r=1e-7,p=.95,conditionOnPositive=false}={}){
 const priorMassBelowBackground=gammaCdf(observed+1,background+2); // paper Eq.11: Lambda_b=z_b+1 AND Lambda_s=z_s+1
 const pp=conditionOnPositive?priorMassBelowBackground+(1-priorMassBelowBackground)*p:p;
 const totalUpper=gammaQuantile(observed+1,pp),signalUpper=totalUpper-(background+2);
 return {r,p,observed,background,signalCoefficient:k,totalUpper,signalUpper,lambdaUpper:signalUpper*r*r/k,posteriorBelowBackground:priorMassBelowBackground,conditionOnPositive};
}
function lisa({r=1e-7,noisePSD=.075e-30,rho=19881,mass=1.928,side=.046}={}){
 return {r,noisePSD,rho,mass,side,lambdaUpper:(m0*m0/(32*Math.PI*hbar*hbar*r*r))*((mass/rho)**2)/(side*side)*noisePSD};
}
function xenon(r){return {r,lambdaUpper:3e-3*r*r,method:'published 90%-CL limit; no raw likelihood reproduction'};}
function run(){
 const referenceRadius=1e-7,baseGe=germanium(),baseLi=lisa();
 const grid=[1e-8,1e-7,1e-6,1e-5].map(r=>({r,xenon90lambda:xenon(r).lambdaUpper,germanium95lambda:r<=1e-6?germanium({r}).lambdaUpper:null,lisaConditionalLambda:lisa({r}).lambdaUpper,scope:'white-noise mass-proportional CSL only; separate confidence rules'}));
 return {schema:'worldline-csl-comparison/v1',referenceRadius,reproductions:{germanium95:baseGe,germanium95PhysicalPrior:germanium({conditionOnPositive:true}),lisaNew:lisa(),lisaHistorical:lisa({noisePSD:(5.2e-15)**2})},xenon90:xenon(referenceRadius),grid,limits:{germanium:'Published 95% Bayesian credible bound under fixed simulated background',lisa:'Conservative acceleration PSD uncertainty attribution, not a 90%/95% confidence limit',xenon:'Published profile-likelihood 90% confidence bound, not reconstructed',molecule:'Published coherence/decoherence response but no reproducible lambda curve from available event-level data',rotation:'Published geometry-dependent Fig.2; no exact source-tabulated lambda curve',combinations:'No pseudo-joint likelihood: inputs, datasets and model conventions remain distinct'}};
}
if(require.main===module)console.log(JSON.stringify(run(),null,2));
module.exports={gammaCdf,gammaQuantile,germanium,lisa,xenon,run};
