# Worldline Lab relay draft

This is a **review-only engineering draft**, not an active automation service.

- CONTRACT.md: draft lead role, message protocol, and release gates.
- archive/: immutable future message envelopes (no production messages stored yet).
- FEED.md: ordered index of future archive messages.
- LATEST.md: latest archived message pointer.
- handoffs/: proposed factory ticket contract, separate from relay messages.
- ../../tools/relay/: local verifier, regression fixtures and archive-diff safeguard.

Bootstrap handshake is preserved externally at https://github.com/nikahanghojjati-oss/worldline-lab/issues/13; copying it into this directory would misleadingly imply a completed production-relay test. No automatic agent listener or notifications are installed.
