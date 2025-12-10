import { defineField, defineType } from "sanity";

export const sodasPageType = defineType({
  name: "sodasPage",
  title: "Sodas Page",
  type: "document",
  fields: [
    {
      name: "seo",
      title: "SEO",
      type: "seoMetaFields",
    },
    {
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
          name: "description",
          title: "Description",
          type: "text",
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
        }),
        defineField({
          name: "cta",
          title: "Call to Action",
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
          name: "secondaryCta",
          title: "Secondary Call to Action",
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
    },
    defineField({
      name: "howItWorksSection",
      title: "How It Works Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "termsAndConditionsUrl",
          title: "Terms and Conditions URL",
          type: "url",
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
        }),
        defineField({
          name: "steps",
          title: "Steps",
          type: "array",
          of: [
            defineField({
              name: "step",
              title: "Step",
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
              ],
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "upcomingEventsSection",
      title: "Upcoming Events Section",
      type: "object",
      fields: [
        defineField({
          name: "title",
          title: "Title",
          type: "string",
        }),
        defineField({
          name: "events",
          title: "Events",
          type: "array",
          of: [
            defineField({
              name: "event",
              title: "Event",
              type: "reference",
              to: [
                {
                  type: "event",
                },
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
