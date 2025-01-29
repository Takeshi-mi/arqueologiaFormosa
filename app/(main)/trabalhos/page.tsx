import { Metadata } from "next";
import { client } from "@/sanity/lib/client";
import { TRABALHOS_ESCRITOS_QUERY } from "@/sanity/queries/trabalhos-escritos";
import { TrabalhosLista } from "@/components/trabalhos/trabalhos-lista";

// Revalidar a cada 24 horas (em segundos)
export const revalidate = 86400;

export const metadata: Metadata = {
  title: "Trabalhos Escritos",
  description: "Explore nossa coleção de trabalhos escritos sobre arqueologia",
};

async function getSitios() {
  return client.fetch(
    `*[_type == "sitio"] | order(title asc) {
      _id,
      title
    }`
  );
}

async function getTipos() {
  return client.fetch(
    `*[_type == "tipo-trabalho"] | order(title asc) {
      _id,
      title
    }`
  );
}

async function getTrabalhos() {
  return client.fetch(TRABALHOS_ESCRITOS_QUERY);
}

export default async function TrabalhosPage() {
  const [sitios, tipos, trabalhos] = await Promise.all([
    getSitios(),
    getTipos(),
    getTrabalhos(),
  ]);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Trabalhos Escritos</h1>
      <TrabalhosLista
        initialTrabalhos={trabalhos}
        sitios={sitios}
        tipos={tipos}
      />
    </div>
  );
} 