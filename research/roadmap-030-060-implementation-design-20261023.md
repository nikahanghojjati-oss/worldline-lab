# Team E engineering design · roadmap v0.3–v0.6 (2026-10-23)

**Status:** planning only, not a release or scientific verdict. This plan follows ROADMAP.md and PROJECT_RULES.md. No automatic central Truth Compass movement, no unsourced markers, no fabricated full-text reading or usage telemetry. Big R owns scientific conclusions; Team E owns implementation, testability, provenance and release safety.

## Dependency order and release gates

0. **Prerequisite v0.2 / v0.25:** finish traceable claim→counterevidence→decision→append-only reversal design and nine-lab keyboard/mobile/source-link verification. CI passing on one commit does not certify Safari, VoiceOver or external URL reachability. Maintain a separate draft PR for each release after v0.2/0.25 acceptance.
1. **v0.3 geographic atlas:** source-ledger location records → validated GeoJSON adapter → accessible zoomable 2D map → optional lazy-loaded 3D globe → verified solar-observation layer. Never infer location from publication author affiliation, institutional headquarters or decorative map art.
2. **v0.4 deep rooms:** preserve all nine existing reading/presentation/intro-instrument modes. Introduce a versioned tutorial/scenario schema, per-room cited research question and limitation, then add discipline-specific models incrementally behind testable flags.
3. **v0.5 continuity:** versioned per-study packets and machine-readable checkpoints, verified state transitions and minimal bootstrap/handoff contract. Avoid an uncontrolled agent factory and avoid treating elapsed time as measured progress.
4. **v0.6 recurring review:** owner explicitly approves schedule and search scope before any automation. Store immutable scan manifests, deduplicate candidates, review evidence with two independent scientific perspectives, and publish explicit change/no-change/dissent audit records.

## v0.3 data contract and architecture

- Add `data/atlas-sites.json` with unique marker ID, ledger ID, role (`institution` | `experiment_site` | `instrument` | `publication_location`), source ID, coordinate pair, coordinate provenance text, precision category (`exact` | `campus` | `city` | `region`), and `verifiedAt`. A location may have multiple roles but each role is a separate attributable record.
- Validate lat/lon bounds, role enum, source/ledger referential integrity, date, precision and coordinate origin. Reject missing source references and claims of exact precision inferred from city coordinates. Include negative fixtures for orphaned ledger links, out-of-range points and absent precision.
- Provide keyboard-focusable list/table synchronized with 2D map selection; marker details link to exact ledger entry. Zoom, pan, search and reset must work by keyboard. Mobile always retains list/table even when canvas is unavailable. No marker from an unsourced coordinate.
- 3D Earth is progressive enhancement only: lazy-load after consent/interaction or capability detection, preserve reduced-motion support and a 2D fallback. Solar atlas must use observation timestamp, instrument and primary reference; no generic celestial art presented as measurement.
- **Acceptance:** each displayed point has a machine-testable ledger/source chain and visible precision explanation; all interactions usable without WebGL.

## v0.4 room architecture

- Define `data/lab-scenarios.json` with discipline slug, tutorial source IDs, one falsifiable research question, assumptions, limitations, model version, input bounds, expected-output fixtures and explicit `teaching_model` versus `validated_replication` classification.
- Build shared room components for accessible model inputs, unit labels, equation provenance, alternative-model overlays and resettable scenarios. Add domain adapters: physics timeline/causal graph; quantum measurement interpretations; mathematics assumptions/proofs; AI claim dependency graph; chemistry/biology clocks and coherence constraints; neuroscience experiential versus physical time; history evidence criticism/counterfactual limits.
- Add deterministic unit and boundary tests for each mathematical model, plus browser checks for keyboard, mobile, citations and back navigation. Require an original primary-source verification before labelling an adapter validated.
- **Acceptance:** every discipline has a cited tutorial, research question and limitations visible in all relevant views; at least one domain-specific feature per room; existing 9 × 3 views and full-study badges unchanged unless backed by reviewed notes.

## v0.5 packet and checkpoint contract

- Define `data/study-packets.json` with packet ID, research question, objective, source digest IDs, unresolved contradictions, next falsifiable action, acceptance gate, evidence state and source commit. Reference `data/sessions.json` round IDs rather than duplicating invented progress.
- Use READY only when required source data and reproducible action are present; STALE when an explicitly identified dependency was superseded or invalidated; BLOCKED when a named dependency prevents the next action. Each transition records cause, evidence link, prior state and timestamp; no arbitrary age cutoff.
- Build a deterministic handoff validator that reconstructs the current state from `SESSION_START.md`, `PROJECT_RULES.md`, `ROADMAP.md`, `data/sessions.json`, and narrow task files. Usage remains N/A absent trustworthy instrumentation.
- **Acceptance:** a fresh chat can identify the next research action, last verified commit, blockers and unmodified central verdict without relying on a previous chat transcript.

## v0.6 recurring-review contract

- Do not schedule a task before the owner agrees on frequency, subject areas and source coverage.
- Scan manifest: immutable scan ID, timestamp, exact query/source, coverage window, retrieval outcome, content hash/DOI and candidate IDs. Store failures and zero-result scans too; deduplicate without silently discarding contradictory evidence.
- Candidate evidence never directly mutates the Ledger or compass. Require primary-source depth, independent adversarial assessment, quantitative likelihood discrimination where applicable, documented dissent and versioned decision/no-change entry.
- The roadmap's proposed human-review threshold requires a **new explicit owner policy decision** before enforcement; do not silently replace the current two-independent-AI-reviewer scientific policy or claim a human reviewed anything.
- **Acceptance:** replayable audit shows what was searched, when, what changed and why the scientific verdict did or did not move. Scheduled activity is not itself scientific evidence.

## Cross-release test matrix and rollout

| Gate | v0.3 | v0.4 | v0.5 | v0.6 |
|---|---|---|---|---|
| Schema + negative fixtures | Coordinates, precision, source/ledger links | Scenarios, assumptions, units | Packet references, state transitions | Scan provenance, deduplication |
| Browser / accessibility | 2D keyboard map + no-WebGL fallback | Nine rooms, model controls, source citations | Checkpoint and resume view | Search-history and dissent display |
| Scientific review | No unsourced observation location | No teaching model as experimental proof | No invented work/progress | Candidate != accepted evidence |
| Release verification | Source marker audit | Numerical regression and room preservation | Fresh-chat replay | Immutable scan/decision audit |

**Implementation rule:** stage independent branches and PRs; do not modify `main` directly. Version schemas before interface work, test deliberately invalid fixtures, and checkpoint each substantive research round with all seven Observatory workstreams and required eight-route freshness sweeps. The next such round is S-003-R013 (cumulative 32); this planning note does not impersonate that scientific checkpoint.
