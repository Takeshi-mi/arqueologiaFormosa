import { groq } from "next-sanity";

export const embedContainerQuery = groq`
  _type == "embedContainer" => {
    _type,
    _key,
    embedCode,
    padding,
    colorVariant,
  },
`; 