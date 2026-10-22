# HAMMER scientific contribution S-003-R006
## Two-mechanism identifiability, a separation-design falsifier, and a source-equation consistency audit

**Date:** 2026-10-22. **Status:** internally reproducible mathematical analysis, original project-specific synthesis and source criticism; **not a newly established physical law, peer-reviewed discovery, physical measurement, or direct observation of a universe with one or many branches.** Main question remains open.

### Abstract

We investigate when a putative intrinsic localization contribution can be statistically separated from environmental decoherence in a two-arm binary-interference experiment. For a generic contrast law, we derive the exact two-parameter Fisher matrix, its factorized two-arm determinant, a necessary local identifiability condition, an asymptotic variance floor, and a finite optimal-shot allocation. We apply this to a **dimensionless conceptual separation model**, with environmental sensitivity quadratic in displacement and a separate saturating response for intrinsic localization. The design search reveals why closely spaced small-separation arms are nearly indistinguishable, while extreme separations eventually become statistically weak as contrast vanishes. We also reproduce six **potential internal consistency problems** in the displayed mathematical equations and numbers of a 2025 *arXiv preprint* that proposes physical discrimination of decoherence and objective collapse. These are questions for correction or author clarification, **not accusations of fraudulent data**, and not evidence that collapse physics exists or fails. All scripts reject unverifiable measured-data status and all Truth Compass score changes.

### 1. Scientific context and source provenance

**Directly read at section-level:** Ridha Horchani, *Experimental Blueprint for Distinguishing Decoherence from Objective Collapse*, posted December 2, 2025, [arXiv:2512.02838](https://arxiv.org/abs/2512.02838). We inspected HTML mathematical sections **II.1, II.2, II.4 and III**, including displayed equations (4), (5), (10), (12), (13), (16), (18) and the numerical paragraph after Fig. 3. This is a **preprint**; these comparisons should be repeated against the current author PDF and any corrections before externally asserting a mistake.

**Abstract-level prior art, not newly read full:** Shaun Laing and James Bateman, *Bayesian inference for near-field interferometric tests of collapse models*, *Physical Review A* 110, 012214 (2024), [DOI:10.1103/PhysRevA.110.012214](https://doi.org/10.1103/PhysRevA.110.012214). The authors already model gas/blackbody environmental decoherence, CSL and experimental control optimization. HAMMER **does not** claim to invent the goal of optimizing an experiment to separate collapse from environmental noise.

**Abstract-level methodological cross-check, not newly read full:** Davide Giordano Ario Altamura, Andrea Vinante and Matteo Carlesso, *Improved bounds on collapse models from rotational noise of the Laser Interferometer Space Antenna Pathfinder mission*, *Phys. Rev. A* 111, L020203 (2025), [DOI:10.1103/PhysRevA.111.L020203](https://doi.org/10.1103/PhysRevA.111.L020203). Rotational versus translational response illustrates a different experimental sensitivity axis. Its specific noise data were not reproduced here.

**Targeted introduction/background:** Björn Schrinski et al., [arXiv:2008.13580](https://arxiv.org/abs/2008.13580), discusses atom-count distributions in CSL-sensitive BEC interferometry rather than relying solely on means. This again motivates testing *which observable carries information*, not claiming novelty from measuring full distributions.

No indexed source work, note or full original study has been recategorized as a result of this round: established repository totals 77/68/28 are unchanged.

### 2. First scientific result: an explicit two-rate identifiability criterion

For arm `j`, suppose a binary parity/readout has probability

```text
p_j(+) = [1 + V_j] / 2
V_j = V0_j · exp{-t_j [ gamma · a_j + lambda · b_j ]}
```

with *known* baseline contrast `0<V0_j≤1`, positive interrogation time, environment strength `gamma>0`, intrinsic-localization strength `lambda>0`, and given *nonnegative* sensitivities `(a_j,b_j)`. The `a,b` parameters are **phenomenological design inputs**, not exact fitted GRW/CSL generator coefficients. Assume `N_j` **independent** Bernoulli shots, correctly classified outcomes, matched preparation and known contrast. Unmodeled drift, unknown contrast, temporal correlations or detector dependence **invalidate** this idealization.

With `v=V_j`, the two derivatives are `∂p/∂gamma=-t_j a_j v/2`, `∂p/∂lambda=-t_j b_j v/2`. Since `p(1-p)=(1-v²)/4`, each arm's expected Fisher contribution is

```text
F_j = w_j [a_j,b_j]ᵀ [a_j,b_j]
w_j = N_j t_j² v_j² / (1-v_j²).
```

For exactly two arms, direct 2×2 expansion yields **the determinant identity**

```text
det F = w_1 w_2 · (a_1 b_2 − a_2 b_1)².
```

Therefore (in the interior with finite positive weights) **local joint identification is possible iff the two sensitivity vectors are linearly independent**. Identical sensitivity ratios make the nuisance and putative intrinsic strength structurally confounded: repeating the *same types* of measurements increases counts but **never gives a second parameter direction**. This is a standard Fisher/rank result derived for HAMMER's explicit question, **not a new theorem in statistics**.

For nonsingular F, the Cramér–Rao *asymptotic local* lower bound for an unbiased regular estimator is

```text
Var(lambda-hat) ≥ F_gamma,gamma / det F.
```

A numerical error floor is **not** a posterior probability that lambda is nonzero, a globally valid interval near the physical boundary lambda=0, or an empirical significance statement. This analysis explicitly distinguishes *formal identifiability* from *practical resolving power*.

**Reproducible toy test:** `gamma=0.20, lambda=0.10`; sensitivities `(1,1)` and `(2,0.5)`, each `t=1,V0=1,N=1000`. The independent check yields per-shot weights ≈1.21637 and ≈0.68512; the conditional lower bound for the intrinsic-rate standard error is ≈**0.04594** (same artificial inverse-time units). The cross product is −1.5, hence identifiable. When both vectors are multiples of each other, the numerical determinant and true rank are zero. `tools/hammer/identifiability-test.cjs` checks the derivative by centered finite difference, both determinant calculations, synthetic likelihood behavior, collinear no-go, and an integer shot-allocation optimization that can do no worse than equal allocation.

**Resource implication:** With two independent arms, define `c_j=t_j² V_j²/(1−V_j²)`, `w_j=N_j c_j`, and the cross-product `Δ=a_1b_2−a_2b_1`. Then
`Var(lambda-hat) ≥ a_1²/(N_2 c_2 Δ²) + a_2²/(N_1 c_1 Δ²)`, and the ideal continuous optimum at fixed `N_1+N_2=N` is
`N_1/N_2=|a_2/a_1| sqrt(c_2/c_1)` for nonzero `a_1,a_2`. An integer exhaustive-search engine verifies allocation numerically instead of assuming equal shots.

### 3. Second result: why a localization “saturation lever” has a difficult sweet spot

Motivated by the different *shapes* of quadratic environmental diffusion and saturating localization discussed in arXiv:2512.02838, consider **toy dimensionless** displacement `x=d/r` and sensitivities

```text
a(x) = x²                         (hypothetical environmental channel)
b(x) = 1 − exp(−x²/4)             (hypothetical saturating localization)
V(x)=0.98 exp[−0.09 a(x)−0.12 b(x)].
```

This is the **pointlike shape**, *not* a calibrated full CSL prediction for finite-radius spheres, since mass, geometry, spectral environment, joint detector noise and instrument exposure are unspecified. All constants are **invented demonstration inputs**.

At `x << 1`, `b(x)=x²/4−x⁴/32+O(x⁶)`. Hence the environment and localization sensitivity vectors become almost proportional for two small displacements; the 2-arm cross-product is suppressed. At larger `x`, `b(x)` saturates whereas `a(x)` keeps growing, separating shapes—but exponential contrast losses reduce `w_j`. The useful experiment must balance **contrast** and **different response directions**.

An exhaustive finite search on `x=.15,.30,...,4.50` with 1000 ideal shots per arm finds a conditional minimum intrinsic-rate standard-error bound near **(1.35, 4.50)**, ≈**0.1132** artificial rate units. The close-small pair **(.15,.30)** has a bound ≈**151.7**, an extreme identifiability penalty. The optimal bound of ≈0.113 is itself on the order of the injected toy intrinsic rate 0.12: **being identifiable is not being convincingly measurable**. These are dimensionless illustrative numbers, not experimental performance forecasts. Code: `tools/hammer/separation-design.cjs` and its negative controls.

**Strongest falsifier:** If an independently validated environmental mechanism also saturates with the same displacement signature (or shared drift renders the two controls non-independent), the proposed separation advantage may vanish. This requires a realistic multi-channel master equation and actual instrument parameters. Measuring a physical collapse-type deviation would constrain **specified dynamical modifications of quantum theory**; it would **not** by itself count Everett worlds or refute equilibrium Bohmian mechanics.

### 4. Third result: critical original-source mathematical and numerical consistency checks

Using *only the displayed statements* from arXiv:2512.02838 as of our 2026-10-22 reading, `tools/hammer/source-critique.cjs` reproduces **six issues requiring author/figure clarification**. HAMMER does **not** infer deliberate mistakes or disprove the paper's whole model.

1. **Equation (5), gate unitarity:** The paper defines `D(beta)` as the standard **unitary** displacement operator but writes a scalar `exp[−(eta theta)²/2] × D(i eta theta sigma_z)` for a supposed unitary gate. Its norm squared would multiply by `exp[−(eta theta)²]` for nonzero coupling; e.g. at `eta theta=.5`, factor ≈**0.7788**, not one. Perhaps a normal-ordering prefactor was included twice. This needs comparison to the source derivation or correction.

2. **Equations (12) and (13), zero-separation limit:** The displayed finite-sphere rate factor is `f(x,y)=1−(1+y²)^(−3/2) exp[−x²/(4(1+y²))]`. For finite radius `y=R/r_C=.5` at `x=0`, it equals ≈**0.28446**, whereas the text's small-separation formula is proportional to `x²` and predicts zero. The paper may omit the zero-separation self-correlation subtraction. This is an equation-as-written inconsistency, not an independent full CSL derivation.

3. **Paragraph after Fig. 3, quoted dominance:** Given the printed environmental rate `8.99×10^(−3) s^(−1)` and collapse rate `7.93×10^4 s^(−1)`, the collapse term is **8.82 million times larger**, not environmentally dominated by nineteen orders of magnitude as the following sentence describes. The exponents or simulation regimes may be mixed.

4. **Same paragraph, lifetime arithmetic:** With those two printed decay rates the implied reciprocal lifetime `1/(Γ_env+Γ_CSL)` is ≈**1.261×10^(−5) s**, whereas printed `τ_coh≈1.1×10^(−24) s`. The latter does not follow from the displayed rates. No observed lifetime is being disputed; these are internally presented theoretical numbers.

5. **Equation (12) using the stated example:** Substituting the stated parameters `λ_CSL=10^(−21) s^(−1)`, `m=10^(−17) kg`, `m0=1.66×10^(−27) kg`, `R=50nm`, `r_C=100nm` and `Δx=100nm` into equation (12) yields on the order of **10^(−2) s^(−1)**, not the independently quoted `7.93×10^4 s^(−1)`. The article spans multiple parameter regimes; **do not assume this is a direct figure replication until the exact figure scenario is clarified**.

6. **Equation (15), Diósi–Penrose asymptote:** The printed expression is proportional to `1−R_0/sqrt(R_0²+Δx²)`. As `Δx/R_0→∞`, the rate approaches a **constant**, not a nonsaturating rate that scales as `1/Δx`. Its *difference from the asymptotic plateau* goes as `R_0/Δx`. For `Δx/R_0=10`, the normalized rate is ≈0.9005; for 100, ≈0.9900. This challenges the text immediately after (15), not the entire Diósi–Penrose framework.

All six checks are *candidate mathematical corrections/author questions*; an externally validated literature-correction finding requires checking the definitive paper version, equations and original numerical code, and ideally contacting the author. The manuscript is a preprint, and its broader collapse program is not thereby proven false. The source audit does not authorize rewriting the Truth Compass or adding unverified findings as physical evidence.

### 5. Why this scientific work matters—and what it does not prove

HAMMER has moved from drawing plausible hypothetical distributions to generating **auditable research material**:
- a first-principles parameter-identifiability criterion,
- a numerical experiment-design algorithm with explicit uncertainty floors,
- a falsifiable displacement-sensitivity strategy with critical confounders,
- and independently reproducible **source consistency questions** whose existence can be checked against a particular posted set of equations.

All results are clearly classified. Fisher geometry is *existing statistics*, saturation in collapse-type proposals is known prior art, and the source discrepancies need external/author cross-checking. No new detected quantum phenomenon, previously unknown physical law, actual objective collapse event, measured history count, independently reviewed theorem or 2026 physics discovery is asserted.

The scientific impact may lie in making a better, pre-registered real experimental design and catching incorrect assumptions **before** claiming an effect. Important future steps: exact CSL finite-sphere form factor from original source derivation, independent environmental calibration, true shot distribution (not a made-up parity model), full source PDF comparison, numerical replication against published figures and eventually genuine original detector data.

### 6. Reproduction commands and verdict

```bash
node tools/hammer/identifiability-test.cjs
node tools/hammer/separation-design-test.cjs
node tools/hammer/source-critique-test.cjs
node tools/hammer/identifiability.cjs
node tools/hammer/separation-design.cjs
node tools/hammer/source-critique.cjs
```

**Evidence categories:** derived mathematics; conditional theory-only simulation; source-equation consistency audit. **Real experiments performed:** none. **AI scientific model panels invoked:** none. **Independent paper author response:** none. **Science ledger decision:** *NO CHANGE*, editorial neutral 50; physically one-history vs many-history ontology unresolved. **Continuity:** S-003-R006, CONTINUE. Mandatory full eight-route content source sweep remains due at cumulative round-log entry 27 (R008).
