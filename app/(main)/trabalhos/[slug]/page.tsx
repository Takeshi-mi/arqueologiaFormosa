import { Metadata } from "next";
import { notFound } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { TRABALHO_ESCRITO_QUERY } from "@/sanity/queries/trabalhos-escritos";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";

interface Props {
  params: {
    slug: string;
  };
}

async function getTrabalho(slug: string) {
  return client.fetch(TRABALHO_ESCRITO_QUERY, { slug });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const trabalho = await getTrabalho(params.slug);

  if (!trabalho) {
    return {
      title: "Não Encontrado",
      description: "A página que você está procurando não existe",
    };
  }

  return {
    title: trabalho.meta_title || trabalho.title,
    description: trabalho.meta_description || trabalho.excerpt,
    openGraph: trabalho.ogImage
      ? {
          images: [
            {
              url: urlForImage(trabalho.ogImage).url(),
              width: trabalho.ogImage.asset.metadata.dimensions.width,
              height: trabalho.ogImage.asset.metadata.dimensions.height,
            },
          ],
        }
      : null,
  };
}

export default async function TrabalhoPage({ params }: Props) {
  const trabalho = await getTrabalho(params.slug);

  if (!trabalho) {
    notFound();
  }

  return (
    <article className="container py-8">
      <div className="max-w-3xl mx-auto">
        {/* Cabeçalho */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{trabalho.title}</h1>

          {/* Metadados */}
          <div className="flex flex-wrap gap-4 text-muted-foreground mb-4">
            {trabalho.publishedAt && (
              <time>
                {format(new Date(trabalho.publishedAt), "d 'de' MMMM 'de' yyyy", {
                  locale: ptBR,
                })}
              </time>
            )}

            {trabalho.authors && trabalho.authors.length > 0 && (
              <div className="flex items-center gap-2">
                <span>por</span>
                <div className="font-medium">
                  {trabalho.authors.map((author: any) => author.name).join(", ")}
                </div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {trabalho.tipos?.map((tipo: any) => (
              <span
                key={tipo.title}
                className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
              >
                {tipo.title}
              </span>
            ))}
          </div>

          {/* Imagem Principal */}
          {trabalho.image && (
            <div className="aspect-[16/9] relative mb-8">
              <Image
                src={urlForImage(trabalho.image).url()}
                alt={trabalho.image.alt || trabalho.title}
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}

          {/* Resumo */}
          {trabalho.excerpt && (
            <div className="prose prose-lg max-w-none mb-8">
              <p className="lead">{trabalho.excerpt}</p>
            </div>
          )}
        </header>

        {/* Conteúdo */}
        <div className="prose prose-lg max-w-none">
          <PortableText value={trabalho.body} />
        </div>

        {/* Informações Adicionais */}
        <footer className="mt-12 pt-8 border-t">
          {trabalho.sitios && trabalho.sitios.length > 0 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Sítios Relacionados</h2>
              <div className="flex flex-wrap gap-2">
                {trabalho.sitios.map((sitio: any) => (
                  <Link
                    key={sitio.slug.current}
                    href={`/sitio/${sitio.slug.current}`}
                    className="bg-secondary hover:bg-secondary/80 px-3 py-1 rounded-full text-sm no-underline"
                  >
                    {sitio.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {trabalho.categories && trabalho.categories.length > 0 && (
            <div>
              <h2 className="text-lg font-semibold mb-2">Categorias</h2>
              <div className="flex flex-wrap gap-2">
                {trabalho.categories.map((category: any) => (
                  <span
                    key={category.title}
                    className="bg-secondary px-3 py-1 rounded-full text-sm"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            </div>
          )}
        </footer>
      </div>
    </article>
  );
} 