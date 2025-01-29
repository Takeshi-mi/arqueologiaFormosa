import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export default defineType({
  name: "trabalho-escrito",
  title: "Trabalho Escrito",
  type: "document",
  icon: FileText,
  groups: [
    {
      name: "content",
      title: "Conteúdo",
    },
    {
      name: "seo",
      title: "SEO",
    },
    {
      name: "settings",
      title: "Configurações",
    },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "settings",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Resumo",
      type: "text",
      group: "content",
    }),
    defineField({
      name: "authors",
      title: "Autores",
      type: "array",
      group: "settings",
      of: [{ type: "reference", to: { type: "author" } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "tipos",
      title: "Tipos de Trabalho",
      type: "array",
      group: "settings",
      of: [{ type: "reference", to: { type: "tipo-trabalho" } }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "sitios",
      title: "Sítios Arqueológicos",
      type: "array",
      group: "settings",
      of: [{ type: "reference", to: { type: "sitio" } }],
    }),
    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "datetime",
      group: "settings",
    }),
    defineField({
      name: "image",
      title: "Imagem",
      type: "image",
      group: "settings",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Texto Alternativo",
        },
        {
          name: "updatedAt",
          type: "datetime",
          title: "Data de Atualização",
          hidden: true,
        },
      ],
    }),
    defineField({
      name: "categories",
      title: "Categorias",
      type: "array",
      group: "settings",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "body",
      title: "Conteúdo",
      type: "block-content",
      group: "content",
    }),
    defineField({
      name: "buttons",
      title: "Botões",
      type: "array",
      group: "content",
      description: "Adicione até 3 botões de ação",
      of: [{ type: "link" }],
      validation: Rule => Rule.max(3),
    }),
    defineField({
      name: "meta_title",
      title: "Meta Title",
      type: "string",
      group: "seo",
    }),
    defineField({
      name: "meta_description",
      title: "Meta Description",
      type: "text",
      group: "seo",
    }),
    defineField({
      name: "noindex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      group: "seo",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image - [1200x630]",
      type: "image",
      group: "seo",
    }),
  ],

  preview: {
    select: {
      title: "title",
      author0: "authors.0.name",
      author1: "authors.1.name",
      author2: "authors.2.name",
      tipo0: "tipos.0.title",
      media: "image",
    },
    prepare(selection) {
      const { title, author0, author1, author2, tipo0, media } = selection;
      const authors = [author0, author1, author2].filter(Boolean);
      const subtitle = [
        tipo0 ? `[${tipo0}]` : "",
        authors.length > 0 ? `por ${authors.join(", ")}` : "",
      ].filter(Boolean).join(" ");

      return { 
        title: title || "Sem título",
        subtitle,
        media,
      };
    },
  },
}); 