import { groq } from "next-sanity";

export const hero1Query = groq`
  _type == "hero-1" => {
    _type,
    tagLine,
    title,
    body,
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
    links,
  },
`;
