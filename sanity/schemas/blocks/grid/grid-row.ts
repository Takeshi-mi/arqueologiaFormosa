import { defineField, defineType } from "sanity";
import { Grid } from "lucide-react";

export default defineType({
  name: "grid-row",
  title: "Grid",
  type: "object",
  icon: Grid,
  fields: [
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
      name: "gridColumns",
      title: "Colunas do Grid",
      type: "string",
      options: {
        list: [
          { title: "2 Colunas", value: "grid-cols-2" },
          { title: "3 Colunas", value: "grid-cols-3" },
          { title: "4 Colunas", value: "grid-cols-4" },
        ],
      },
      initialValue: "grid-cols-3",
    }),
    defineField({
      name: "columns",
      title: "Colunas",
      type: "array",
      of: [
        { type: "grid-card" },
        { type: "grid-post" },
        { type: "pricing-card" },
        { type: "grid-trabalho" },
      ],
    }),
  ],
  preview: {
    select: {
      columns: "columns",
    },
    prepare({ columns = [] }) {
      return {
        title: "Grid",
        subtitle: `${columns.length} coluna(s)`,
        media: Grid,
      };
    },
  },
});
