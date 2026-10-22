# HAMMER R004: adversarial observational-discriminator audit

Date: 2026-10-22 · S-003-R004 · **theory-only analysis, no new detector measurement**.

## Scientific question
Does the universe actually contain only one physically realized history, or multiple physically real branches? The immediate tool-building question is narrower: **what measurements could distinguish clearly specified accounts, after nuisance and alternative models are allowed to fight back?**

## Models and existing evidence

1. **Everettian unitary quantum theory** supplies Born-weight outcome statistics. Many physically real branches are an ontological interpretation of the state; simply reporting quantum interference or Bell correlations does not prove branch counting.
2. **Quantum-equilibrium Bohmian theory** supplies definite configurations and the same Born probabilities when the experiment and state match. Thus ordinary pointer records in this class cannot decide between a Bohmian single actual configuration and Everettian branch ontology. This conditional equality has a full derivation and executable reconstruction in [S002-R012](operational-identifiability-S002-R012.md); the result does not claim all imaginable pilot-wave nonequilibrium extensions share this equality. Roderich Tumulka's *Bohmian Mechanics* (arXiv:1704.08017) is supporting primary background, checked at abstract/targeted level here, not newly flagged as a full original study.
3. **Objective physical loss / collapse** changes the dynamical law rather than only the metaphysical interpretation, so some precisely specified coherence-recovery experiments may distinguish it from unitary predictions. A toy irreversible mixture is not a fitted GRW/CSL likelihood; absence of recoherence could also reflect decoherence and imperfect control.

## Research invention: adversarial wedge as a falsification gate

Define a pair of predicted categorical outcome distributions `p(x|H_A,d,η_A)` and `q(x|H_B,d,η_B)`, for design `d` and explicit nuisance variants `η`. With `m=(p+q)/2`, compute
`JSD_2(p,q)=½∑p log₂(p/m)+½∑q log₂(q/m)`.
For the submitted, **finite** nuisance sets, HAMMER computes `W(d)=min_{η_A,η_B} JSD_2(p,q)`. A secondary exploratory planning rank is `W(d)/cost(d)`, with **user-invented cost units**. This quantity is bounded and interpretable, but neither a significance p-value nor the probability that either physical theory is true. A condition that some *unmodeled* nuisance may counterfeit the signal cannot be ruled out by this finite grid.

### Independently computed deterministic exercise

| ID | Nominal JSD (bits) | Adversarial JSD (bits) | Interpretation |
|---|---:|---:|---|
| HM-001 | 0.000000 | 0.000000 | Everett/Bohm matched Born pointer **nonidentifiable** by that recorded class |
| HM-002 | 0.146793 | 0.020550 | Conditional test of **stipulated** physical loss against toy imperfect recovery |
| HM-003 | 0.117663 | 0.000000 | Nominally promising signal **destroyed** when an allowed nuisance variant exactly matches |

Computed by `node tools/hammer/test.cjs` and `node tools/hammer/run.cjs --check` using `data/hammer.json` and the pure shared `assets/hammer-core.js`. All theory probabilities and nuisance variants are **illustrative inputs invented for design testing**, not estimates drawn from real qubit trials; no scientific source count or "fully studied" status advances. The nominal information for HM-003 would be actively misleading if reported without the nuisance challenge.

The minimax search is an engineered synthesis of prior ideas in robust Bayesian experiment design and model discrimination, rather than a newly proved mathematical principle. Relevant background: Jinwoo Go & Tobin Isaac, *Robust Expected Information Gain for Optimal Bayesian Experimental Design Using Ambiguity Sets* (arXiv:2205.09914, background abstract review only).

## Two original falsification paths to pursue next

**Path A, probe a genuinely altered law.** Specify a collapse model's full Lindblad/CSL generator, collapse length/rate, detector efficiency, control pulses, correlations and nuisance parameters. Derive experimentally accessible count distributions for an actual experiment and contrast with unitary predictions. Locate public original measured data plus experimental calibrations; do not substitute our toy 0.9/0.5 design. If the measurement supports a difference, move a **model-specific dynamics constraint**, not a branch-ontology verdict.

**Path B, try a genuinely different histories test.** Identify a concrete nonequilibrium pilot-wave preparation or a distinct Everett extension that predicts a Born-rule violation while standard equilibrium Bohmian and Everett do not; specify a viable physical preparation mechanism, observation, uncertainty and competing astrophysical/environmental explanations. If no experimentally feasible preparation exists, record the resulting no-go as valuable evidence *about testability*, not evidence that there are many or one real histories.

## HAMMER reviewer protocol and status

The owner chooses **two distinct AI-model reviewers, no human scientific professors**. HAMMER accepts a primary-source study packet and makes two **separate real provider calls per model**: source study then adverse scientific critique. A claim of scholarly expertise is forbidden. Model reviews are not experimental replications, may share training and biases, and are **advisory-only** until a source-bound independent reproduction + signed decision gate is engineered. No API credential or research study packet was supplied in this round; **zero AI review requests were executed**, and no model is falsely reported to have approved a finding.

**Verdict:** WC/VC-013 central editorial **50→50**, empirical question unresolved; this tool adds mathematical decision discipline but no measured ontology discriminator.

**Continuity:** S-003-R004 should document all seven site workstreams and CONTINUE for the next deep reading/reproduction program. Real iPhone Safari and accessibility review remain separate from the owner's no-human-*scientific*-review policy.
