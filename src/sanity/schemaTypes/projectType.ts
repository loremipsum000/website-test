import { defineField, defineType } from "sanity";

export const projectTagType = defineType({
  name: "projectTag",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
  ],
});

export const projectType = defineType({
  name: "project",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
    }),
    defineField({
      name: "link",
      type: "url",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
    defineField({
      name: "tags",
      type: "array",
      of: [{ type: "reference", to: [{ type: "projectTag" }] }],
    }),
  ],
});
