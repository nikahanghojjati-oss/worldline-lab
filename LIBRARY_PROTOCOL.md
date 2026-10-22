# Worldline Lab · Scholar Library Research Protocol
Edition 1 · 21 October 2026

## Purpose
Build an auditable, expandable index of scholars, original works, institutional reports, lectures, interviews, monographs and technical books relevant to causality, one-history models, many-worlds interpretations, and temporal experience.

The library is not a ranking of famous scientists. It is a provenance network organized around what a source actually claims and what could test that claim.

## File contracts
- `data/library.json` identifies one work per stable `SRC-###`, with title, contributing researchers, discipline, medium, publication year, source URL, bibliographic relevance, and reading status.
- `data/reading-notes.json` associates a dated, single-session `NOTE-###` with an existing `SRC-###`; fields include the precise review stage, source basis, claim, methodological limitation, and research conclusion.
- `data/ledger.json` holds scientific claims and evidence classifications (for example WL-001). It must never be inflated by counting multiple statements from one source as independent experiments.
- `data/sessions.json` is the authoritative record of which ChatGPT research session made which verified change.
- `research/field-note-001.md` is a first cross-source analytical synthesis, carefully limited to accessible summaries and published abstracts.

## Auditable stages
1. Catalogued: verify what the item is; do not claim it was studied.
2. Abstract or overview reviewed: record checked landing text, scholarly abstract, or institutional summary. Count as summary-level examination, not a completed paper or book.
3. Partially studied: record the exact parts read (chapters, page ranges, methods, figures, appendices), reliable source link, and detailed reasoning.
4. Fully studied: record a comprehensive full-work account, counterarguments, reproducible methods (where possible), differences between claim and observation, verification date, and reviewer/session. A skim or blurb does not qualify.

Only `fully-studied` counts in the completed full-work total. One source is counted once, even if linked under multiple people. Count papers, books, talks and essays by their actual medium. Record unattributed or disputed author credits as uncertain rather than guessing.

## Ranking reading priorities
Use a reproducible research queue:
1. Direct empirical discrimination: controlled measurements whose predicted outcomes differ under competing hypotheses.
2. Formal commitments: the mathematical assumptions in candidate physical and information-theoretic models.
3. Boundary conditions: chronology protection, locality, collapse, decoherence and alternative interpretations.
4. Domain bridges: cognition, chemistry, biology, astronomy and AI that clarify category mistakes and useful methods.
5. Background and intellectual history: influential expository books, public lectures and archival primary sources.

Catalog size is not a performance measure. Source quality, exact citations, adversarial review and critical comparisons are.

## Verdict revision gate
For any proposal to change the Truth Compass:
- Identify the old and proposed new score, current source IDs, and precise ledger claims.
- Describe explicitly what the one-history model predicts and what the many-history model predicts, including model versions and mathematical assumptions.
- Link measured results to primary methods and controls, including uncertainty and independent replication, when applicable.
- Check whether the result only tests an interpretation-neutral prediction, merely demonstrates time dilation, or uses a computer simulation with exotic premises.
- Record an alternative explanation and dependence between sources.
- Commit a dated reasoned entry in `data/library.json.verdictAudit.changeLog`, plus the relevant ledger change. If no empirical discrimination exists, record a *no-change* decision.

Never treat a source's prestige or popularity as scientific evidence for an ontology. Do not interpret an interpretive meter as a physical probability.

## Next reading order (not yet claimed complete)
A. Gödel 1949, Hawking 1992, Echeverria–Klinkhammer–Thorne 1991: spacetime loops and self-consistency.
B. Everett 1957, Bell 1964, Bohm 1952, Zurek 2003: quantum interpretations, alternative predictions and decoherence.
C. Deutsch 1991, Oreshkov–Costa–Brukner 2012, Frauchiger–Renner 2018: hypothetical loops, indefinite causal order, consistency assumptions.
D. Bothwell et al. 2022, the 2022 Nobel physics source archive: empirically verified time effects and quantum correlations.
E. Cross-disciplinary audits through Pearl, Eagleman, Hornberger/Arndt, Friston and circadian biology.

Finish each stage only after the written evidence trail can survive starting a fresh chat. Preserve the most important source IDs in the current session's handoff record.

## Source and permissions
Store original bibliography, short notes and links. Do not copy paywalled whole papers, copyrighted book chapters, or unlicensed audiovisual content into the repository. Prefer official publisher records, DOI resolver URLs and open-access author versions when available.

## Full-main-text critical review distinction (R006, 2026-10-21)
A source may be promoted to `fully-studied` only after its *complete main research article, paper or scholarly entry* has been read and source-specific notes cover the main argument from opening assumptions through methodology/results, contrary approaches, limitations and end conclusions. Cite the exact full original URL, covered sections/pages, study date, session, and versioned detailed report. For works with supplemental datasets/appendices, the report must say which of those were additionally inspected and which were **not independently reconstructed**. A complete *critical literature review* is distinct from experimentally reproducing data or verifying every symbolic proof step: do **not** label a paper replicated without replication evidence. Prior abstract/partial-study notes must be preserved as historical reading stages. The full-study count is works reviewed, not scientific confidence, and may not change the Truth Compass without a discriminating physical observation.

First certified batch: [research/full-study-batch-001.md](research/full-study-batch-001.md). Ten distinct resources `SRC-008,044,062,012,020,045,047,064,002,003` reviewed as full main works; detailed `NOTE-033..042` and audit `VC-007`, scientific score **59 → 59**. External supplementary derivations and raw measurements not independently reproduced are explicitly disclosed. All subsequent sessions must audit that distinction and preserve the per-round Observatory checkpoint.

## Question-first study design · S-002-R005
A paper-study count is NOT evidence the main scientific question is approaching an answer. Choose a falsifiable comparison before reading, record observed physical likelihood or parameter bound with uncertainty, update a model-specific claim status if warranted, and distinguish the central one-vs-many ontology score. An unchanged central score cannot erase a real model-parameter exclusion. The previous 59 was an unsupported inherited editorial tilt, corrected by VC-010 to neutral 50 without changing experimental odds; historical entries preserved.
