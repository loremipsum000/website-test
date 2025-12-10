import { defineType } from "sanity";

export const validatorNodeCardType = defineType({
  title: "Validator Node Card",
  name: "validatorNodeCard",
  type: "document",
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
      name: "validatorIcons",
      type: "array",
      of: [
        {
          type: "image",
        },
      ],
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
      name: "secondaryCta",
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
      name: "features",
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
          ],
        },
      ],
    },
  ],
});

export const tokenPageType = defineType({
  title: "Token Page",
  name: "tokenPage",
  type: "document",
  preview: {
    prepare(value, viewOptions) {
      return {
        title: "Token Page",
      };
    },
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
          name: "title",
          type: "string",
        },
        {
          name: "subtitle",
          type: "string",
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
    {
      name: "utilitySection",
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
          name: "utilityCards",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                {
                  name: "icon",
                  type: "image",
                },
                {
                  name: "title",
                  type: "string",
                },
                {
                  name: "description",
                  type: "string",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "migrationSection",
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
          name: "illustration",
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
    {
      name: "validatorNodeCard",
      type: "reference",
      to: [{ type: "validatorNodeCard" }],
    },
  ],
});
