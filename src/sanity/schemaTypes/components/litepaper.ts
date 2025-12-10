import { FileIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

export const litepaper = defineType({
  name: "litepaper",
  title: "Litepaper",
  type: "document",
  icon: FileIcon,
  fields: [
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoMetaFields",
    }),
    defineField({
      name: "file",
      title: "File",
      type: "file",
      options: {
        accept: "application/pdf",
      },
    }),
  ],
});
