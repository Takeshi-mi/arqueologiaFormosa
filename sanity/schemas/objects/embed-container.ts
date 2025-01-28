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
      name: 'aspectRatio',
      title: 'Proporção',
      type: 'string',
      description: 'Proporção largura/altura do container',
      options: {
        list: [
          { title: '16:9 (Widescreen)', value: '16:9' },
          { title: '4:3 (Standard)', value: '4:3' },
          { title: '1:1 (Quadrado)', value: '1:1' },
          { title: '9:16 (Vertical)', value: '9:16' },
          { title: 'Personalizado', value: 'custom' },
        ],
      },
      initialValue: '16:9',
    }),
    defineField({
      name: 'customHeight',
      title: 'Altura Personalizada',
      type: 'string',
      description: 'Altura em pixels (ex: 400px) ou porcentagem (ex: 100%). Só funciona quando a proporção é "Personalizado".',
      hidden: ({ parent }) => parent?.aspectRatio !== 'custom',
    }),
    defineField({
      name: 'maxWidth',
      title: 'Largura Máxima',
      type: 'string',
      description: 'Largura máxima do container (ex: 800px, 100%). Deixe em branco para usar a largura padrão.',
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
      aspectRatio: 'aspectRatio',
    },
    prepare(selection: Record<string, any>) {
      const { embedCode, aspectRatio } = selection;
      return {
        title: 'Container de Embed',
        subtitle: `${aspectRatio || '16:9'} - ${embedCode ? 'Com embed configurado' : 'Sem embed configurado'}`,
        media: Code2,
      };
    },
  },
}); 