# Worldline Lab · Standing Project Rules

Effective 2026-10-21 · Owner-approved research-first operating policy

## Mission and allocation
- Worldline Lab is an evidence-driven scientific research project first and a research-presentation website second.
- Plan roughly **75% of substantive project effort for scientific research and 25% for website/product development** across a meaningful span of work. This is a planning guideline, not tracked GPT minutes, token usage, a per-message quota, or a reason to interrupt a coherent study.
- Scientific research includes locating and verifying primary sources; rigorous reading and section-cited notes; mathematical and experimental comparison; seeking counterevidence; reproducing methods when feasible; and reasoned verdict or no-change decisions.
- Website work includes accessibility, usability, research presentation, Truth Engine provenance, atlas/globe, discipline presentation rooms, interactive instruments and interdisciplinary labs.
- Research should determine what the site needs to explain or test; do not expand purely decorative interfaces at the expense of scholarship. Small fixes may accompany ongoing research.
- Critical correctness, data integrity, broken publication controls, security, or preservation work may temporarily take precedence over the target allocation; explain the deviation and restore research priority afterward.
- Do not invent asynchronous work, work-hour measurements, literature-reading achievements, verified publications, experiments, or confidence values.

## Binding roadmap and preservation
- `ROADMAP.md` is the canonical staged plan for website versions 0.2 (Truth Engine), 0.3 (atlas/provenance), 0.4 (deep discipline rooms), 0.5 (session continuity) and 0.6 (ongoing scientific review); releases 0.25 and 0.26 preserve reading plans, presentation rooms and introductory instruments.
- Preserve the existing Truth Compass, Scholar Library, reading lists with truthful progress checkmarks, Evidence Ledger, Session Observatory, nine field presentation rooms, introductory interactive instruments, and three interdisciplinary studio directions.
- Build sophisticated field-specific and interdisciplinary research simulations incrementally, with transparent assumptions, verified math, citations and limitations. An educational simulation is not proof.
- The geographic 3D globe must use attributed, sufficiently precise coordinates and retain an accessible 2D fallback.
- Release order can be adjusted to support scientific needs, but record deviations from `ROADMAP.md` rather than silently replacing or abandoning its commitments.

## Research route is already mapped, but remains expandable
- Follow the eight-stage scientific program and nine discipline reading queues in `ROADMAP.md`, `data/research.json`, and `data/library.json`. The 54 mapped subtopics are a discovery framework, **not** 54 completed literature surveys.
- Use `LIBRARY_PROTOCOL.md` to prioritize primary sources, assess competing claims and review stages, prevent duplicates and distinguish cataloguing from genuinely completed full-text study.
- First source-level comparison: Gödel 1949, Hawking 1992, and Deutsch 1991 on spacetime loops, chronology protection, and quantum consistency; check important counterarguments and next the quantum foundations (Everett, Bell, Bohm, Zurek) in the protocol.
- Expand the bibliography toward 400 unique verified works as an initial coverage target; 4,000 is an ambitious stretch goal, **not** a promised output or a completed-read count. Quality and relevance outweigh quantity.
- Each substantive review produces source-linked notes, assumptions, falsifiable implications, contradictory views and a documented verdict-impact or explicit no-change decision. Never force Truth Compass movement to make progress look visible.
- Keep the Compass's editorial score separate from empirical probability; if no evidence distinguishes rival hypotheses, say so. An unresolved final verdict is acceptable.

## Every milestone must preserve continuity
- For substantial research **or** website changes, update `data/sessions.json` with verifiable work, affected workstreams, the current next action, blockers and transition readiness. Update the source notes/library/ledger/verdict audit whenever the research warrants it.
- Only mark a publication fully studied when the evidence record meets `LIBRARY_PROTOCOL.md`; website deployment or a cited bibliography is not a completed scientific review.
- Keep `SESSION_START.md` aligned with this policy. A new chat starts by reading this policy, the roadmap, and the latest authoritative session/reading records rather than reconstructing or inventing progress.
- Handoff when a real milestone is complete and a viable restart packet is committed, or a serious continuity problem is documented, **not** because a fixed number of minutes elapsed.
- Preserve stable session IDs and create a new one only when a new chat actually begins. No imaginary GPT usage telemetry, no automatic background research without an explicit scheduled task.

## Working pattern for future sessions
1. Load `PROJECT_RULES.md`, `ROADMAP.md`, `SESSION_START.md` and `data/sessions.json`; inspect relevant `data/library.json`, `data/reading-notes.json`, ledger items and the original sources.
2. Choose the highest-value unfinished scientific milestone; do source-level work and save an honest evidence trail.
3. Make a smaller roadmap-aligned website improvement when it advances research, fixes a real defect, or makes results usable; do not assume a version has shipped without verification.
4. Record the research and website impacts in the same session checkpoint, including verdict movement **or an explained no-change**.
5. Continue while coherent; hand off at a meaningful boundary with links and one precise next action.

This policy complements `RESEARCH_PROTOCOL.md` and `LIBRARY_PROTOCOL.md`; it does not relax their scientific evidentiary standards.


## Mandatory end-of-round Session Observatory update (all GPT sessions and workers)
Effective 2026-10-21. An **end-of-round checkpoint is mandatory after every discrete round of substantive work**, not just at a project milestone, before reporting the round complete or switching to another task. A round may be one bounded literature review, code change, UI improvement, experiment, QA pass, research audit or governance edit. This rule applies to the founding session and all future GPT chats or delegated workers who can write to this repository.

1. Fetch the latest `data/sessions.json` immediately before writing. Preserve existing session IDs and other workers' updates; do not overwrite concurrent progress.
2. Update the active session checkpoint and top-level `updated`, `activeWork`, `lastVerified`, `nextStep`, and `blocking` as appropriate. Review **every** entry in `workstreams` on every round: refresh affected status/latest/next and explicitly preserve truthful unchanged areas rather than silently letting stale summaries stand.
3. Recompute and **save every `transition` decision field every round**, especially `assessedOn`, `milestoneComplete`, `checkpointCommitted`, `openQuestionsRecorded`, `nextActionDefined`, `naturalBoundary`, `documentedContinuityRisk`, `decisionBasis`, and `updatePolicy`. State an explicit CONTINUE / PREPARE HANDOFF / TRANSITION RECOMMENDED reason; no fabricated token or time metrics. A positive readiness gauge indicates preparation, never a compulsory chat switch.
4. Append a dated entry to `roundLog` with session ID, round ID, scope, files changed, verified achievements, research coverage/read depth, verdict decision (changed or unchanged with source references), changes/no-change to each site section, continuity assessment, and one next action. Increment only for actual work. If a round includes research, update linked `data/reading-notes.json`, `data/library.json`, `data/ledger.json` and the verdict audit where relevant. Review counts must come from actual records.
5. Treat the session-record commit as a required part of the round, ideally in the same commit as the work or immediately after it. If publication/write access fails, clearly report that the Observatory is **not synced**, record exact missing steps, and never claim it is current.
6. Update the session page through its existing GitHub-backed data model. The public activity feed is a poll of GitHub history while open, not live GPT activity. Browser-only handoff drafts never qualify as persisted checkpoints.
7. Before a future GPT session starts, inspect the most recent roundLog entry, the active transition recommendation, open research question, links to source records, and `ROADMAP.md`, then continue without inventing work. Do not create another session ID until a genuinely new chat begins.

Acceptance test for every round: can the project owner open `#sessions` and distinguish what was completed, what did not change, why the verdict did or did not move, the precise next action, and whether a transition is recommended? If not, the round is not properly closed.


## Primary question — owner-approved 2026-10-21
**Does the physical universe inhabited by human observers contain one physically realized history or multiple physically real timelines/branches?** This question supersedes the time-travel-first framing. Treat Everettian quantum branches, Bohmian definite particle histories, objective-collapse models, cosmological inflationary bubbles, and a person's one observed record as carefully separated claims. Backward travel, CTCs and grandfather paradoxes remain supporting questions, not prerequisites. Scientific verdict shifts require model-specific, independently attributable, discriminating observations; never count Bell violations, decoherence, simulations or cosmological bubbles as direct branch observations. Preserve all previously planned labs, atlas, library and sessions, 75% research/25% website priority, truthful source depth and mandatory every-round Session Observatory closure. The next research body should build a quantitative predictions matrix; see research/field-note-004.md and audit VC-006.

## Main-question discrimination and five-round website freshness (owner direction 2026-10-22)
The project's sole principal scientific question is whether the actual physical universe contains **one** physically realized history or **multiple** physically real histories. Each substantive research round must define both specific hypotheses, an observable, differing predictions (or prove equality for the experiment class), original measured input, uncertainty and alternate explanations, and an explicit direct/indirect/no-relevance verdict impact. Stop prioritizing generic sources or subjects that cannot affect this decision. A physical collapse test can weaken specified one-history mechanisms, but it is not proof of Everett relative-state actuality against equilibrium Bohmian mechanics. Be responsive to either direction and transparent about missing nuisance models/conditional priors; neither source count nor desired score drift is evidence.

EVERY substantive round: update all 7 Session Observatory workstreams, roundLog, current decision and next falsifiable question in canonical data/sessions.json. This must never await site redesign. Critical errors, genuine scientific claim movements and central score audits also publish immediately.

After each 5 completed rounds, run a full **eight-route website research freshness sweep** (home, dashboard, ledger, journal, disciplines, atlas, library, sessions). Source-correct each route, update its live data and text where new results exist, explicitly document and display no-new-source where there is none, check for stale hardcoded facts and links, and disclose real browser/mobile/keyboard QA status honestly. The versioned route ledger data/page-freshness.json and CI validator enforce this. First sweep due S-002-R010 at cumulative roundLog count 17, then counts 22, 27, etc. All site pages must be reviewed, even if no new experimental atlas pin exists; don't invent a false update. The ~75% research/~25% site goal remains a planning effort priority, not measured minutes.
