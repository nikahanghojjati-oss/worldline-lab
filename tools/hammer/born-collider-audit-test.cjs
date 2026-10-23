#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const m=require('./born-collider-audit.cjs');
const x=m.summary();
assert.equal(x.schema,'worldline-hammer-born-collider-audit/v1');
assert.equal(x.energyGeV,29);
assert.equal(x.epsilon95Upper,.042);
assert.equal(x.centralScoreChange,0);
assert.equal(x.originalPEPEventDataReproduced,false);
assert.equal(x.actualAiScientificReview,false);
assert.ok(Math.abs(x.gaussianFWHMAtUpperCosTheta-.098902)<.00001);
assert.ok(x.upperFWHMBinWidths>1.97&&x.upperFWHMBinWidths<1.99);
assert.ok(Math.abs(x.gaussianFWHMAtBestFitCosTheta-.056516)<.00001);
assert.throws(()=>m.fwhm(-1),/nonnegative/);
assert.throws(()=>m.fwhm(NaN),/nonnegative/);
assert.throws(()=>m.summary({...m.ORIGINAL,sourceBestFitEpsilon:.1}),/malformed/);
console.log('PASS HAMMER 2026 collider source arithmetic: epsilon<0.042, FWHM bound about 1.98 bins, no full-data refit, no Everett/Bohm score shift.');
console.log(JSON.stringify({source:x.sourceId,originalObservedDataSource:x.measuredSource,reported95Bound:x.epsilon95Upper,upperFWHMBins:x.upperFWHMBinWidths,centralScoreChange:x.centralScoreChange}));
