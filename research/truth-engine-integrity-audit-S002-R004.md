# S-002-R004 · Truth Engine v0.2 integrity gate · verified correction record

Date: 2026-10-21. Package: W20-01, original scope 3 website planning points. The scientific-method motivation is to prevent false corroboration or mistaken attribution of historical source records. No scientific verdict movement.

## Mechanically verified behavior

The dependency-free Node.js 22 test runner at tools/truth-engine/validate.cjs checks:
- unique source, researcher, note, evidence and verdict event identifiers plus DOI/normalized-title duplicate checks;
- source URL syntax (not actual network availability), source year and ISO study dates;
- research status truthfulness: a full-study source requires at least one genuine completed note with sections, methods, limitations, counterarguments and a session;
- scholar-to-work, lab-to-work, journal-to-ledger, audit-to-source/note and evidence dependency referential integrity;
- evidence entry categories/questions, non-probabilistic numeric impact, coordinate ranges and coordinate provenance description;
- editorial score alignment with the last historical audit; seven-workstream session and latest active round consistency;
- a prospective proposal schema requiring claim class, physical hypotheses, counterevidence search, alternatives, predicted discriminator, uncertainty, prior audit, source/note IDs and reviewed evidence commit SHA.

A separate script tools/truth-engine/test.cjs executes intentionally broken local copies of actual data to verify errors, not just happy-path success. GitHub Actions CI workflow .github/workflows/worldline-integrity.yml runs both with no paid services or Firebase billing required.

**Source-backed verified run:** https://github.com/nikahanghojjati-oss/worldline-lab/actions/runs/39717393718 ; conclusion success. Both "Audit source and claim dependencies" and "Execute intentionally failing integrity fixtures" jobs passed. The prior failed run https://github.com/nikahanghojjati-oss/worldline-lab/actions/runs/39717292913 had identified three actual duplicated researcher IDs, not a false positive.

## Actual inherited duplicate identity repair

A preexisting 100-researcher record list had only 97 unique IDs. The early identities R-055 Thomas Kuhn, R-056 Daniel Kahneman, R-057 Amos Tversky were already assigned when the late researcher entries reused those IDs. To preserve all distinct researchers and work links, the later entries alone were rekeyed:

| Earlier repeated ID | Later affected name | New unique ID | Source relationship |
| --- | --- | --- | --- |
| R-055 | Michael S. Morris | R-101 | SRC-041 |
| R-056 | Kip S. Thorne | R-102 | SRC-041 |
| R-057 | Ulvi Yurtsever | R-103 | SRC-041 |

No researcher names, scientific claims, work associations, or full-study counts were changed. New unique researcher IDs = 100 / 100 original records. Mapping is also retained in data/library.json methods.scholarIdentityAudit. This does NOT increase the number of known scholars from 100, nor should a metadata fix change a scientific history-ontology verdict.

## Current limits

- Syntax and dependent citation validity do not establish that all external DOI/publisher sites return 200; optional live link checks and publication-quality bibliography audit remain required.
- This is a *first W20-01* CI and fixture gate; no public domain expert has independently accepted scientific truth of each claim. Counterevidence and validity of the model-specific physics still require subject-matter review.
- data/truth-engine.json contains a baseline score and proposal shape with **zero proposals** and **zero future nonzero score changes**. W20-02/W20-03 require a complete review pipeline and genuinely auditable revision/reversal logic; absence of proposed revisions must NOT be represented as a fully deployed score-revision UI.
- A successful Pages build or CI is not equivalent to live responsive/keyboard-accessibility testing; W20-04 and v0.25 acceptance remain open.

## Effort portfolio after this bounded milestone

Original prospective plan: v0.2 = 27 science /9 website points; v0.25 acceptance =9 science/3 website points; 36 science/12 website total. Research task R20-01 Everett full main-text critical review (4 points) recorded in R003; W20-01 validator with tests/CI (3 points) verified in R004. Those are *planned-points delivered*, not measured hours. Remaining estimates: 32 science and 9 website points for both releases (23 science/6 website to finish v0.2; 9 science/3 website for v0.25 revalidation). The completed pair so far is 4:3 rather than 3:1, so deliberately prioritize original GRW/XENONnT and adversarial studies in upcoming rounds to bring the entire portfolio back toward 75/25. Do not claim exact actual proportions based on a mere point budget.

Verdict: VC-009 59→59 editorial, not a calibrated probability. No new direct observation of one vs multiple real histories occurred in this software-integrity round. No changes to other GitHub projects.
