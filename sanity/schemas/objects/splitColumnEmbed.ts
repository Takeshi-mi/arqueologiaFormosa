import { defineField, defineType } from "sanity";

export default defineType({
  name: "splitColumnEmbed",
  title: "Split Column com Embed",
  type: "object",
  fields: [
    defineField({
      name: "position",
      title: "Posição do Conteúdo",
      type: "string",
      options: {
        list: [
          { title: "Esquerda", value: "left" },
          { title: "Direita", value: "right" },
        ],
      },
    }),
    defineField({
      name: "tagLine",
      title: "Tag Line",
      type: "string",
    }),
    defineField({
      name: "title",
      title: "Título",
      type: "string",
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "embedCode",
      title: "Código do Embed",
      description: "Cole aqui o código HTML do embed (iframe do Sketchfab ou mapa)",
      type: "text",
      validation: (Rule) =>
        Rule.custom((text) => {
          if (!text) return true;
          // Verifica se contém um iframe e se é do Sketchfab ou parece ser um mapa
          if (
            !text.includes("<iframe") ||
            (!text.includes("sketchfab.com") && !text.includes("map"))
          ) {
            return "O código deve conter um iframe do Sketchfab ou um mapa";
          }
          return true;
        }),
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "object",
      fields: [
        {
          name: "label",
          title: "Label",
          type: "string",
        },
        {
          name: "href",
          title: "URL",
          type: "string",
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      position: "position",
    },
    prepare({ title, position }) {
      return {
        title: title || "Sem título",
        subtitle: `Conteúdo à ${position === "left" ? "esquerda" : "direita"}`,
      };
    },
  },
}); 