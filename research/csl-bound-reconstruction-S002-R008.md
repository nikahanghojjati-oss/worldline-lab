# S-002-R008 · Reproducible cross-instrument CSL exclusion study

Study date 2026-10-21. Main question: what experimental observations falsify specified **single-outcome stochastic CSL dynamics**, and do any isolate one actually real history from many? Scientific policy: comparative *mass-proportional Markovian white-noise CSL*, same nucleon-normalized rate λ [s^-1] and correlation length r_C [m]. **No combined likelihood or unqualified cross-model confidence claim.**

## 1. New reproducibility achievement: original germanium-count Bayesian bound independently reconstructed

Donadi et al., *Eur. Phys. J. C* 81, 773 (2021), original source https://doi.org/10.1140/epjc/s10052-021-09556-0 , §§3.1–3.3, Eq. (7), (10)–(15): measured photons in 1000–3800 keV z_c=576, simulated instrumental/radionuclide background z_b=506, simulated efficiency-folded signal coefficient a=2.0986, exposure 124 kg-day. Equation (7): expected detected signal z_s=a λ/r_C². The paper uses BOTH Λ_b=z_b+1=507 and Λ_s=z_s+1=1+a λ/r_C²; hence Λ_c=508+a λ/r_C². The posterior is **Gamma(shape=z_c+1=577, scale=1)** for total mean Λ_c using a uniform prior. Eq. (14) 95th percentile is Γ^{-1}_CDF(.95;577)=**617.0710335865 counts**, computed independently using a dependency-free numerical lower-incomplete-gamma CDF and 110-iteration bisection in tools/truth-engine/csl-reproduce.cjs, and separately cross-checked using SciPy gamma.ppf.

With the paper's subtraction and coefficient: The signal mean from the paper's **both +1** prescription is z_s,95=617.0710335865−508=**109.0710335865 counts**. At r_C=1e-7 m, λ_95=(109.0710335865/2.0986)(1e-7)^2=**5.19732362463e-13 s^-1**. Source reports **5.2e-13 s^-1 (95%)**; relative difference **0.0515%**, an especially direct replication of the published bound. This **reproduces a published Bayesian numeric parameter bound from source-published counts, detector-response coefficient and inference equation**; it does NOT reconstruct energy-binned event spectrum, background isotope fit, detector response a from independent Geant4, or event-level posterior uncertainties.

**Important prior audit:** source Eq. (13) places uniform prior on total Λ_c over nonnegative values, which technically includes Λ_c < the physical zero-signal threshold 508, yielding an unphysical negative λ for that interval. From the reconstructed Gamma posterior, posterior mass below 508 is **0.00143323249 (~0.1433%)**. Explicitly conditioning to λ≥0 yields upper **5.19815576146e-13 s^-1**, only **0.01601% above** the untruncated reconstruction. This quantifies rather than conceals the physical-prior issue. Fixing background and source coefficient is a stronger assumption than marginalizing their systematic uncertainty.

**Background sensitivity illustration, not a measured uncertainty interval:** if assumed z_b is artificially shifted by ±25 counts (~5%) and all else fixed, λ_95 ranges **4.00605e-13 to 6.38859e-13 s^-1**. These are not paper-approved detector-systematic intervals and must NOT be shown as validated confidence bands. This warns that independently recreating the reported bound does not validate a correct background model.

## 2. New reproducibility achievement: LISA Pathfinder accelerated test-mass PSD-to-CSL bound independently reconstructed

Dai, Miao, Ma (2024), original author text https://arxiv.org/pdf/2411.17588, pp1–3, Eq. (10) and (14). Reported input: test mass M=1.928 kg, bulk density ρ=19,881 kg/m³, cube side b=0.046 m, minimum uncertainty of fitted Brownian acceleration PSD ΔS_a=0.075 fm² s^-4 Hz^-1 (with femtometre conversion: 0.075e-30 m² s^-4 Hz^-1 = 7.5e-32 SI), nucleon m0=1.67492749804e-27 kg, ℏ=1.054571817e-34 J s.

The paper's low-frequency, small-r_C geometric approximation Eq. (10):
λ_CSL = [m0²/(32π ℏ² r_C²)] [(M/ρ)²/b²] S_a.

Our independently evaluated result at r_C=1e-7m is **8.36417404452e-11 s^-1**, consistent with published **8.3e-11 s^-1** (~0.77% nominal discrepancy due to constants/published rounding). As secondary consistency test, the older first-55-day acceleration amplitude 5.2 fm s^-2 Hz^-1/2 gives PSD=(5.2e-15)² and λ≈**3.01556e-8 s^-1**, close to published **2.96e-8 s^-1** (about 1.9%). These are formula reconstructions from *reported PSD estimates*, not noise-spectrum Bayesian/frequentist fit replication or independent remeasurement of spacecraft acceleration. Uncertainty budget and environmental decomposition are unresolved. The translational formula gives λ_upp∝1/r_C² under its small-r_C approximation—**opposite slope to the photon-emission bound**. It is invalid to scale LISA by r_C² without its geometry.

## 3. Common parameter-space comparison with non-combinable statistical semantics

XENON Collaboration, *Phys. Rev. Lett.* 136 120201 (23 March 2026), https://doi.org/10.1103/2jm3-4976 . From the original measured 1–140 keV xenon electronic recoil spectral likelihood (separate nine-background fit, electron–proton cancellation), the authors publish λ/r_C²<**3.0e-3 s^-1 m^-2 at 90% confidence**, so at 1e-7m λ<**3.0e-17 s^-1** (direct dimensional conversion, **not** independent profile-likelihood fit). Source also reports **95% CL 3.7e-3**; plotting the 90% line must be labeled 90 and not conflated with the 95% credible Ge bound. The historical λ=1e-16 and r_C=1e-7 lies 3.33× above the 90%-CL XENONnT limit; source's **9.1σ likelihood finding is NOT calculated by dividing by 3.33** and is not independently reconstructed. White-noise model only.

| Experimental channel | Actual input | λ upper at r_C=10^-7 m | Statistical meaning | Computation status |
|---|---|---:|---|---|
| XENONnT 2026, 1–140 keV xenon | Original low-energy recoil data, published spectral fit with nine backgrounds | **3.0000e-17 s^-1** | 90% frequentist-profile-likelihood reported; model-specific; no raw fit | Independent λ/r_C² units conversion only |
| Donadi Ge 2021, 1000–3800 keV germanium | 576 counts, 506 fixed simulated background, coefficient 2.0986 | **5.19732362e-13 s^-1** | 95% Bayesian posterior on total count, transformed assuming fixed simulated background | **Independent numeric posterior bound reproduced** |
| LISA 2024 translational | 0.075 fm² s^-4 Hz^-1 Brownian noise *uncertainty* and cube dimensions | **8.36417404e-11 s^-1** | Conservative assigned noise-uncertainty parameter cap, NOT 90%/95% CL | **Independent Eq. (10) numeric bound reproduced** |
| LISA 2025 rotational | Angular torque PSD ~5.7e-34 N²m²/Hz, cube geometry and gas confinement | Not claimed numeric at this radius | Different frequency/geometry-dependent observed-noise upper constraint; same Pathfinder data lineage as translational | Published factor ~2 improvement in a different r_C band; full numeric contour NOT reconstructed |
| Fein 2019 molecules >25 kDa | Talbot-Lau fringe visibility 25±3% example, quantum fit scale 0.93±0.06 | Not claimed numeric | Interferometric fringe/visibility and macroscopicity 14.1, different signal, other decoherence confounds | Published **qualitative** exclusion, no synthetic lambda fit without raw phase/velocity/geometry likelihood |

At this benchmark radius, Ge's published 95%-credible bound is ~**17,324× weaker** in λ than XENON's reported 90%-CL bound, while LISA's conservative acceleration PSD bound is ~**2.788 million× weaker**; because confidence/credible/noise-attribution conventions differ, these are **parameter upper-bound magnitudes, NOT comparable probabilities or an experiment quality ranking**. Germanium detector photon energy and nuclear Z² approximation differ from xenon atom low-energy cancellation; neither data row is a direct many-worlds measurement.

## 4. R_C scaling and valid scope

For the published Markovian CSL radiation model at fixed high-energy Ge detector response, λ_Ge,95(r)=5.19732362463e-13 (r/1e-7m)² s^-1, within original source's stated applicable region approximately r_C≤1e-6m. For XENONnT λ_X,90(r)=3e-3 r² (units chosen as above), consistent with its published constant λ/r² limit in white-noise CSL, with empirical exclusion strongest around r_C≲1e-5m. For LISA translational in the simplified mass-density/low-frequency/small-r_C model λ_LISA(r)=8.364174e-11 (1e-7m/r)² s^-1, while true high r and discrete mass/correlation geometry require original full response treatment. Note **different slopes**: radiation increasing r², acceleration noise decreasing r^-2. An apparent intersection ≈4.09e-6m between simple LISA translation and XENON reference lines is just a *model-dependent crossing of upper-bound curves with unlike inference conventions*, NOT statistical detection or world-count prediction.

| r_C | XENON 90% CL upper | Ge 95% Bayesian upper | LISA translational conservative upper |
|---|---:|---:|---:|
| 1e-8m | 3.00e-19 | 5.197e-15 | 8.364e-9 |
| 1e-7m | 3.00e-17 | 5.197e-13 | 8.364e-11 |
| 1e-6m | 3.00e-15 | 5.197e-11 | 8.364e-13 |
| 1e-5m | 3.00e-13 (edge of stated strong region) | **NOT SHOWN** (Ge full model extrapolation) | 8.364e-15 (small-r_C approximation) |

Published molecule and rotational LISA exclusions are *not* added as invented numeric curves. The complete real exclusion map would need the original apparatus-geometry-integrated signal kernels, actual noise/visibility data and likelihood/credibility definitions. These were not available/reconstructed for this bounded round; missing bands explicitly marked, not silently filled with guesses.

## 5. Reproducibility and adversarial checks

Canonical implementation: [csl-reproduce.cjs](../tools/truth-engine/csl-reproduce.cjs), dependency-free Node. The [CI fixtures](../tools/truth-engine/test.cjs) now independently check incomplete-gamma quantile consistency (P=0.95), reported bounds within 1.2%, physically truncated posterior monotonicity, units, r² photon scaling, r^-2 LISA scaling, absence of unjustified Ge r=1e-5 extrapolation. Also checked externally with an independent SciPy gamma.ppf implementation as a second computational method. Scope: exact analytic aggregated-count posterior and specific Eq10 arithmetic, **not raw detector data nor Geant4 response**.

### Evidence independence

Donadi Ge and XENON are genuinely different detectors and energies; use confidence-specific published constraints, not inverse-variance combination. LISA Dai and Altamura are analyses of correlated Pathfinder mission data (force vs torque), not two independent spacecraft experiments. Molecular interferometry measures spatial coherence with unresolved environmental nuisance physics and cannot be plotted as a λ band by naive visible fringe ratio. Colored/dissipative CSL variants with different spectrum, collapse operator or gravitational response are excluded only if their own predictions fall in the measured bound, NOT by importing white-noise cuts.

### Next step toward strong physical answer

1. Obtain a detector's actual efficiency/background data and full signal-model appendix to test if the posterior XENON likelihood's 9.1σ can be independently reproduced; if unavailable record formal data access blocker and use the Ge case with published count-level independent recreation plus explicit background uncertainty envelope.
2. Reproduce the *full* LISA rotational torque integral or obtain published curve points, then bring it into the same white-noise λ/r_C grid only for properly specified geometry.
3. Obtain original Fein interference-fringe/mass/velocity data and reconstruct CSL visibility likelihood before drawing an exclusion line.
4. Demonstrate Everett unitary vs Bohmian quantum-equilibrium Born-level likelihood equality as a conditional model-identifiability theorem; identify operationally distinct extensions (e.g., pilot-wave nonequilibrium) before proposing a discriminating experiment. None of these physical-collapse exclusions proves an Everett branch census.

**Scientific central verdict:** unresolved, editorial 50 unchanged, no physics-derived odds. **Evidence state:** deeper independent reproduction from published inputs; ledger claim now materially stronger and falsifiable under documented background assumptions.

## Equation-level correction retained in the audit

An earlier interim calculation subtracted only the background pseudocount (507) from total mean and obtained 5.24497444e-13. The original paper explicitly defines **both** Lambda_b=z_b+1 and Lambda_s=z_s+1, giving a total offset of **508**. Using the full Eq. (11) produces 5.19732362e-13, matching the published 5.2e-13 to two significant figures. The interim number is preserved here as an identified and corrected independent-reconstruction error, never silently rewritten as measured evidence. Tests now enforce the two-offset result.
