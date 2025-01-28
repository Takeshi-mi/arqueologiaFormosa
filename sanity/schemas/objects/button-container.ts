import { defineField, defineType } from "sanity";
import { Button } from "lucide-react";

export default defineType({
  name: "buttonContainer",
  title: "Container de Botões",
  type: "object",
  icon: Button,
  fields: [
    defineField({
      name: "padding",
      type: "section-padding",
      title: "Padding",
    }),
    defineField({
      name: "colorVariant",
      type: "color-variant",
      title: "Cor de Fundo",
    }),
    defineField({
      name: "alignment",
      title: "Alinhamento",
      type: "string",
      options: {
        list: [
          { title: "Esquerda", value: "left" },
          { title: "Centro", value: "center" },
          { title: "Direita", value: "right" },
        ],
      },
      initialValue: "left",
    }),
    defineField({
      name: "buttons",
      title: "Botões",
      type: "array",
      of: [{ type: "link" }],
      validation: Rule => Rule.max(3),
    }),
  ],
  preview: {
    select: {
      buttons: "buttons",
    },
    prepare({ buttons }) {
      return {
        title: "Container de Botões",
        subtitle: `${buttons?.length || 0} botão(ões)`,
        media: Button,
      };
    },
  },
}); 