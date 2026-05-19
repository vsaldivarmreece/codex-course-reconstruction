# Implementation Patterns

Reusable technical patterns discovered from YouTube, Reddit, docs, experiments, or project work.

## Template

```md
## Pattern Name

- Source:
- Confidence:
- Applies to:
- Problem:
- Pattern:
- Tradeoffs:
- Next experiment:
```

## Project Folder as Agent Artifact Boundary

- Source: [Codex Full Course 2026](../../processed/summaries/youtube-codex-full-course-2026-KXIdYEdOPys-summary.md)
- Confidence: verified
- Applies to: `knowledge/`, local experiments, generated docs/apps, RAG source capture
- Problem: agent work gets fragmented across chats unless generated artifacts live in a durable project location.
- Pattern: create or select a folder before delegating work; keep outputs, source evidence, normalized transcripts and derived notes under that boundary; mention prior files when asking follow-up agents to update or audit them.
- Tradeoffs: folder discipline adds overhead, but improves traceability and future indexing.
- Next experiment: add a lightweight `agent-workflows.md` control plane for one `ia-learning` experiment and compare it against ad hoc chat-only work.

## Skill Factory for Missing Integrations

- Source: [Codex Full Course 2026](../../processed/summaries/youtube-codex-full-course-2026-KXIdYEdOPys-summary.md)
- Confidence: inferred
- Applies to: API integrations, Codex skills, local automations
- Problem: many useful tools will not have official plugins at the moment they are needed.
- Pattern: first check for an official plugin/skill; if absent, ask the agent to inspect current API docs, create a narrow local skill, keep secrets out of source, and run a smoke test before using it in automations.
- Tradeoffs: faster capability creation, but higher safety burden around API keys, permissions and unintended external actions.
- Next experiment: create a non-sensitive sample skill with mock credentials and document a review checklist before touching real external APIs.
