import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { client } from "@/sanity/lib/client";
import { token } from "@/sanity/lib/token";

const clientWithToken = token ? client.withConfig({ token }) : client;

export async function GET(request: NextRequest) {
  if (!process.env.SANITY_API_READ_TOKEN) {
    return new Response(
      "Missing environment variable SANITY_API_READ_TOKEN (skipping preview in local mock mode).",
      {
        status: 200,
      }
    );
  }

  const { isValid, redirectTo = "/" } = await validatePreviewUrl(
    clientWithToken,
    request.url
  );

  if (!isValid) {
    return new Response("Invalid secret", { status: 401 });
  }

  draftMode().enable();
  return NextResponse.redirect(new URL(redirectTo, request.url));
}
