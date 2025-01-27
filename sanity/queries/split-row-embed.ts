import { groq } from "next-sanity";

export const splitRowEmbedQuery = groq`
  _type == "split-row-embed" => {
    _type,
    padding,
    colorVariant,
    splitColumns[]{
      position,
      tagLine,
      title,
      body,
      embedCode,
      link,
    },
  },
`; 