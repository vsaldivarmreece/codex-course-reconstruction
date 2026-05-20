#!/usr/bin/env node
import { config as loadDotenv } from "dotenv";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { NotebookLmClient } from "./client.js";
import { loadConfig } from "./config.js";

loadDotenv({ path: new URL("../.env", import.meta.url), quiet: true });

const sourceInputSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    sourceName: z.string().min(1),
    content: z.string().min(1)
  }),
  z.object({
    type: z.literal("web"),
    sourceName: z.string().min(1),
    url: z.string().url()
  }),
  z.object({
    type: z.literal("youtube"),
    youtubeUrl: z.string().url()
  }),
  z.object({
    type: z.literal("googleDrive"),
    documentId: z.string().min(1),
    mimeType: z.enum(["application/vnd.google-apps.document", "application/vnd.google-apps.presentation"]),
    sourceName: z.string().min(1)
  })
]);

const roleSchema = z.enum([
  "PROJECT_ROLE_OWNER",
  "PROJECT_ROLE_WRITER",
  "PROJECT_ROLE_READER",
  "PROJECT_ROLE_NOT_SHARED"
]);

const podcastContextSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("text"),
    text: z.string().min(1)
  }),
  z.object({
    type: z.literal("file"),
    path: z.string().min(1),
    mimeType: z.string().min(1)
  })
]);

const config = loadConfig();
const client = new NotebookLmClient(config);

const server = new McpServer({
  name: "@ia-learning/notebooklm-mcp",
  version: "0.1.0"
});

function asTextContent(value: unknown) {
  return {
    content: [
      {
        type: "text" as const,
        text: JSON.stringify(value, null, 2)
      }
    ]
  };
}

server.registerTool(
  "notebooklm_config",
  {
    title: "Show NotebookLM MCP configuration",
    description: "Returns the active Google Cloud project, location, endpoint, and authentication mode.",
    inputSchema: {}
  },
  async () => asTextContent(client.getRuntimeConfig())
);

server.registerTool(
  "notebooklm_create_notebook",
  {
    title: "Create NotebookLM Enterprise notebook",
    description: "Creates a NotebookLM Enterprise notebook in the configured Google Cloud project and location.",
    inputSchema: {
      title: z.string().min(1)
    }
  },
  async ({ title }) => asTextContent(await client.createNotebook(title))
);

server.registerTool(
  "notebooklm_get_notebook",
  {
    title: "Get NotebookLM Enterprise notebook",
    description: "Retrieves a notebook by notebook ID. The API response can include source details.",
    inputSchema: {
      notebookId: z.string().min(1)
    }
  },
  async ({ notebookId }) => asTextContent(await client.getNotebook(notebookId))
);

server.registerTool(
  "notebooklm_list_recently_viewed",
  {
    title: "List recently viewed NotebookLM notebooks",
    description: "Lists recently viewed notebooks for the configured project and location.",
    inputSchema: {
      pageSize: z.number().int().positive().max(500).optional(),
      pageToken: z.string().optional()
    }
  },
  async ({ pageSize, pageToken }) => asTextContent(await client.listRecentlyViewed(pageSize, pageToken))
);

server.registerTool(
  "notebooklm_delete_notebooks",
  {
    title: "Delete NotebookLM Enterprise notebooks",
    description: "Batch deletes notebooks by notebook IDs or full notebook resource names.",
    inputSchema: {
      notebookIds: z.array(z.string().min(1)).optional(),
      names: z.array(z.string().min(1)).optional()
    },
    annotations: {
      destructiveHint: true
    }
  },
  async (input) => asTextContent(await client.deleteNotebooks(input))
);

server.registerTool(
  "notebooklm_share_notebook",
  {
    title: "Share NotebookLM Enterprise notebook",
    description: "Shares a notebook with users in the same Google Cloud project using NotebookLM project roles.",
    inputSchema: {
      notebookId: z.string().min(1),
      accountAndRoles: z.array(
        z.object({
          email: z.string().email(),
          role: roleSchema
        })
      )
    }
  },
  async ({ notebookId, accountAndRoles }) => asTextContent(await client.shareNotebook(notebookId, accountAndRoles))
);

server.registerTool(
  "notebooklm_add_sources",
  {
    title: "Add NotebookLM Enterprise sources",
    description: "Adds text, web, YouTube, Google Docs, or Google Slides sources to a notebook.",
    inputSchema: {
      notebookId: z.string().min(1),
      sources: z.array(sourceInputSchema).min(1)
    }
  },
  async ({ notebookId, sources }) => asTextContent(await client.addSources(notebookId, sources))
);

server.registerTool(
  "notebooklm_upload_file_source",
  {
    title: "Upload NotebookLM Enterprise file source",
    description: "Uploads a local file as a NotebookLM Enterprise source. Use absolute file paths.",
    inputSchema: {
      notebookId: z.string().min(1),
      path: z.string().min(1),
      contentType: z.string().min(1),
      displayName: z.string().min(1).optional()
    }
  },
  async (input) => asTextContent(await client.uploadFileSource(input))
);

server.registerTool(
  "notebooklm_get_source",
  {
    title: "Get NotebookLM Enterprise source",
    description: "Retrieves source metadata from a notebook.",
    inputSchema: {
      notebookId: z.string().min(1),
      sourceId: z.string().min(1)
    }
  },
  async ({ notebookId, sourceId }) => asTextContent(await client.getSource(notebookId, sourceId))
);

server.registerTool(
  "notebooklm_delete_sources",
  {
    title: "Delete NotebookLM Enterprise sources",
    description: "Batch deletes notebook sources by source IDs or full source resource names.",
    inputSchema: {
      notebookId: z.string().min(1),
      sourceIds: z.array(z.string().min(1)).optional(),
      names: z.array(z.string().min(1)).optional()
    },
    annotations: {
      destructiveHint: true
    }
  },
  async (input) => asTextContent(await client.deleteSources(input))
);

server.registerTool(
  "notebooklm_create_audio_overview",
  {
    title: "Create NotebookLM Enterprise audio overview",
    description: "Creates an audio overview for a notebook. The API allows one audio overview per notebook.",
    inputSchema: {
      notebookId: z.string().min(1),
      sourceIds: z.array(z.string().min(1)).optional(),
      episodeFocus: z.string().min(1).optional(),
      languageCode: z.string().min(1).optional()
    }
  },
  async (input) => asTextContent(await client.createAudioOverview(input))
);

server.registerTool(
  "notebooklm_delete_audio_overview",
  {
    title: "Delete NotebookLM Enterprise audio overview",
    description: "Deletes the default audio overview for a notebook.",
    inputSchema: {
      notebookId: z.string().min(1)
    },
    annotations: {
      destructiveHint: true
    }
  },
  async ({ notebookId }) => asTextContent(await client.deleteAudioOverview(notebookId))
);

server.registerTool(
  "notebooklm_generate_podcast",
  {
    title: "Generate NotebookLM standalone podcast",
    description: "Starts standalone Podcast API generation from text or local file contexts. Requires allowlisted API access.",
    inputSchema: {
      title: z.string().min(1),
      description: z.string().min(1).optional(),
      focus: z.string().min(1).optional(),
      length: z.enum(["SHORT", "STANDARD"]).optional(),
      languageCode: z.string().min(1).optional(),
      contexts: z.array(podcastContextSchema).min(1)
    }
  },
  async (input) => asTextContent(await client.generatePodcast(input))
);

server.registerTool(
  "notebooklm_download_podcast",
  {
    title: "Download generated NotebookLM podcast",
    description: "Downloads a completed Podcast API operation to a local MP3 file.",
    inputSchema: {
      operationName: z.string().min(1),
      outputPath: z.string().min(1)
    }
  },
  async ({ operationName, outputPath }) => asTextContent(await client.downloadPodcast(operationName, outputPath))
);

const transport = new StdioServerTransport();
await server.connect(transport);
