import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/logo";

interface FooterProps {
  className?: string;
}

const Footer: NextPage<FooterProps> = ({ className = "" }) => {
  return (
    <div className={`w-full bg-[rgba(17,24,39,1)] text-white p-10 ${className}`}>
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-12">
        <div className="flex flex-col gap-6">
          <Logo />
          <p className="text-base">
            Preservando e compartilhando o patrimônio arqueológico de Goiás.
          </p>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold">Links Rápidos</h3>
          <nav className="flex flex-col gap-2">
            <Link href="/" className="hover:underline">
              Início
            </Link>
            <Link href="/sitios-arqueologicos" className="hover:underline">
              Sítios
            </Link>
            <Link href="/trabalhos-escritos" className="hover:underline">
              Trabalhos escritos
            </Link>
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <Link href="/contato" className="hover:underline">
              Contate-nos
            </Link>
          </nav>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold">Contato</h3>
          <p>arqueologiaformosa@gmail.com</p>
          <p>(61) 98164-2468</p>
          <p>Formosa, GO</p>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold">Redes Sociais</h3>
          <div className="flex gap-4">
            <Image
              className="h-5 w-5"
              loading="lazy"
              width={20}
              height={20}
              alt="Facebook"
              src="/frame-3.svg"
            />
            <Image
              className="h-5 w-5"
              loading="lazy"
              width={20}
              height={20}
              alt="Twitter"
              src="/frame-4.svg"
            />
            <Image
              className="h-5 w-5"
              loading="lazy"
              width={20}
              height={20}
              alt="Instagram"
              src="/frame-5.svg"
            />
          </div>
        </div>
      </section>
      <hr className="border-gray-700 my-6" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm">
        <p className="text-center md:text-left w-full md:w-auto">
          © {new Date().getFullYear()} <Logo />. Todos os direitos reservados.
        </p>
        <p className="text-right w-full md:w-auto">
          Feito por <span className="font-agbalumo">Takeshi Miura</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;