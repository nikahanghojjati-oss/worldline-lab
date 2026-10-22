#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const design=require('./separation-design.cjs');
const fisher=require('./identifiability.cjs');
const x=design.scan();
assert.equal(x.examined,435);
assert.ok(x.best.lambdaStandardErrorFloor<.15,'design improves toy inverse-information bound');
assert.ok(x.nearDegenerate.lambdaStandardErrorFloor>10,'near-collinear small separations give weak discrimination');
assert.equal(x.empiricalFinding,false);
assert.equal(x.ledgerScoreChange,0);
assert.equal(fisher.fisher(design.config(1,1)).status,'NONIDENTIFIABLE',
 'identical separation arms contain no independent physical-rate direction');
assert.ok(fisher.fisher(design.config(.5,3)).determinant>0);
assert.ok(design.arm(.2,10).intrinsic>0);
assert.ok(design.arm(10,10).intrinsic<1);
assert.throws(()=>design.arm(-.2,10),/dimensionless separation/);
const exact=design.scan({separations:[.15,.3],shots:1000});
assert.ok(Math.abs(exact.best.lambdaStandardErrorFloor-x.nearDegenerate.lambdaStandardErrorFloor)<1e-9);
console.log('PASS HAMMER toy separation search: near-degeneracy, intrinsic saturation, conditional sample precision, unmeasured status, score unchanged');
console.log(JSON.stringify({optimalSeparationRatios:x.best.separations,lambdaStdErrorFloor:x.best.lambdaStandardErrorFloor,nearDegenerateStdErrorFloor:x.nearDegenerate.lambdaStandardErrorFloor}));
