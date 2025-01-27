import { defineField, defineType } from "sanity";

export default defineType({
  name: "split-row-embed",
  title: "Split Row com Embed",
  type: "object",
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
    }),
    defineField({
      name: "splitColumns",
      type: "array",
      of: [{ type: "splitColumnEmbed" }],
    }),
  ],
  preview: {
    select: {
      splitColumns: "splitColumns",
    },
    prepare({ splitColumns }) {
      return {
        title: "Split Row com Embed",
        subtitle: `${splitColumns?.length || 0} colunas`,
      };
    },
  },
}); 