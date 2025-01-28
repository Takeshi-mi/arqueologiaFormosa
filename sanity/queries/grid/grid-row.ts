import { groq } from "next-sanity";
import { gridCardQuery } from "@/sanity/queries/grid/grid-card";
import { pricingCardQuery } from "@/sanity/queries/grid/pricing-card";
import { gridPostQuery } from "@/sanity/queries/grid/grid-post";
import { gridTrabalhoQuery } from "@/sanity/queries/grid/grid-trabalho";

export const gridRowQuery = groq`
  _type == "grid-row" => {
    _type,
    padding,
    colorVariant,
    gridColumns,
    columns[]{
      ${gridCardQuery}
      ${pricingCardQuery}
      ${gridPostQuery}
      ${gridTrabalhoQuery}
    },
  },
`;
