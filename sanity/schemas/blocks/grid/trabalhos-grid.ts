import { defineField, defineType } from "sanity";
import { Grid } from "lucide-react";

export default defineType({
  name: "trabalhos-grid",
  title: "Grid de Trabalhos",
  type: "object",
  icon: Grid,
  fields: [
    defineField({
      name: "title",
      title: "Título da Seção",
      type: "string",
    }),
    defineField({
      name: "colorVariant",
      title: "Cor do Fundo",
      type: "string",
      options: {
        list: [
          { title: "Primária", value: "primary" },
          { title: "Secundária", value: "secondary" },
          { title: "Card", value: "card" },
          { title: "Accent", value: "accent" },
          { title: "Destrutiva", value: "destructive" },
          { title: "Background", value: "background" },
          { title: "Transparente", value: "transparent" },
        ],
      },
      initialValue: "background",
    }),
    defineField({
      name: "padding",
      title: "Padding",
      type: "object",
      fields: [
        {
          name: "top",
          title: "Padding Top",
          type: "boolean",
          initialValue: true,
        },
        {
          name: "bottom",
          title: "Padding Bottom",
          type: "boolean",
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: "trabalhos",
      title: "Trabalhos",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "trabalho-escrito" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      trabalhos: "trabalhos",
    },
    prepare({ title, trabalhos = [] }) {
      return {
        title: title || "Grid de Trabalhos",
        subtitle: `${trabalhos.length} trabalho(s)`,
        media: Grid,
      };
    },
  },
}); 