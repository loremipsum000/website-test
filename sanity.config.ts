"use client";

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import { presentationTool } from "sanity/presentation";
import { deskStructure } from "./src/sanity/desk-structure";
import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schema";

import { markdownSchema } from "sanity-plugin-markdown";
import { seoMetaFields } from "sanity-plugin-seo";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,
  schema: {
    types: schema.types,
  },
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    // Vision is a tool that lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
    presentationTool({
      previewUrl: {
        draftMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
    seoMetaFields(),
    markdownSchema(),
  ],
});
