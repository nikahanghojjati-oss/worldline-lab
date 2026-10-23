# HAMMER S-003-R012 · A collider-derived bound on a specific Born-rule deviation

**Recorded October 22, 2026.** Status: original-source abstract-level reading plus exact secondary arithmetic, not a full original-paper study, not independent original event-level likelihood reproduction, not evidence for how many physically realized histories exist.

## Actual source and empirical input

Antony Valentini and Mira Varma, **First constraint on Born-rule violations at high-energy colliders**, [arXiv:2607.06938](https://arxiv.org/abs/2607.06938), submitted **8 July 2026**. The authors reanalyze **existing** large-angle Bhabha scattering data from the SLAC/PEP collider, `e+e- -> e+e-` at centre-of-mass energy **29 GeV**. Their phenomenological model smears the Born-rule quantum differential scattering cross section by a Gaussian of width **ε** in `x=cos θ`. The authors report **ε < 0.042 at 95% confidence** for this model. The article is a 2026 **preprint** in the source checked here, not confirmed independently peer-reviewed or replicated. This result constrains a *particular Gaussian angular-smearing deviation*, not all possible Born-rule departures.

We also examined the **publisher abstract and targeted introductory/methods text** of the earlier primary article by the same authors, *Toward a test of the Born rule in high-energy collisions*, *Physical Review D* **112**, 112024 (published December 30, 2025), DOI [10.1103/4llk-pt1j](https://doi.org/10.1103/4llk-pt1j). That 2025 study proposes **spin and polarization** expectation-value nonlinearity tests in high-energy products and emphasizes that the detector/event-selection background often already assumes the Born rule. This is an essential adversarial confounder to check when reinterpreting collider data.

**Study depth:** July 2026 preprint: abstract, publication metadata and source identity only; detailed six-page equations, edge treatment, source PEP angular bins, original background/calibration/likelihood model and fit are **not yet fully read/reproduced**. December 2025 publisher: original abstract and selected introduction/methods, not a complete full-text critical review. These limits are recorded in Library and Note fields, and neither paper is promoted to fully-studied.

## HAMMER's exact reproducible calculation

For a normalized Gaussian perturbation with standard deviation `ε` in `x=cos θ`, the full width at half maximum obeys the elementary identity

```text
FWHM_x = 2 sqrt(2 ln 2) ε .
```

Using **only the primary July 2026 authors' reported upper bound ε = 0.042**, we obtain

```text
FWHM_x(upper) ≈ 0.098902 ...
```

This checks the mathematical translation of an original source-reported bound, **not the statistical 95% bound itself**. In the abstract, the authors describe the upper-limit angular width as covering roughly twice their experimental bin width. HAMMER avoids importing unverified numerical best-fit values or bin dimensions from third-party AI summaries into an original-source claim.

Code and anti-overreach tests: `tools/hammer/born-collider-audit.cjs` and `tools/hammer/born-collider-audit-test.cjs`. They explicitly set `originalPEPEventDataReproduced=false`, `actualAiScientificReview=false` and `centralScoreChange=0`.

## What moves and what does not

**Valid direction — model-specific:** The reanalysis of historical observed collider counts constrains the **specified Gaussian-smearing Born-rule-deviation family** at `29 GeV` under its analysis model, with a source-reported 95% upper limit `ε<0.042`. This is real published research based on actual past measurements, not a new HAMMER hardware experiment or a model-independent falsification of pilot-wave physics. New Ledger **WL-026** and scoped movement **MOVE-013** preserve that provenance.

**Invalid direction — central ontology:** Standard quantum equilibrium Bohmian mechanics and Everettian unitary Born-rule models both predict **ε=0 in this phenomenological departure parameterization**. Constraining ε toward zero under these experiments therefore does **not** determine whether a physically singled-out configuration is real or all Everett branches are physically realized. A generic non-equilibrium pilot-wave state would require a physically justified production/preparation mechanism and matched competing likelihood to connect it to an ontology test.

A proposed experimental *bound* is not evidence of a measured Born-rule violation. The exact 95% confidence procedure, covariance and nuisance robustness await full original preprint and archived PEP source-data reproduction. R012 evidence therefore records a **restricted empirical constraint and an unverified likelihood replication**, not a universal quantum-probability verdict.

## Most actionable next scientific test

Rebuild the author's original Gaussian-smearing cross-section integral and numerical analysis from the complete six-page preprint, including event-selection assumptions, edge truncation, detector response, angular binning and nuisance correlations, then independently fit the original PEP observations. In parallel follow the 2025 spin-polarization linearity test program but insist on an analysis pipeline not trained to erase precisely the deviations it seeks to detect. Any observed departure must be checked against instrument and selection mechanisms before being attributed to quantum nonequilibrium; even then it excludes **the tested standard Born behavior**, not every possible one-actual-history model.

**Central Truth Compass:** 50→50 editorial neutral. **No provider AI scientific critique or human scientist review was performed.** Next mandatory all-eight-site research source audit remains S003-R013 (cumulative 32 completed round logs).
