#!/usr/bin/env node
'use strict';
/* HAMMER source-consistency audit. Reproduces printed equations and arithmetic
 * from Horchani arXiv:2512.02838, HTML version inspected 2026-10-22.
 * Potential internal inconsistencies, NOT independent proof paper is invalid.
 */
function cslFactor(deltaOverRC,rOverRC){
 if(!Number.isFinite(deltaOverRC)||deltaOverRC<0||!Number.isFinite(rOverRC)||rOverRC<0)throw Error('nonnegative dimensionless radii required');
 const size=1+rOverRC*rOverRC;
 return 1-Math.exp(-deltaOverRC*deltaOverRC/(4*size))/Math.pow(size,1.5);
}
function cslQuotedEquationRate({lambda,mass,massReference,deltaOverRC,rOverRC}){
 if([lambda,mass,massReference].some(x=>!Number.isFinite(x)||x<=0))throw Error('positive physical quantities required');
 return lambda*(mass/massReference)**2*cslFactor(deltaOverRC,rOverRC);
}
function gateNormSquared(etaTheta){if(!Number.isFinite(etaTheta))throw Error('finite gate strength required');return Math.exp(-etaTheta*etaTheta);}
function rateLifetime(env,collapse){
 if(!Number.isFinite(env)||env<0||!Number.isFinite(collapse)||collapse<0||env+collapse===0)throw Error('nonnegative nonzero decay rates required');
 return 1/(env+collapse);
}
function audit(){
 const source='https://arxiv.org/abs/2512.02838';
 const zeroForFiniteSphere=cslFactor(0,.5);
 const printedEnv=8.99e-3,printedCollapse=7.93e4,printedLifetime=1.1e-24;
 const calculatedLifetime=rateLifetime(printedEnv,printedCollapse);
 const modelRate=cslQuotedEquationRate({lambda:1e-21,mass:1e-17,massReference:1.66e-27,deltaOverRC:1,rOverRC:.5});
 return {
  schema:'worldline-hammer-source-audit/v1',source,sourceVersion:'arXiv html content checked 2026-10-22; not a documented author correction or final peer-reviewed acceptance',
  issues:[
   {anchor:'Equation (5), compared with defining unitary displacement D(beta)',
    observation:'Printed scalar e^[-(eta*theta)^2/2] times unitary D is not norm preserving for eta*theta nonzero.',
    exampleEtaTheta:.5,calculatedNormSquared:gateNormSquared(.5),
    caveat:'A different normal-ordered, nonunitary operator convention might explain the prefactor, but D is defined by the author as the unitary displacement.'},
   {anchor:'Equations (12) and (13), finite R/rC',
    observation:'The displayed finite-size CSL rate formula is nonzero at zero spatial separation, while the stated small-separation formula vanishes quadratically.',
    radiusOverRC:.5,zeroSeparationFactor:zeroForFiniteSphere,
    caveat:'The equation may omit a self-correlation subtraction or include a typographical mistake; check original derivation before attributing physical conclusions.'},
   {anchor:'Section III, paragraph following Fig. 3, printed Γenv and ΓCSL',
    observation:'Numbers supplied would have collapse rate larger than environmental rate, opposite the accompanying written dominance claim.',
    printedRatesPerSecond:{environment:printedEnv,collapse:printedCollapse},
    ratioCollapseToEnvironment:printedCollapse/printedEnv,
    caveat:'Potential exponent or unit transcription error; values from different simulation regimes may have been conflated.'},
   {anchor:'Section III, printed Γenv, ΓCSL and quoted τcoh',
    observation:'The reciprocal sum of printed positive rates does not match the printed coherence lifetime.',
    computedCoherenceLifetimeSeconds:calculatedLifetime,quotedSeconds:printedLifetime,
    quotedToComputed:printedLifetime/calculatedLifetime,
    caveat:'Check figure input values and the authors’ intended rate definition; not an experimentally measured lifetime.'},
   {anchor:'Equation (12), Figure 2/3 sample m, R, delta, rC, lambda compared with Section III ΓCSL=7.93e4 s^-1',
    observation:'Literal substitution into the printed CSL equation with the accompanying parameter values yields a different order of magnitude.',
    calculatedEq12CSLPerSecond:modelRate,printedCSLPerSecond:printedCollapse,
    ratioPrintedToCalculated:printedCollapse/modelRate,
    caveat:'Section mixes illustrative parameter sets; do not assume the numbers refer to the same panel without author/figure clarification.'}
  ],
  scientificStatus:'POTENTIAL_SOURCE_INTERNAL_INCONSISTENCIES_REQUIRE_ORIGINAL_AUTHOR_VERIFICATION',
  evidenceClass:'direct displayed equations and arithmetic, no experimental observations collected',
  newPhysicsDiscovery:false,revisionApproved:false,truthCompassChange:0
 };
}
module.exports={cslFactor,cslQuotedEquationRate,gateNormSquared,rateLifetime,audit};
if(require.main===module)console.log(JSON.stringify(audit(),null,2));
