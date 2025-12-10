import { defineField, defineType } from "sanity";

export const cardType = defineType({
  title: "Card",
  name: "card",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "description",
      type: "text",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
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
    }),
  ],
});
