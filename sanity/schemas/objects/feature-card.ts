import { defineField, defineType } from "sanity";

export default defineType({
  name: 'featureCard',
  title: 'Card de Característica',
  type: 'object',
  fields: [
    defineField({
      name: 'icon',
      title: 'Ícone',
      type: 'image',
      description: 'Ícone que representa a característica',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'icon',
    },
  },
}); 