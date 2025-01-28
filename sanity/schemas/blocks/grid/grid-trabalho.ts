import { defineField, defineType } from "sanity";
import { FileText } from "lucide-react";

export default defineType({
  name: "grid-trabalho",
  title: "Grid Trabalho",
  type: "object",
  icon: FileText,
  fields: [
    defineField({
      name: "trabalho",
      title: "Trabalho Escrito",
      type: "reference",
      to: [{ type: "trabalho-escrito" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "trabalho.title",
      tipos: "trabalho.tipos",
      media: "trabalho.image",
    },
    prepare({ title = "", tipos = [], media }) {
      const tiposText = tipos.map((tipo: any) => tipo.title).join(", ");
      return {
        title: title || "Trabalho sem título",
        subtitle: tiposText,
        media: media || FileText,
      };
    },
  },
}); 