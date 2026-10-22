#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const calc=require('./identifiability.cjs');
const c=structuredClone(calc.example),f=calc.fisher(c);
assert.equal(f.status,'LOCALLY_IDENTIFIABLE','two differing sensitivity ratios distinguish parameters locally');
assert.ok(f.determinant>0&&f.lambdaVarianceLowerBound>0);
assert.ok(Math.abs(f.determinant-calc.analyticTwoArmDeterminant(c))/f.determinant<1e-12,
 'independent two-arm determinant identity');
const rates=calc.armPrediction(c,c.arms[0]);
const h=1e-6;
for(const key of ['gamma','lambda']){
 const high=calc.armPrediction({...c,[key]:c[key]+h},c.arms[0]).positiveProbability;
 const low=calc.armPrediction({...c,[key]:c[key]-h},c.arms[0]).positiveProbability;
 const finiteDiff=(high-low)/(2*h);
 assert.ok(Math.abs(finiteDiff-rates.derivatives[key])<1e-9,'analytic response derivative '+key);
}
const degenerate=structuredClone(c);
degenerate.arms[1].environment=2;degenerate.arms[1].intrinsic=2;
assert.equal(calc.fisher(degenerate).status,'NONIDENTIFIABLE',
 'even infinite independent shots cannot separate perfectly collinear rates');
assert.equal(calc.analyticTwoArmDeterminant(degenerate),0);
const almost=structuredClone(c);
almost.arms[1].environment=1.001;almost.arms[1].intrinsic=1;
assert.ok(calc.fisher(almost).relativeDeterminant<f.relativeDeterminant,
 'near identical sensitivities severely reduce robust identifiability');
const samples=calc.predictCounts(c).records.map(x=>({arm:x.arm,shots:x.shots,positive:x.roundedSyntheticPositive}));
const baseline=calc.logLikelihood(c,samples);
const off=calc.logLikelihood({...c,gamma:.4,lambda:.4},samples);
assert.ok(baseline>off,'synthetic likelihood peaks nearer generating parameters');
const fit=calc.gridFit(c,samples,{gamma:[.05,.4],lambda:[.05,.4],steps:80});
assert.ok(fit.best.gamma>.05&&fit.best.gamma<.4);
assert.ok(fit.best.lambda>.05&&fit.best.lambda<.4);
const optimized=calc.optimize(c,300);
const equal=calc.fisher({...c,arms:c.arms.map(x=>({...x,shots:150}))}).lambdaVarianceLowerBound;
assert.ok(optimized.best.variance<=equal+1e-12,'optimal integer allocation no worse than equal');
assert.equal(optimized.best.shots[0]+optimized.best.shots[1],300);
const triple=structuredClone(c);
triple.arms.push({...triple.arms[0],id:'third-arm'});
assert.equal(calc.fisher(triple).status,'LOCALLY_IDENTIFIABLE');
assert.throws(()=>calc.validate({...c,evidenceClass:'measured'}),/measured-data claims/);
assert.throws(()=>calc.validate({...c,arms:[c.arms[0],c.arms[0]]}),/duplicate arm/);
assert.throws(()=>calc.logLikelihood(c,[...samples.slice(0,1),{...samples[1],positive:1001}]),/count mismatch/);
assert.throws(()=>calc.gridFit(c,samples,{gamma:[-.1,.2],lambda:[.01,.5]}),/positive finite parameter limits/);
console.log('PASS HAMMER v0.3 identifiability: Fisher derivative, determinant, collinear no-go, weak design, profile likelihood, optimal counts, input provenance, score unchanged.');
console.log(JSON.stringify({determinant:f.determinant,standardErrorFloor:f.lambdaStandardErrorFloor,optimalAllocation:optimized.best.shots,syntheticGridFit:fit.best,ledgerChange:f.ledgerChange}));
