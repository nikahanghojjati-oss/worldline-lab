# Worldline Lab lead relay v0.1 — PROPOSED, NOT ACTIVATED

Status: DRAFT / requires Lab One science-governance review, owner release authorization and tested production round trip.
Source discussion: https://github.com/nikahanghojjati-oss/worldline-lab/issues/13

## Boundary and leads
Team R (Lab One) is scientific and methodological lead. Team E (Lab Two) is engineering, release and mechanical shared-file integration steward. Engineering is ChatGPT-only. Team R signs off scientific interpretation, source provenance and verdict/no-change rationale; Team E validates integration, schema, tests and deployment. Neither role may unilaterally expand file ownership or move Truth Compass. The existing research-first 75/25 effort priority remains; it is not actual measured time. Main stays protected by separate reviewed PRs, never direct editing or force pushes.

## Channel and durable record
- Production relay lives under leads/relay/ after review. The GitHub Issue #13 comment handshake (Lab 1 -> Lab 2 -> Lab 1, verified 2026-10-22) is proof of a **bootstrap** exchange only.
- Authoritative payloads are new, immutable archive/<MESSAGE_ID>.json files (UTF-8). Never edit, replace or delete an archived message. No identity claims based solely on a sender label: the identity of the authenticated GitHub writer/agent must be checked against the issue/commit context.
- FEED.md is a machine-readable append-only index containing id, archive path and SHA-256 in order. LATEST.md is a convenience pointer to its most recent entry, never the sole data carrier.
- Handoffs and job assignments are separate, issue-numbered records; the single latest pointer must NEVER serve as the worker queue.
- A complete write sequence is: (1) determine the unique message ID; (2) calculate SHA-256 on the exact UTF-8 payload with documented newline policy; (3) create archive file (must fail if exists); (4) fetch current FEED and LATEST and blob SHAs; (5) append index using a compare-before-write SHA; (6) update LATEST with its current blob SHA; (7) re-fetch all three and verify. Retry index/pointer reconciliation if archive write succeeded but index update conflicted. Never erase an unread item or replay the same ID with different bytes.
- GitHub API content updates are optimistic conditional writes; they are **not** global locks. If another writer changes the index, fail/re-fetch/merge without blind force. A PR and this draft do not prove concurrency correctness.

## Message envelope
Archive JSON schema worldline-relay-message/v1: id; from (LAB1/LAB2); to (LAB1/LAB2); kind (TEST/REQUEST/ACK/DECISION/REPORT); replyTo (string or null); createdAt (ISO-8601 UTC); authorizedPaths (array of paths); action; payload (exact UTF-8 string); sha256 (lowercase hex hash of payload). For a one-line ASCII test use no newline; any multiline payload must declare and retain exact bytes. FEED and LATEST store only pointers/hashes, no scientific payload. Each reply references the received ID and independent hash check.

## Honest state transitions
SENT = archive committed and indexed; RECEIVED = recipient fetched and verified bytes; ACCEPTED or DECLINED = explicit assignment decision; WORKING = independently verifiable work started; REVIEW = submitted evidence; DONE = checks and authorized integration verified; BLOCKED = precise cause and retry plan. A GitHub push is not an agent wake-up, and message receipt does not prove that work started. A failed index step is PARTIALLY_WRITTEN, not SENT. Replays of identical ID+hash are idempotent; same ID with different hash is blocked and escalated.

## Serialized canonical integration
- Scope includes data/sessions.json, data/ledger.json, data/truth-engine.json, and any negotiated cross-team shared contract.
- Before every transaction record holder, paths, starting SHAs, scope, scientific approval evidence and transaction expiry. One holder per contested file; acquire a new base SHA immediately before writing; update with expected blob SHA; re-fetch and verify; release the reservation. Lease intent alone does not enforce server-side mutex or GitHub PR serialization; if reservations overlap or cannot be independently checked, fail closed and ask leads to resolve.
- Until the proposed PROJECT_RULES.md amendment is approved and enforced, **all existing end-of-round checkpoint rules remain binding**. Workers do not start. Later, bounded workers may submit append-only factual reports, but only a steward-produced, accepted canonical checkpoint with all seven workstreams, full roundLog, source/verdict audit, transition and five-round eight-route sweep gates closes a substantive round.
- Team R supplies evidence definitions and science acceptance tests under separate X-001 branch. This relay does not touch those files, run AI science reviews or imply a new measurement.

## Release gates
1. Lab One reviews and accepts the draft governance amendment and contract, with owner control of major changes.
2. CI validates pointer/archive consistency, mismatch/tamper/duplicate/conflict fixtures and archive immutability relative to the PR base. Branch protection or required checks need independent confirmation.
3. A NEW **branch-based** message round trip is fetched and checksummed independently by both active leads. GitHub polling/agent wake-up remains unproven until separately implemented and tested.
4. Only after review, gates and source ownership resolution: consider separate research and engineering factories with globally unique GitHub issue numbers and bounded file allowlists. Do not claim unattended operation.
