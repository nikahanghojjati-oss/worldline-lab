#!/usr/bin/env node
'use strict';
// Finite-dimensional source-backed METHOD DIAGNOSTIC, not data or a multiverse detector.
// SRC-007, SRC-010, SRC-059, SRC-076 and hypothesized modified dynamics SRC-042.
const assert=require('node:assert/strict');
const H=1/Math.sqrt(2);
function multiply(M,v){return M.map(row=>row.reduce((s,x,i)=>s+x*v[i],0))}
const hadamardFirst=[[H,0,H,0],[0,H,0,H],[H,0,-H,0],[0,H,0,-H]];
const cnot=[[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]];
const norm=v=>v.reduce((s,x)=>s+x*x,0);
function quantumEraser(){
 const start=[1,0,0,0];
 const prepared=multiply(hadamardFirst,start);
 const record=multiply(cnot,prepared);
 const undone=multiply(hadamardFirst,multiply(cnot,record));
 const collapsed00=multiply(hadamardFirst,multiply(cnot,[1,0,0,0]));
 const collapsed11=multiply(hadamardFirst,multiply(cnot,[0,0,0,1]));
 const q0=v=>v[0]**2+v[1]**2;
 return {prepared,record,unitaryUndo:undone,unitaryQ0:q0(undone),stipulatedIrreversibleLossQ0:(q0(collapsed00)+q0(collapsed11))/2,recordPointer0:record[0]**2+record[1]**2,recordPointer1:record[2]**2+record[3]**2,norm:norm(record)};
}
const logL=(n,k,p)=>k*Math.log(p)+(n-k)*Math.log1p(-p);
function diagnostic({n=1000,k=900,envVisibility=.8,physicalLossVisibility=.5,theta=0}={}){
 if(!Number.isInteger(n)||n<1||!Number.isInteger(k)||k<0||k>n||!(envVisibility>=0&&envVisibility<=1)||!(physicalLossVisibility>=0&&physicalLossVisibility<=1)||!Number.isFinite(theta))throw Error('invalid synthetic model parameter');
 const pBorn=(1+envVisibility*Math.cos(theta))/2;
 const pModified=(1+envVisibility*physicalLossVisibility*Math.cos(theta))/2;
 if(!(pBorn>0&&pBorn<1&&pModified>0&&pModified<1))throw Error('boundary probability requires separate handling');
 return {kind:'PURELY SYNTHETIC PRESELECTED COUNTS; NEVER OBSERVATIONAL EVIDENCE',n,k,theta,envVisibility,physicalLossVisibility,everettBorn:pBorn,bohmEquilibrium:pBorn,stipulatedExtraLoss:pModified,logLR_Everett_vs_Bohm:logL(n,k,pBorn)-logL(n,k,pBorn),logLR_Unitary_vs_extraLoss:logL(n,k,pBorn)-logL(n,k,pModified),warning:'Two fixed binomial model likelihoods only. No raw data, model-family priors, confidence level, posterior, probability of branch reality or GRW parameter exclusion.'};
}
function run(){
 const q=quantumEraser();
 assert.ok(Math.abs(q.norm-1)<1e-12);
 assert.ok(Math.abs(q.recordPointer0-.5)<1e-12&&Math.abs(q.recordPointer1-.5)<1e-12);
 assert.ok(Math.abs(q.unitaryQ0-1)<1e-12);
 assert.ok(Math.abs(q.stipulatedIrreversibleLossQ0-.5)<1e-12);
 const a=diagnostic(),b=diagnostic({k:700});
 assert.equal(a.logLR_Everett_vs_Bohm,0);
 assert.equal(b.logLR_Everett_vs_Bohm,0);
 assert.ok(Math.abs(a.logLR_Unitary_vs_extraLoss-116.3217565860046)<1e-9);
 assert.ok(b.logLR_Unitary_vs_extraLoss<0);
 return {quantumEraser:q,syntheticPositive:a,syntheticNegative:b,conclusion:'Matched Born-Everett and quantum-equilibrium Bohm pointer records are operationally identical; a stipulated physical loss-of-coherence mechanism predicts a difference under controlled environmental reversal. No real branch count inferred.'};
}
if(require.main===module)console.log(JSON.stringify(run(),null,2));
module.exports={quantumEraser,diagnostic,run};
