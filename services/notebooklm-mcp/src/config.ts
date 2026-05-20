import { z } from "zod";

const endpointLocationSchema = z.enum(["global", "us", "eu"]);

const envSchema = z.object({
  GOOGLE_CLOUD_PROJECT_NUMBER: z.string().min(1).optional(),
  GOOGLE_CLOUD_PROJECT_ID: z.string().min(1).optional(),
  NOTEBOOKLM_ENDPOINT_LOCATION: endpointLocationSchema.default("global"),
  NOTEBOOKLM_LOCATION: z.string().min(1).default("global"),
  NOTEBOOKLM_ACCESS_TOKEN: z.string().min(1).optional()
});

export type NotebookLmConfig = z.infer<typeof envSchema>;

export function loadConfig(env: NodeJS.ProcessEnv = process.env): NotebookLmConfig {
  return envSchema.parse(env);
}

export function requireProjectNumber(config: NotebookLmConfig): string {
  if (!config.GOOGLE_CLOUD_PROJECT_NUMBER) {
    throw new Error("GOOGLE_CLOUD_PROJECT_NUMBER is required for NotebookLM Enterprise tools.");
  }

  return config.GOOGLE_CLOUD_PROJECT_NUMBER;
}

export function requireProjectId(config: NotebookLmConfig): string {
  if (!config.GOOGLE_CLOUD_PROJECT_ID) {
    throw new Error("GOOGLE_CLOUD_PROJECT_ID is required for Podcast API tools.");
  }

  return config.GOOGLE_CLOUD_PROJECT_ID;
}
