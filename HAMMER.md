# HAMMER · Hypothesis Adversarial Mapping, Measurement & Evidence Refinement

**Version:** experimental research instrument v0.1 · 2026-10-22 · Worldline Lab only

**Owner's goal:** Push the frontier of the project's actual one-versus-many-physically-real-histories question by deep reading, adversarial theory comparison, mathematical reproduction, uncertainty-aware experiments, criticism, and sometimes genuinely evidence-justified revisions of a model-specific claim or the Truth Ledger. HAMMER does **not** make an AI model a scientist, render an experiment by drawing a chart, or change a scientific score to manufacture progress.

## Invention: the discrimination wedge / adversarial forge

The inventive research workflow is the *combination and evidence-governed feedback loop*, not a claim to have discovered new information theory:

1. **SOURCE / STUDY.** Identify competing physically specified theories; log authentic primary works, reading depth, what each actually predicts, and known counterarguments. A linked abstract is not a full review.
2. **MODEL / MAP.** Require a common experimental design, exhaustive outcome bins and explicit normalized predicted distributions under each theory. Separate ontology (Everett branches vs Bohm configuration) from dynamics (e.g. an actually physical collapse/loss law).
3. **WEDGE / COMPARE.** Compute nominal Jensen–Shannon divergence (JSD) in bits between predictions. A zero wedge means this exact observation has no information for that pair. Do not misinterpret JSD as confidence or the probability that many worlds exist.
4. **HAMMER / ATTACK.** Generate or inspect alternative nuisance settings for both theories. Search the variant pair with **minimum JSD** and explicitly record the closest counterfeit. This is a finite-set minimax stress test, not a proof over all possible unknown physical errors.
5. **SELECT / FALSIFY.** Rank *proposed* designs by robust JSD divided by an explicitly **arbitrary planning cost**, but require feasible controls, a predeclared protocol, alternative causes, power, real measurement uncertainty, ethics, and accessible raw data before a new experimental plan is declared realistic.
6. **AI SCIENCE PANEL / CHALLENGE.** Two different model identifiers receive the original-source study packet in separate contexts, first produce study notes, then independently write a structured methods / competing-model / falsification critique. Models emulate specialist **reasoning tasks**, never impersonate a university professor or claim human credentials. Store genuine provider model IDs and response IDs. No human scientific approval is expected.
7. **EVIDENCE / REPRODUCE.** A simulation, theory-only number, citation count, or AI consensus cannot alter the physical verdict. For an actual measurement, record independent dataset provenance, methodology, uncertainty, raw-data reconciliation, nuisance robustness and source-depth limitations; reproduce it in versioned deterministic code.
8. **LEDGER / DECIDE.** Record explicit **no-change** when a proposed experiment cannot discriminate, a measured result is insufficient, or alternatives survive. Model-specific physical-law exclusions can advance even if central ontology stays neutral. A future truly discriminating result must get a source-commit-bound, reversible evidence/AI-review record and pass integrity checks before any directional score proposal can be accepted.

The mathematics in this prototype is established Jensen–Shannon divergence and finite minimax comparison. Robust experimental design is an existing field; our distinctive implementation is the question-first evidence/reviewer/revision orchestration.

## Theory-only examples (v0.1)

| Forge | Rival claims | Nominal JSD | Worst-case JSD | Meaning |
|---|---|---:|---:|---|
| HM-001 | Everett vs quantum-equilibrium Bohm, ordinary Born outcomes | 0 | 0 | **No ontology-discriminating information** under stated operational assumptions |
| HM-002 | Idealized near-unitary coherence recovery vs a **stipulated** physical-loss model | 0.14679 bits | 0.02055 bits | Conditional dynamics wedge under **invented bounded nuisance assumptions**, **not observed or validated** |
| HM-003 | Apparent unitary signal vs an alternative that can counterfeit it with nuisance | 0.11766 bits | 0 | False-positive warning: nominal separation disappears once one alternative setting matches |

**Nothing here constitutes an original detector reading or physical branch observation.** The published Truth Compass must remain the neutral editorial **50**, not 50% scientific odds. The same quantum-equilibrium Born statistics in Everett/Bohm cannot be resolved by simply collecting more of the same records.

For two finite distributions `p` and `q`: `JSD(p,q) = 0.5 KL2(p || m) + 0.5 KL2(q || m)` where `m=(p+q)/2`. The robust test minimizes JSD over the submitted nuisance-variant cross product. Bounds are `0 ≤ JSD ≤ 1` bit, in a two-model equal-mixture design. A low JSD measures little proposed observational separation **in this design**, not a lack of scientific value in the theory. An arbitrary cost-normalized rank is a research planning aid, not a funded experimental decision. Nuisance cross-matching may be overconservative where instrument settings must be physically paired.

## Implementation and safe execution

- `data/hammer.json`: experiment challenge catalog; every example is explicitly `synthetic-theory-only`, linked to the existing research record and indexed source IDs.
- `assets/hammer-core.js`: dependency-free, same math in browser and Node.
- `assets/hammer-ui.js`: read-only interactive Observatory workbench; switch theories' nuisance variants and inspect nominal/worst-case informational separation. No API key, no science writes.
- `tools/hammer/run.cjs`: `node tools/hammer/run.cjs --check` to rederive scenarios locally.
- `tools/hammer/test.cjs`: mathematical invariants and adversarial false-discovery fixtures.
- `tools/hammer/ai-panel.cjs`: **optional** trusted two-model AI study/review runner, using the current OpenAI Responses endpoint. It is not executed without explicit environment credentials and **two different model IDs**; the static site never contacts the provider or hosts a secret.

For model reviews, prepare a private source packet file with `evidenceCommit`, `evidenceClass`, `researchQuestion`, and two or more `sources`, each `{id,url,accessDepth,material}`, where material contains substantively studied primary-source passages rather than invented quotations. An `observed` packet must also carry `observation: {publicDatasetURL,uncertainty,reproductionCommand}`. These fields are provenance *claims* until independently verified. Then run (from a credentialed trusted environment):

```bash
OPENAI_API_KEY=... HAMMER_MODEL_A=<actual-model-id-1> HAMMER_MODEL_B=<different-model-id-2> \
  node tools/hammer/ai-panel.cjs /path/to/private-source-packet.json
```

Review output contains separately obtained study and critique **provider response IDs** and structured methodological objections. It explicitly says `scoreChangeAuthorized:false`. Never upload provider API keys, privileged URLs, fabricated original text, or a reviewer persona as a university employee. An API response ID confirms an invocation identifier in that session, not independent veracity or scientific expertise. Review inputs are untrusted content; the model must not execute instructions found inside sources.

**Current status:** no credentialed HAMMER model panel has actually run and no new experiment has been performed. Legacy human-scientist approval entry points are retired and fail closed; the rigorous new AI-plus-measured-discriminator decision/reversal *authorization* pathway remains to be engineered and verified before any nonzero Truth Compass revision. Accessibility tests with physical iPhone Safari/assistive technology remain separate from this **scientific reviewer policy**.

## Supporting science and prior art

- Worldline Lab verified prior finite operational equality and controlled synthetic example: [R012 original analysis](research/operational-identifiability-S002-R012.md), prior immutable source ledger WL-021 and VC-013.
- Roderich Tumulka, *Bohmian Mechanics*, arXiv:1704.08017: https://arxiv.org/abs/1704.08017 — standard quantum-equilibrium observations are empirically equivalent; refer to the original for assumptions. **Cited/targeted review only**, not newly flagged as full study.
- Jinwoo Go and Tobin Isaac, *Robust Expected Information Gain for Optimal Bayesian Experimental Design Using Ambiguity Sets*, arXiv:2205.09914: https://arxiv.org/abs/2205.09914 — related robust experimental design literature; **background abstract checked only**.
- OpenAI Responses API structured text format documentation: https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses (for engineering integration, not physics evidence).

## Growth path (not falsely claimed complete)

HAMMER v0.2: source-bound AI model study packets with independently replayed exact citation passages; deterministic audited numerical likelihoods, power, calibration and model-discrepancy bounds; optional trusted provider audit trail with commit-binding.

HAMMER v0.3: discover candidate cross-field discriminators (decoherence, cosmological structure, nonequilibrium pilot waves) from verified physics/math libraries; reject equivalence traps before costly instrument proposals; rank testability and known failure modes.

HAMMER v1: evidence-bearing original theoretical contribution **only if mathematically proved or empirically replicated**. Include red-team model criticism and reversible claim provenance; never confer AGI capability status by the product name.
