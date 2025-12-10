"use client";

import * as z from "zod";
import React, { FormEvent, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./button";
import { Turnstile, TurnstileInstance } from "@marsidev/react-turnstile";

const schema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  company: z.string().min(1, "Company is required"),
  topic: z.string().min(1, "Please select a topic"),
  message: z.string().min(1, "Message is required"),
});

const Required = () => <span className="text-red-500">*</span>;

type ContactFormProps = {
  title: string;
  topics: {
    label: string;
  }[];
};

export const ContactForm = ({ title, topics }: ContactFormProps) => {
  const [submitting, setSubmitting] = React.useState(false);
  const turnstileRef = useRef<TurnstileInstance>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof schema>> = async (data) => {
    const turnstileToken = turnstileRef.current?.getResponse();
    const body = JSON.stringify({
      ...data,
      turnstileToken,
    });

    setSubmitting(true);
    const response = await fetch("/api/contact", {
      method: "POST",
      body,
    });

    if (response.ok) {
      alert("Message sent successfully, we'll be in touch soon!");
    } else {
      alert("An error occurred, please try again later.");
    }
    turnstileRef.current?.reset();
    setSubmitting(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-8 rounded-2xl shadow border border-shade-2 bg-shade-light"
    >
      <h2 className="text-body-lg font-semibold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        <div>
          <label
            htmlFor="firstName"
            className="block font-bold text-sonic-black"
          >
            First name
            <Required />
          </label>
          <input
            id="firstName"
            placeholder="John"
            {...register("firstName")}
            className="px-4 py-1.5 mt-1 block w-full rounded-full bg-shade-2/10 border-transparent focus:outline-none placeholder:text-shade-2 text-body-sm"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">
              {errors.firstName.message?.toString()}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="lastName"
            className="block font-bold text-sonic-black"
          >
            Last name
            <Required />
          </label>
          <input
            id="lastName"
            placeholder="Doe"
            {...register("lastName")}
            className="px-4 py-1.5 mt-1 block w-full rounded-full bg-shade-2/10 border-transparent focus:outline-none placeholder:text-shade-2 text-body-sm"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">
              {errors.lastName.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4">
        <label
          htmlFor="email"
          className="block font-bold text-sonic-black text-body-sm"
        >
          Email address
          <Required />
        </label>
        <input
          id="email"
          placeholder="examble@acme.com"
          type="email"
          {...register("email")}
          className="px-4 py-1.5 mt-1 block w-full rounded-full bg-shade-2/10 border-transparent focus:outline-none placeholder:text-shade-2"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">
            {errors.email.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-4">
        <label
          htmlFor="company"
          className="block font-bold text-sonic-black text-body-sm"
        >
          Company
          <Required />
        </label>
        <input
          id="company"
          placeholder="Acme Inc."
          {...register("company")}
          className="px-4 py-1.5 mt-1 block w-full rounded-full bg-shade-2/10 border-transparent focus:outline-none placeholder:text-shade-2"
        />
        {errors.company && (
          <p className="text-red-500 text-sm">
            {errors.company.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-4">
        <label
          htmlFor="topic"
          className="block font-bold text-sonic-black text-body-sm"
        >
          Topic
          <Required />
        </label>
        <select
          id="topic"
          required
          {...register("topic")}
          className="px-4 py-1.5 mt-1 block w-full rounded-full bg-shade-2/10 border-transparent focus:outline-none invalid:text-shade-2 text-body-sm"
        >
          <option value="">Select a topic</option>
          {topics.map((topic, i) => (
            <option key={i} value={topic.label}>
              {topic.label}
            </option>
          ))}
        </select>
        {errors.topic && (
          <p className="text-red-500 text-sm">
            {errors.topic.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-4">
        <label
          htmlFor="message"
          className="block font-bold text-sonic-black text-body-sm"
        >
          Message
          <Required />
        </label>
        <textarea
          id="message"
          placeholder="Your message here"
          {...register("message")}
          rows={4}
          className="px-4 py-1.5 mt-1 block w-full rounded-2xl bg-shade-2/10 border-transparent focus:outline-none placeholder:text-shade-2"
        />
        {errors.message && (
          <p className="text-red-500 text-sm">
            {errors.message.message?.toString()}
          </p>
        )}
      </div>
      <div className="mt-8 flex flex-col gap-y-3">
        <Turnstile
          ref={turnstileRef}
          siteKey={process.env.NEXT_PUBLIC_CONTACT_TURNSTILE_SITE_KEY!}
          options={{
            size: "flexible",
          }}
        />{" "}
        <Button disabled={submitting} type="submit" className="w-full">
          Send
        </Button>
        <p className="text-caption text-shade-2 text-center">
          By submitting this form, I consent to Sonic Labs sending me marketing
          communication via email. I may opt out at any time.
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
