# Field Note 002 · Gödel, Hawking and Deutsch: existence, formation, consistency
Worldline Lab | S-001 | 2026-10-21 | Scientific review round S-001-R002

**Research depth:** Targeted sections of **three accessible original full-text papers have been examined**. The whole of each paper has **not** been exhaustively critically studied, and no `fully-studied` publication is claimed. Two additional counterargument articles are reviewed at abstract level. Method: direct comparison of model assumptions, mathematical consequences, and what observations could actually distinguish hypotheses.

## Core question
What do closed timelike curve (CTC) results say about physical backward time travel or physically realized multiple histories? In particular, which propositions concern mathematical existence, dynamical formation, and consistency **conditional on a loop**, and which are observations?

### Source A: Gödel, 1949 (SRC-002)
K. Gödel, *An Example of a New Type of Cosmological Solutions of Einstein's Field Equations of Gravitation*, Reviews of Modern Physics **21**, 447–450 (1949). [Publisher full text](https://journals.aps.org/rmp/pdf/10.1103/RevModPhys.21.447) · [DOI](https://doi.org/10.1103/RevModPhys.21.447).

Sections examined: §1 **Main properties** (p.447); §2 **Metric and field equations** (pp.447–448); §3 **Proof of properties** (especially the circular timelike path construction, p.449). Section §4's broader philosophical commentary has not been fully reviewed.

- **Assumptions and mathematical object.** Gödel supplies a stationary, spatially homogeneous rotating dust cosmological solution, with a cosmological term, to Einstein's equations. This is an internally studied exact geometry, not a measurement of our Universe.
- **Key derivation.** §1 properties (4)–(6) separate a globally consistent *choice of time orientation* from a global time function that increases on every future-directed timelike path. The latter fails for this geometry. In §3 (p.449), a sufficiently large constant-radius circular path is timelike and closes, establishing the CTC structure within the specified metric.
- **What this permits.** A solution of classical general relativity can have closed timelike paths, even though locally an observer remains future-directed along their own proper time.
- **What it cannot establish.** The observed cosmological spacetime has not been identified as Gödel's rotating universe. The geometry does not establish that realistic observers can generate such loops, that traversable machines exist, or that multiple independent world histories physically coexist.

### Source B: Hawking, 1992 (SRC-003)
S. W. Hawking, *Chronology protection conjecture*, Physical Review D **46**, 603–611 (1992). [Institution-hosted full text](https://lweb.cfa.harvard.edu/~loeb/Hawking_C.pdf) · [DOI](https://doi.org/10.1103/PhysRevD.46.603).

Sections examined: §I **Introduction** (p.603); portions of §II **Cauchy horizons** (pp.604–606); §III **Closed null geodesics** (p.606); §IV **Quantum fields on the background** (pp.608–609); §VI **Conclusions** (p.610). The intervening technical derivations and field renormalization have not been independently reproduced.

- **Key conditional result.** A compactly generated chronology/Cauchy horizon developing from an initially noncompact surface is incompatible with the stated weak-energy assumptions; under the paper's setup, generating the relevant horizon requires violation of an averaged weak energy condition. This constrains constructing a chronology-violating region from apparently ordinary initial conditions, not every conceivable eternal CTC spacetime.
- **Semiclassical argument.** As near-closed null geodesics accumulate, the renormalized stress-energy expectation may become very large; its backreaction on the metric could prevent horizon formation. The paper discusses exceptional configurations and possible quantum-gravity cutoffs, explicitly noting unresolved theoretical issues.
- **Careful scope.** `Chronology protection` is a conjecture supported by conditional geometric arguments and semiclassical reasoning, **not** a universally proved prohibition on all CTC geometries and **not** a direct experiment. The lack of future tourists in Hawking's conclusion is humorous, not a controlled measurement.
- **Relation to Gödel.** No contradiction: a mathematical geometry with CTCs can exist in the solution space while physically forming CTCs from otherwise causal, finite initial conditions faces additional restrictions. The different initial/boundary assumptions matter.

### Source C: Deutsch, 1991 (SRC-019)
D. Deutsch, *Quantum mechanics near closed timelike lines*, Physical Review D **44**, 3197–3217 (1991). [Accessible full-text copy](https://gwern.net/doc/science/physics/1991-deutsch.pdf) · [DOI](https://doi.org/10.1103/PhysRevD.44.3197).

Sections examined: opening **Applying the quantum theory of computation** (pp.3197–3199); **Quantum computational analysis of the paradoxes** (pp.3202–3203); density-operator self-consistency **equations (15)–(18)** (p.3203); **maximum-entropy rule** and supplementary data (p.3204). The full later treatment of interpretational alternatives and all examples remains uncompleted.

- **Model boundary.** A finite quantum circuit has chronology-respecting degrees of freedom with initial density matrix `rho_CR` and an assumed chronology-violating subsystem `rho_CTC`, interacting by a unitary gate `U`. Paths and loop topology are stipulated; the model does not show how a gravitational time loop forms.
- **Defining fixed point (equation 15, schematic notation):** `rho_CTC = Tr_CR[U (rho_CR ⊗ rho_CTC) U†]`. This is an equality of the density operator before and after traversing the stipulated loop, not an observation of any past alteration.
- **Existence argument (equations 16–18):** for fixed `rho_CR`, the map on the loop system is a finite-dimensional quantum channel. Averaging iterates of this channel yields a sequence with approximately vanishing fixed-point residual; compactness provides an accumulation point that is a fixed point. This supplies at least one mathematically self-consistent density operator for the assumed finite circuit, unlike a classical deterministic bit-flip map with no fixed value.
- **Nonuniqueness and an extra postulate.** Multiple fixed-point densities can exist; Deutsch proposes a maximum-entropy rule to choose supplementary data (p.3204). That rule is an additional interpretive/physical proposal, not a consequence of empirically detecting a CTC.
- **Remaining problem.** Alternative prescriptions for CTC consistency are mathematically inequivalent; apparent nonstandard effective dynamics depend on which prescription is adopted. No experimentally available CTC is established by these calculations.

## Competing formulations (counterargument check)
1. H. D. Politzer, *Path integrals, density matrices, and information flow with closed timelike curves*, Phys. Rev. D **49**, 3981 (1994); [APS original abstract](https://doi.org/10.1103/PhysRevD.49.3981). **Abstract only:** The paper contrasts path-integral and Deutsch density-matrix formulations, which need not give the same results in stipulated CTC settings. No full derivation has been read.
2. S. Lloyd, L. Maccone, R. Garcia-Patron, V. Giovannetti and Y. Shikano, *Quantum mechanics of time travel through post-selected teleportation*, Phys. Rev. D **84**, 025007 (2011); [APS original abstract](https://doi.org/10.1103/PhysRevD.84.025007) · [MIT institutional record](https://dspace.mit.edu/entities/publication/4e961ae6-417d-4811-81ea-7aa85bcc055f). **Abstract only:** The postselection model differs from Deutsch's. An optical or quantum-information simulation of its effects does **not** demonstrate an actual gravitational CTC. Reviewing the full proposal is the next adversarial step.

## Model comparison and evidence gate

| Family | Premise or mathematical setting | What the result establishes | What it does NOT demonstrate | Required discriminating evidence |
|---|---|---|---|---|
| Gödel rotating spacetime | An exact rotating cosmological GR solution | Classical equations admit global CTC paths for specified geometry | This is the observed universe or an engineered machine | Measured geometry and accessible physical mechanism matching those assumptions |
| Hawking chronology protection | Formation of compactly generated horizon from specified initial surface; classical energy constraints and semiclassical fields | Substantial theoretical obstacles to constructing CTCs | A universal no-CTC theorem or empirical proof of one history | Validated gravity/quantum backreaction predictions for realistic formation mechanism |
| Deutsch D-CTC | A physical CTC assumed; finite circuit and density-matrix consistency | A self-consistent state exists in the stipulated mathematical model | Time loops exist or Everett branches are experimentally counted | Actual accessible CTC setting or an independent physical mechanism yielding distinctive predictions |
| Politzer / Lloyd alternatives | Different hypothetical consistency prescriptions | Deutsch dynamics are not unique across CTC theories | Simulated optical networks are real spacetime loops | Independent observed effect ruling out competing physical prescriptions |

Important distinction: **A closed timelike path within one globally unusual spacetime is not the same proposition as an Everettian multiplicity of decohering quantum branches.** Hawking and Deutsch do not constitute opposing empirical votes on the number of physically realized histories. Their claims answer different conditional questions.

## Interim inference / Truth Compass audit
- **Confirmed from source text:** Gödel constructs a theoretical CTC geometry; Hawking offers conditional formation obstructions and semiclassical backreaction reasoning; Deutsch shows density-matrix fixed-point consistency *under an assumed CTC*. The alternative quantum prescriptions dispute model uniqueness.
- **Still unestablished:** Any physical CTC apparatus, a means of switching macroscopic timelines, direct observation of multiple realized quantum histories, or an empirical test that separates the proposed ontology candidates on these terms.
- **Score:** 59/100 -> **59/100 (no change)**. This score is illustrative editorial orientation, *not* a probability. Improved research depth is measured independently of compass movement.
- **Evidence classifications:** mathematical-existence claim = theoretical; horizon-formation obstruction = conditional theoretical argument; circuit fixed point = conditional mathematical model; experiments confirming such loops = none identified by these sources. A simulation is not a substitute for a physical CTC.

## Next falsifiable/reproducible actions
1. Verify the Gödel metric and timelike-circle inequality algebra by independent symbolic calculation, recording explicit sign convention and the required radius domain.
2. Check Hawking §§II–V in full against later counterexamples and quantum-field-theory objections; determine which chronology-horizon assumptions each objection actually targets.
3. Reproduce Deutsch's simple one-bit model with a small exact quantum-channel calculation, including maximum-entropy selection and the difference from classical bit flip; test dependence on fixed-point choice.
4. Read Politzer (1994) and Lloyd et al. (2011) beyond abstracts and compare operational predictions under identical toy circuit assumptions. Then return to Everett/Bell/Bohm/GRW where experiments may actually discriminate dynamics.

**Review accounting:** 3 papers have **targeted original-text partial reviews** with sections/pages identified; 2 contrasting papers have **abstract-only** reviews; **0 additional completed full-text studies**. Source links and paper pages record the exact basis of this checkpoint. Future sessions must not silently promote these to 'fully-studied'.

## Round S-001-R003 · small independent model checks (2026-10-21)
These are **algebraic/toy-model calculations**, not physical CTC simulations or empirical observations.

### Gödel's circular path sign (published p.449)
The transformed metric given in Gödel §3 is, with `a > 0` and `s = sinh(r)`:
```
ds² = 4 a² [dt² − dr² − dy² + (sinh⁴r − sinh²r)dφ²
             + 2√2 sinh²r dφ dt].
```
Set `dt = dr = dy = 0` and vary the angular coordinate `φ` around a closed circle. The resulting coefficient is
```
g_φφ = 4 a² sinh²(r) [sinh²(r) − 1].
```
Using Gödel's time-positive metric convention, this circle is timelike for `sinh²(r) > 1`, or `r > asinh(1) = ln(1 + √2) ≈ 0.881373587`. Direct numeric checks of the sign for the inner coefficient `sinh⁴r−sinh²r` give `−0.1978061734` at `r=0.5`, zero at `r≈0.881373587`, and `+0.5263334134` at `r=1.0`. This independently checks the timelike-circle inequality in his metric **conditional on the Gödel geometry**; it does not reproduce the field-equation verification or imply a CTC in our Universe.

### Deutsch-type one-bit fixed-point toy (published consistency logic pp.3202–3204)
A classical NOT loop requires `b = 1−b`, impossible for the discrete deterministic values `b ∈ {0,1}`. In a stipulated closed quantum loop, take a qubit's channel to be `Φ(ρ)=XρX`, where `X` is the Pauli bit-flip matrix. The maximally mixed density matrix `I/2` obeys `Φ(I/2)=I/2`. So does `|+⟩⟨+|`, showing the fixed point is not necessarily unique. Direct 2×2 matrix multiplication gives zero residual for both, with eigenvalues `(0.5,0.5)` and `(0,1)` respectively. Under a maximum-von-Neumann-entropy selection, `I/2` would be preferred for this toy among the fixed points.

This toy reproduces a small consequence of density-operator self-consistency, but not Deutsch's full computational-network proof or any semiclassical-gravity construction. An ordinary laboratory NOT gate demonstrates the channel algebra, not a closed timelike curve or a branching ontology. It remains essential to state that assumptions about physically allowed loops are independent of their circuit consistency models.

**Result:** Mathematical checks succeeded at the stated scope. No empirical discrimination of physical histories has been added. The illustrative Truth Compass remains **59/100 (no change)**; see audit VC-004 and notes NOTE-020–021.
