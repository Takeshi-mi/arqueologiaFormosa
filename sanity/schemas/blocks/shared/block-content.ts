import { defineType, defineArrayMember, defineField } from "sanity";

export const blockFields = [
  defineField({
    name: "id",
    title: "ID da Seção",
    description: "ID único para navegação na página (ex: sobre, contato, etc). Será usado como id do elemento HTML para links de ancoragem.",
    type: "string",
    validation: Rule => Rule.custom((id, context) => {
      if (!id) return true;
      if (!/^[a-z0-9-_]+$/.test(id)) {
        return 'O ID deve conter apenas letras minúsculas, números, hífens e underscores';
      }
      return true;
    })
  }),
];

export default defineType({
  title: "Block Content",
  name: "block-content",
  type: "array",
  of: [
    defineArrayMember({
      title: "Block",
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "H3", value: "h3" },
        { title: "H4", value: "h4" },
        { title: "Quote", value: "blockquote" },
      ],
      lists: [
        { title: "Bullet", value: "bullet" },
        { title: "Number", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Strong", value: "strong" },
          { title: "Emphasis", value: "em" },
        ],
        annotations: [
          {
            title: "URL",
            name: "link",
            type: "object",
            fields: [
              {
                title: "URL",
                name: "href",
                type: "url",
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: true,
                    scheme: ["http", "https", "mailto", "tel"],
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alternative Text",
        },
      ],
    }),
  ],
});
