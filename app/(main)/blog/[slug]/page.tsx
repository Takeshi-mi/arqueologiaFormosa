import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import PostHero from "@/components/ui/post/hero";
import { BreadcrumbLink } from "@/types";
import PortableTextRenderer from "@/components/portable-text-renderer";
import {
  fetchSanityPostBySlug,
  fetchSanityPostsStaticParams,
} from "../actions";
import { generatePageMetadata } from "@/lib/metadata";
import PostButtons from "@/components/ui/button/post-buttons";

export const dynamic = "force-static";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityPostBySlug({ slug: params.slug });

  if (!post) {
    notFound();
  }

  return generatePageMetadata({ page: post, slug: `/blog/${params.slug}` });
}

export async function generateStaticParams() {
  const posts = await fetchSanityPostsStaticParams();

  return posts.map((post) => ({
    slug: post.slug.current,
  }));
}

export default async function PostPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const post = await fetchSanityPostBySlug({ slug: params.slug });

  if (!post) {
    return MissingSanityPage({ document: "post", slug: params.slug });
  }

  const links: BreadcrumbLink[] = post
    ? [
        {
          label: "Home",
          href: "/",
        },
        {
          label: "Blog",
          href: "/blog",
        },
        {
          label: post.title as string,
          href: `/blog/${params.slug}`,
        },
      ]
    : [];

  return (
    <section>
      <div className="container py-16 xl:py-20">
        <article className="max-w-3xl mx-auto">
          <Breadcrumbs links={links} />
          <PostHero
            title={post.title}
            author={post.author}
            image={post.image}
            slug={post.slug}
            _createdAt={post._createdAt}
          />
          {post.body && <PortableTextRenderer value={post.body} />}
          <PostButtons buttons={post.buttons} alignment="center" />
        </article>
      </div>
    </section>
  );
}
