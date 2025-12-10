import { defineType } from "sanity";

export const gasMonetizationCardType = defineType({
  name: "gasMonetizationCard",
  title: "Gas Monetization Card",
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
      name: "image",
      type: "image",
    },
    {
      name: "link",
      type: "url",
    },
    // {
    //   name: "tags",
    //   type: "array",
    //   of: [
    //     {
    //       type: "reference",
    //       to: [{ type: "tag" }],
    //     },
    //   ],
    // },
  ],
});
