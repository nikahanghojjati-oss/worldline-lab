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
