export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-07-27";

// Prefer real env vars, but fall back to harmless defaults so local dev
// doesn't crash when Sanity credentials are missing.
const rawDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET ||
  process.env.SANITY_STUDIO_SANITY_DATASET;
const rawProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  process.env.SANITY_STUDIO_SANITY_PROJECT_ID;

const fallbackDataset = "production";
const fallbackProjectId = "demo";

export const dataset = rawDataset ?? fallbackDataset;
export const projectId = rawProjectId ?? fallbackProjectId;

export const hasSanityCredentials = Boolean(rawDataset && rawProjectId);
export const useSanityMock =
  process.env.NEXT_PUBLIC_SANITY_USE_MOCK === "true" || !hasSanityCredentials;
