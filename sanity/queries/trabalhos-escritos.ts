import { groq } from "next-sanity";

export const TRABALHOS_ESCRITOS_QUERY = groq`*[_type == "trabalho-escrito" && defined(slug)] | order(publishedAt desc){
    title,
    slug,
    excerpt,
    publishedAt,
    image{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    authors[]->{
      name,
      image {
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    },
    "tipos": tipos[]-> {
      "_id": _id,
      "title": title,
      "description": description
    },
    "sitios": sitios[]-> {
      "_id": _id,
      "title": title,
      "slug": slug
    },
    categories[]->{
      title
    }
}`;

export const TRABALHO_ESCRITO_QUERY = groq`*[_type == "trabalho-escrito" && slug.current == $slug][0]{
    title,
    slug,
    excerpt,
    publishedAt,
    image{
      asset->{
        _id,
        url,
        mimeType,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt
    },
    authors[]->{
      name,
      image {
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        },
        alt
      }
    },
    tipos[]->{
      title,
      description
    },
    sitios[]->{
      title,
      slug
    },
    categories[]->{
      title
    },
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          _id,
          url,
          mimeType,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        }
      }
    },
    buttons[]{
      title,
      href,
      target,
      buttonVariant,
    },
    meta_title,
    meta_description,
    noindex,
    ogImage {
      asset->{
        _id,
        url,
        metadata {
          dimensions {
            width,
            height
          }
        }
      },
    }
}`;

export const TRABALHOS_ESCRITOS_SLUGS_QUERY = groq`*[_type == "trabalho-escrito" && defined(slug)]{slug}`; 