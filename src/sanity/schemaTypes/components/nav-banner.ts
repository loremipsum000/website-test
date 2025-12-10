import { defineType } from "sanity";

export const navBanner = defineType({
  name: "navBanner",
  title: "Nav Banner",
  type: "object",
  fields: [
    {
      name: "text",
      title: "Text",
      type: "string",
    },
    {
      name: "link",
      title: "Link",
      type: "url",
    },
  ],
});
