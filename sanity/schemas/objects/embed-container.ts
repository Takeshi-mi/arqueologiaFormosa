import { defineField, defineType } from "sanity";
import { Code2 } from "lucide-react";

export default defineType({
  name: 'embedContainer',
  title: 'Container de Embed',
  type: 'object',
  icon: Code2,
  description: 'Container para códigos embed como iframes, mapas, etc.',
  fields: [
    defineField({
      name: 'embedCode',
      title: 'Código do Embed',
      type: 'text',
      description: 'Cole aqui o código HTML do embed (iframe, etc)',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'minHeight',
      title: 'Altura Mínima',
      type: 'string',
      description: 'Altura mínima do container (ex: 400px, 600px)',
      initialValue: '400px',
    }),
    defineField({
      name: 'padding',
      type: 'section-padding',
      title: 'Padding',
    }),
    defineField({
      name: 'colorVariant',
      type: 'color-variant',
      title: 'Cor de Fundo',
      description: 'Selecione a cor de fundo do container',
    }),
  ],
  preview: {
    select: {
      embedCode: 'embedCode',
    },
    prepare(selection: Record<string, any>) {
      const { embedCode } = selection;
      return {
        title: 'Container de Embed',
        subtitle: embedCode ? 'Com embed configurado' : 'Sem embed configurado',
        media: Code2,
      };
    },
  },
}); 