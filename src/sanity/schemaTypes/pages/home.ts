import { defineType } from "sanity";

export const infrastructurePartnerType = defineType({
  title: "Infrastructure Partner",
  name: "infrastructurePartner",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "logo",
      type: "image",
    },
    {
      name: "url",
      type: "url",
    },
  ],
});

export const backerLogoType = defineType({
  title: "Backer Logo",
  name: "backerLogo",
  type: "document",
  fields: [
    {
      name: "name",
      type: "string",
    },
    {
      name: "logo",
      type: "image",
    },
    {
      name: "variant",
      type: "string",
      initialValue: "organization",
      description:
        "Organizations are displayed without the name, individuals are displayed with the name",
      validation: (Rule) => Rule.required(),
      options: {
        list: ["organization", "individual"],
      },
    },
  ],
});

export const homePageType = defineType({
  title: "Home Page",
  name: "homePage",
  type: "document",
  preview: {
    prepare(value, viewOptions) {
      return {
        title: "Home Page",
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
      ],
    },

    {
      name: "dotsonicFloater",
      type: "object",
      fields: [
        {
          name: "show",
          title: "Show .sonic floater?",
          type: "boolean",
        },
        {
          name: "cta",
          type: "object",
          fields: [
            {
              name: "url",
              type: "url",
            },
            {
              name: "title",
              type: "string",
            },
          ],
        },
      ],
    },
    {
      name: "infrastructurePartners",
      type: "array",
      of: [
        {
          name: "infrastructurePartner",
          type: "infrastructurePartner",
        },
      ],
    },
    {
      name: "networkStatsSection",
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
          name: "stats",
          type: "array",
          of: [
            {
              type: "object",
              name: "stat",
              fields: [
                {
                  name: "title",
                  type: "string",
                },
                {
                  name: "value",
                  type: "string",
                },
              ],
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
      ],
    },
    {
      name: "feemCard",
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
          name: "mobileImage",
          type: "image",
        },
        {
          name: "cta",
          type: "object",
          fields: [
            { name: "title", type: "string" },
            { name: "url", type: "url" },
          ],
        },
      ],
    },
    {
      name: "appShowcase",
      type: "object",
      fields: [
        {
          name: "caption",
          type: "string",
        },
        {
          name: "apps",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                { name: "name", type: "string" },
                { name: "icon", type: "image" },
                { name: "url", type: "url" },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "airdropSection",
      type: "object",
      fields: [
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
      type: "object",
      name: "innovatorFundSection",
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
      ],
    },
    {
      type: "object",
      name: "backingSection",
      fields: [
        {
          name: "backerLogos",
          type: "array",
          of: [
            {
              type: "backerLogo",
            },
          ],
        },
      ],
    },
    {
      name: "sonicStackSection",
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
              name: "feature",
              fields: [
                {
                  name: "title",
                  type: "string",
                },
                {
                  name: "url",
                  type: "url",
                },
                {
                  name: "icon",
                  type: "image",
                },
                {
                  name: "bulletPoints",
                  type: "array",
                  of: [
                    {
                      type: "string",
                    },
                  ],
                },
                {
                  name: "showAuditPartners",
                  title: "Show audit partners?",
                  type: "boolean",
                },
                {
                  name: "auditPartners",
                  type: "array",
                  of: [
                    {
                      type: "object",
                      fields: [
                        {
                          name: "name",
                          type: "string",
                        },
                        {
                          name: "logo",
                          type: "image",
                        },
                        {
                          name: "url",
                          type: "url",
                        },
                      ],
                    },
                  ],
                  hidden: ({ parent }) =>
                    parent?.auditPartners?.length === 0 &&
                    !parent?.showAuditPartners,
                },
              ],
            },
          ],
        },
      ],
    },
  ],
});
