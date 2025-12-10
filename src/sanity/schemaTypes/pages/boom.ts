import { defineType } from "sanity";

export const boomPageType = defineType({
  title: "Boom Page",
  name: "boomPage",
  type: "document",
  preview: {
    prepare: () => ({ title: "Boom Page" }),
  },
  fields: [
    {
      title: "SEO",
      name: "seo",
      type: "seoMetaFields",
    },
    {
      name: "hero",
      type: "object",
      fields: [
        {
          name: "image",
          type: "image",
        },
        {
          name: "description",
          type: "text",
        },
      ],
    },
    {
      name: "prizeCard",
      type: "object",
      fields: [
        {
          name: "fantomAmount",
          type: "number",
        },
      ],
    },
    {
      name: "cards",
      type: "array",
      of: [
        {
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
              name: "image",
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
        },
      ],
    },
    {
      name: "rankingCards",
      type: "array",
      of: [
        {
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
              name: "image",
              type: "image",
            },
            {
              name: "indicator",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "bonusCards",
      type: "array",
      of: [
        {
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
              name: "image",
              type: "image",
            },
          ],
        },
      ],
    },
    {
      name: "bountySection",
      type: "object",
      fields: [
        {
          name: "title",
          type: "string",
        },
        {
          name: "description",
          type: "text",
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
        {
          name: "bounties",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "title",
                  type: "string",
                },
                {
                  name: "categories",
                  type: "array",
                  of: [{ type: "reference", to: [{ type: "bountyCategory" }] }],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "faq",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "question",
              type: "string",
            },
            {
              name: "answer",
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
                            description:
                              "Read https://css-tricks.com/use-target_blank/",
                            type: "boolean",
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
