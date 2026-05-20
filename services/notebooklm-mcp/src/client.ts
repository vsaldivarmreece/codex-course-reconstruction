import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { basename } from "node:path";
import { GoogleAuth } from "google-auth-library";
import type { NotebookLmConfig } from "./config.js";
import { requireProjectId, requireProjectNumber } from "./config.js";

export type SourceInput =
  | { type: "text"; sourceName: string; content: string }
  | { type: "web"; sourceName: string; url: string }
  | { type: "youtube"; youtubeUrl: string }
  | {
      type: "googleDrive";
      documentId: string;
      mimeType: "application/vnd.google-apps.document" | "application/vnd.google-apps.presentation";
      sourceName: string;
    };

export type PodcastContext =
  | { type: "text"; text: string }
  | { type: "file"; path: string; mimeType: string };

type RequestOptions = {
  method?: "GET" | "POST" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

export class NotebookLmClient {
  private readonly auth: GoogleAuth;

  constructor(private readonly config: NotebookLmConfig) {
    this.auth = new GoogleAuth({
      scopes: [
        "https://www.googleapis.com/auth/cloud-platform",
        "https://www.googleapis.com/auth/drive.readonly"
      ]
    });
  }

  getRuntimeConfig() {
    return {
      projectNumber: this.config.GOOGLE_CLOUD_PROJECT_NUMBER ?? null,
      projectId: this.config.GOOGLE_CLOUD_PROJECT_ID ?? null,
      endpointLocation: this.config.NOTEBOOKLM_ENDPOINT_LOCATION,
      location: this.config.NOTEBOOKLM_LOCATION,
      authMode: this.config.NOTEBOOKLM_ACCESS_TOKEN ? "NOTEBOOKLM_ACCESS_TOKEN" : "Google Application Default Credentials",
      notebookApiBaseUrl: this.notebookApiBaseUrlOrNull(),
      podcastApiBaseUrl: this.config.GOOGLE_CLOUD_PROJECT_ID
        ? `https://discoveryengine.googleapis.com/v1/projects/${this.config.GOOGLE_CLOUD_PROJECT_ID}/locations/global`
        : null
    };
  }

  createNotebook(title: string) {
    return this.requestJson(`${this.notebookApiBaseUrl()}/notebooks`, {
      method: "POST",
      body: { title }
    });
  }

  getNotebook(notebookId: string) {
    return this.requestJson(`${this.notebookApiBaseUrl()}/notebooks/${encodeURIComponent(notebookId)}`);
  }

  listRecentlyViewed(pageSize?: number, pageToken?: string) {
    const url = new URL(`${this.notebookApiBaseUrl()}/notebooks:listRecentlyViewed`);
    if (pageSize !== undefined) {
      url.searchParams.set("pageSize", String(pageSize));
    }
    if (pageToken) {
      url.searchParams.set("pageToken", pageToken);
    }

    return this.requestJson(url);
  }

  deleteNotebooks(input: { notebookIds?: string[]; names?: string[] }) {
    const names = this.toNotebookNames(input);
    return this.requestJson(`${this.notebookApiBaseUrl()}/notebooks:batchDelete`, {
      method: "POST",
      body: { names }
    });
  }

  shareNotebook(
    notebookId: string,
    accountAndRoles: Array<{
      email: string;
      role: "PROJECT_ROLE_OWNER" | "PROJECT_ROLE_WRITER" | "PROJECT_ROLE_READER" | "PROJECT_ROLE_NOT_SHARED";
    }>
  ) {
    return this.requestJson(`${this.notebookApiBaseUrl()}/notebooks/${encodeURIComponent(notebookId)}:share`, {
      method: "POST",
      body: { accountAndRoles }
    });
  }

  addSources(notebookId: string, sources: SourceInput[]) {
    return this.requestJson(`${this.notebookApiBaseUrl()}/notebooks/${encodeURIComponent(notebookId)}/sources:batchCreate`, {
      method: "POST",
      body: {
        userContents: sources.map((source) => this.toUserContent(source))
      }
    });
  }

  async uploadFileSource(input: {
    notebookId: string;
    path: string;
    contentType: string;
    displayName?: string;
  }) {
    const fileStat = await stat(input.path);
    if (!fileStat.isFile()) {
      throw new Error(`Source upload path is not a file: ${input.path}`);
    }

    return this.requestJson(
      `${this.uploadApiBaseUrl()}/notebooks/${encodeURIComponent(input.notebookId)}/sources:uploadFile`,
      {
        method: "POST",
        headers: {
          "Content-Type": input.contentType,
          "X-Goog-Upload-File-Name": input.displayName ?? basename(input.path),
          "X-Goog-Upload-Protocol": "raw"
        },
        body: createReadStream(input.path)
      }
    );
  }

  getSource(notebookId: string, sourceId: string) {
    return this.requestJson(
      `${this.notebookApiBaseUrl()}/notebooks/${encodeURIComponent(notebookId)}/sources/${encodeURIComponent(sourceId)}`
    );
  }

  deleteSources(input: { notebookId: string; sourceIds?: string[]; names?: string[] }) {
    const names = this.toSourceNames(input);
    return this.requestJson(
      `${this.notebookApiBaseUrl()}/notebooks/${encodeURIComponent(input.notebookId)}/sources:batchDelete`,
      {
        method: "POST",
        body: { names }
      }
    );
  }

  createAudioOverview(input: {
    notebookId: string;
    sourceIds?: string[];
    episodeFocus?: string;
    languageCode?: string;
  }) {
    return this.requestJson(
      `${this.notebookApiBaseUrl()}/notebooks/${encodeURIComponent(input.notebookId)}/audioOverviews`,
      {
        method: "POST",
        body: {
          ...(input.sourceIds?.length ? { sourceIds: input.sourceIds.map((id) => ({ id })) } : {}),
          ...(input.episodeFocus ? { episodeFocus: input.episodeFocus } : {}),
          ...(input.languageCode ? { languageCode: input.languageCode } : {})
        }
      }
    );
  }

  deleteAudioOverview(notebookId: string) {
    return this.requestJson(
      `${this.notebookApiBaseUrl()}/notebooks/${encodeURIComponent(notebookId)}/audioOverviews/default`,
      { method: "DELETE" }
    );
  }

  async generatePodcast(input: {
    title: string;
    description?: string;
    focus?: string;
    length?: "SHORT" | "STANDARD";
    languageCode?: string;
    contexts: PodcastContext[];
  }) {
    const contexts = await Promise.all(input.contexts.map((context) => this.toPodcastContext(context)));

    return this.requestJson(`${this.podcastApiBaseUrl()}/podcasts`, {
      method: "POST",
      body: {
        title: input.title,
        ...(input.description ? { description: input.description } : {}),
        podcastConfig: {
          ...(input.focus ? { focus: input.focus } : {}),
          ...(input.length ? { length: input.length } : {}),
          ...(input.languageCode ? { languageCode: input.languageCode } : {})
        },
        contexts
      }
    });
  }

  async downloadPodcast(operationName: string, outputPath: string) {
    const url = `https://discoveryengine.googleapis.com/v1/${operationName}:download?alt=media`;
    const response = await this.request(url, { headers: { Accept: "audio/mpeg" } });
    const bytes = new Uint8Array(await response.arrayBuffer());
    await import("node:fs/promises").then(({ writeFile }) => writeFile(outputPath, bytes));

    return {
      operationName,
      outputPath,
      bytesWritten: bytes.byteLength
    };
  }

  private notebookApiBaseUrl() {
    const projectNumber = requireProjectNumber(this.config);
    return `https://${this.config.NOTEBOOKLM_ENDPOINT_LOCATION}-discoveryengine.googleapis.com/v1alpha/projects/${projectNumber}/locations/${this.config.NOTEBOOKLM_LOCATION}`;
  }

  private notebookApiBaseUrlOrNull() {
    if (!this.config.GOOGLE_CLOUD_PROJECT_NUMBER) {
      return null;
    }

    return this.notebookApiBaseUrl();
  }

  private uploadApiBaseUrl() {
    const projectNumber = requireProjectNumber(this.config);
    return `https://${this.config.NOTEBOOKLM_ENDPOINT_LOCATION}-discoveryengine.googleapis.com/upload/v1alpha/projects/${projectNumber}/locations/${this.config.NOTEBOOKLM_LOCATION}`;
  }

  private podcastApiBaseUrl() {
    const projectId = requireProjectId(this.config);
    return `https://discoveryengine.googleapis.com/v1/projects/${projectId}/locations/global`;
  }

  private toNotebookNames(input: { notebookIds?: string[]; names?: string[] }) {
    if (input.names?.length) {
      return input.names;
    }

    if (!input.notebookIds?.length) {
      throw new Error("Provide notebookIds or full notebook resource names.");
    }

    const projectNumber = requireProjectNumber(this.config);
    return input.notebookIds.map((id) => `projects/${projectNumber}/locations/${this.config.NOTEBOOKLM_LOCATION}/notebooks/${id}`);
  }

  private toSourceNames(input: { notebookId: string; sourceIds?: string[]; names?: string[] }) {
    if (input.names?.length) {
      return input.names;
    }

    if (!input.sourceIds?.length) {
      throw new Error("Provide sourceIds or full source resource names.");
    }

    const projectNumber = requireProjectNumber(this.config);
    return input.sourceIds.map(
      (id) =>
        `projects/${projectNumber}/locations/${this.config.NOTEBOOKLM_LOCATION}/notebooks/${input.notebookId}/sources/${id}`
    );
  }

  private toUserContent(source: SourceInput) {
    switch (source.type) {
      case "text":
        return {
          textContent: {
            sourceName: source.sourceName,
            content: source.content
          }
        };
      case "web":
        return {
          webContent: {
            sourceName: source.sourceName,
            url: source.url
          }
        };
      case "youtube":
        return {
          videoContent: {
            youtubeUrl: source.youtubeUrl
          }
        };
      case "googleDrive":
        return {
          googleDriveContent: {
            documentId: source.documentId,
            mimeType: source.mimeType,
            sourceName: source.sourceName
          }
        };
    }
  }

  private async toPodcastContext(context: PodcastContext) {
    if (context.type === "text") {
      return { text: context.text };
    }

    const fileStat = await stat(context.path);
    if (!fileStat.isFile()) {
      throw new Error(`Podcast context path is not a file: ${context.path}`);
    }

    const { readFile } = await import("node:fs/promises");
    return {
      inlineData: {
        mimeType: context.mimeType,
        data: (await readFile(context.path)).toString("base64")
      }
    };
  }

  private async requestJson(url: string | URL, options: RequestOptions = {}) {
    const isStreamBody = this.isReadableStream(options.body);
    const response = await this.request(url, {
      ...options,
      headers: {
        ...(options.body !== undefined && !isStreamBody ? { "Content-Type": "application/json" } : {}),
        ...options.headers
      }
    });

    const text = await response.text();
    return text ? JSON.parse(text) : {};
  }

  private async request(url: string | URL, options: RequestOptions = {}) {
    const targetUrl = url.toString();
    const headers = {
      ...(await this.authHeaders(targetUrl)),
      ...options.headers
    };

    const body =
      options.body === undefined || this.isReadableStream(options.body)
        ? options.body
        : JSON.stringify(options.body);

    const response = await fetch(targetUrl, {
      method: options.method ?? "GET",
      headers,
      body,
      duplex: this.isReadableStream(body) ? "half" : undefined
    } as RequestInit & { duplex?: "half" });

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(`Google API request failed ${response.status} ${response.statusText}: ${responseText}`);
    }

    return response;
  }

  private async authHeaders(url: string) {
    if (this.config.NOTEBOOKLM_ACCESS_TOKEN) {
      return { Authorization: `Bearer ${this.config.NOTEBOOKLM_ACCESS_TOKEN}` };
    }

    const client = await this.auth.getClient();
    const headers = await client.getRequestHeaders(url);
    if (headers instanceof Headers) {
      return Object.fromEntries(headers.entries());
    }

    return headers as Record<string, string>;
  }

  private isReadableStream(value: unknown): value is NodeJS.ReadableStream {
    return typeof value === "object" && value !== null && "pipe" in value;
  }
}
