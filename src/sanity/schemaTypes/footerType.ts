import { defineField, defineType } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      type: "image",
    }),
    defineField({
      name: "copyrightNotice",
      type: "string",
    }),
    defineField({
      name: "linkSections",
      type: "array",
      of: [
        {
          type: "object",
          name: "sections",
          fields: [
            defineField({
              name: "title",
              type: "string",
            }),
            defineField({
              name: "links",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "Link",
                  fields: [
                    defineField({
                      name: "title",
                      type: "string",
                    }),
                    defineField({
                      name: "url",
                      type: "url",
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
  ],
});
