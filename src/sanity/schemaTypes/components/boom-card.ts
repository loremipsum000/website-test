import { defineType } from "sanity";

export const boomCardType = defineType({
  title: "Boom Card",
  name: "boomCard",
  type: "document",
  fields: [
    {
      name: "sonicLogo",
      type: "image",
    },
    {
      name: "tagline",
      type: "string",
    },
    {
      name: "boomIllustration",
      type: "image",
    },
    {
      name: "cta",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "url",
          type: "url",
        },
      ],
    },
  ],
});
