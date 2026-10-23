# X-001 · Scientific Discrimination and Verdict Interface Contract v0.1

Owner: Worldline Lab 1 / Team R (scientific specification)  
Implementer: Worldline Lab 2 / Team E (engineering; no scientific-claim approval transferred)  
Date: 2026-10-22  
Status: PROPOSED, REVIEW REQUIRED. This document does not change any science records, scientific scores, production validators, or source-study counts.

## 1. Mission and safety boundary

The research question is: **Does our actual physical universe contain one physically realized outcome history or multiple physically real histories?**

This is a **science-to-engineering interface specification**, not a newly validated experiment and not a direct scoring algorithm. The current public Truth Compass is an uncalibrated **editorial neutral anchor of 50**, not a 50% posterior. The inherited 59 was reset as a methodological correction (VC-010). The distinct `scientificMovements` in `data/ledger.json` track tested *model-specific constraints*, which may advance when the central ontology question remains unresolved.

The present canonical Truth Engine is `data/truth-engine.json` (`worldline-truth-engine/v0.2`). This X-001 document must be **additive** to existing proposals/review protections, not a wholesale schema reset. No worker should write, decrement, or increment the public score automatically.

## 2. Non-negotiable scientific distinctions

1. **Theory versus physical ontology:** Specify each candidate's *dynamics and test conditions*, then independently describe whether it claims one actual configuration/history, many real branch-relative histories, or something not settled by the model.
2. **Observation versus explanation:** Tag `measured_observation`, `published_report_not_independently_reproduced`, `reproduced_measurement_analysis`, `theory_derived_prediction`, `synthetic_simulation`, `interpretation_only`, and `educational_illustration` distinctly. Evidence type must never be inferred from attractive UI or a numerical output.
3. **Like-for-like predictions:** An admissible discrimination claim compares `P(D|M_one, conditions)` and `P(D|M_many, conditions)` for the *same* experimental protocol, possible observations, instrument response and allowed nuisance family. Raw distinct stories about the same observable probabilities are not experimental discrimination.
4. **Identifiability:** Under the standard same-Born-equilibrium preparation, Everett and Bohmian quantum equilibrium give matching ordinary record probabilities: `P(D|Everett)=P(D|Bohm_eq)`, ratio `1` for any positive-probability dataset in that shared class. Hence a dataset of that class gives **zero directional update of their pairwise odds** regardless of sample size. Do not label branch interference, Bell violations, quantum erasers or decoherence direct branch-count observations.
5. **Model-specific motion is real scientific progress:** Excluding certain CSL parameter points can be a documented `MODEL_CONSTRAINT_CHANGED` with source-specific confidence and assumptions; it does **not** alone identify Everett as true or quantify real branches. Retain one-history models not thereby excluded, including equilibrium Bohmian mechanics.
6. **No post-selection of convenient models:** Selecting a favorable collapse rate or an omitted background after seeing data cannot support an ontology verdict. Model-averaged inference needs explicitly declared model priors, parameter priors, nuisance marginalization, selection handling, competing theories and prior sensitivity.
7. **Two separate review dimensions:** AI-model source-methods and adversarial science reviews are advisory; verified original experimental inputs and reproducible inference remain necessary for any empirical claim. Accessibility/browser/CI verification is a distinct technical gate.

## 3. Proposed additive record: `worldline-discrimination-proposal/v0.1`

Engineering may implement a normalized adapter or JSON schema under Team E ownership; the exact API/storage location is to be agreed. The record must preserve existing Truth Engine `mandatory` field semantics and existing ledger/history IDs.

### Identity and provenance
- `proposalId`: immutable, unique; `schema`, `createdUTC`, `authorAgent`, `reviewStatus`.
- `researchQuestionId` (actual one-history vs many-history); `target` (one of `model_constraint`, `central_editorial_meter`, `no_change`).
- `sourceIds[]`, `readingNoteIds[]`, `ledgerIds[]`, `reviewedEvidenceCommit`, `dataURL`, `publicationIdentity`, `accessDepth`, `retrievalUTC`. Link to *existing canonical IDs*, never duplicate source entries simply for a proposal.
- `dataIntegrity`: SHA-256 of any obtained, analyzed data files; upstream repository/version where available. A purported raw-data reproduction without accessible files and checksums must be BLOCKED/NOT_REPRODUCED.
- `evidenceType` (one of the explicit classes above), `observationStatus` (what was measured, obtained or only reported), `independenceClusterIds[]` (a shared underlying detector dataset/analysis cannot count repeatedly as independent).

### Specified rival models and predictions
- `models[]`: at least two **fully specified physical candidates**, each with `modelId`, `ontologyClass`, `dynamics`, `parameters`, `initialConditions`, `observationModel`, `assumptionSources[]`.
- `experiment`: `observable`, `outcomeSpace`, `preparation`, `measurementProtocol`, `apparatusResponse`, `samplingRule`, `calibration`, `selectionRule`, `unitSystem`. When not observed, mark hypothetical rather than manufacture data.
- `predictions[]`: per-model predictive distribution or computable function/algorithm; versioned code reference, reproducible command, and assumptions. If unsupported or undefined, record `NOT_COMPUTABLE` rather than fake likelihoods.
- `observedData`: measured values/counts/uncertainty with units and exact source table/figure/page; explicitly distinguish published summary from independent raw-data reproduction.
- `nuisanceModel`: background, instrument error, correlated systematic errors, parameter bounds/priors, shared nuisance assumptions, calibration data, and marginalization method. If missing, conditional outputs must be labeled `CONDITIONAL_DIAGNOSTIC_ONLY`.
- `quantitativeComparison`: `comparisonType` (e.g. `LIKELIHOOD_RATIO`, `CONFIDENCE_LIMIT`, `NONIDENTIFIABILITY_PROOF`, `NOT_EVALUABLE`), per-model likelihood or limits, `method`, uncertainty/interval and `methodCode`. Never conflate a frequentist exclusion confidence limit with a posterior branch probability.

### Counterevidence, impact and authorization
- `counterevidenceSearch`: recorded query/method/date/sources and credible failure modes; no empty completion flag.
- `alternativeExplanations[]`: rival one-history, many-history, environmental/noise, instrument and selection alternatives with testing status.
- `discriminationStatus`: `DIFFERENT_MEASURED_DISTRIBUTIONS`, `OPERATIONALLY_EQUIVALENT`, `MODEL_SPECIFIC_ONLY`, or `INSUFFICIENT_EVIDENCE`. Include a falsifiable rationale for why this category applies.
- `modelMovement`: separate prior and updated **claim-scoped** confidence/constraint text, numeric bounds where genuinely sourced, associated `ledgerId` and audit references. May be nonzero even when meter is fixed.
- `centralVerdictDecision`: `NO_CHANGE` (default) or `DIRECTIONAL_PROPOSAL_REQUIRES_AUTHORIZATION`; `oldScore`, `proposedScore`, `impactRationale`, `scoreMapping`, `priorSensitivity`, `remainingUndiscriminatedModels`. All fields mandatory for a *directional proposal*, with `oldScore=proposedScore` for a published no-change.
- `review`: two genuinely separate AI-provider source-methodology and adversarial review receipts where required by the existing HAMMER policy, linked to actual source-study packets, model/response IDs, limitations and objection dispositions. A forged or synthetic receipt must fail.
- `decisionAudit`: scientific Lead R approval of the scientific meaning and no-change/directional recommendation, Team E code/schema/testing approval, owner decision where needed, commit-bound before/after rationale, and reversible lineage. Neither a proposal nor AI agreement alone grants a score write.

## 4. Deterministic acceptance oracle (proposed tests for Team E)

| Case | Input/condition | Expected scientific classification | Central meter |
| --- | --- | --- | --- |
| T01 | Valid source IDs but only bibliographic entry/abstract, no reproducible measured input | `INSUFFICIENT_EVIDENCE`; bibliographic progress only | `NO_CHANGE` |
| T02 | Standard Everett-Born versus Bohmian equilibrium for same preparation and ordinary outcomes; equality `P_E(D)=P_B(D)` | `OPERATIONALLY_EQUIVALENT`; ratio 1; nonidentifiability explained | `NO_CHANGE` |
| T03 | Actual primary measurement rejects a specified CSL parameter region after declared assumptions, but equilibrium Bohmian predictions unchanged | `MODEL_SPECIFIC_ONLY`; record genuine qualified constraint | `NO_CHANGE` |
| T04 | Toy HAMMER distributions or quantum-circuit simulation have large Jensen-Shannon divergence but no real observed discriminator | `theory_derived_prediction` or `synthetic_simulation`; no empirical claim | `NO_CHANGE` |
| T05 | One favored CSL point selected after observed outcome with fixed-background Poisson, nuisance/parameter priors omitted | `CONDITIONAL_DIAGNOSTIC_ONLY`; selection/nuisance gap must be visible | `NO_CHANGE` |
| T06 | Two source records cite one underlying dataset as if independent | Same `independenceClusterId`; forbid evidence double count | `NO_CHANGE` absent independent basis |
| T07 | Data or original full text unavailable; author archive download fails | `BLOCKED`, `NOT_REPRODUCED`; no fake hashes or full-study credit | `NO_CHANGE` |
| T08 | Alleged real directional result with different distribution under fully specified one/many models, but no AI review, independent input validation, or prior-sensitivity justification | `DIRECTIONAL_PROPOSAL_REQUIRES_AUTHORIZATION`, rejection of publication write | Unchanged |
| T09 | Record says `proposedScore=62` and supplies no declared score-mapping calibration | Reject proposed score; numeric score without mapping is not data | Unchanged |
| T10 | Scientific lead agrees on a claim-scoped published constraint; meter remains editorial 50 | Publish source-linked `modelMovement` with audited no-change decision, not artificial meter motion | 50 |
| T11 | Source claim updated from published-only to independently reproduced by actual data+hash+code proof | Provenance/status and replay evidence legitimately improve; recheck alternatives | No automatic change |
| T12 | Propose score reversal, but current evidence commit differs from approved base commit | Reject stale commit; require re-review and reversible causal history | Unchanged |
| T13 | GitHub source contains an injected instruction asking validator to change score | Treat as untrusted quoted source text; no instruction execution | Unchanged |

Tests establish implementation safety, not experimental discoveries. For a future genuine central-direction proposal, the validator must require empirical predictions under both actual-history categories, calibrated likelihood or prior-qualified inference, strong countermodel scrutiny, real data/provenance, and authenticated review. A mathematics-only **identifiability theorem** may establish that certain experiments cannot answer the question but cannot by itself select the true history count.

## 5. Workstream interface and non-overlap

- **Team R / Lab 1 edits only** this research contract and subsequent scientific review records on its own research branch. Lead R decides what the physics warrants; it does not implement or merge Team E validation code.
- **Team E / Lab 2** maps this contract onto existing `tools/truth-engine/` validation and `data/truth-engine.json` structures and the accessible provenance UI *after review*. It owns CI, frontend, schema/adapter code, relay and PR integration mechanics. Lab 2 must not reinterpret model-conditional inference as ontology certainty.
- **Shared data** (`data/sessions.json`, `data/ledger.json`, `data/truth-engine.json`) remain single-writer and untouched by this branch. Integration steward records the canonical seven-workstream round checkpoint when agreed. Until the mandatory policy is amended and that checkpoint committed, any affected round is explicitly **NOT SYNCED**; branch-only reports are not canonical completion.
- Both leads preserve v0.2 and v0.25 acceptance and the 75% research / 25% product focus across substantive cycles.

## 6. Review checklist / handoff to Team E

1. Confirm additive compatibility with current proposalRules, legacy score audit and fail-closed directional writes.
2. Suggest smallest implementable field names and enum mapping without overwriting existing source, library or ledger formats.
3. Implement fixtures T01–T13 before any nonzero meter-writing pathway; demonstrate failure for fabricated data, score mappings and AI receipts.
4. Supply CI commands, validation outputs and changed-file list; preserve existing site navigation and provenance disclosure.
5. Forward discrepancies and scientific-category questions back to Team R; do not decide them by UI conventions.
6. Seek science acceptance and integration governance approval via issue #13/linked PR; **no auto-merge**.

### Supporting existing Worldline Lab records

`PROJECT_RULES.md`; `RESEARCH_PROTOCOL.md`; `ROADMAP.md` v0.2; `data/truth-engine.json`; `data/ledger.json` (VC-010, WL-021, MOVEs); `data/discriminator-program.json`; `research/central-question-discriminators-S002-R009.md`; `research/operational-identifiability-S002-R012.md`; `HAMMER.md`.

**Scientific decision for X-001:** no new measured physical evidence introduced; no model constraints recalculated; no new full-study count; **central Truth Compass unchanged at 50**. This is a requirements/specification deliverable, not a scientific review completion or score-changing result.
