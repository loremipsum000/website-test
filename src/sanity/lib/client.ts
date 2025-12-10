import "server-only";

import { draftMode } from "next/headers";
import { createClient, type QueryOptions, type QueryParams } from "next-sanity";

import {
  apiVersion,
  dataset,
  projectId,
  useSanityMock,
} from "../env";
import { getMockResponse } from "./mockData";
import { token } from "./token";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    enabled: process.env.NEXT_PUBLIC_VERCEL_ENV === "preview",
    studioUrl: "/studio",
  },
});

let hasLoggedMockNotice = false;

export async function sanityFetch<QueryResponse>({
  query,
  params = {},
  revalidate = 60,
  tags = [],
}: {
  query: string;
  params?: QueryParams;
  revalidate?: number | false;
  tags?: string[];
}) {
  const shouldUseMock = useSanityMock;

  if (shouldUseMock) {
    if (!hasLoggedMockNotice) {
      console.warn(
        "[sanity] Using local mock data because Sanity env vars are missing."
      );
      hasLoggedMockNotice = true;
    }

    const mocked = getMockResponse(query);
    if (mocked !== undefined && mocked !== null) {
      return mocked as QueryResponse;
    }

    console.warn(
      "[sanity] No mock response registered for this query; returning empty object."
    );
    return {} as QueryResponse;
  }

  const isDraftMode = draftMode().isEnabled && Boolean(token);

  let dynamicRevalidate = revalidate;
  if (isDraftMode) {
    // Do not cache in Draft Mode
    dynamicRevalidate = 0;
  } else if (tags.length) {
    // Cache indefinitely if tags supplied, purge with revalidateTag()
    dynamicRevalidate = false;
  }

  return client.fetch<QueryResponse>(query, params, {
    ...(isDraftMode &&
      ({
        token,
        perspective: "previewDrafts",
        stega: true,
      } satisfies QueryOptions)),
    next: {
      revalidate: dynamicRevalidate,
      tags,
    },
  });
}
