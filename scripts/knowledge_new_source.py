#!/usr/bin/env python3
"""Scaffold a knowledge source package in the repo's local memory layout."""

from __future__ import annotations

import argparse
import datetime as dt
import json
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
KNOWLEDGE = ROOT / "knowledge"


def slug(value: str, max_length: int = 80) -> str:
    value = re.sub(r"\s+", " ", value.strip().lower())
    value = re.sub(r"[^a-z0-9]+", "-", value).strip("-")
    return (value[:max_length].rstrip("-") or "source")


def write_new(path: Path, content: str) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        raise SystemExit(f"Refusing to overwrite existing file: {path}")
    path.write_text(content, encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description="Create placeholders for a new knowledge source.")
    parser.add_argument("source_type", choices=["youtube", "reddit", "web", "docs", "other"])
    parser.add_argument("title")
    parser.add_argument("--source-id", default="", help="Video ID, thread ID, URL slug, or other stable ID.")
    parser.add_argument("--url", default="")
    parser.add_argument("--author", default="")
    parser.add_argument("--project", default="ia-learning")
    args = parser.parse_args()

    captured_at = dt.date.today().isoformat()
    title_slug = slug(args.title)
    id_part = f"-{slug(args.source_id, 40)}" if args.source_id else ""
    base = f"{args.source_type}-{title_slug}{id_part}"

    raw_ext = "json" if args.source_type in {"youtube", "reddit", "web"} else "md"
    raw_path = KNOWLEDGE / "raw" / ("web" if args.source_type in {"docs", "other"} else args.source_type) / f"{base}-raw.{raw_ext}"
    summary_path = KNOWLEDGE / "processed" / "summaries" / f"{base}-summary.md"
    insight_path = KNOWLEDGE / "processed" / "insights" / f"{base}-insight.md"
    package_path = KNOWLEDGE / "processed" / "insights" / f"{base}-source-package.md"

    metadata = {
        "source_type": args.source_type,
        "source_id": args.source_id,
        "url": args.url,
        "title": args.title,
        "author": args.author,
        "captured_at": captured_at,
        "projects": [args.project],
        "content_type": "raw",
        "confidence": "unverified",
        "evidence_pointer": "",
        "notes": "Replace this placeholder with the raw source payload or a faithful source export.",
    }

    if raw_ext == "json":
        write_new(raw_path, json.dumps(metadata, ensure_ascii=False, indent=2) + "\n")
    else:
        write_new(
            raw_path,
            f"---\nsource_type: {args.source_type}\nsource_url: {args.url}\nsource_title: {json.dumps(args.title, ensure_ascii=False)}\nauthor: {json.dumps(args.author, ensure_ascii=False)}\ncaptured_at: {captured_at}\nconfidence: unverified\nprojects: [{args.project}]\n---\n\n# Raw Source Placeholder\n\nReplace with raw export or source notes.\n",
        )

    write_new(
        summary_path,
        f"---\nsource_type: {args.source_type}\nsource_url: {args.url}\nsource_title: {json.dumps(args.title, ensure_ascii=False)}\nauthor: {json.dumps(args.author, ensure_ascii=False)}\ncaptured_at: {captured_at}\nraw_evidence:\n  - {raw_path.relative_to(ROOT)}\nconfidence: unverified\nprojects: [{args.project}]\n---\n\n# Fuente\n\n# Resumen ejecutivo\n\n# Ideas clave\n\n# Experimentos recomendados\n\n# Prompts detectados\n\n# Preguntas abiertas\n",
    )

    write_new(
        insight_path,
        f"---\nsource_type: {args.source_type}\nsource_url: {args.url}\nsource_title: {json.dumps(args.title, ensure_ascii=False)}\nauthor: {json.dumps(args.author, ensure_ascii=False)}\npublished_at:\ncaptured_at: {captured_at}\nconfidence: unverified\ntopics: []\nprojects: [{args.project}]\nevidence_pointer: {summary_path.relative_to(ROOT)}\n---\n\n# Insight Title\n\n## Summary\n\n## Evidence\n\n## Why It Matters\n\n## Applicable Project Areas\n\n## Next Action\n",
    )

    write_new(
        package_path,
        f"---\nsource_type: {args.source_type}\nsource_id: {args.source_id}\nsource_url: {args.url}\nsource_title: {json.dumps(args.title, ensure_ascii=False)}\nauthor: {json.dumps(args.author, ensure_ascii=False)}\ncaptured_at: {captured_at}\nconfidence: unverified\nprojects: [{args.project}]\nraw_evidence_path: {raw_path.relative_to(ROOT)}\nsummary_path: {summary_path.relative_to(ROOT)}\ninsights_path: {insight_path.relative_to(ROOT)}\nproject_links: []\n---\n\n# Source Package\n\n## Capture Checklist\n\n- [ ] Raw evidence replaced with real payload/export.\n- [ ] Summary completed.\n- [ ] Insight completed with evidence pointer.\n- [ ] Project memory updated.\n- [ ] Source index updated.\n\n## Next Actions\n\n- Add this source to `knowledge/projects/{args.project}/source-index.md`.\n",
    )

    print(json.dumps({
        "raw": str(raw_path.relative_to(ROOT)),
        "summary": str(summary_path.relative_to(ROOT)),
        "insight": str(insight_path.relative_to(ROOT)),
        "source_package": str(package_path.relative_to(ROOT)),
    }, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
