"use client";
import { SocialIcon, SocialIconProps } from "@/assets/icons/social-links";
import { Button } from "@/components/button";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

type NewsletterCtaProps = {
  title?: string;
  subtitle?: string;
  signUpText?: string;
  socialLinks?: {
    type: string;
    title: string;
    url: string;
  }[];
  successMessage?: string;
  errorMessage?: string;
  topLine?: React.ReactNode;
};

type SocialButtonProps = {
  type: string;
  title: string;
  url: string;
};

const SocialButton = ({ type, title, url }: SocialButtonProps) => {
  return (
    <Link
      title={title}
      href={url}
      target="_blank"
      className="border border-shade-2 aspect-square flex items-center justify-center h-20 w-20 rounded-md bg-background text-foreground overflow-hidden group relative"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        className="h-full w-full flex items-center justify-center"
      >
        <SocialIcon
          className="h-full w-full m-4 "
          variant={type as SocialIconProps["variant"]}
        />
      </motion.div>
    </Link>
  );
};

export const NewsletterCtaContent = ({
  title,
  subtitle,
  signUpText,
  socialLinks,
  successMessage,
  errorMessage,
  topLine,
}: NewsletterCtaProps) => {
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true); // Set loading to true when the request starts

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        return alert(successMessage);
      }

      return alert(errorMessage);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false when the request completes
    }
  }

  return (
    <div className="text-foreground flex flex-col gap-y-12 items-center justify-center max-w-3xl px-4 mx-auto">
      <div className="flex flex-col gap-y-6 items-center">
        {topLine}
        <h3 className="text-h3 font-medium text-center max-sm:max-w-[19rem]">
          {title}
        </h3>
        <p className="text-body-lg max-w-xl font-medium text-center whitespace-pre-wrap">
          {subtitle?.split("\\n").map((v, i, arr) => (
            <React.Fragment key={i}>
              <span>{v}</span>
              {i != arr.length ? <br /> : ""}
            </React.Fragment>
          ))}
        </p>
      </div>
      <div className="w-full flex flex-col gap-y-6 max-w-2xl">
        <form
          onSubmit={onSubmit}
          className="flex items-center rounded-full border border-shade-2 overflow-hidden bg-background"
        >
          <input
            name="email"
            placeholder="Enter your email"
            type="email"
            required
            className="pl-6 w-full bg-transparent focus:outline-none text-body-lg  autofill:bg-transparent"
          />
          <Button type={"submit"} size="lg" disabled={isLoading}>
            {signUpText}
          </Button>
        </form>
        <div className="flex items-center flex-wrap justify-center gap-2">
          {socialLinks?.map(({ type, title, url }, i) => (
            <SocialButton key={i} type={type} title={title} url={url} />
          ))}
        </div>
      </div>
    </div>
  );
};
