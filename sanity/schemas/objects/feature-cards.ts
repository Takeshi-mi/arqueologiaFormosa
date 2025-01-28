import { defineField, defineType } from "sanity";
import { LayoutGrid } from "lucide-react";

export default defineType({
  name: 'featureCards',
  title: 'Cards de Características',
  type: 'object',
  icon: LayoutGrid,
  fields: [
    defineField({
      name: 'padding',
      type: 'section-padding',
      title: 'Padding',
    }),
    defineField({
      name: 'colorVariant',
      type: 'color-variant',
      title: 'Cor de Fundo',
    }),
    defineField({
      name: 'cards',
      title: 'Cards',
      type: 'array',
      of: [{ type: 'featureCard' }],
      validation: Rule => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      cards: 'cards',
    },
    prepare(selection) {
      const { cards } = selection;
      return {
        title: 'Cards de Características',
        subtitle: `${cards?.length || 0} card(s)`,
        media: LayoutGrid,
      };
    },
  },
}); 