# Worldline Lab · S-002-R012 mathematical identifiability gate

**Question:** Does our universe have one physically realized history or multiple physically real branches? **Date:** 2026-10-22. **Status:** original project mathematical comparison of already fully reviewed source theory, NOT a new full-text paper, new measured experiment, or ontology probability.

## Exact conditional result for operational records

Everett (SRC-007/NOTE-050) interprets a unitary state and approximately decohered components as multiple real branch-relative records. Bohm 1952 I/II (SRC-010 and SRC-059, NOTE-043/044) supplements the same Schrödinger state with one actually occupied configuration. Norsen 2018 (SRC-076/NOTE-066; full text https://pmc.ncbi.nlm.nih.gov/articles/PMC7512940/) details equivariance and quantum equilibrium: if rho(Q,t0)=|Psi(Q,t0)|², continuity equations guarantee rho(Q,t)=|Psi(Q,t)|² under suitable guidance and regularity assumptions. Distinct macroscopically disjoint pointer configurations occupy regions R_k, giving P_Bohm(k)=integral_Rk |Psi(q)|² dq. Corresponding Everett branch weights are P_Everett(k)=||Pi_k Psi||²=integral_Rk |Psi(q)|² dq for the same apparatus, initial state, pointer regions and Born-weight prescription.

A general finite apparatus/systems POVM derived by unitary coupling and an ancilla yields P(k)=Tr(E_k rho), and both approaches predict it when the standard Born-rule conditions hold. For a sequence of actual recorded operations represented by quantum instruments I_{k_t}, the same applies to P(k1,...,kT)=Tr[I_{kT}∘...∘I_{k1}(rho0)]. **The quantum-instrument statement concerns preparations and coarse-grained pointer records under matching apparatus dynamics**, not an ontological equivalence theorem for every unphysical wavefunction measurement, non-equilibrium distribution, different hidden-state access, or alternate theory of conditional probabilities.

For *any* finite record dataset D with outcome likelihood positive under these paired predictions, P(D|Everett-Born)=P(D|Bohm-equilibrium), so LR=1 and log LR=0. No increase in sample size for an experiment in this equivalence class can resolve the count of physically real branch histories. A likelihood cannot be assigned to ontology alone without empirical definitions, calibrated measures and specific alternatives. Distinct measures of prior theory preference are philosophical/model priors, not an observed branch counter.

## Worked, reversible two-qubit record and erasure

Original reproducible source file: `tools/truth-engine/ontology-identifiability.cjs`.

Start |00>; apply H on first qubit, CNOT with first as control: (|00>+|11>)/√2. The two orthogonal correlated pointer records have Born weights 1/2,1/2 in both theories, despite different ontological stories. If the system INCLUDING pointer is fully coherent and the exact CNOT and H are reversed, it returns |00> with P(first qubit=0)=1. Actual Bohm configurations follow a definite path in an equilibrium ensemble but reproduce this same inverse-circuit probability; an Everett superposition remains unitary and does too.

Now stipulate genuinely irreversible *projective dephasing of the record* before reversal: rho=(|00><00|+|11><11|)/2. The inverse circuit produces P(first qubit=0)=1/2. This rejects that **specific** added physical coherence-loss operation if measured deviation has alternative noise calibrated, but still cannot distinguish Everett and quantum-equilibrium Bohm, neither of which requires fundamental collapse. An unread environment that keeps which-record information produces reduced-state dephasing and the same accessible statistics even under globally unitary quantum dynamics. The experiment must control or recover those environment degrees to interpret an irreversible-loss finding.

The qubit's reversible preparation is NOT a macroscopic observation by a conscious person; conflating its undo gate with reversing someone's lived history is a category mistake.

## Fixed-hypothesis sensitivity, two opposite synthetic datasets

Single-qubit interferometer with externally estimated environmental visibility gamma_env and possible additional physical-collapse visibility c has P(+|theta)=(1+gamma_env*c*cos(theta))/2. Everett and Bohm in equilibrium share c=1. A **stipulated** stochastic-collapse or dephasing mechanism at a specified time may have c=0.5; this number is a teaching countermodel, NOT a derived GRW/CSL 1986 parameter bound.

Preselect theta=0, gamma_env=0.8, c_coll=0.5: P_E=P_Bohm=0.9, P_collapse=0.7. For a wholly **synthetic** binomial n=1000, k=900, log[L(E)/L(Bohm)]=0 exactly, while log[L(E)/L(collapse)]=900ln(0.9/0.7)+100ln(0.1/0.3)=+116.321756586; a different entirely synthetic k=700 favors c_coll and gives a negative fixed-model log LR. This is not observed data, posterior odds, universal Bayes factor, or a meaningful many-worlds probability; it is only a transparent numerical discrimination-test design and a proof of equal scores for matched operational models.

## Why this matters scientifically

The point of the ledger is to adjudicate *the question*, not reward reading. This conditional no-go **eliminates an enormous class of conventional Born-rule tests as candidates for deciding one versus many** under the same initial-state assumptions; it sharply redirects research toward added empirical premises rather than accumulating nondiscriminating results. That is a substantive methodological advancement with no artificial directional 50/100 movement.

The next experimentally meaningful gates are: (a) empirically motivated pilot-wave nonequilibrium with distinct detector-calibrated Born departures, as in SRC-075; (b) controlled mesoscopic decoherence/recoherence with physically specified mass, geometry, environment and objective-collapse kernel; and (c) mathematical evaluation of whether any genuinely distinct one-actual-history model and real-many-history model outside the equivalent Born class predict an identifiable record. Such deviations test extra *dynamical or distributional assumptions*, not automatically ontology itself. Remain open to no uniquely distinguishing accessible experiment.

## Audit and limitations

This is an independently derived simple two-qubit calculation and explicit operational conditioning from already completed sources, not a new primary full-text reading. No raw detector observations, device-specific collapse GRW constants, photon polarimetry dataset, or macroscopic reversal experiment are asserted. Original GRW 1986 full 22-page original body remains unstudied; an indexed PDF exists but web direct fetch did not allow verified end-to-end reading, so SRC-042 stays abstract-reviewed. The Joos 1987 contemporary decoherence objection (https://doi.org/10.1103/PhysRevD.36.3285) was checked at **publisher abstract only**, not a new complete review; it reinforces the necessity of distinguishing reduced decoherence from stochastic collapse.

**Verdict:** WL-021 formal model-identifiability restriction, central editorial 50 unchanged. No physical evidence for either history count, and no additional full-source review credited.
