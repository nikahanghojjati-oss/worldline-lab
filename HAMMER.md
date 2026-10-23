# HAMMER · Hypothesis Adversarial Mapping, Measurement & Evidence Refinement

**Version:** experimental AGI-inspired research instrument v0.5 · 2026-10-22 · Worldline Lab only

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

To opt into a further **invention pass** after both independent critiques, set `HAMMER_DISCOVER=1`. The first model must propose an explicit falsifiable new experiment with rival predictions and a testable observable; the other model then attacks it with alternative explanations and source criticism. This makes extra paid provider requests and returns `UNTESTED_PROPOSAL`—not a new paper, actual experiment, or approved scientific discovery.

Review output contains separately obtained study and critique **provider response IDs** and structured methodological objections. It explicitly says `scoreChangeAuthorized:false`. Never upload provider API keys, privileged URLs, fabricated original text, or a reviewer persona as a university employee. An API response ID confirms an invocation identifier in that session, not independent veracity or scientific expertise. Review inputs are untrusted content; the model must not execute instructions found inside sources.

**Current status:** no credentialed HAMMER model panel has actually run and no new experiment has been performed. Legacy human-scientist approval entry points are retired and fail closed; the rigorous new AI-plus-measured-discriminator decision/reversal *authorization* pathway remains to be engineered and verified before any nonzero Truth Compass revision. Accessibility tests with physical iPhone Safari/assistive technology remain separate from this **scientific reviewer policy**.

## Supporting science and prior art

- Worldline Lab verified prior finite operational equality and controlled synthetic example: [R012 original analysis](research/operational-identifiability-S002-R012.md), prior immutable source ledger WL-021 and VC-013.
- Roderich Tumulka, *Bohmian Mechanics*, arXiv:1704.08017: https://arxiv.org/abs/1704.08017 — standard quantum-equilibrium observations are empirically equivalent; refer to the original for assumptions. **Cited/targeted review only**, not newly flagged as full study.
- Jinwoo Go and Tobin Isaac, *Robust Expected Information Gain for Optimal Bayesian Experimental Design Using Ambiguity Sets*, arXiv:2205.09914: https://arxiv.org/abs/2205.09914 — related robust experimental design literature; **background abstract checked only**.
- OpenAI Responses API structured text format documentation: https://developers.openai.com/api/docs/guides/structured-outputs?api-mode=responses (for engineering integration, not physics evidence).


## HAMMER v0.2 · AGI-inspired recursive research, implemented

HAMMER now adds a bounded, **inspectable reasoning-search architecture** on top of the first theory forge. It is inspired by general-purpose intelligence's ability to decompose problems, reuse discoveries, notice failed assumptions, combine distant questions, and redirect the next experiment. It **does not implement AGI**.

- **Decompose → analogy → compose:** Map each trial to a physical model pair, measurement channel and nuisance assumptions. `assets/hammer-discovery.js` constructs candidate joint-outcome experiments by conditionally multiplying compatible predictions, keeping the declared conditional-independence premise visible.
- **Scientific concept typing:** Refuse to mix Everett-versus-equilibrium-Bohm ontology with a collapse-dynamics counterhypothesis as though they were the same competing models. `HF-003` is an explicit falsification of that category error.
- **Bounded imagination:** A two-level beam search enumerates new compatible multiquestion designs **beyond the manually written missions**, keeps the promising candidates for a next reasoning round and stores negative and veto results in its deterministic search trace. It has a strict compute budget, no external experimental data, and no persistence outside the versioned source repository.
- **Adversarial reflection:** Re-run finite-nuisance minimum JSD and ask which shared drift/correlation could defeat a predicted joint advantage. Failed questions return a next falsifiable hypothesis instead of being silently discarded. Neither this trace nor a model's verbal agreement is a physics observation.
- **Postprocessing firewall:** If two models have identical full operational outcome distributions, the same subsequent stochastic reporting/processing cannot distinguish them. Implemented and tested for explicit small examples.
- **Correlation paradox:** Two hypothetical physical models can have identical single-record marginal distributions yet maximally different **joint correlations**. Example: `p(00,01,10,11)=(1/2,0,0,1/2)` and `q=(0,1/2,1/2,0)`; both single-record marginals are 50/50, but full-joint JSD is **one bit**. This is a mathematical counterexample to reasoning *from marginals alone*, **not a novel branch discovery** and **not** a counterexample to the already-established full standard quantum operational Everett/Bohm equality. It motivates testing explicitly specified correlations in genuinely alternative dynamics, with correlations and nuisance actually derived from physics.
- **Metacognition / epistemic memory:** HAMMER's output names each generated experiment, its ancestor questions, reasons to reject it, its strongest counterfeits, next study tasks and limits on claims. A future AI-model study/critique/invention runner can use this reproducible scaffold; currently the public site never runs an external model or moves the Ledger.

**Current experiments:** `HM-001..004` in `data/hammer.json`; `HF-001..004` in `data/hammer-frontier.json`. `assets/hammer-discovery.js` powers both the interactive curated fusions and automated recursive synthesis. Its `search()` reports `verifiedNovelDiscoveries:0`, `providerReviewsPerformed:0` and `ledgerMovement:0`, explicitly. `tools/hammer/test.cjs` and Chromium browser acceptance test these invariants. The scientific analysis is in [S003-R005](research/hammer-recursive-discovery-S003-R005.md).

**Most important boundary:** Original scientific discovery requires novelty against literature, mathematical validity beyond illustrative examples, experimental feasibility, legitimate original measured evidence when empirical claims are made, and independently reproducible model-discriminating conclusions. We cannot guarantee a previously unrealized discovery from a promising question or from model outputs. HAMMER's mission is to improve the rate at which such **testable candidates** are found and invalid ones are rejected.

### Existing scientific AI methods used as benchmarks, not falsely claimed original

- POPPER (Huang et al., ICML 2025) uses agentic sequential falsification: https://proceedings.mlr.press/v267/huang25n.html
- Co-Scientist (Nature 2026) and Robin (Nature 2026) already integrate AI scientific hypothesis generation and critical processes; HAMMER therefore does **not** claim to have invented multiagent scientific discovery: https://www.nature.com/articles/s41586-026-10644-y and https://www.nature.com/articles/s41586-026-10652-y
- FIRE-Bench (Wang et al., ICML 2026) reports substantial difficulty verifying AI rediscovery experimentally; benchmark orientation matters: https://proceedings.mlr.press/v306/wang26d.html
- Dürr, Goldstein and Zanghì (1992/2004 quantum equilibrium) anchor the no-go assumptions; see https://doi.org/10.1023/b%3Ajoss.0000037234.80916.d0 . Primary full text was **not newly reviewed end-to-end** in this HAMMER software round.


## HAMMER v0.3 — publish scientific derivations and challenge original equations (R006)

The research engine must produce **falsifiable mathematical/scientific material**, not merely a visually impressive argument. Its first original repo-specific paper is [Two-mechanism identifiability and source-equation consistency](research/hammer-identifiability-and-source-critique-S003-R006.md).

**New independently testable results:**
- A generic two-arm Bernoulli interference model now derives its complete `(environment gamma, intrinsic lambda)` Fisher matrix and the exact determinant `det F = w1*w2*(a1*b2-a2*b1)^2`. A zero determinant is an explicit inability to identify the two causes even with arbitrarily many measurements of the *same* sensitivity ratio.
- A deterministic two-rate likelihood/grid search computes synthetic expected counts, analytic and finite-difference derivatives, asymptotic Cramér–Rao error floors, and optimal finite shots between arms; this is a *statistical planning prototype*, not a physical CSL simulator.
- A dimensionless separation-scan exposes why two tiny separations are almost physically indistinguishable while huge displacements lose contrast. Its best two-arm *toy* separation pair and uncertainty bound are reproducible; **none** is a calibrated detector forecast.
- The first **original-source critical consistency audit** (`tools/hammer/source-critique.cjs`) checks a 2025 arXiv preprint's displayed unitary displacement, finite-size zero-separation collapse rate, coherence lifetime, dominance claim and printed rate parameter substitution. It records *possible internal mathematical inconsistencies requiring figure/author clarification*, not a refutation of objective-collapse physics.

```bash
node tools/hammer/identifiability-test.cjs
node tools/hammer/separation-design-test.cjs
node tools/hammer/source-critique-test.cjs
```

These are rigorous, source-linked artifacts of **scientific reasoning**, but statistical Fisher information is established mathematical prior art, and the source-criticism conclusions require comparison with the definitive author version. Publication-level novelty, new empirical laws and true theory discrimination are **not** certified. The model-level scientific output can evolve only as far as its inputs and test assumptions permit. Neither synthetic data nor source typos justify changing the editorial Truth Compass 50 or claiming a previously unrealized physical discovery. Future iterations must actively seek primary-source full text, derive real physical generators, reproduce experimental raw data, calibrate nuisance parameters and seek AI-model critical reviews with genuine provider records.


## HAMMER v0.4 · Assumption Surgery: a falsification firewall for history ontology (S-003-R007)

The central question is harder than detecting interference or even Bell violation: *can an accessible experiment tell one actually realized history from multiple physically real histories?* Different ontologies can yield the same measured statistical distribution. HAMMER's **Assumption Surgery** module treats that as an actionable research obstruction instead of filling the Ledger with weak indirect evidence.

**Implementation:** `tools/hammer/assumption-surgery.cjs` and `tools/hammer/assumption-surgery-test.cjs`; source-linked mathematical note [R007](research/hammer-assumption-surgery-S003-R007.md); the Observatory links to the full certificate.

Its new research procedure (a Worldline Lab integration, **not** an assertion that the constituent theorems are original):

1. **Cut the theorem precisely.** Specify a real no-go theorem's conjunction of assumptions, required experimental preconditions and the measured quantity. Do not infer a preferred ontology just because the conjunction fails.
2. **Construct the rival's strongest compatible outcome model.** Compute singlet Born correlations with `|CHSH|=2√2`, enumerate all 16 local deterministic assignments, and construct an explicitly **nonlocal single-realized-outcome toy model** with exactly the same four outcome joint probabilities. This demonstrates the logical insufficiency of CHSH as a many-world counter; it is **not Bohmian dynamics** or a local Wigner-friend model.
3. **Compile the operational impossibility certificate.** If two fully specified theories share every accessible conditional Born measurement kernel, the probability chain rule guarantees equal sequence statistics under every finite adaptive observation policy. The code exhaustively checks all eight two-step binary-action policies; the general chain-rule statement is mathematics, not an empirical new-physics result.
4. **Search the surgery frontier.** Enumerate minimum premise-relaxation sets for a simplified Bell conjunction and a distinct Local Friendliness conjunction; do not equate LF local agency with Bell-local factorization or treat Bell tests as LF violations. Every relaxation is a logically possible research avenue, not proof it occurs in nature.
5. **Derive an intervention target.** Instead of proposing to “observe another branch” without a detector, quantitatively search for the minimum changed outcome conditional that creates an information-bearing protocol, explicitly labeling invented preparation dynamics and calibration requirements. One synthetic example needs a ~0.0471 change in the specified Bernoulli conditional to produce 0.001 JSD bits; no experiment or source claims this deviation exists.
6. **Only then consider a Ledger-scoped finding.** The experiment must identify a *specific physically defined model extension*, with authentic original source, detector calibration, actual independently reproducible measurements, nuisance robustness and provider-backed AI methodological critique. Excluding an extension to physical dynamics does not establish how many fully real Everett-style histories exist. The inherited central editorial 50 is untouched.

**Prior scholarly context:** Bong et al. (2020) [Nature Physics](https://doi.org/10.1038/s41567-020-0990-x) establishes the Local Friendliness no-go conditional on observer-level control; Walleghem (2026) [Physical Review A](https://doi.org/10.1103/hf5j-t83v) provides a recent different extended-friend assumption analysis; a 2025 [critical reassessment](https://pmc.ncbi.nlm.nih.gov/articles/PMC12192408/) argues the practical strength of these no-go arguments can be limited. The [2026 Stanford Encyclopedia of Philosophy survey](https://plato.stanford.edu/archives/sum2026/entries/qm-manyworlds/) emphasizes testing specific collapse dynamics rather than treating a Born-correct interpretation as already distinguished from equilibrium Bohm.

**Status:** All results are synthetic calculations, conditional mathematics or a diagram of theorem dependencies. No new quantum measurement, genuine AI reviewer call, recognized independently established new mathematical theorem, or empirically discriminating ontology discovery occurred. This honest barrier certificate is useful precisely because it tells the research engine **what would need to be different and measured** for a future update to be defensible.


## HAMMER v0.5 · actual experimental evidence and scoped Ledger movement (S-003-R008)

HAMMER is now able to produce **genuine source-grounded empirical movements**, not merely mathematical no-go results or hypothetical theory differences. Under the explicitly scoped research question, it accepts real reported observations and extracts only the falsifiable physical model claims they genuinely test.

Three real original experimental studies are recorded in the [S-003-R008 report](research/hammer-observed-evidence-S003-R008.md), with **WL-023–025** and **MOVE-010–012**. The original studies were published in Nature 2026 and Physical Review Letters 2024 / October 2026. Their three directions are: (1) measured 172 kDa massive-cluster interference constrains source-defined minimum macrorealist spontaneous localization; (2) the 4.32-billion-trial Hardy experiment excludes the tested Bell-local realist null under its paper-defined statistical assumptions; (3) circuit-QED experiments observe reduced spontaneous which-path erasure with increasing controlled reservoir complexity.

**Independent reproducible calculations:** `tools/hammer/observed-evidence.cjs` and its test rebuild the approximate first-Talbot resonance velocity from source mass (172000 Da), optical period (133 nm) and grating separation (.983 m), confirming agreement with the paper's 120–170 m/s beam. It also reproduces `mu=log10(2.84e15 seconds / 1 second)≈15.45`, the source's model-specific posterior macroscopicity summary, and records the published Hardy `p ≤ 10^-16348` in logarithmic form. The enormous Hardy p is **not** a probability the single-world ontology is false, nor a reproduced raw-data likelihood. The original Zenodo raw data/code archive exists, but attempts to obtain its ZIP failed in the tool environment; HAMMER has NOT rerun the original posterior analysis or measurement records. The October 2026 bath study was only accessible at abstract level; its effect size has not been independently derived.

**Evidence partition integrity:** `scientificMovements` in `data/ledger.json` separately captures source IDs, source-depth notes, real experimental effects, model-specific direction, exact reported quantitative results, reproducible arithmetic, and the logically separate `centralScoreImpact=0` where the history ontology does not follow. This is a scientifically real movement of three **restricted physical claims**, not an arbitrary central-score shift. The generic physically one- versus many-history question remains unresolved and the historical 50/100 is an uncalibrated editorial anchor.

**Source totals:** 83 indexed original works, 74 reading notes, still 28 genuinely fully studied original main-text critical reviews. The mandatory R008 eight-route research-source sweep at cumulative round-log27 is completed with the next at32 (R013). The research-first next requirement is to download and actually replay the publicly available [Nature data and code](https://zenodo.org/records/17502163), reproduce its 5% posterior and collapse-family sensitivity, and independently evaluate a physically feasible *operationally different* one-history versus many-history prediction. No AI model-panel run or real new experiment was invented.

## Growth path (not falsely claimed complete)

HAMMER v0.3: source-bound AI model study packets with independently replayed exact citation passages; deterministic audited numerical likelihoods, power, calibration and model-discrepancy bounds; optional trusted provider audit trail with commit-binding.

HAMMER v0.4: discover candidate cross-field discriminators (decoherence, cosmological structure, nonequilibrium pilot waves) from verified physics/math libraries; reject equivalence traps before costly instrument proposals; rank testability and known failure modes.

HAMMER v1: evidence-bearing original theoretical contribution **only if mathematically proved or empirically replicated**. Include red-team model criticism and reversible claim provenance; never confer AGI capability status by the product name.

## Public HAMMER research page · new dedicated route (S-003-R009)

The published website now includes **[HAMMER research forge](hammer.html)**, a dedicated illustrated, responsive page with its own original vector artwork in `assets/hammer-art.svg`. It keeps the old Observatory workbench intact and embeds the interactive theory forge for readers who arrive directly at HAMMER. No simulated result is misrepresented as a real experiment.

On each visit, and when refreshed/revisited, `assets/hammer-page.js` reads current committed `data/ledger.json`, `data/sessions.json`, `data/library.json` and `data/reading-notes.json` from GitHub Pages. The **25 Ledger entries, 12 model-specific movements, 83 indexed works, 28 genuinely fully studied main texts, S-003-R008 scientific checkpoint and the editorial Compass 50** are derived from data, not duplicated constants. New verified commits/deployments will automatically appear in the movement feed and research timeline on refresh; no false live AI execution, speculative time tracking, or invented movement animation. The displayed needle changes only if the actual committed central score changes.

**Ultimate scientific purpose:** the central one-real-history versus many-physically-real-histories Truth Compass may move *either way* after genuine model-specific rival operational likelihoods, feasible tested preparations, calibration and original measured data, adversarial alternative-model assessment, independently reproducible analysis, and source-first legitimate AI model reviews support a real directional conclusion. It does **not** have to move merely because an impressive new observation constrains Bell-local realism or a restricted collapse model. The site explicitly explains the distinction.

This is a ninth **website presentation page**, not a ninth canonical `#` scientific content route. The eight longstanding hash routes and their five-round audited source cadence remain unchanged. Dedicated desktop/mobile browser and axe WCAG tests cover `hammer.html`; passing automated tests does not replace physical-device Safari or human screen-reader usability checks. Browser stays read-only and uses no provider secrets.

**Project continuity:** source evidence and HAMMER logic remain versioned in GitHub. This does not certify or replace human scientific reviews (which the owner excludes); source-first AI science critics remain optional and have not been invoked by this static web page.

## S-003-R010 · Cinematic science dashboard guided by owner visual reference

The owner provided a widescreen concept sketch for the dedicated HAMMER site. `hammer.html` is now restyled as a **deep midnight blue/cosmic research dashboard**, with a dramatic gold HAMMER masthead, luminous *original authored SVG* research hammer, a Truth Compass card, a six-panel source-derived metric strip, three immediately visible model-specific movements (with an expandable, larger history), six rigorously described work stages, current physical discrimination research focus, three recent committed research cards (expandable), and the existing interactive hypothesis workbench below.

**Design integrity is scientific integrity:** the sketch's **56**, “+6”, three **+2** movement badges, “71 notes”, and “S-003-R008 latest session” are obsolete/illustrative and must **never** be treated as observations or copied as factual UI state. The public dashboard fetches **editorial 50 from `data/ledger.json`**, 25 recorded evidence entries, 12 truly logged model-scoped movement decisions, 83 indexed originals, **74 notes**, 28 completed original-main-text critical readings, nine real `data/research.json` discipline queues, and latest **S-003-R010** checkpoint once published. If newer GitHub commits legitimately update these values, the page changes on source refresh—no made-up discovery animations.

The user-supplied mockup is a design reference rather than pasted as a screenshot asset, since it includes a scientifically false Compass shift. The hero illustration is a standalone textual SVG with honest artistic-not-measured labeling. A source-linked scientific movement may be directional against a narrow model, but central direction must remain unresolved under Everett/equilibrium-Bohm operational equality. Explicit real physical likelihood-divergence, source calibration, original observation, alternative hypotheses, and reproducible testing are the necessary gates to move the central score in either direction. No claimed live automatic AI agent activity or provider AI reviews.

**Engineering:** CI now tests six visible dashboard metrics, six-stage flow, embedded experiment, source-bound 50, scalable scientific movements/round history and desktop/phone-width accessibility. Existing 8 routes and 9×3 research labs remain unchanged. Automated Chromium and axe pass/fail is not physical iOS Safari or assistive-technology review.

## Shared cinematic Worldline Lab design (S-003-R011)
The dedicated HAMMER page set the visual reference; the original eight Research/Observatory/Truth Ledger/Journal/Labs/Atlas/Library/Sessions routes now inherit the same readable dark stellar palette, navigation, spacing, system-font hierarchy, accessible resource menu and cyan/gold scientific accents from `assets/worldline-unified.css`. The new tokens are styling only: the nine field labs, three view modes, evidence source statuses, 25 Ledger findings and 12 model-scoped movements remain intact.

**Scientific priority:** HAMMER's ambition is a defensible physical test distinguishing the *number of actually realized histories*, not visual movement of a dial. The current 50 remains a neutral editorial reference unless real source-observed data have *unequal calibrated joint likelihoods* under physically specified and viable single-history and many-history theories. The most actionable outstanding task is retrieving and genuinely replaying the 2026 Pedalino raw Zenodo counts/code, and using original Hamiltonians/transition kernels to formulate an experimental observable that survives every nuisance and nonlocal one-history countermodel. Such work remains open; R011 website styling adds no new measurement or peer-reviewed first-of-kind discovery.

## S-003-R012 · Born-rule collider data as a falsifiable conditional constraint
The newly verified original [July 2026 arXiv preprint](https://arxiv.org/abs/2607.06938) by Antony Valentini and Mira Varma reports **ε<0.042 at 95% confidence** for a particular Gaussian angular smearing of Born-rule Bhabha cross sections reanalyzed from historical 29-GeV PEP experimental counts. This is original author reanalysis, **not a new HAMMER measurement**, nor a raw-data refit. HAMMER independently derives the Gaussian FWHM at that published upper width: **2√(2ln2)×0.042≈0.0989 in cosθ**. Code `tools/hammer/born-collider-audit.cjs`, negative checks, and technical report [R012](research/hammer-born-rule-collider-S003-R012.md) document assumptions, remaining collider source-data uncertainty and needed calibration/selection-falsifiers.

New restricted claim **WL-026 / MOVE-013** says only that the authors' specified angular-smear Born-rule departure is experimentally constrained in their preprint model. It does **not** show a nonzero Born-rule violation and does not distinguish Everett from quantum-equilibrium Bohm (both standard models allow ε=0). The source is **abstract-reviewed**, not a newly completed whole original critical study. If/when the PR is published, source totals become **84 indexed,75 notes,28 full originals;26 findings,13 movements**; the central score remains **50**. Full six-page original fit/PEP data replay and two genuine AI source reviewers have not been performed. This is a candidate high-energy experimental frontier for future HAMMER work, not a claimed unprecedented ontology discovery.
