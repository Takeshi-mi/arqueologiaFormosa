import { groq } from "next-sanity";

export const buttonContainerQuery = groq`
  _type == "buttonContainer" => {
    _type,
    _key,
    padding,
    colorVariant,
    alignment,
    buttons[]{
      title,
      href,
      target,
      buttonVariant,
    },
  },
`; 