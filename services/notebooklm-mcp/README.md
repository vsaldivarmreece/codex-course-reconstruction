# NotebookLM MCP

MCP server for the official Google Cloud NotebookLM Enterprise APIs and the standalone Podcast API.

This intentionally targets NotebookLM Enterprise, not the personal `https://notebooklm.google.com/` web app. The personal product does not expose the same documented API contract, while NotebookLM Enterprise is exposed through Google Cloud Discovery Engine endpoints.

## Tools

- `notebooklm_config`: show the active endpoint configuration.
- `notebooklm_create_notebook`: create a NotebookLM Enterprise notebook.
- `notebooklm_get_notebook`: retrieve a notebook, including source details returned by the API.
- `notebooklm_list_recently_viewed`: list recently viewed notebooks.
- `notebooklm_delete_notebooks`: batch delete notebooks.
- `notebooklm_share_notebook`: share a notebook with project users.
- `notebooklm_add_sources`: add text, web, YouTube, Google Docs, or Google Slides sources.
- `notebooklm_upload_file_source`: upload one local file as a source.
- `notebooklm_get_source`: retrieve source metadata.
- `notebooklm_delete_sources`: batch delete sources.
- `notebooklm_create_audio_overview`: create an audio overview for a notebook.
- `notebooklm_delete_audio_overview`: delete the notebook audio overview.
- `notebooklm_generate_podcast`: call the standalone Podcast API.
- `notebooklm_download_podcast`: download a completed podcast operation to a local MP3 file.

## Setup

```bash
pnpm install
cp services/notebooklm-mcp/.env.example services/notebooklm-mcp/.env
pnpm notebooklm:mcp:build
```

Authentication options:

```bash
gcloud auth application-default login \
  --scopes=https://www.googleapis.com/auth/cloud-platform,https://www.googleapis.com/auth/drive.readonly
```

For Google Docs or Slides sources, Google documents that the `gcloud` session must have Drive access:

```bash
gcloud auth login --enable-gdrive-access
export NOTEBOOKLM_ACCESS_TOKEN="$(gcloud auth print-access-token)"
```

`NOTEBOOKLM_ACCESS_TOKEN` is short lived. For long-running clients, prefer Application Default Credentials when your use case does not require user Drive access.

## Claude Desktop / MCP config example

```json
{
  "mcpServers": {
    "notebooklm": {
      "command": "node",
      "args": [
        "/Users/vladimir.saldivar/Documents/IntelliJProyects/ia-learning/services/notebooklm-mcp/dist/index.js"
      ],
      "env": {
        "GOOGLE_CLOUD_PROJECT_NUMBER": "123456789012",
        "GOOGLE_CLOUD_PROJECT_ID": "my-gcp-project-id",
        "NOTEBOOKLM_ENDPOINT_LOCATION": "global",
        "NOTEBOOKLM_LOCATION": "global"
      }
    }
  }
}
```

## Limitations

- Notebook chat/query is not exposed as a tool because the current public docs found for NotebookLM Enterprise document notebook management, sources, audio overviews, and podcast generation, not a general chat endpoint.
- The Podcast API is allowlisted for select Google Cloud customers.
- Destructive tools call Google APIs directly. Check resource names before deleting notebooks or sources.
