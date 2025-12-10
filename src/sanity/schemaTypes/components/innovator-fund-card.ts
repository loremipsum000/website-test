import { defineType } from "sanity";

export const innovatorFundCardType = defineType({
  title: "Innovator Fund Card",
  name: "innovatorFundCard",
  type: "document",
  fields: [
    {
      name: "prefix",
      type: "string",
    },
    {
      name: "postfix",
      type: "string",
    },
    {
      name: "dollarAmount",
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
    {
      name: "partners",
      type: "array",
      of: [
        {
          type: "object",
          name: "partner",
          fields: [
            {
              name: "name",
              type: "string",
            },
            {
              name: "logo",
              type: "image",
            },
          ],
        },
      ],
    },
  ],
});
