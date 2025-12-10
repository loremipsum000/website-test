import { defineType } from "sanity";

export const ctaType = defineType({
  title: "CTA",
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
});

export const airdropPageType = defineType({
  title: "Airdrop Page",
  name: "airdropPage",
  preview: {
    prepare() {
      return { title: "Airdrop Page" };
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
      name: "cta",
      type: "cta",
    },
    {
      name: "secondaryCta",
      type: "cta",
    },
    {
      name: "prizeCard",
      type: "object",
      fields: [
        {
          name: "kicker",
          type: "string",
        },
        {
          name: "tokenSymbol",
          type: "string",
        },
        {
          name: "tokenAmount",
          type: "number",
        },
        {
          name: "tokenDefillamaId",
          type: "string",
        },
      ],
    },
    {
      name: "stepper",
      title: "Stepper",
      type: "document",
      fields: [
        {
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "phase",
                  title: "Phase",
                  type: "string",
                },
                {
                  name: "status",
                  title: "Status",
                  type: "string",
                  options: {
                    list: [
                      { title: "Live", value: "live" },
                      { title: "Coming Soon", value: "coming-soon" },
                      { title: "Closed", value: "closed" },
                    ],
                  },
                },
                {
                  name: "title",
                  title: "Title",
                  type: "string",
                },
                {
                  name: "description",
                  title: "Description",
                  type: "text",
                },
                {
                  name: "cta",
                  title: "Call to Action",
                  type: "object",
                  fields: [
                    {
                      name: "text",
                      title: "Text",
                      type: "string",
                    },
                    {
                      name: "href",
                      title: "Href",
                      type: "url",
                    },
                  ],
                },
                {
                  name: "image",
                  title: "Image",
                  type: "image",
                },
                {
                  name: "icons",
                  title: "Icons",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        {
                          name: "image",
                          title: "Image",
                          type: "image",
                        },
                        {
                          name: "color",
                          description:
                            "The background color of the icon (#FFFFFF etc.)",
                          title: "Color",
                          type: "string",
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
  ],
});
