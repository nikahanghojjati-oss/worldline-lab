# Worldline Lab · session bootstrap

Website: https://nikahanghojjati-oss.github.io/worldline-lab/#sessions
Repository: https://github.com/nikahanghojjati-oss/worldline-lab

## Start with the smallest authoritative state
1. Read `data/sessions.json` for active session, progress, limitations, and next action.
2. Read `data/library.json` and `data/reading-notes.json` for bibliographic works, researcher relationships and what was actually studied. Retrieve only relevant `data/ledger.json` entries, then fetch original sources as required.
3. If necessary, use `data/research.json` and `RESEARCH_PROTOCOL.md` for goals and evidence rules.
4. Verify repository head, recent relevant commits, and any time-sensitive cited material.

## Session continuity contract
- The first actual founding session is S-001. Do not invent additional sessions.
- Make one meaningful, reviewable advance per stage. Continue while the task remains coherent.
- A handoff is recommended at a meaningful stage boundary with a committed, minimal restart packet or after serious self-reported context degradation.
- Save: verified change / link to source, open limitation, and one highest-value next action.
- Do not switch just because an arbitrary amount of time has elapsed.
- The website reports only genuine stage completion and manual quality signals. Browser checkboxes do not sync to GitHub.
- Never treat simulations, philosophical assumptions or model interpretations as experimental proof of branching realities; reverify sources before changing any editorial orientation score.
- No automatic background research occurs unless a separately scheduled task or workflow is actually set up.

Research synthesis: `research/field-note-001.md` and full-study standards: `LIBRARY_PROTOCOL.md`.

## Immediate next verification
Confirm that the Session Observatory at `#sessions` loads the GitHub-backed founding record, calculates recommendations from the assessment, copies or downloads the compact handoff, and clearly differentiates browser drafts from committed research. After that, expand the scholar corpus carefully and conduct full-text, section-cited reviews beginning with core relativity and quantum foundations. Then design interactive labs.

## Durable output to record
Update `data/sessions.json` with only verified work, next action, current status, and a new session ID only when a truly new GPT chat begins. Keep historical IDs stable.

## Session Control Center v3
The Sessions page retrieves the authoritative progress and handoff evaluation from `data/sessions.json`, and while open it retrieves the most recent project-wide GitHub commits about every three minutes. These represent commits, not live GPT telemetry. Do not infer context capacity from the activity feed.

Whenever any substantial research, library, laboratory, homepage, atlas or methodology work is committed, update `data/sessions.json` in the same milestone (or the immediately following commit):
- Update `lastVerified`, `activeWork`, `nextStep`, and the relevant `workstreams` item.
- Append only actual work completed to S-001 checkpoint verified entries; keep limitations honest.
- Update the `transition` gate: `milestoneComplete`, `checkpointCommitted`, `openQuestionsRecorded`, `nextActionDefined`, and `naturalBoundary`. Do not mark the next phase boundary simply because a file was saved.
- Change `activeSession` and create S-002 only when a separate chat actually begins, after finishing an authentic handoff.
- Keep `SESSION_START.md` short and keep original evidence in linked source files.

Default is to continue the same coherent research session. Recommend a handoff only when a meaningful stage has ended and the saved packet can resume it, or when serious continuity loss is explicitly reported. No short timer or made-up context percentage.
