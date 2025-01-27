import { groq } from "next-sanity";

export const splitRowEmbedQuery = groq`
  _type == "split-row-embed" => {
    _type,
    padding,
    colorVariant,
    splitColumns[]{
      position,
      titlePosition,
      tagLine,
      title,
      titleDescription,
      body,
      embedCode,
      link {
        title,
        href,
        target,
        buttonVariant
      },
    },
  },
`; 