"use client";

import { ApplePay } from "@/assets/icons/apple-pay";
import { GooglePay } from "@/assets/icons/google-pay";
import { Button } from "@/components/button";
import { Input } from "@/components/ui/input";
import { signupSchema } from "@/lib/schemas/card-signup";
import {
  getFormProps,
  getInputProps,
  useForm,
  useInputControl,
} from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import Link from "next/link";
import { useRef, useState } from "react";
import toast from "react-hot-toast";

export function SignUpForm() {
  const turnstileRef = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [form, fields] = useForm({
    id: "signup-form",
    defaultValue: {
      name: "",
      email: "",
      phone: "",
      token: "",
    },
    constraint: getZodConstraint(signupSchema),
    shouldValidate: "onBlur",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: signupSchema });
    },
  });

  const tokenField = useInputControl(fields.token);

  async function submit(formData: FormData) {
    setIsLoading(true);
    try {
      const submission = parseWithZod(formData, { schema: signupSchema });

      if (submission.status !== "success") {
        toast.error(
          submission.error?.formErrors?.join(", ") ||
            "Please check your inputs",
          {
            duration: 5000,
            position: "bottom-center",
          }
        );
        return submission;
      }

      const res = await fetch("/api/card-signup", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.formErrors?.join(", ") || "Something went wrong", {
          duration: 5000,
          position: "bottom-center",
        });
        return data;
      }

      toast.success(
        "You've been added to the waitlist! We'll be in touch soon.",
        {
          duration: 5000,
          position: "bottom-center",
        }
      );
      form.reset();
      turnstileRef.current?.reset();
      return data;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      {...getFormProps(form)}
      action={async (formData) => {
        await submit(formData);
      }}
      noValidate
      className="w-full md:max-w-md bg-white rounded-3xl shadow-lg p-6"
    >
      <div className="space-y-4">
        <h2 className="font-bold text-center sm:text-left">
          First 5,000 sign-ups get <span className="text-hero-2">FREE</span>{" "}
          virtual cards.
        </h2>
        <div className="space-y-3">
          <div>
            <Input
              placeholder="Name"
              className="rounded-full"
              {...getInputProps(fields.name, {
                type: "text",
                key: "name-input",
              })}
            />
            {(fields.name.errors?.length ?? 0) > 0 && (
              <p className="text-red-500 text-sm text-left mt-1">
                {fields.name.errors?.join(", ")}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Email"
              className="rounded-full"
              {...getInputProps(fields.email, {
                type: "email",
                key: "email-input",
              })}
            />
            {(fields.email.errors?.length ?? 0) > 0 && (
              <p className="text-red-500 text-sm text-left mt-1">
                {fields.email.errors?.join(", ")}
              </p>
            )}
          </div>

          <div>
            <Input
              placeholder="Phone Number"
              className="rounded-full"
              {...getInputProps(fields.phone, {
                type: "tel",
                key: "phone-input",
              })}
            />
            {(fields.phone.errors?.length ?? 0) > 0 && (
              <p className="text-red-500 text-sm text-left mt-1">
                {fields.phone.errors?.join(", ")}
              </p>
            )}
          </div>
        </div>
        <input
          {...getInputProps(fields.token, {
            type: "hidden",
            key: "token-input",
          })}
        />
        <div className="flex justify-center sm:justify-start">
          <Turnstile
            options={{
              theme: "light",
              size: "normal",
            }}
            ref={turnstileRef}
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => tokenField.change(token)}
            className="scale-75 sm:scale-100"
          />
        </div>
        {(fields.token.errors?.length ?? 0) > 0 && (
          <p className="text-red-500 text-sm mt-1">
            {fields.token.errors?.join(", ")}
          </p>
        )}

        <p className="text-xs text-shade-2">
          *By signing up, you agree to our{" "}
          <Link
            target="_blank"
            href="https://soniclabs.notion.site/RDP-Terms-of-Service-159178962bd280cd8a6ef8db2fb7e605"
            className="underline text-hero-2"
          >
            terms and conditions
          </Link>
          .
        </p>
        <div className="flex items-center justify-start gap-x-4">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </Button>
          <ApplePay className="hidden sm:block h-4" />
          <GooglePay className="hidden sm:block h-4" />
        </div>
      </div>
    </form>
  );
}
