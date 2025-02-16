import { type SchemaTypeDefinition } from "sanity";
// documents
import page from "./schemas/documents/page";
import post from "./schemas/documents/post";
import author from "./schemas/documents/author";
import category from "./schemas/documents/category";
import faq from "./schemas/documents/faq";
import testimonial from "./schemas/documents/testimonial";
import sitio from "./schemas/documents/sitio";
import trabalhoEscrito from "./schemas/documents/trabalho-escrito";
import tipoTrabalho from "./schemas/documents/tipo-trabalho";

// Schema UI shared objects
import blockContent from "./schemas/blocks/shared/block-content";
import link from "./schemas/blocks/shared/link";
import { colorVariant } from "./schemas/blocks/shared/color-variant";
import { buttonVariant } from "./schemas/blocks/shared/button-variant";
import sectionPadding from "./schemas/blocks/shared/section-padding";
// Schema UI objects
import hero1 from "./schemas/blocks/hero/hero-1";
import sectionHeader from "./schemas/blocks/section-header";
import splitColumn from "./schemas/blocks/split/split-column";
import splitRow from "./schemas/blocks/split/split-row";
import splitRowEmbed from "./schemas/objects/split-row-embed";
import splitColumnEmbed from "./schemas/objects/splitColumnEmbed";
import gridCard from "./schemas/blocks/grid/grid-card";
import pricingCard from "./schemas/blocks/grid/pricing-card";
import gridPost from "./schemas/blocks/grid/grid-post";
import gridRow from "./schemas/blocks/grid/grid-row";
import carousel1 from "./schemas/blocks/carousel/carousel-1";
import carousel2 from "./schemas/blocks/carousel/carousel-2";
import timelineRow from "./schemas/blocks/timeline/timeline-row";
import timelinesOne from "./schemas/blocks/timeline/timelines-1";
import cta1 from "./schemas/blocks/cta/cta-1";
import logoCloud1 from "./schemas/blocks/logo-cloud/logo-cloud-1";
import faqs from "./schemas/blocks/faqs";
import newsletter from "./schemas/blocks/forms/newsletter";
import embedContainer from './schemas/objects/embed-container'
import buttonContainer from './schemas/objects/button-container';
import featureCard from './schemas/objects/feature-card';
import featureCards from './schemas/objects/feature-cards';
import trabalhosGrid from "./schemas/blocks/grid/trabalhos-grid";
import gridTrabalho from "./schemas/blocks/grid/grid-trabalho";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // documents
    page,
    post,
    author,
    category,
    faq,
    testimonial,
    sitio,
    trabalhoEscrito,
    tipoTrabalho,
    // shared objects
    blockContent,
    link,
    colorVariant,
    buttonVariant,
    sectionPadding,
    // blocks
    hero1,
    sectionHeader,
    splitColumn,
    splitRow,
    splitRowEmbed,
    splitColumnEmbed,
    gridCard,
    pricingCard,
    gridPost,
    gridRow,
    carousel1,
    carousel2,
    timelineRow,
    timelinesOne,
    cta1,
    logoCloud1,
    faqs,
    newsletter,
    embedContainer,
    buttonContainer,
    featureCard,
    featureCards,
    trabalhosGrid,
    gridTrabalho,
  ],
};
