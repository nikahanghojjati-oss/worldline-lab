#!/usr/bin/env node
'use strict';
// HAMMER v0.5 reproducible source-printed arithmetic, not a raw detector refit.
// Physical original-source evidence is real; computations and limitations are explicit.
const H=6.62607015e-34,DA=1.66053906660e-27;
const src={
 nano:{doi:'10.1038/s41586-025-09917-9',massDa:172000,period:133e-9,L:.983,beamRange:[120,170],
  scans:[{v:.10,sigma:.01},{v:.08,sigma:.01}],posteriorDataPoints:3895,tauFivePercent:2.84e15,sourceMu:15.45},
 hardy:{doi:'10.1103/PhysRevLett.133.060201',trials:4320000000,pExponent:-16348,
  hardyStatistic:4.646e-4,efficiency:.822,fidelity:.991},
 reservoir:{doi:'10.1103/t2yx-9bqh',access:'original published abstract only'}
};
function requireValid(x,msg){if(!x)throw Error('HAMMER empirical evidence: '+msg);}
function nanoCheck(s=src.nano){
 requireValid(s.massDa>0&&s.period>0&&s.L>0&&s.tauFivePercent>0,'positive printed physical dimensions');
 const massKg=s.massDa*DA,expectedV=s.L*H/(massKg*s.period*s.period),wavelength=H/(massKg*expectedV);
 const macro=Math.log10(s.tauFivePercent);
 const vis=s.scans.map(x=>{requireValid(x.v>0&&x.sigma>0,'visibility with uncertainty');return {visibility:x.v,quotedSigma:x.sigma,amplitudeToQuotedFitError:x.v/x.sigma}});
 return {approxTalbotBeamSpeedMS:expectedV,sourceBeamRangeMS:s.beamRange,
  insideBeamRange:expectedV>=s.beamRange[0]&&expectedV<=s.beamRange[1],
  impliedWavelengthM:wavelength,sourceMassKg:massKg,
  sourcePosteriorDataPoints:s.posteriorDataPoints,
  sourceFivePercentPosteriorClassicalizationTimeSeconds:s.tauFivePercent,
  sourceMu:s.sourceMu,reconstructedMu:macro,
  sourceMuReconstructedWithinRounding:Math.abs(macro-s.sourceMu)<.01,
  publishedScans:vis,sourceFitDifferenceOverIndependentQuotedErrors:
    Math.abs(s.scans[0].v-s.scans[1].v)/Math.hypot(s.scans[0].sigma,s.scans[1].sigma),
  limits:'Nominal Talbot scale and log posterior QUANTILE reproduced from author-reported inputs. Raw cluster count data and full Bayesian posterior are NOT independently reconstructed; fit-error ratios ignore systematics. The 5% quantile is specific to source minimal macrorealist model family and prior, NOT probability of physical many worlds.'};
}
function hardyCheck(s=src.hardy){
 requireValid(Number.isSafeInteger(s.trials)&&s.trials>0&&Number.isSafeInteger(s.pExponent)&&s.pExponent<0,'valid printed trial count/log p bound');
 return {publishedTrials:s.trials,publishedHardyStatistic:s.hardyStatistic,
  publishedLocalRealismNullLog10PUpperBound:s.pExponent,
  publishedEfficiency:s.efficiency,publishedFidelity:s.fidelity,
  interpretation:'The authors report p <= 10^(-16348) for their local-realist null under experiment and analysis assumptions. No event-level p-value calculation by HAMMER.',
  nonConclusion:'p under local realism is NOT posterior probability of one history, or a Bayes factor for Everett; nonlocal one-history models are not excluded by this result.'};
}
function audit(){
 return {schema:'worldline-hammer-observed-evidence/v1',date:'2026-10-22',
  realExternalExperiments:3,hammerCollectedExperimentalMeasurements:0,
  rawLikelihoodsIndependentlyRefitted:0,sourceDepth:'Nano paper: original article Methods and findings plus source archive link; Hardy: publisher abstract and available source excerpt; Zheng: published publisher abstract only',
  quantitativeEvidence:{nano:nanoCheck(),hardy:hardyCheck()},
  movements:[
   {id:'MOVE-010',claim:'Minimal macrorealist superposition-loss models under the author-defined scale and prior',direction:'Empirically constrained by real nanoparticle fringes and reported mu=15.45',centralImpact:0},
   {id:'MOVE-011',claim:'Bell-local-realist models covered by the Hardy loophole-free test',direction:'Empirically rejected under the original conditional statistical null test p<=10^-16348',centralImpact:0},
   {id:'MOVE-012',claim:'Mesoscopic decoherence and reservoir-induced irreversible recoverability',direction:'Published controlled circuit-QED experiment reports less spontaneous which-path erasure with increased bath degrees; effect size not reconstructed',centralImpact:0}],
  centralVerdict:'UNRESOLVED',
  centralReason:'Neither local realism exclusion nor a particular collapse-family exclusion distinguishes Everett from quantum-equilibrium Bohm. Irrecoverability under a controlled bath is not the observation of how many histories physically exist.',
  centralScoreChange:0,noProviderAIPanelsExecuted:true};
}
module.exports={H,DA,src,nanoCheck,hardyCheck,audit};
if(require.main===module)console.log(JSON.stringify(audit(),null,2));
