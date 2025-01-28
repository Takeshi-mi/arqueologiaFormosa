const embedContainer = {
  name: 'embedContainer',
  title: 'Container de Embed',
  type: 'object',
  fields: [
    {
      name: 'embedCode',
      title: 'Código do Embed',
      type: 'text',
      description: 'Cole aqui o código HTML do embed (iframe, etc)',
    },
    {
      name: 'minHeight',
      title: 'Altura Mínima',
      type: 'string',
      description: 'Altura mínima do container (ex: 400px, 600px)',
      initialValue: '400px',
    },
    {
      name: 'padding',
      title: 'Padding',
      type: 'string',
      options: {
        list: [
          { title: 'Nenhum', value: 'none' },
          { title: 'Pequeno', value: 'sm' },
          { title: 'Médio', value: 'md' },
          { title: 'Grande', value: 'lg' },
        ],
      },
      initialValue: 'lg',
    },
    {
      name: 'colorVariant',
      title: 'Cor de Fundo',
      type: 'string',
      options: {
        list: [
          { title: 'Padrão', value: 'default' },
          { title: 'Primária', value: 'primary' },
          { title: 'Secundária', value: 'secondary' },
          { title: 'Muted', value: 'muted' },
        ],
      },
      initialValue: 'default',
    },
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
      };
    },
  },
};

export default embedContainer; 