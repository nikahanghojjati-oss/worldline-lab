# Immutable message envelopes

No production messages have been sent.

Create a NEW JSON file named by the exact unique message ID, e.g. WL-RLY-YYYYMMDD-L1-001.json. The canonical bytes hashed are the UTF-8 value of its payload field (no implicit newline). Required envelope fields and hash checks are in CONTRACT.md and tools/relay/check.cjs.

Once committed, an envelope may never be modified or removed. Correct mistakes with a new superseding message, replyTo pointing to the original.
