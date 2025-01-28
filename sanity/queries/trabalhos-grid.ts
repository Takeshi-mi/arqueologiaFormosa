import { groq } from "next-sanity";

export const TRABALHOS_GRID_QUERY = groq`
  *[_type == "trabalho-escrito"] | order(publishedAt desc) {
    _id,
    _type,
    title,
    slug,
    excerpt,
    image {
      ...,
      "alt": coalesce(alt, title),
      asset-> {
        ...,
        metadata {
          dimensions,
          lqip
        }
      }
    },
    tipos[]-> {
      _id,
      title
    },
    publishedAt
  }
`; 