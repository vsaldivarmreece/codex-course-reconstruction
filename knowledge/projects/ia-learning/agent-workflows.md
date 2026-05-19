# Agent Workflows

Reusable operating patterns for Codex, plugins, skills, and multi-agent work in this repo.

## Workflow Template

```md
## Workflow Name

- Source:
- Confidence:
- Use when:
- Project folder:
- Inputs:
- Agent lanes:
- Artifacts:
- Validation:
- Memory update:
- Risks:
```

## Source Intelligence Workflow

- Source: [Codex Full Course 2026](../../processed/summaries/youtube-codex-full-course-2026-KXIdYEdOPys-summary.md)
- Confidence: verified
- Use when: analyzing YouTube, Reddit, docs, articles, AI tooling updates, or implementation references.
- Project folder: `knowledge/`
- Inputs: source URL, transcript/export, user objective, project relevance.
- Agent lanes: capture raw evidence; normalize source; analyze with the relevant researcher skill; extract insights; link to project memory.
- Artifacts: raw payload, normalized transcript/thread, summary, insight, source-index row, project links.
- Validation: source URL resolves; raw evidence is preserved; summary includes confidence and evidence pointers; project files link back to processed artifacts.
- Memory update: update `source-index.md`, plus relevant project memory files.
- Risks: summaries becoming treated as primary evidence; transcripts missing visual context; auto-captions introducing errors.

## Multi-Agent Launch Workflow

- Source: [Codex Full Course 2026](../../processed/summaries/youtube-codex-full-course-2026-KXIdYEdOPys-summary.md)
- Confidence: inferred
- Use when: turning an idea into multiple coordinated artifacts such as app, landing, deck, video, waitlist, or automation.
- Project folder: one folder per initiative under the relevant app/docs area, with derived memory under `knowledge/`.
- Inputs: idea brief, target user, artifact list, validation criteria.
- Agent lanes: product spec; implementation; landing/waitlist; supporting assets; automation; QA.
- Artifacts: checklist, generated files, deploy/test links, screenshots or validation notes, memory update.
- Validation: run the app, open deploy preview, submit test form, inspect generated document, or run API smoke test.
- Memory update: record reusable implementation/process patterns and open questions.
- Risks: parallel work without state tracking; unvalidated "done" claims; secrets pasted into prompts.
