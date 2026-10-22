#!/usr/bin/env node
'use strict';
// Published Figure 2 six means/error bars: Knee et al. 2016, Nature Communications
// 7:13253, Fig 2c, DOI 10.1038/ncomms13253. No raw event fit.
const assert=require('node:assert/strict');
const input={
  g:{off:[0.053870,0.000305],on:[0.027258,0.000314]},
  e:{off:[0.055234,0.000422],on:[0.071118,0.000439]},
  rho:{off:[0.123592,0.000423],on:[0.033804,0.000443]}
};
function row(r){return {delta:r.on[0]-r.off[0],sigma:Math.hypot(r.on[1],r.off[1])}}
function reproduce(){
 const g=row(input.g),e=row(input.e),rho=row(input.rho);
 const gap=rho.delta-Math.min(g.delta,e.delta);
 const sigma=Math.hypot(rho.sigma,(g.delta<e.delta?g:e).sigma);
 const z=gap/sigma;
 const lambda=1e-16,N=1e23;
 return {g,e,rho,gap,sigma,z,bound:[Math.min(g.delta,e.delta),Math.max(g.delta,e.delta)],grwToy:{ratePerParticle:lambda,referenceLocalizationMeters:1e-7,constituents:N,ratePerSecond:lambda*N,meanInterHitSeconds:1/(lambda*N),singleParticleMeanYears:1/(lambda*365.25*86400)},qualifier:'Eq7 conditional experimental model-class exclusion; not an Everett branch observation or a discrete-GRW detector-likelihood reconstruction'};
}
if(require.main===module){
 const r=reproduce();
 assert.ok(Math.abs(r.g.delta+0.026612)<1e-12);
 assert.ok(Math.abs(r.e.delta-0.015884)<1e-12);
 assert.ok(Math.abs(r.rho.delta+0.089788)<1e-12);
 assert.ok(Math.abs(r.gap+0.063176)<1e-12);
 assert.ok(Math.abs(r.z+83.9146113203905)<1e-9);
 assert.ok(r.rho.delta<r.bound[0]);
 assert.ok(Math.abs(r.grwToy.ratePerSecond/1e7-1)<1e-12);
 assert.ok(Math.abs(r.grwToy.meanInterHitSeconds-1e-7)<1e-20);
 console.log('PASS entire Fig2 rounded mean+error reconstruction / strongest nearest g control; conditional z='+r.z);
 console.log('PASS GRW benchmark N*lambda amplification (idealized model only)');
 console.log(JSON.stringify(r,null,2));
}
module.exports={input,reproduce};
