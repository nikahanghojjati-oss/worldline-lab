# S-002-R001 · One physical history or multiple? Predictive ontology comparison

Worldline Lab · 2026-10-21 · Version 1.0 · Scientific scope: Everett, quantum-equilibrium Bohm, GRW/CSL.

## Question and evidence threshold

Does the universe contain only one physically actual quantum outcome history or multiple physically real branches? One observed sequence does not imply other branches do not exist. Everett branching within a single universal quantum state is not an inflationary bubble universe. A genuine discriminator requires a quantitatively different predicted measurable distribution under specified models, not merely a different interpretation of an identical distribution.

### Versioned model-versus-observation matrix

| Account and ontology | Dynamics/assumptions | Experimental setup | Observable and distribution | Agreement conditions | Genuine difference/falsifier | Status, counterargument and source depth |
|---|---|---|---|---|---|---|
| Everett relative states: one global wave function with multiple real emergent branch-relative outcome records | Strict Schrödinger unitary evolution; environment-induced decoherence; Born-weight problem and preferred-basis approximation | Two-path interferometer; which-path environment; hypothetically controlled recoherence | Balanced two-path local visibility V=abs(γ), with environmental overlap γ=<E1|E0>; plus-basis P(+)= [1+Re(γ)]/2 | Same Born frequencies as Bohmian equilibrium under identical initial ψ, Hamiltonian and apparatus; global recoherence not unique to many-world ontology | A well-controlled deviation from unitary dynamics challenges this strict model, but neither interference nor recoherence counts branches | Everett 1957 SRC-007 publisher abstract only here; entire SEP analysis SRC-012 critically read in S-001. Born probability and branch individuation contested |
| Bohmian mechanics in quantum equilibrium: single actual particle configuration guided by the wave | ψ=R exp(iS/ħ), v=∇S/m, initial ρ=abs(ψ)^2, Schrödinger ψ; nonlocal multiparticle guidance | Double slit, macroscopic measurement pointer, Bell/EPR correlations | Same Born P(pointer i)=integral_{config region i} abs(Ψ)^2 dq; V=abs(γ) | Exactly same ordinary operational probabilities as Everett if initial equilibrium and same dynamics; wave packets without actual particle remain part of ψ | Hypothetical non-equilibrium ρ≠abs(ψ)^2 or altered microscopic dynamics might differ; NOT baseline model and NOT confirmed | SRC-010 and SRC-059 whole original Bohm 1952 main papers and two appendices critically reviewed NOTE-043/044; unique actual configuration cannot be distinguished by standard Born data |
| GRW spontaneous localization: one stochastic physically collapsed macroscopic outcome | Poisson localizations at rate λ per constituent, length r_C; ideal independent-hit toy for N constituents with all displaced by d | Isolated high-mass interferometer, separation d over dwell time t, calibrated environmental decoherence | For specified Gaussian convention: V_GRW/V_unitary=exp[-N λ t (1−exp(−d²/(4 r_C²)))] | Weak λ, small d or short t, or dominant background decoherence give near-unitary observations | State-dependent excess suppression relative to carefully measured environment can exclude or support some parameter regions; null does not exclude every GRW variant | SRC-042 original 1986 publisher abstract only; SRC-048 2019 molecule experiment abstract only; geometric composite-body and actual apparatus not modeled in toy |
| Mass-proportional CSL/DP: stochastic physical modification, not a branch interpretation | Explicit λ_CSL, r_C, mass distribution, noise-correlation assumptions and detector response; a different master equation from the simple GRW toy | Molecule interference; acceleration-force noise; emitted photons/X-rays from charged particles | V=V_environment exp[−Γ_CSL(geometry,λ,r_C)t]; differential radiation spectrum dR/dE and instrument backgrounds | Coupling below sensitivity yields predictions practically identical to ordinary QM | XENONnT measured 1–140 keV low-energy X-ray sample and reports new Markovian CSL/DP limits with xenon electron–proton cancellation modeled; LISA force-noise bounds constrain other slices | SRC-066 2026 original publisher abstract/targeted text only; SRC-067 2024 arXiv abstract only; 2019 SRC-048 abstract; complete likelihood and exclusion curves not independently reproduced |

### Explicit no-inference Bell and cosmology comparators

| Research program | Measured/formal statement | Cannot establish |
|---|---|---|
| Bell locality | CHSH local bound abs(S)≤2, standard quantum maximum 2sqrt(2). 2016 Hensen event-ready second run 300 trials S=2.35±0.18 and complete-analysis p=0.061. Both runs pooled 545 trials, S=2.38±0.136, complete p=0.017 (independent-run Fisher method) or p=0.0080 (single pooled analysis); procedures must not be conflated. | The rejection of a suitably defined *local* hidden-variable null is not rejection of explicitly nonlocal Bohmian mechanics and is not observation of Everett branches. SRC-065 entire 2016 main text studied; SRC-060 first 2015 run original abstract only; S-001 SRC-008 Bell original fully studied. |
| Eternal-inflation bubble collisions | SRC-062 2011 WMAP CMB test searched model-dependent circular/azimuthal signatures; published search did not warrant extra collision parameters given data and priors. SRC-063 later forecast abstract. | Inflation bubbles are not Everett branches; non-detection of *detectable* bubble signatures does not rule out inaccessible bubbles or determine quantum histories. SRC-062 fully studied in S-001. |
| Closed timelike curves | Gödel exact geometry and Hawking conditional horizon objections, SRC-002/003 (full studies S-001). | A time-loop solution is not a branch-count measurement and backwards travel is not our primary question. |

## Reproducible calculation A · environment trace (educational, not observed data)

Take normalized entangled |Ψ>=[|0>|E0>+|1>|E1>]/sqrt(2), γ=<E1|E0>. Trace environment:

ρ_S = (1/2) [[1,γ],[γ*,1]], eigenvalues (1±abs(γ))/2.

For real γ=0.20: ρ_S=[[0.5,0.1],[0.1,0.5]]; eigenvalues 0.6 and 0.4; an ideal X-basis plus measurement has probability P(+)=0.60. Local visibility V=0.20. This does NOT turn a reduced mixture into an ontological detector: globally the unitary state remains pure, and equilibrium Bohm has the same local probabilities. Recohering the system generally requires controlling the environment.

## Reproducible calculation B · specified GRW independent-hit toy (not CSL, not a real interferometer)

Assume N=10^12 independently hit constituents, λ=10^−16 s^−1, Gaussian localization r_C=10^−7 m, displacement d=10^−6 m, t=10 s; ignore all environmental backgrounds and geometry correlations. Then d²/(4r_C²)=25; Γt=Nλt(1−e^−25)≈0.001. Ratio V_GRW/V_unitary=e^−0.001≈0.9990004998. With real environment overlap γ=0.2, P_GRW(+)= [1+0.2×0.9990004998]/2≈0.5999000500, versus unitary P(+)=0.6000000000, a difference ≈0.0000999500. These *chosen* input parameters are an algebra example, not a preparation shown to exist; a realistic composite interferometer must calculate correct collapse mass scaling and background decoherence. CSL cannot inherit this GRW rate without a separate derivation.

Falsifiable route: pre-register object preparation, separation, t, geometry and fiducial λ,r_C; characterize environment visibility V_env and instrumental uncertainty; fit observed fringe likelihood to models of the form V_env exp(−Γt); report confidence region and alternative decoherence mechanisms. Complement with 1–140 keV X-ray spectrum and model-specific radiation likelihood. An observed departure from strict unitary quantum predictions can distinguish dynamics, but unless the rival quantum-history accounts make different *operational* predictions, it still cannot distinguish Everett ontology from equilibrium Bohmian ontology.

## 2026 empirical constraint, properly scoped

XENON Collaboration, *Challenging Spontaneous Quantum Collapse with the XENONnT Dark Matter Detector*, Phys. Rev. Lett. 136, 120201, published 2026-03-23, DOI https://doi.org/10.1103/2jm3-4976 (SRC-066): published publisher material reports two orders of magnitude improvement in prior Markovian CSL parameter constraints and approximately fivefold DP improvement, with regions of originally proposed CSL parameters excluded under stated model/cancellation assumptions. Publication date differs from current review date. Full original numerical analysis, supplementary spectra and confidence contours NOT yet studied. Dai/Miao/Ma 2024 arXiv https://arxiv.org/abs/2411.17588 (SRC-067) report an updated LISA Pathfinder-derived λ_CSL≤8.3×10^−11 s^−1 at r_C=10^−7 m; projected deep-underground λ≈3×10^−11 s^−1 is NOT an achieved measurement. Do not merge instruments/model parameters without their full noise descriptions.

## Adversarial interpretation and unresolved questions

1. Many simultaneous real Everett branches and one actual Bohm configuration can share all ordinary Born statistics. One observer's unique remembered outcome is common data, not a discriminator.
2. Decoherence and Bell violation are empirically important but do not count worlds. The measurement problem and Everett Born-weight arguments require further critique.
3. A negative collapse search constrains specified physical modification parameters, not every collapse theory and not whether uncollapsed wavefunction branches are real.
4. Nonlocal Bohmian mechanics evades the local hidden-variable null of Bell. Relativistic formulation and quantum non-equilibrium extensions require careful additional assumptions.
5. Original Everett 1957 and GRW 1986 full-main-source access was insufficient in R001; label only abstract-reviewed and prioritize both next. Complete XENONnT likelihood, molecular geometry and backgrounds require independent full study.
6. The experimental 2016 Hensen second run's rigorous single-run p=0.061 must not be silently replaced with conventional p=0.029.

## Sources and reading completeness

- SRC-007 Everett 1957, original publisher abstract https://doi.org/10.1103/RevModPhys.29.454 ; full critical original paper pending.
- SRC-010 Bohm I 1952 full paper https://cqi.inf.usi.ch/qic/bohm1.pdf ; source-critical whole-main-text NOTE-043.
- SRC-059 Bohm II 1952 full paper incl. appendices https://cqi.inf.usi.ch/qic/bohm2.pdf ; NOTE-044.
- SRC-042 GRW 1986 original publisher abstract https://doi.org/10.1103/PhysRevD.34.470 ; complete paper pending.
- SRC-048 Fein et al 2019 large-molecule https://doi.org/10.1038/s41567-019-0663-9 ; abstract only.
- SRC-065 Hensen et al 2016 whole publisher HTML https://www.nature.com/articles/srep30289 ; NOTE-045, all main sections and statistical derivation; supplementary/raw not reproduced.
- SRC-066 XENONnT 2026 DOI https://doi.org/10.1103/2jm3-4976 ; abstract and targeted publisher article only.
- SRC-067 Dai/Miao/Ma 2024 https://arxiv.org/abs/2411.17588 ; abstract only.
- Full-new-source critical analysis: [Batch 002](full-study-batch-002.md); existing ten original complete critical reviews: [Batch 001](full-study-batch-001.md).

Verdict VC-008: 59→59 unchanged, editorial only, not a probability. Actual number of histories in our universe remains empirically unresolved.
