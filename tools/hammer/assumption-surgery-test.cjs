#!/usr/bin/env node
'use strict';
const assert=require('node:assert/strict');
const m=require('./assumption-surgery.cjs');
const {jsd}=require('../../assets/hammer-core.js');
const close=(x,y,t=1e-9)=>assert.ok(Math.abs(x-y)<t,'expected '+x+' ~ '+y);
const b=m.chsh(),l=m.localDeterministicBound();
assert.equal(l.strategies,16);
assert.equal(l.maxCHSH,2,'exhaustively enumerated deterministic Bell-local bound');
close(b.score,2*Math.SQRT2);
assert.equal(m.bellSurgery(.1).conditionalLocalRejection,true);
assert.equal(m.bellSurgery(.25).conditionalLocalRejection,false);
close(m.bellSurgery().uniformErrorThresholdForLocalCompatibility,(2*Math.SQRT2-2)/4);
for(let x=0;x<2;x++)for(let y=0;y<2;y++){
 const table=m.jointTable(x,y),counts=[0,0,0,0];
 for(let i=0;i<120;i++)for(let j=0;j<120;j++){
  const {A,B,historyCount}=m.singleHistoryOutput(x,y,(i+.5)/120,(j+.5)/120);
  assert.equal(historyCount,1,'one actual pair of outcomes per run');
  counts[(A===1?0:2)+(B===1?0:1)]++;
 }
 for(let i=0;i<4;i++)assert.ok(Math.abs(table[i]-counts[i]/14400)<.004,'nonlocal one-history sampler reproduces singlet table');
 close(table.reduce((a,b)=>a+b,0),1);
}
const nonlocalA=m.singleHistoryOutput(0,1,.2,.5),nonlocalB=m.singleHistoryOutput(1,1,.2,.5);
assert.notEqual(nonlocalA.B,nonlocalB.B,'outcome construction depends nonlocally on remote measurement choice');
const adaptive=m.adaptiveProof();
assert.equal(adaptive.testedPolicies,8,'exhaustive two-action depth-two policies');
assert.equal(adaptive.maximumJSDForIdenticalModels,0);
assert.ok(adaptive.identicalConditionalModels.every(p=>p.jsdBits===0),'no adaptivity distinguishes equal Born kernels');
assert.ok(adaptive.alteredDynamicsCandidate.jsdBits>0,'changed conditional physics has a testable theoretical wedge');
assert.equal(adaptive.ledgerChange,0);
assert.equal(jsd(m.distribution(m.mutatedModel(0),m.policies()[0]),m.distribution(m.mutatedModel(0),m.policies()[0])),0);
const cuts=m.assumptionCuts(m.THEOREMS);
assert.equal(cuts.smallestRelaxationSize,2,'each independent no-go conjunction must be broken');
assert.equal(cuts.minimalRelaxationSets.length,6,'two Bell choices times three LF choices');
assert.ok(cuts.minimalRelaxationSets.every(c=>c.length===2));
assert.equal(cuts.ontologyConclusion,'NOT_IDENTIFIED');
assert.equal(m.certificate().ledgerChange,0);
assert.equal(m.certificate().verifiedNewExperiments,0);
assert.throws(()=>m.bellSurgery(-1),/absolute uncertainty/);
assert.throws(()=>m.singleHistoryOutput(0,0,.3,2),/hidden variables/);
assert.throws(()=>m.assumptionCuts([{id:'broken',assumptions:[]}]),/nonempty/);
console.log('PASS HAMMER v0.4: CHSH exact local bound and quantum 2sqrt2, 4-setting nonlocal one-history countermodel, calibration threshold, 8 adaptive policy equivalence certificates, theorem assumption minimal cuts and no invented Ledger movement.');
console.log(JSON.stringify({CHSH:b.score,localLimit:l.maxCHSH,maximumUniformError:(2*Math.SQRT2-2)/4,
 alternativeDynamicsPolicy:adaptive.alteredDynamicsCandidate,minimalCuts:cuts.minimalRelaxationSets.length,
 independentlyMeasuredEvidence:0,compassMovement:0}));
