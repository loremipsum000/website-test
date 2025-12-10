import Mail from "nodemailer/lib/mailer";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";
import { sanityFetch } from "@/sanity/lib/client";

export async function POST(req: Request) {
  const {
    firstName,
    lastName,
    email,
    company,
    topic,
    message,
    turnstileToken,
  } = await req.json();

  const turnstileUrl =
    "https://challenges.cloudflare.com/turnstile/v0/siteverify";

  const TURNSTILE_SECRET_KEY = process.env.CONTACT_TURNSTILE_SECRET_KEY;

  if (!TURNSTILE_SECRET_KEY) {
    throw new Error(
      `(api/contact/route.tsx) CONTACT_TURNSTILE_SECRET_KEY environment variable must be set.`
    );
  }

  const turnstileFormData = new FormData();

  turnstileFormData.append("secret", TURNSTILE_SECRET_KEY);
  turnstileFormData.append("response", turnstileToken);

  const response = await fetch(turnstileUrl, {
    method: "POST",
    body: turnstileFormData,
  });

  const result = await response.json();

  if (!result.success) {
    throw new Error("Turnstile challenge failed.");
  }

  const data = (await sanityFetch({
    query: `
      *[_id == "getInTouchPage"][0] {
        contactSection {
            contactForm {
                topics[] {
                label,
                recipients[]
              }
            }
        }
      }
    `,
  })) as any;

  const recipients = data.contactSection.contactForm.topics.find(
    (t: any) => t.label === topic
  ).recipients;

  console.log(recipients);

  const serverEmail = process.env.CONTACT_EMAIL;
  const pass = process.env.CONTACT_EMAIL_PASSWORD;

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: serverEmail,
      pass,
    },
  });

  const mailOptions: Mail.Options = {
    from: "Sonic Website Contact Form",
    to: recipients?.join(","),
    subject: `${topic} - ${firstName} ${lastName} - ${company}`,
    text: `Name: ${firstName} ${lastName}
Email: ${email}
Company: ${company}
Topic: ${topic}
Message: 

${message}
`,
  };

  const sendMailPromise = () =>
    new Promise<string>((resolve, reject) => {
      transport.sendMail(mailOptions, function (err) {
        if (!err) {
          resolve("Email sent");
        } else {
          reject(err.message);
        }
      });
    });

  try {
    await sendMailPromise();
    return NextResponse.json({ message: "Email sent" });
  } catch (err) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
