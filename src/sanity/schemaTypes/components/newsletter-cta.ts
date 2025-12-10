import { defineType } from "sanity";

export const socialLinkType = defineType({
  name: "socialLink",
  type: "object",
  fields: [
    {
      name: "type",
      type: "string",
      options: {
        list: [
          "discord",
          "github",
          "instagram",
          "reddit",
          "telegram",
          "x",
          "youtube",
        ],
      },
    },
    {
      name: "title",
      type: "string",
    },
    {
      name: "url",
      type: "url",
    },
  ],
});

export const newsletterCtaType = defineType({
  name: "newsletterCta",
  title: "Newsletter CTA",
  preview: {
    prepare() {
      return { title: "Newsletter CTA" };
    },
  },
  type: "document",
  fields: [
    {
      name: "showNewsletterCta",
      title: "Show Newsletter CTA",
      type: "boolean",
    },
    {
      name: "title",
      type: "string",
    },
    {
      name: "subtitle",
      type: "string",
    },
    {
      name: "signUpText",
      type: "string",
    },
    {
      name: "socialLinks",
      type: "array",
      of: [{ type: "socialLink" }],
    },
    {
      name: "successMessage",
      type: "string",
    },
    {
      name: "errorMessage",
      type: "string",
    },
  ],
});
