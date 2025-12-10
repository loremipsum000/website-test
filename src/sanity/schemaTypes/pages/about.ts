import { defineType } from "sanity";

export const aboutPageType = defineType({
  title: "About Page",
  name: "aboutPage",
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
  type: "document",
  fields: [
    {
      title: "SEO",
      name: "seo",
      type: "seoMetaFields",
    },
    {
      name: "title",
      type: "string",
    },
    {
      name: "tagline",
      type: "string",
    },
    {
      name: "team",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "role",
              type: "string",
            },
            {
              name: "image",
              type: "image",
            },
          ],
        },
      ],
    },
    {
      name: "additionalHeadCount",
      type: "number",
    },
    {
      name: "events",
      type: "array",
      of: [
        {
          type: "reference",
          to: [
            {
              type: "event",
            },
          ],
        },
      ],
    },
  ],
});
