import { defineField, defineType } from "sanity";

export const cardPageType = defineType({
  name: "cardPage",
  title: "Card Page",
  type: "document",
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMetaFields",
    }),
    defineField({
      name: "heroSection",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "brandPartners",
      title: "Brand Partners",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { type: "image", name: "logo" },
            { type: "string", name: "name" },
          ],
        },
      ],
    }),
    defineField({
      name: "physicalCardSection",
      title: "Physical Card Section",
      type: "object",
      fields: [
        defineField({
          name: "tabTitle",
          title: "Tab Title",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
        defineField({
          name: "cta",
          title: "CTA",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "virtualCardSection",
      title: "Virtual Card Section",
      type: "object",
      fields: [
        defineField({
          name: "tabTitle",
          title: "Tab Title",
          type: "string",
        }),
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
        defineField({
          name: "cta",
          title: "CTA",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "globalCoverageSection",
      title: "Global Coverage Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "subtitle",
          title: "Subtitle",
          type: "string",
        }),
        defineField({
          name: "cta",
          title: "CTA",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
        }),
        defineField({
          name: "features",
          title: "Features",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icon",
                  type: "image",
                }),
                defineField({
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "internationalSection",
      title: "International Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
        defineField({
          name: "cta",
          title: "CTA",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "faqSection",
      title: "FAQ Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "questions",
          title: "Questions",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "question",
                  title: "Question",
                  type: "string",
                }),
                defineField({
                  name: "answer",
                  title: "Answer",
                  type: "array",
                  of: [
                    {
                      type: "block",
                      marks: {
                        annotations: [
                          {
                            name: "link",
                            type: "object",
                            title: "External link",
                            fields: [
                              {
                                name: "href",
                                type: "url",
                                title: "URL",
                              },
                              {
                                title: "Open in new tab",
                                name: "blank",
                                type: "boolean",
                              },
                            ],
                          },
                        ],
                      },
                    },
                  ],
                }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
});
