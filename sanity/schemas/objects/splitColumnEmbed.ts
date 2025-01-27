import { defineField, defineType } from "sanity";

export default defineType({
  name: "splitColumnEmbed",
  title: "Split Column com Embed",
  type: "object",
  fields: [
    defineField({
      name: "titlePosition",
      title: "Posição do Título",
      type: "string",
      options: {
        list: [
          { title: "Junto ao conteúdo", value: "content" },
          { title: "No topo", value: "top" },
        ],
      },
      initialValue: "content",
    }),
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
      name: "titleDescription",
      title: "Descrição do Título",
      description: "Texto adicional que aparece abaixo do título quando ele está no topo",
      type: "text",
      hidden: ({ parent }) => parent?.titlePosition !== "top",
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
      description: "Cole aqui o código HTML do embed (iframe do YouTube, Sketchfab, mapas, ou qualquer outro embed que você queira usar)",
      type: "text",
      validation: (Rule) =>
        Rule.custom((text) => {
          if (!text) return true;
          if (!text.includes("<iframe")) {
            return "O código deve conter um iframe válido";
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
          name: "title",
          title: "Texto do Botão",
          type: "string",
        },
        {
          name: "href",
          title: "URL",
          type: "string",
        },
        {
          name: "target",
          title: "Abrir em nova aba",
          type: "boolean",
        },
        {
          name: "buttonVariant",
          title: "Estilo do Botão",
          type: "string",
          options: {
            list: [
              { title: "Padrão", value: "default" },
              { title: "Secundário", value: "secondary" },
              { title: "Link", value: "link" },
              { title: "Destrutivo", value: "destructive" },
              { title: "Outline", value: "outline" },
              { title: "Ghost", value: "ghost" },
            ],
          },
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