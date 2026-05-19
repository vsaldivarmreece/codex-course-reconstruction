# Experiments

Validation tasks derived from source research and implementation work.

## Experiment Template

```md
## Experiment Name

- Source:
- Confidence:
- Hypothesis:
- User/problem:
- Smallest test:
- Success signal:
- Failure signal:
- Evidence to capture:
- Status: planned|running|done|dropped
```

## Source-To-Experiment Pipeline

- Source: [Codex Full Course 2026](../../processed/summaries/youtube-codex-full-course-2026-KXIdYEdOPys-summary.md)
- Confidence: inferred
- Hypothesis: research is more useful when every high-signal source creates at least one testable experiment.
- User/problem: `ia-learning` needs external learning to become implementation decisions, not passive summaries.
- Smallest test: process three sources through `raw -> processed -> insights -> project links -> experiment` and review whether they changed backlog priorities.
- Success signal: each source has a clear source-index row, at least one insight, and at least one project decision or rejected hypothesis.
- Failure signal: summaries accumulate without changing docs, backlog, experiments, or implementation.
- Evidence to capture: source-index rows, experiment outcomes, linked PRDs/backlog changes.
- Status: planned

## YouTube Channel Monthly Report

- Source: [Codex Full Course 2026](../../processed/summaries/youtube-codex-full-course-2026-KXIdYEdOPys-summary.md)
- Confidence: experimental
- Hypothesis: a channel-level reporter can identify useful AI/product/workflow patterns faster than manually watching every video.
- User/problem: `ia-learning` needs recurring discovery from AI YouTube channels without losing evidence traceability.
- Smallest test: use `youtube-channel-reporter` on one channel for the last 10 videos, then analyze the source pack with `youtube-ai-researcher`.
- Success signal: report produces at least three actionable insights with source links and one validated workflow improvement.
- Failure signal: transcript failures or weak summaries make the report less useful than manual selection.
- Evidence to capture: source pack JSON/Markdown, normalized transcripts, summary, insights, project links.
- Status: planned

## AI Marketing Team With Codex Skills

- Source: [Riley Brown latest 10 videos](../../processed/summaries/youtube-riley-brown-channel-report-2026-05-19.md)
- Confidence: inferred
- Hypothesis: role-specific agent/skill packs are easier to validate than broad "AI productivity" workflows.
- User/problem: solo founders need concrete launch assets without coordinating many disconnected tools.
- Smallest test: define 5 Codex skills/agents for one product idea: positioning, landing copy, competitive scan, email sequence, and launch checklist.
- Success signal: a usable artifact set exists with fewer than two manual rewrite passes and all claims are traceable.
- Failure signal: outputs remain generic, require heavy editing, or cannot be reused on a second idea.
- Evidence to capture: prompts, generated artifacts, manual edit log, elapsed time, quality notes.
- Status: planned

## Thirty-Minute Operator Quickstart

- Source: [Riley Brown latest 10 videos](../../processed/summaries/youtube-riley-brown-channel-report-2026-05-19.md)
- Confidence: inferred
- Hypothesis: `ia-learning` workflows will be adopted faster if each one has a "learn 95% in 30 minutes" path ending in durable `knowledge/` artifacts.
- User/problem: research workflows are powerful but easy to forget when they require many conventions.
- Smallest test: create a 30-minute quickstart for YouTube research that produces `raw`, `processed`, `projects/ia-learning`, and source-index updates.
- Success signal: a fresh session can complete the workflow without extra explanation.
- Failure signal: the quickstart omits evidence fields, produces passive summaries, or requires manual convention lookup.
- Evidence to capture: quickstart doc, completed sample report, missing-step notes.
- Status: planned
