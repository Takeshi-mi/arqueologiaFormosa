import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { Files, BookA, User, ListCollapse, Quote, Landmark, FileText, BookText } from "lucide-react";

export const structure = (S: any, context: any) =>
  S.list()
    .title("Content")
    .items([
      orderableDocumentListDeskItem({
        type: "page",
        title: "Páginas",
        icon: Files,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "sitio",
        title: "Sítios Arqueológicos",
        icon: Landmark,
        S,
        context,
      }),
      S.listItem()
        .title("Publicações")
        .schemaType("post")
        .child(
          S.documentTypeList("post")
            .title("Post")
            .defaultOrdering([{ field: "_createdAt", direction: "desc" }]) // Default ordering
        ),
      S.listItem()
        .title("Trabalhos Escritos")
        .schemaType("trabalho-escrito")
        .icon(FileText)
        .child(
          S.documentTypeList("trabalho-escrito")
            .title("Trabalhos Escritos")
            .defaultOrdering([{ field: "publishedAt", direction: "desc" }])
        ),
      orderableDocumentListDeskItem({
        type: "tipo-trabalho",
        title: "Tipos de Trabalho",
        icon: BookText,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "category",
        title: "Categorias",
        icon: BookA,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "author",
        title: "Autores",
        icon: User,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "faq",
        title: "FAQs",
        icon: ListCollapse,
        S,
        context,
      }),
      orderableDocumentListDeskItem({
        type: "testimonial",
        title: "Avaliações",
        icon: Quote,
        S,
        context,
      }),
    ]);
