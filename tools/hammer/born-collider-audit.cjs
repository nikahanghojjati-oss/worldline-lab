#!/usr/bin/env node
'use strict';
/* HAMMER source-summary audit: Valentini/Varma, arXiv:2607.06938 (2026).
 * 29-GeV historical PEP collider data, author phenomenological fit.
 * An arithmetic translation of a published 95% bound, NOT raw-data replication,
 * no full original source study, no observed physics ontology divergence.
 */
const ORIGINAL=Object.freeze({id:'arXiv:2607.06938',title:'First constraint on Born-rule violations at high-energy colliders',
 authors:'Antony Valentini and Mira Varma',date:'2026-07-08',
 centerOfMassEnergyGeV:29,process:'e+e- -> e+e- large-angle Bhabha scattering',
 source95UpperEpsilon:.042,
 uncertaintyConvention:'Reported 95% confidence upper bound under a specified Gaussian smearing of differential cross sections; author paper is a preprint; underlying event-level data and likelihood not independently reproduced.'});
function checked(p){if(typeof p!=='number'||!Number.isFinite(p)||p<0)throw Error('HAMMER collider: nonnegative finite epsilon required');return p;}
function fwhm(epsilon){return 2*Math.sqrt(2*Math.log(2))*checked(epsilon);}
function summary(src=ORIGINAL){
 const up=src.source95UpperEpsilon;
 if(!(Number.isFinite(up)&&up>0))throw Error('HAMMER collider: source parameters malformed');
 return {schema:'worldline-hammer-born-collider-audit/v1',sourceId:src.id,energyGeV:src.centerOfMassEnergyGeV,
  measuredSource:'Historically recorded PEP/SLAC large-angle Bhabha scattering, reanalyzed by external authors in July 2026',
  sourceModel:'Gaussian smearing in x=cos(theta) of a model-generated differential scattering cross section',
  epsilon95Upper:up,
  reportedConfidenceLevel:.95,
  gaussianFWHMAtUpperCosTheta:fwhm(up),
  verifiedArithmetic:'FWHM = 2 sqrt(2 ln 2) * epsilon; reported source describes its constraint as angular smearing over approximately twice its experiment bin width. Exact bin width not independently verified in the original article.',
  primaryStudyDepth:'Source abstract and publicly verifiable bibliography only; original six-page methods, digitized data, fit and nuisance calibration not replicated.',
  inference:'Constraints only the specified finite-width angular-smearing deformation of Born-rule cross sections; does not prove exact Born rule universally, or Everett many-real worlds.',
  paperStatus:'2026 arXiv preprint, not independently verified as peer-reviewed',
  originalPEPEventDataReproduced:false,
  actualAiScientificReview:false,
  centralScoreChange:0};
}
module.exports={ORIGINAL,fwhm,summary};
if(require.main===module)console.log(JSON.stringify(summary(),null,2));
