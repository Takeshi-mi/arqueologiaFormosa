import Blocks from "@/components/blocks";
import { generatePageMetadata } from "@/lib/metadata";
import MissingSanityPage from "@/components/ui/missing-sanity-page";
import { sanityFetch } from "@/sanity/lib/live";
import { SITIO_QUERY } from "@/sanity/queries/sitio";

export const dynamic = "force-static";

interface Props {
  params: {
    slug: string;
  };
}

async function fetchSanitySitioBySlug({ slug }: { slug: string }) {
  const { data } = await sanityFetch({
    query: SITIO_QUERY,
    params: { slug },
  });

  return data;
}

export async function generateMetadata({ params }: Props) {
  const sitio = await fetchSanitySitioBySlug({ slug: params.slug });

  return generatePageMetadata({ page: sitio, slug: params.slug });
}

export default async function SitioPage({ params }: Props) {
  const sitio = await fetchSanitySitioBySlug({ slug: params.slug });

  if (!sitio) {
    return MissingSanityPage({ document: "sitio", slug: params.slug });
  }

  return <Blocks blocks={sitio?.blocks} />;
} 