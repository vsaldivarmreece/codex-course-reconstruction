# Source Index

Registry of sources analyzed for `ia-learning`. Use this as the quick lookup before re-reading raw transcripts or chat history.

| Captured | Source | Title | Raw | Processed | Insights | Confidence | Project relevance |
|---|---|---|---|---|---|---|---|
| 2026-05-19 | YouTube | Codex Full Course 2026: The NEW Best AI Coding Tool | [raw transcript](../../raw/youtube/ytscribe-codex-full-course-2026-KXIdYEdOPys-en-auto.json), [metadata](../../raw/youtube/youtube-oembed-codex-full-course-2026-KXIdYEdOPys.json) | [transcript](../../processed/transcripts/youtube-codex-full-course-2026-KXIdYEdOPys-en-auto.md), [summary](../../processed/summaries/youtube-codex-full-course-2026-KXIdYEdOPys-summary.md) | [agent workflows](../../processed/insights/youtube-codex-full-course-2026-agent-workflows.md) | verified source capture; auto-caption accuracy not independently verified | Codex workflow, skills, plugins, automations, multi-agent launch ops |
| 2026-05-19 | YouTube channel | Riley Brown latest 10 videos | [source pack JSON](../../raw/youtube/channel-reports/youtube-channel-source-pack-riley-brown-UCMcoud_ZW7cfxeIugBflSBw.json), [source pack MD](../../raw/youtube/channel-reports/youtube-channel-source-pack-riley-brown-UCMcoud_ZW7cfxeIugBflSBw.md) | [channel report](../../processed/summaries/youtube-riley-brown-channel-report-2026-05-19.md), [transcript attempts](../../processed/transcripts/youtube-riley-brown/) | [experiments](experiments.md), [monetization ideas](monetization-ideas.md), [process improvements](process-improvements.md) | metadata verified; transcripts unavailable due provider failures/HTTP 429; analysis inferred from titles and channel-level metadata | Codex trends, channel-level research workflow, productized agent/skill packs |
| 2026-05-19 | YouTube search pack | Codex and AI-based software project management | [source pack](../../raw/youtube/codex-ai-project-management/source-pack-2026-05-19.md), [raw directory](../../raw/youtube/codex-ai-project-management/) | [summary](../../processed/summaries/youtube-codex-ai-project-management-2026-05-19.md), [normalized transcripts](../../processed/transcripts/codex-ai-project-management/) | [control plane insight](../../processed/insights/youtube-codex-ai-project-management-control-plane.md), [agent workflows](agent-workflows.md), [experiments](experiments.md), [process improvements](process-improvements.md) | metadata verified via YouTube/oEmbed; transcripts recovered via `yt-dlp` fallback after extractor SSL/language fallback fix; auto-caption accuracy not independently verified | Codex project management, spec-driven AI development, worktrees/subagents, engineering hygiene automations |

## Intake Rules

- Add a row when a source produces reusable knowledge, not for throwaway lookups.
- Prefer links to local raw/processed files over chat references.
- Mark transcript limitations, missing metrics, or secondary-source caveats in confidence.
- Link only stable artifacts; keep raw payloads in `knowledge/raw/`.
