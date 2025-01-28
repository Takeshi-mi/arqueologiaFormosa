import { defineField, defineType } from "sanity";
import { orderRankField } from "@sanity/orderable-document-list";
import { BookText } from "lucide-react";

export default defineType({
  name: "tipo-trabalho",
  title: "Tipo de Trabalho",
  type: "document",
  icon: BookText,
  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
    }),
    orderRankField({ type: "tipo-trabalho" }),
  ],
}); 