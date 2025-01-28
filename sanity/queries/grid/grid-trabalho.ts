import { groq } from "next-sanity";

export const gridTrabalhoQuery = groq`
  _type == "grid-trabalho" => {
    _type,
    _key,
    "trabalho": trabalho-> {
      _id,
      title,
      slug,
      excerpt,
      publishedAt,
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
      sitios[]-> {
        _id,
        title
      },
      authors[]-> {
        _id,
        name,
        image {
          ...,
          asset->
        }
      }
    }
  }
`; 
