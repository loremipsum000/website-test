import { defineType } from "sanity";

export const getInTouchPageType = defineType({
  title: "Get In Touch Page",
  name: "getInTouchPage",
  type: "document",
  fields: [
    {
      title: "SEO",
      name: "seo",
      type: "seoMetaFields",
    },
    {
      name: "contactSection",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "string",
        },
        {
          name: "contactForm",
          type: "object",
          fields: [
            {
              name: "title",
              type: "string",
            },
            {
              name: "topics",
              type: "array",
              of: [
                {
                  name: "topic",
                  type: "object",
                  fields: [
                    {
                      name: "label",
                      type: "string",
                    },
                    {
                      name: "recipients",
                      type: "array",
                      of: [
                        {
                          name: "contactEmail",
                          type: "email",
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "quickstartSection",
      type: "object",
      fields: [
        {
          name: "cards",
          type: "array",
          of: [
            {
              name: "card",
              type: "card",
            },
          ],
        },
      ],
    },
  ],
});
