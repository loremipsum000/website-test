import { defineType } from "sanity";

export const quickstartCardType = defineType({
  title: "Quickstart Card",
  name: "quickstartCard",
  type: "document",
  fields: [
    {
      type: "image",
      name: "image",
    },
    {
      name: "title",
      type: "string",
    },
    {
      name: "description",
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
});

export const bountyCategoryType = defineType({
  title: "Bounty Category",
  name: "bountyCategory",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
    },
  ],
});

export const bountyType = defineType({
  title: "Bounty",
  name: "bounty",
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
      name: "link",
      type: "url",
    },
    {
      name: "categories",
      type: "array",
      of: [{ type: "reference", to: { type: "bountyCategory" } }],
    },
  ],
});

export const developerResourcesPageType = defineType({
  title: "Developer Resources Page",
  name: "developerResourcesPage",
  type: "document",
  fields: [
    // Title, subtitle, Quickstart cards, Bounties
    {
      title: "SEO",
      name: "seo",
      type: "seoMetaFields",
    },
    {
      name: "title",
      type: "string",
    },
    {
      name: "tagline",
      type: "string",
    },
    {
      name: "quickstartCards",
      type: "array",
      of: [{ type: "card" }],
    },
  ],
});
