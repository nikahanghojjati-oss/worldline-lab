# S-002-R011 · Critical full original experimental study and GRW status boundary

Date: 2026-10-22. Question: **in the actual physical universe, one realized outcome history or multiple physically real branches?**

## Primary paper examined, entirety of original main publication

Knee, G. C., Kakuyanagi, K., Yeh, M.-C., Matsuzaki, Y., Toida, H., Yamaguchi, H., Saito, S., Leggett, A. J. and Munro, W. J. (2016). *A strict experimental test of macroscopic realism in a superconducting flux qubit*. **Nature Communications 7, 13253**. DOI https://doi.org/10.1038/ncomms13253 . Five-page publisher article available as original PDF https://inspirehep.net/files/f78569ff8b2f26953b7d8d2f42ff39b7 .

**Review depth:** entire original published pages 1–5, abstract, introduction, equations (1)–(12), figures 1–3, experimental Results, Discussion, Methods, statistics and data-availability statement. Figures 2–3 read at actual rendered PDF resolution. NOT independently read or reproduced: Supplementary Information (including notes 1–3), raw individual trials, microwave calibration waveforms, correlated errors or separate detector-level replication. This qualifies as a complete **main-text** critical review, NOT a full replication of all source supplements.

## Source argument and opposite predictions

**p2 / equations 1–3:** Leggett–Garg's macroscopic realism per se (definite observable values) plus non-invasive measurement and induction constrain correlations. This paper replaces the three-time correlation statistic with a more noise-tolerant one-time non-disturbance test.

**p3 / equations 4–5 / Fig1–2:** Three preparations: classical pointer eigenstates g/e and a coherent rotated state rho. Apply or omit intermediate operation O at t2, then compare final outcome Q3. Determine the classical operation disturbance independently on g and e; no assumption that O is harmless. The non-disturbance condition d=0 is stricter than the model class finally used.

**p4 / equations 6–7:** A broad experimentally checkable class predicts the disturbance for an operational eigenstate mixture to lie between d_g and d_e; an even more special model predicts their weighted average. The weaker Eq7 inequality is min(d_g,d_e) <= d_rho <= max(d_g,d_e), assuming preparation does not access different, otherwise hidden microstates with different response to O. The paper explicitly acknowledges such hidden-contextual state models as an escape route. Do NOT silently upgrade this theorem to the exclusion of all one-history physics or all collapse laws.

**p4 / Fig3:** Control pulses S1 and S2 sweep state rotations. With ~7 million trials per data point the reported final readout disturbance differs between coherent and two control preparations. Quantum predicted coherence requires off-diagonal density matrix terms; this is a test of **operational mixture** rather than a physical branch census.

**p5 / methods:** Three Josephson junction flux qubit, persistent current ~170 nA, T2 ~10 ns, cooled below 10 mK, microwave qubit pulses of ~2 ns; blind mid-operation/readout Josephson bifurcation amplifier ~6.5 GHz with 12 ns duration and 4 ns rising time; the second S2 pulse follows the first by 18 ns. Authors explicitly state data are available *from the authors*, not raw events within this publication.

## Independent published-numbers calculation

Figure 2c reports mean final-Q3 values and standard errors with/without the blind intermediate pulse.

| Preparation | Without O | With O | d = with - without | Propagated sigma(d) |
|---|---:|---:|---:|---:|
| g classical | +0.053870 ± 0.000305 | +0.027258 ± 0.000314 | -0.026612 | 0.00043774536 |
| e classical | +0.055234 ± 0.000422 | +0.071118 ± 0.000439 | +0.015884 | 0.00060893760 |
| rho coherent | +0.123592 ± 0.000423 | +0.033804 ± 0.000443 | -0.089788 | 0.00061251775 |

The weaker classical mixture bound is [-0.026612, +0.015884], violated by d_rho=-0.089788. The one-sided closest-bound gap is -0.063176 with source-rounded independent propagated standard error sqrt(0.00061251775²+0.00043774536²)=0.00075286054; z = **-83.9146**, reproducing the published **~84 s.d.** with rounding differences. Self-contained Node reproduction: `node tools/truth-engine/macrorealism-reproduce.cjs` (also GitHub CI). The roughly 84-sigma statistic is conditional on source-estimated standard errors, independent error propagation and the mixture model assumptions, not odds for physical multiverse multiplicity.

## Related GRW 1986 source boundary (NOT another completed full study)

Ghirardi, Rimini, Weber, *Unified dynamics for microscopic and macroscopic systems*, **Phys. Rev. D 34, 470–491 (1986)** https://doi.org/10.1103/PhysRevD.34.470, original 22 printed pages. Publisher abstract, an indexed publisher original introductory and section VII excerpt, and comparison with the Stanford Encyclopedia original-model account https://plato.stanford.edu/archives/spr2024/entries/qm-collapse/ were checked. Direct full 22-page body access in this session failed, so **SRC-042 remains abstract-reviewed, NOT fully-studied**. From the independently corroborated benchmark lambda=1e-16 s^-1 and localization 1e-7 m, simple independent Poisson amplification predicts one constituent mean localization ~3.1688e8 years and N=1e23 constituents mean *some* constituent localization every 1e-7 s (assuming equal independent rates). These are source-prescribed model assumptions and indicative scale calculations; one hit is not equivalent to a fully solved composite macroscopic two-branch decoherence factor, and discrete GRW is not the same as CSL white-noise emission kernels.

## Adversarial comparison and scientific judgment

1. **Everett multiple branch-relative records:** predicts coherent test distributions and violation of the indicated mixture class through unitary qubit dynamics.
2. **Equilibrium Bohm one actual configuration:** wavefunction, guidance and Born-equivariance reproduce the same coherent qubit distributions, without multiple occupied configurations.
3. **Specified collapse/operational macrorealist class:** if its dynamics truly removes coherence on a ~10 ns timescale and enforces Eq7, this apparatus rules it out strongly; do **not** infer rejection of all GRW/CSL choices from Eq7 or the 170 nA current alone.
4. **More flexible one-history hidden/contextual models:** the paper itself acknowledges different hidden-state preparations as a logical possible explanation outside the Eq7 witness. Detector disturbance can be control-calibrated without eliminating every contextual or correlated error possibility.

**Physical claim movement:** WL-020/MOVE-009 newly register the published rejection of an explicitly bounded macroscopic-eigenstate mixture and arithmetic replication. **Central Truth Compass 50→50, no evidential direction**; an ordinary coherent quantum experiment does not distinguish Everett reality from equilibrium Bohm reality. The 50 is an editorial neutral anchor, not 50% probability. Author response / independent raw trial reanalysis and original GRW full text remain future scientific gates.

## Prior history and next experiment

Next pre-register two *physically defined* equal-preparation rival hypotheses, with independently estimated detector background and nuisance terms, and measure a nonzero likelihood difference under one-actual and many-actual history theories rather than misclassifying coherence as branch observation. Priority: characterize quantum nonequilibrium polarization using an actual high-energy photon polarimeter and unbiased control selection, or establish rigorous observational equivalence under matched Born conditions.
