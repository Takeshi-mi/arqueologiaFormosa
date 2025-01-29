import { groq } from "next-sanity";

export const TRABALHOS_ESCRITOS_QUERY = groq`*[_type == "trabalho-escrito" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
  _id,
  _type,
  title,
  slug,
  excerpt,
  publishedAt,
  image {
    ...,
    "alt": coalesce(alt, title),
    asset-> {
      ...,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  authors[]-> {
    _id,
    name,
    image {
      ...,
      asset->
    }
  },
  tipos[]-> {
    _id,
    title,
    description
  },
  sitios[]-> {
    _id,
    title,
    slug
  },
  categories[]-> {
    title
  }
}`;

export const TRABALHO_ESCRITO_QUERY = groq`*[_type == "trabalho-escrito" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
  _id,
  _type,
  title,
  slug,
  excerpt,
  publishedAt,
  image {
    ...,
    "alt": coalesce(alt, title),
    asset-> {
      ...,
      metadata {
        dimensions,
        lqip
      }
    }
  },
  authors[]-> {
    _id,
    name,
    image {
      ...,
      asset->
    }
  },
  tipos[]-> {
    _id,
    title,
    description
  },
  sitios[]-> {
    _id,
    title,
    slug
  },
  categories[]-> {
    title
  },
  body[] {
    ...,
    _type == "image" => {
      ...,
      asset-> {
        ...,
        metadata {
          dimensions,
          lqip
        }
      }
    }
  },
  buttons[] {
    title,
    href,
    target,
    buttonVariant
  },
  meta_title,
  meta_description,
  noindex,
  ogImage {
    asset-> {
      _id,
      url,
      metadata {
        dimensions {
          width,
          height
        }
      }
    }
  }
}`;

export const TRABALHOS_ESCRITOS_SLUGS_QUERY = groq`*[_type == "trabalho-escrito" && !(_id in path("drafts.**"))]{
  slug
}`; 