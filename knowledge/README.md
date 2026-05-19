# Knowledge

Local derived memory for `ia-learning`.

This folder stores research outputs from YouTube, Reddit, AI tooling updates, implementation experiments, and monetization/process insights. It is intentionally local-first so we can validate the schema and workflow before moving the durable shared memory to Supabase.

## Goals

- Preserve raw source evidence.
- Convert noisy source material into reusable technical and product knowledge.
- Connect findings to concrete project areas.
- Support future RAG indexing with SQLite, embeddings, and later Supabase.
- Give Codex/plugins a stable place to read and write derived memory.

## Folder Contract

```txt
knowledge/
  raw/
    youtube/
    reddit/
    web/
  processed/
    transcripts/
    threads/
    summaries/
    insights/
  projects/
    ia-learning/
      implementation-patterns.md
      monetization-ideas.md
      process-improvements.md
      ai-news.md
      open-questions.md
  briefs/
    weekly/
    topic/
  index/
    local generated SQLite/vector indexes, ignored by git
  schema/
    source-metadata.template.json
    insight.template.md
```

## Source Lifecycle

1. Capture raw source output in `knowledge/raw/<source>/`.
2. Normalize content into Markdown in `knowledge/processed/`.
3. Extract insights with source references and confidence labels.
4. Link relevant insights into `knowledge/projects/ia-learning/`.
5. Promote repeated or validated insights into docs, backlog, PRDs, or implementation tasks.

## Confidence Labels

- `verified`: supported directly by the source material.
- `inferred`: reasonable interpretation from source material.
- `experimental`: needs implementation/testing in this repo.
- `unverified`: saved for later validation, not ready for decisions.

## Plugin / Agent Rule

Any YouTube, Reddit, research, or RAG plugin used in this workspace should write a derived memory artifact here instead of only returning a chat summary.

Minimum required fields:

- source type
- source URL or permalink
- source title
- author/channel/community if available
- published date if available
- captured date
- confidence label
- project relevance
- extracted insight
- evidence pointer, such as timestamp, quote excerpt, comment permalink, or section heading

## Future Supabase Migration

When this structure is stable, migrate durable shared memory to Supabase:

- `sources`
- `source_items`
- `chunks`
- `embeddings`
- `projects`
- `insights`
- `project_links`
- `briefs`

Until then, this folder is the source of truth for local knowledge.
