import { defineType } from "sanity";

export const eventDescriptionType = defineType({
  name: "eventDescription",
  title: "Event Description",
  type: "block",
});

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    {
      name: "image",
      type: "image",
    },
    {
      name: "title",
      type: "string",
    },
    {
      name: "shortDescription",
      type: "text",
    },
    {
      name: "longDescription",
      type: "markdown",
    },
    {
      name: "time",
      type: "string",
    },
    {
      name: "location",
      type: "string",
    },
    {
      name: "link",
      type: "url",
    },
  ],
});
