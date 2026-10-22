#!/usr/bin/env node
'use strict';
/* HAMMER Assumption Surgery v0.4: exact finite countermodels and adaptive
 * observational-equivalence certificates. Not a proof of an ontology.
 * Probabilities are symbolic/model-generated; no experiment or AI review.
 */
const {jsd}=require('../../assets/hammer-core.js');
const TOL=1e-10;
const must=(b,m)=>{if(!b)throw Error('HAMMER surgery: '+m)};
const binary=[-1,1];
function assertAngle(v){must(typeof v==='number'&&Number.isFinite(v),'finite angle required')}
function singletCorrelation(a,b){assertAngle(a);assertAngle(b);return -Math.cos(a-b)}
function settings(){return {alice:[0,Math.PI/2],bob:[Math.PI/4,-Math.PI/4]}}
function chsh(angles=settings()){
 must(angles?.alice?.length===2&&angles?.bob?.length===2,'two settings per party');
 const E=angles.alice.map(a=>angles.bob.map(b=>singletCorrelation(a,b)));
 const signed=E[0][0]+E[0][1]+E[1][0]-E[1][1];
 return {E,score:Math.abs(signed),signed,localBound:2,quantumTsirelsonBound:2*Math.SQRT2};
}
function localDeterministicBound(){
 let max=0,witnesses=0;
 for(const a0 of binary)for(const a1 of binary)for(const b0 of binary)for(const b1 of binary){
  const s=Math.abs(a0*b0+a0*b1+a1*b0-a1*b1);
  max=Math.max(max,s);if(s===2)witnesses++;
 }
 return {strategies:16,maxCHSH:max,witnessesAtBound:witnesses};
}
// A deliberately nonlocal ONE ACTUAL OUTCOME per run. This is a causal
// counterexample to inferring many-real histories from Bell violation.
// It is NOT claimed to be Bohmian mechanics, a local theory, or a LF model.
function singleHistoryOutput(x,y,u,v,angles=settings()){
 must((x===0||x===1)&&(y===0||y===1),'binary choices');
 must(Number.isFinite(u)&&u>=0&&u<1&&Number.isFinite(v)&&v>=0&&v<1,'hidden variables in [0,1)');
 const A=u<.5?1:-1,E=singletCorrelation(angles.alice[x],angles.bob[y]);
 const same=v<(1+E)/2;
 const B=same?A:-A;
 return {A,B,historyCount:1,mechanism:'setting-dependent, explicitly nonlocal hidden-variable outcome construction'};
}
function jointTable(x,y,angles=settings()){
 const E=singletCorrelation(angles.alice[x],angles.bob[y]);
 return [(.25*(1+E)),(.25*(1-E)),(.25*(1-E)),(.25*(1+E))];
}
function bellSurgery(uncertainty=0){
 must(Number.isFinite(uncertainty)&&uncertainty>=0&&uncertainty<=1,'finite per-correlator absolute uncertainty');
 const b=chsh(),cut=Math.max(0,b.score-2);
 const tolerance=cut/4;
 return {source:'singlet Born-rule correlations; four ideal CHSH contexts',
  quantumCHSH:b.score,localMaximum:2,uniformPerCorrelatorError:uncertainty,
  robustLowerBoundOnCHSH:Math.max(0,b.score-4*uncertainty),
  uniformErrorThresholdForLocalCompatibility:tolerance,
  conditionalLocalRejection:(b.score-4*uncertainty)>2+TOL,
  constructiveSingleRealizedOutcome:true,
  multiWorldsInferred:false,scoreChange:0,
  caveat:'Bound assumes honest per-correlator absolute calibration errors and fixed settings. A one-world nonlocal countermodel reproduces the ideal correlators, so CHSH violation alone cannot count worlds.'};
}
const OPERATIONS=['z','x'];
const BASE={
 '':{z:.65,x:.5},
 '0':{z:.8,x:.25},
 '1':{z:.35,x:.7}
};
function validateModel(m){
 must(m&&typeof m==='object','conditional model');
 for(const h of ['','0','1'])for(const a of OPERATIONS)
  must(Number.isFinite(m[h]?.[a])&&m[h][a]>0&&m[h][a]<1,'valid positive conditional probability for '+h+' '+a);
 return m;
}
function policies(){
 const out=[];
 for(const root of OPERATIONS)for(const zero of OPERATIONS)for(const one of OPERATIONS)
  out.push({root,zero,one,id:root+'-'+zero+'-'+one});
 return out;
}
function distribution(model,policy){
 validateModel(model);
 must(OPERATIONS.includes(policy.root)&&OPERATIONS.includes(policy.zero)&&OPERATIONS.includes(policy.one),'complete deterministic two-step policy');
 const p0=model[''][policy.root],left=model['0'][policy.zero],right=model['1'][policy.one];
 // Ordered leaves: 00,01,10,11. Each action can adapt to first outcome.
 const dist=[p0*left,p0*(1-left),(1-p0)*right,(1-p0)*(1-right)];
 must(Math.abs(dist.reduce((a,b)=>a+b,0)-1)<TOL,'leaf normalization');
 return dist;
}
function mutatedModel(change=.12){
 must(Number.isFinite(change)&&change>=-.69&&change<=.29,'bounded explicit alternative dynamics');
 const q=structuredClone(BASE);
 q['1'].x+=change;
 must(q['1'].x>0&&q['1'].x<1,'mutated conditional probability must be interior');
 return q;
}
function adaptiveProof(){
 const equivalent=[];
 for(const p of policies()){
  const a=distribution(BASE,p),b=distribution(structuredClone(BASE),p);
  must(jsd(a,b)===0,'equal conditional Born models must stay identical after adaptation');
  equivalent.push({policy:p.id,jsdBits:jsd(a,b)});
 }
 const alternative=mutatedModel();
 const checks=policies().map(p=>({
  policy:p.id,jsdBits:jsd(distribution(BASE,p),distribution(alternative,p))
 })).sort((a,b)=>b.jsdBits-a.jsdBits||a.policy.localeCompare(b.policy));
 return {method:'finite depth-2 adaptive Born-policy induction; eight exhaustive policies',
  testedPolicies:equivalent.length,identicalConditionalModels:equivalent,
  maximumJSDForIdenticalModels:0,
  alteredDynamicsCandidate:checks[0],
  accessibleChangedConditional:'history=1, operation=x',
  mutation:'toy altered P(0|h=1, a=x) +0.12',
  experimentalStatus:'NO_MEASURED_DATA; no validated nonequilibrium physical state preparation',
  scope:'A proof of equality under identical conditional predictions, NOT proof that all imaginable quantum interpretations are identical.',
  historyCountDiscovered:null,ledgerChange:0};
}
function assumptionCuts(clauses){
 must(Array.isArray(clauses)&&clauses.length>0&&clauses.length<=7,'1-7 clauses');
 const universe=[...new Set(clauses.flatMap(x=>x.assumptions))].sort();
 must(universe.length<=15&&universe.every(x=>typeof x==='string'&&/^[a-z-]{5,45}$/.test(x)),'bounded valid assumption IDs');
 must(clauses.every(x=>Array.isArray(x.assumptions)&&x.assumptions.length>0),'nonempty conditional theorem assumptions');
 const minimal=[];
 for(let n=1;n<(1<<universe.length);n++){
  const relaxed=universe.filter((_,i)=>(n&(1<<i))!==0);
  if(!clauses.every(x=>x.assumptions.some(a=>relaxed.includes(a))))continue;
  if(minimal.some(x=>x.every(a=>relaxed.includes(a))))continue;
  // Iterate by popcount after generation, so only minimum cuts remain
  minimal.push(relaxed);
 }
 const survivors=minimal.filter(a=>!minimal.some(b=>b!==a&&b.length<a.length&&b.every(x=>a.includes(x))))
  .sort((a,b)=>a.length-b.length||a.join(',').localeCompare(b.join(',')));
 return {assumptions:universe,conditionalTheorems:clauses.map(x=>x.id),
  smallestRelaxationSize:survivors[0]?.length||null,minimalRelaxationSets:survivors,
  interpretation:'Each set is a logical way to break every listed inconsistent conjunction, not a verified physical explanation. Rejecting an assumption is NOT equivalent to adopting many worlds.',
  evidenceClass:'THEOREM-ASSUMPTION BOOKKEEPING',ontologyConclusion:'NOT_IDENTIFIED',ledgerChange:0};
}
// Purely an assumption-dependency chart: LF has distinct, often weaker
// locality assumptions than Bell; do not silently equate the two no-go results.
const THEOREMS=[
 {id:'bell-chsh',assumptions:['bell-local-causality','measurement-independence'],
  preconditions:'common-cause Bell-local model, ordinary probabilistic bookkeeping and quantum-violating observations'},
 {id:'local-friendliness',assumptions:['absolute-observed-events','local-agency','no-superdeterminism'],
  preconditions:'controllable observer-scale quantum operations, settings/records and a genuinely violated LF inequality; not just CHSH'}
];
function certificate(){
 const bell=bellSurgery(),adaptive=adaptiveProof(),cuts=assumptionCuts(THEOREMS),strategies=localDeterministicBound();
 const table=jointTable(0,0);
 return {schema:'worldline-hammer-ontology-boundary/v1',method:'assumption surgery + constructive alternative + adaptive-policy no-go',
  bell,strategies,oneHistoryTable:table,adaptive,cuts,
  strongestFalsifier:'Specify a well-formed experimentally accessible operation with unequal likelihoods under both fully defined baseline ontologies at matching preparation, controls and no hidden changed dynamics; or construct and test a new explicit physics extension. Mere CHSH/LF violations do not do this.',
  survivingOneHistoryMechanism:'explicitly nonlocal single-record countermodel, not established physical Bohm model',
  theoreticalNovelty:'NOT_ESTABLISHED; built from established Bell/LF/conditional-probability results in a traceable research workflow',
  verifiedNewExperiments:0,actualAIPanels:0,
  verdict:'ONE_VS_MANY_UNRESOLVED',ledgerChange:0};
}
module.exports={singletCorrelation,settings,chsh,localDeterministicBound,singleHistoryOutput,jointTable,bellSurgery,validateModel,policies,distribution,mutatedModel,adaptiveProof,assumptionCuts,THEOREMS,certificate};
if(require.main===module)console.log(JSON.stringify(certificate(),null,2));
