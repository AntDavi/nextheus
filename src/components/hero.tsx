import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="overflow-hidden">
      <div className="py-20 md:py-36">
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <div className="relative text-center">
            <h1 className="mx-auto max-w-2xl text-balance text-4xl font-bold md:text-5xl">
              Construa seu MicroSaaS com agilidade e qualidade
            </h1>

            <p className="text-muted-foreground mx-auto my-6 max-w-2xl text-balance text-xl">
              Nextheus é o boilerplate ideal para criar, lançar e escalar
              aplicações SaaS modernas com suporte a IA, autenticação e muito
              mais.
            </p>

            <div className="flex flex-col items-center justify-center gap-3 *:w-full sm:flex-row sm:*:w-auto">
              <Button asChild size="lg">
                <Link href="#link">
                  <span className="text-nowrap">Comece Agora</span>
                </Link>
              </Button>
              <Button key={2} asChild size="lg" variant="outline">
                <Link href="#link">
                  <span className="text-nowrap">Ver Demonstração</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto mt-12 max-w-5xl overflow-hidden rounded-3xl bg-black/10 md:mt-20">
            <Image
              src="/forest.jpg"
              alt="background"
              className="absolute inset-0 size-full object-cover"
              width="2942"
              height="1651"
            />

            <div className="bg-background rounded-(--radius) relative m-4 overflow-hidden border border-transparent shadow-xl shadow-black/15 ring-1 ring-black/10 sm:m-8 md:m-12">
              <Image
                src="/home.png"
                alt="app screen"
                width="2880"
                height="1842"
                className="object-top-left size-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
