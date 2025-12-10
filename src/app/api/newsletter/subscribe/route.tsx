import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { z } from "zod";

const { GHOST_ADMIN_DOMAIN, GHOST_ADMIN_API_KEY, GHOST_NEWSLETTER_ID } =
  process.env;

const schema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  if (!GHOST_ADMIN_DOMAIN || !GHOST_ADMIN_API_KEY || !GHOST_NEWSLETTER_ID) {
    throw new Error("Missing environment variables");
  }

  const formData = await request.formData();
  const emailRaw = formData.get("email");
  const { email } = schema.parse({ email: emailRaw });

  const [id, secret] = GHOST_ADMIN_API_KEY.split(":");

  const token = jwt.sign({}, Buffer.from(secret, "hex"), {
    keyid: id,
    algorithm: "HS256",
    expiresIn: "5m",
    audience: `/admin/`,
  });

  const headers = {
    Authorization: `Ghost ${token}`,
    "Content-Type": "application/json",
  };

  const payload = {
    members: [
      {
        email,
        newsletters: [
          {
            id: GHOST_NEWSLETTER_ID,
          },
        ],
      },
    ],
  };

  const res = await fetch(
    `https://${GHOST_ADMIN_DOMAIN}/ghost/api/admin/members`,
    {
      headers,
      body: JSON.stringify(payload),
      method: "POST",
    }
  );

  if (res.ok) {
    return new Response(
      JSON.stringify({
        success: true,
      }),
      { status: 200 }
    );
  } else {
    return new Response(
      JSON.stringify({
        success: false,
      }),
      { status: 500 }
    );
  }
}
