// ./src/sanity/lib/token.ts

import "server-only";

import { experimental_taintUniqueValue } from "react";

export const token = process.env.SANITY_API_READ_TOKEN;

if (token) {
  experimental_taintUniqueValue(
    "Do not pass the Sanity API read token to the client.",
    process,
    token
  );
} else if (process.env.NODE_ENV !== "production") {
  console.warn(
    "[sanity] SANITY_API_READ_TOKEN is missing - preview mode will use mock data locally."
  );
}
