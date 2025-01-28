import { groq } from "next-sanity";

export const featureCardsQuery = groq`
  _type == "featureCards" => {
    _type,
    _key,
    padding,
    colorVariant,
    cards[]{
      icon{
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
      title,
      description,
    },
  },
`; 