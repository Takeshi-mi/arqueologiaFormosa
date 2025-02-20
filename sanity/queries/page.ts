import { groq } from "next-sanity";
import { hero1Query } from "./hero/hero-1";
import { sectionHeaderQuery } from "./section-header";
import { splitRowQuery } from "./split-row";
import { splitRowEmbedQuery } from "./split-row-embed";
import { gridRowQuery } from "./grid/grid-row";
import { carousel1Query } from "./carousel/carousel-1";
import { carousel2Query } from "./carousel/carousel-2";
import { timelineQuery } from "./timeline";
import { cta1Query } from "./cta/cta-1";
import { logoCloud1Query } from "./logo-cloud/logo-cloud-1";
import { faqsQuery } from "./faqs";
import { formNewsletterQuery } from "./forms/newsletter";
import { embedContainerQuery } from "./embed-container";
import { buttonContainerQuery } from "./button-container";
import { featureCardsQuery } from "./feature-cards";

export const PAGE_QUERY = groq`
  *[_type == "page" && slug.current == $slug][0]{
    blocks[]{
      ${hero1Query}
      ${sectionHeaderQuery}
      ${splitRowQuery}
      ${splitRowEmbedQuery}
      ${gridRowQuery}
      ${carousel1Query}
      ${carousel2Query}
      ${timelineQuery}
      ${cta1Query}
      ${logoCloud1Query}
      ${faqsQuery}
      ${formNewsletterQuery}
      ${embedContainerQuery}
      ${buttonContainerQuery}
      ${featureCardsQuery}
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
  }
`;
