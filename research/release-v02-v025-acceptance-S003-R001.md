# Worldline Lab — v0.2 / v0.25 acceptance audit
Date: 2026-10-22 · GPT session S-003 · implementation round R001

## Purpose
Harden release criteria for Truth Engine v0.2 and nine-room research syllabi v0.25 without turning a successful CI job into unsupported claims about human scientific approval or physical-device accessibility. This is release engineering, not a new full-text original scientific study or experimental observation.

## Source-backed technical evidence
- Truth Engine v0.2 integrity validator, negative fixtures, conditional Born mathematical test, and public JS syntax checks: GitHub Actions [39782263521](https://github.com/nikahanghojjati-oss/worldline-lab/actions/runs/39782263521) at main commit `ce056173e042b182fc2e0ddcb6e8430749ab9475` **PASSED**.
- The accompanying GitHub Pages build/deploy job [39782262868](https://github.com/nikahanghojjati-oss/worldline-lab/actions/runs/39782262868) **PASSED**. Successful build does not certify on-device visual quality.
- The existing `tools/site-browser-smoke.cjs` checks eight routes and 9 × 3 research modes in Playwright Chromium at 1440 × 900 and 390 × 844. It does not test physical iPhone Safari, assistive technology, or genuine domain-specific scientific validation of introductory instruments.
- Existing fail-closed axe A/AA serious/critical audit in `tools/site-axe-audit.cjs` checks eight routes and 3 disciplines × 2 modes. The final main-branch run above passed after separating animation timing effects from genuine low-contrast text and correcting the design.
- This isolated branch expands axe coverage to **every one of nine disciplines**, with **reading, presentation and interactive** views at both desktop and phone widths. Accept the expanded gate only if this branch's post-change CI is green; do not infer it from the earlier main run.

## Expanded audit defect and targeted correction
The first full 9 × 3 scan exposed two genuine presentation-view WCAG AA problems that the earlier reading/instrument sample did not cover, identically across nine disciplines and two viewport widths:
- `.room-slide .slide-number`: foreground #64a2a3 on #fefefc, **2.87:1** measured by axe (required **4.5:1**).
- `.slide-inquiry p`: foreground #5b7883 on #fbf5f6, **4.37:1** measured by axe (required **4.5:1**).

The isolated patch in `assets/wcag-contrast.css` sets these foregrounds to #315d67 and #385b66 respectively, leaving backgrounds, spacing, and content intact. Independent WCAG luminance calculations give approximately **7.19:1** and **6.82:1**. These are calculated CSS contrast predictions, not yet proof that the entire new branch's axe CI passes. The DOM readiness gate was also strengthened so a route hash cannot masquerade as the requested laboratory view.

## Remaining v0.2 requirements
1. Trusted GitHub REST review verification is implemented and negative fixture-tested in `tools/truth-engine/github-approval.cjs` and `review.cjs`: proposed directional score changes and reversals must use a real non-draft PR, exact evidence-commit SHA and a distinct recognized GitHub reviewer. Synthetic fixtures demonstrate gate logic, **not** real independent review.
2. No independent human scientific approver has given a real approval for a specific valid directional central-ontology revision. This release criterion remains **BLOCKED**, not simulated. The model-specific evidence ledger may still document honest measured constraints with no central compass motion.
3. The numerical Truth Compass is editorial neutral 50, **not a calibrated 50% probability**. Actual measured Everett-vs-equilibrium-Bohm discrimination has not been established. Do not invent a successful human approval or a nonzero revision merely to check a box.
4. Before final signoff, manually examine the public review/reversal/provenance presentation under keyboard and assistive technology, keeping the GitHub Pages browser read-only.

## Remaining v0.25 requirements
1. Pass expanded 8-route + 9 × 3 lab axe automated A/AA scan on two viewport widths.
2. Have a person use all nine rooms in actual Safari on an iPhone, confirm reading link navigation, presentation controls, instrument keyboard operation, back navigation, focus order, content overflow and 200% text zoom. Do not mark this check complete from Chromium emulation.
3. Have an independent screen-reader user or qualified auditor check lab mode labels, source-reading status, announcements, keyboard scroll regions and any diagram alternatives.
4. Keep interactive instruments labeled as educational exploratory models with disclosed assumptions; scientific detector experiment replication is not implied by GUI operation.

## Scientific state unchanged
Canonical source record at R012: 77 indexed works, 68 reading notes, 28 genuinely full original-main-text critical reviews. WL-021 and VC-013 preserve the conditional Everett/quantum-equilibrium Bohm Born observational equality. No new source study, actual physics measurement, new atlas coordinate, or directional ontology update is claimed in this engineering round.

## Acceptance decision
Continue release hardening. It is valid for v0.25 automation to be accepted while physical phone and independent screen-reader signoff stay open. Keep v0.2 candidate until a **legitimate** human-reviewed scientific decision path is exercised or the acceptance criteria are explicitly revisited by the owner. Never weaken the gate to force a shipped badge.

## Next falsifiable scientific action
Read and verify the original GRW 1986 full paper only when genuinely accessible; otherwise focus an experimentally calibrated Born-nonequilibrium or mesoscopic recoherence prediction that actually separates specified one-history and many-history physical models. Existing equal Born predictions cannot answer the ontology question.
