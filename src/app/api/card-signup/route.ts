import { signupSchema } from "@/lib/schemas/card-signup";
import { parseWithZod } from "@conform-to/zod";
import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function verifyTurnstile(token: string) {
  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        secret: process.env.TURNSTILE_SECRET_KEY,
        response: token,
      }),
    }
  );
  const data = await res.json();
  return data.success;
}

export async function POST(req: Request) {
  const body = await req.formData();
  const submission = parseWithZod(body, { schema: signupSchema });

  if (submission.status !== "success") {
    return NextResponse.json(submission.reply(), { status: 400 });
  }

  const { name, email, phone, token } = submission.value;

  // Verify Turnstile token
  const isValid = await verifyTurnstile(token);
  if (!isValid) {
    return NextResponse.json(
      submission.reply({
        formErrors: ["Invalid security check"],
      }),
      { status: 400 }
    );
  }

  try {
    // Check for existing email
    const { data: existingUser } = await supabase
      .from("signups")
      .select("email")
      .eq("email", email)
      .single();

    // If email exists, return success without creating new record
    if (existingUser) {
      return NextResponse.json({ success: true });
    }

    // Save to Supabase
    const { error: insertError } = await supabase.from("signups").insert([
      {
        name,
        email,
        phone,
        created_at: new Date().toISOString(),
      },
    ]);

    if (insertError) {
      console.error("Supabase error:", insertError);
      return NextResponse.json(
        submission.reply({
          formErrors: ["Failed to save signup"],
        }),
        { status: 500 }
      );
    }

    return NextResponse.json(submission.reply());
  } catch (error) {
    console.error("Supabase error:", error);
    return NextResponse.json(
      submission.reply({
        formErrors: ["Database error occurred"],
      }),
      { status: 500 }
    );
  }
}
