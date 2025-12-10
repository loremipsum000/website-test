import { defineField, defineType } from "sanity";

export const investorType = defineType({
  name: "investor",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "role",
      type: "text",
    }),
  ],
});
