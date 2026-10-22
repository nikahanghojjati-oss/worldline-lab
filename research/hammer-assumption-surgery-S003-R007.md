# HAMMER R007: Assumption Surgery and Operational Ontology Boundary Certificates

**Date:** 2026-10-22. **Research state:** reproducible mathematical and epistemic method, no new physical observation. **Core question:** whether our actual universe has one physically realized history or many physically real histories.

## Abstract

We introduce **HAMMER Assumption Surgery**, a versioned research workflow for protecting the central question against false-positive ontological inference. The method pairs (i) a no-go inequality, (ii) an explicit countermodel realizing the *same recorded data with a different history ontology*, (iii) a finite adaptive-measurement equivalence certificate, (iv) an auditable catalogue of which theorem premises remain candidates for rejection, and (v) a **minimal operational mutation design** that specifies the new physical effect an experiment would have to establish to become discriminating. This is a new *integration and research artifact within Worldline Lab*, **not a claim that Bell inequalities, Wigner-friend theorems, minimax countermodels, or the probability chain rule were invented here**.

We do not establish a new fundamental theorem about nature, observe a physical branch, or run genuine quantum hardware. We derive exact results from stated mathematical models, identify necessary extra assumptions for new experiments, and explicitly prohibit central Truth Compass movement without measured likelihood differences between fully specified competing models.

## 1. What the primary sources actually say

**Primary theorem, abstract/full publicly visible metadata and mathematics at targeted level:** Bong et al., *A strong no-go theorem on the Wigner's friend paradox*, *Nature Physics* **16**, 1199–1205 (2020), DOI [10.1038/s41567-020-0990-x](https://doi.org/10.1038/s41567-020-0990-x); preprint [arXiv:1907.05607](https://arxiv.org/abs/1907.05607). Under assumptions including no-superdeterminism, locality, absoluteness of observed events and controllable quantum dynamics at observer scale, the relevant extended Wigner-friend quantum predictions violate the conjunction. The proof-of-principle experiment substitutes a photon's path for an observer; it is **not** an actual conscious observer or proof of multiple physical timelines. The LF inequality is **not interchangeable** with ordinary CHSH, as the paper emphasizes.

**Recently published critical extension, abstract/intro and references checked:** Laurens Walleghem, *Questioning the absoluteness of free choices when internalized in Wigner's friend scenarios*, *Physical Review A* **114**, 032431, **September 14, 2026**, DOI [10.1103/hf5j-t83v](https://doi.org/10.1103/hf5j-t83v). This adds an extended-friend argument involving physical assumptions about free choices. It changes the assumption landscape; it does not isolate many worlds as the only resolution.

**Contrary assessment:** *Reassessing the Strength of a Class of Wigner's Friend No-Go Theorems*, *Entropy* **27**, 563 (2025), [open abstract/discussion](https://pmc.ncbi.nlm.nih.gov/articles/PMC12192408/). This challenges claimed strength and background applicability. Source reading here is abstract/excerpts only; it is not designated a full original critical read. Competing views must remain visible.

**Broader conceptual check:** *Stanford Encyclopedia of Philosophy*, [Many-Worlds Interpretation of Quantum Mechanics, Summer 2026](https://plato.stanford.edu/archives/sum2026/entries/qm-manyworlds/), especially section 6 on potential tests. This distinguishes physical collapse extensions from no-collapse unitary interpretations, while acknowledging the practical Everett/Bohm indistinguishability. Not a new experimental measurement.

**Source-progress accounting:** None of these entries is silently promoted to fully read in the pre-existing Scholar Library. The prior 77 indexed works, 68 notes, 28 full original critical readings remain the last verified official counts.

## 2. Exact CHSH countermodel that prevents an invalid many-worlds conclusion

Choose equatorial spin directions `a0=0, a1=π/2, b0=π/4, b1=−π/4`; Born singlet correlation is `E_xy = -cos(a_x-b_y)`. Define

```text
S = E_00 + E_01 + E_10 - E_11 = -2√2.
```

All sixteen deterministic Bell-**local** assignments `A0,A1,B0,B1 ∈ {-1,+1}` satisfy `|S|=2`, and any probabilistic mixture satisfies `|S|≤2`. This is the established CHSH result, not a new theorem. The quantum ideal exceeds 2 by `2(√2−1)≈0.82843`.

**Countermodel with exactly one realized observed pair per run:** Draw two independent uniform random seeds `u,v∈[0,1)`. Output `A=+1` if `u<1/2`, otherwise `A=−1`. Define `E=-cos(a_x-b_y)`. Set `B=A` when `v<(1+E)/2`, otherwise `B=−A`. Equivalently, for `A,B∈{-1,+1}`,

```text
P(A,B|x,y) = [1+A B E_xy]/4.
```

This explicitly produces **a single definite result pair** and the same four singlet quantum statistics and non-signalling marginals for the chosen Bell experiment. It escapes the local bound because **B depends on the remote setting x at the hidden-variable level**; this is not Bell-local causality. It is a mathematical *nonlocal, measurement-context-dependent response model*, **not Bohmian mechanics**, not a Lorentz-covariant physical completion, not a Local Friendliness construction, and not a mechanism for superluminal communication. The empirical point is logically precise: violation of the CHSH local bound **alone cannot establish that more than one observed result pair actually exists**.

The implementation enumerates all 16 local deterministic strategies, verifies the quantum bound, and checks synthetic empirical frequencies of the one-history sampler against all four exact joint tables. No external random sample is counted as experimental evidence.

### 2.1 Calibration robustness and falsification

Assume **each of four estimated correlations** has unknown absolute systematic deviation bounded by `δ`. The triangle inequality implies the conservative lower bound

```text
|S_true| ≥ |S_reported| - 4δ .
```

For the **ideal quantum target**, rejection of the Bell-local bound is guaranteed only if `δ < (2√2-2)/4 ≈ 0.2071068` per correlator. This is a design margin for **bounded per-correlator systematic error**, not a real observed Bell-test uncertainty, statistical confidence, detection-loophole closure or actual source-calibration estimate. A real experiment must also address finite counts, selection, detection and independence assumptions.

## 3. Adaptive protocol barrier: asking more questions cannot distinguish identical models

Suppose two rival ontological theories assign identical **full operational conditional probabilities** `P(o_t|h_{t-1},a_t)` for every actually accessible prior history and action, and each adaptive policy selects the next operation based solely on the observed history. For any action policy `π` and length `T`,

```text
P(o_1,...,o_T|π,H) =
       Π_{t=1}^T P(o_t | o_1,...,o_{t-1}, a_t=π(h_{t-1}), H).
```

By the chain rule, **if all the operational conditional kernels coincide, the probability of every adaptive outcome sequence coincides**. No data processing, repetition, clever feedback, classical postselection or extra compute can make the distinguishing Jensen–Shannon distance positive within these premises. This is an elementary conditional-probability argument, made an explicit bounded verifier in HAMMER rather than claimed as a new theorem.

The executable model enumerates eight distinct binary depth-two action policies. Every one returns exactly zero JSD when the conditional kernels are identical. This finite test is an illustration of the general chain-rule argument, **not an exhaustive verification of all conceivable physical protocols**.

### 3.1 The mutation required to make HAMMER productive

To turn the question into experiment design, specify one **actual changed operational prediction**, not just a verbal ontology switch. HAMMER adds a toy extension at one history/action conditional probability and searches which adaptive policy best exposes it. In the deliberately invented numerical setup, changing `P(0|history=1,action=x)` from 0.70 to approximately 0.74708 is enough to create **0.001 JSD bits** under policy `x-z-x` (first operation x; then z after outcome 0 and x after outcome 1).

This computed **4.708 percentage-point change** is an arbitrary theory-design threshold under invented conditional kernels, not a physical pilot-wave nonequilibrium prediction, measurable statistical power, valid physics theory, or a branch-count posterior. The conditional preparation must be derived independently from a physically specified model and detector controls, and the alleged operational deviation actually measured, before the central question acquires empirical discriminating power.

## 4. Assumption Surgery: enumerate escape routes instead of declaring victory

Represent each applicable no-go argument by the set of assumptions whose conjunction leads to a conditional contradiction. Our **limited schematic dependency model** uses:

- CHSH: Bell-local factorization and measurement independence, **conditional** on a suitable common-cause hidden-variable representation and ordinary probability bookkeeping. It is not an all-purpose complete reconstruction of every variant of Bell's theorem.
- Local Friendliness: absoluteness of observed events, local agency, and no-superdeterminism; **conditional** on observer-scale controllable reversible quantum operations and the appropriate *LF* inequality violation, **not merely a CHSH violation**.

A minimal hitting-set enumerator generates sets of assumptions whose rejection would formally break **both** conjunctions. With the five explicitly distinguished assumptions above, the smallest cuts contain **two** members, one from the schematic Bell assumptions and one from the LF assumptions, for six minimum two-element cuts. No cross-theorem premise is quietly identified as identical: Bell local causality and LF local agency are not necessarily the same constraint. This algorithm is useful bookkeeping; neither falsifies each relaxed assumption nor shows all cuts are physically possible or equivalent.

The inference firewall: **ruling out a conjunction never proves which of its disjuncts is false**. Declaring that the observed world must therefore have many physical branches would be invalid unless all viable single-history alternatives were eliminated under independently justified conditions. Our constructive one-history Bell response is a concrete reminder of such alternatives, but does not itself address the full extended-friend protocol.

## 5. What is new here, and what is not

**A new Worldline Lab reproducible research method:** generate a *dual certificate*—the exact theorem boundary and a concrete rival-ontology outcome construction—then (a) quantify an ideal calibration robustness margin, (b) test adaptive impossibility under equal kernels, (c) enumerate necessary assumption cuts, and (d) search for a specified minimum extension that creates a new measurable wedge. It converts failed attempts to prove many worlds into a **physical experimental requirement** instead of recycled general commentary. This provides a credible, first implementation of the research workflow HAMMER was designed to support.

**Not new mathematics or experimental data:** Bell inequality; LF theorem; chain rule; stochastic hidden-variable sampling; Jensen–Shannon divergence; subset enumeration. Whether the particular integration is unprecedented in external scientific software has **not been comprehensively established**; novelty checking, scientific criticism and external replication remain required.

**Exact next target for revolutionary progress:** Supply a physically allowed single-history extension and a many-history extension with genuinely different **operational conditional kernels** under the same accessible preparation. Do not start from an ontology preference. Require an actual source-grounded interaction Hamiltonian or dynamics, control/noise model, preparation feasibility, rival-likelihood predictions, and experiments already published or realistically producible. The moment a measured result constrains such a prediction, HAMMER can add a **model-scoped Ledger fact** with its own confidence and falsifier. Moving the *central* one-vs-many meter requires more: the measurement must discriminate the **history ontologies themselves**, not merely collapse dynamics or a hidden-variable model that is not representative of all one-world theories.

## 6. Reproducibility, limits, and decision

```bash
node tools/hammer/assumption-surgery-test.cjs
node tools/hammer/assumption-surgery.cjs
```

Full automated CI also runs legacy source integrity, HAMMER scientific derivations, nine research-lab browser functions, and axe WCAG checks. No real hardware used, no human scientific reviewer required under owner policy, and **no two-model external AI review was actually executed in this round**. This is a rigorous *mathematical/source-research result* with a programmatic falsification strategy, **not a claim of discovering previously inaccessible physical branches**.

**Scientific verdict:** central VC-013 editorial 50→50, not a Bayesian 50% probability. More honest finding: standard quantum-Born-equivalent one-world and many-world formulations are nonidentifiable via experiments for which their full conditional operational predictions match. **Recommended transition:** CONTINUE. Next literature/source-to-model work: published exact Hamiltonians and data on real macroscopic interferometry / collapse deviations, or genuinely operational alternatives to quantum equilibrium. Next mandatory complete eight-route source freshness sweep at cumulative roundLog 27 (S-003-R008).
