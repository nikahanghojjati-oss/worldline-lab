# Team E — v0.2 Truth Engine and v0.25 acceptance gates (2026-10-23)

## Verified against ROADMAP.md and repository source
- v0.2 source URL syntax, IDs, date validity, citation dependencies, geographic provenance and score consistency already have local validator `tools/truth-engine/validate.cjs` and negative fixtures in `test.cjs`.
- v0.2 review proposals require claim class, counterevidence, alternatives, source IDs, note IDs, reviewed commit SHA and prior judgment; `review.cjs` blocks directional writes without an independently authorized evidence pathway. Do **not** claim that an end-to-end authorized score revision or reversal has occurred.
- v0.2 provenance panel is reported as read-only in `data/truth-engine.json`; external source availability, measured truth and human assistive-technology acceptance are **not** certified by local validation.
- v0.25 nine research lab reading/presentation/instrument modes and eight-stage program already exist. Previously recorded automated desktop and phone-width Chromium/axe checks are **not** real Safari or screen-reader tests.
- The 50-point editorial anchor is not a probability, and neither source volume nor simulations can move it.

## Concrete CI change in this PR
Add `glass.html`, `ROADMAP.md`, and `SESSION_START.md` to both push and PR trigger paths in `.github/workflows/worldline-integrity.yml`, so publication and handoff edits cannot silently bypass existing v0.2 integrity and v0.25 browser suites.

## Remaining release gates
1. Run exact-head CI for this PR, inspect both integrity and browser jobs, and fix any failures.
2. Inspect and test the complete proposal→counterevidence→decision→reversal data contract with a no-score-change fixture; preserve fail-closed directional policy.
3. Independently revalidate each of nine lab tiles: source link, reading status, presentation, instrument, return navigation, keyboard behavior and mobile viewport.
4. Confirm external source URLs and original-study depth only from actual sources, not schema checks.
5. Keep real-device Safari and assistive-technology tests explicitly pending until performed.
6. Reconcile stale SESSION_START.md and data/sessions.json deployment references with actual merge/deploy evidence; follow mandatory R013 eight-route sweep before marking it complete.

## Scientific impact
No new experimental evidence, study-depth promotion or central-score movement. Engineering-only release correctness and traceability work. All conclusions remain subject to Big R's scientific review.
