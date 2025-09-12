import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/header";
import Image from "next/image";

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="[--color-primary:var(--color-indigo-500)]">
        <section className="overflow-hidden">
          <div className="py-20 md:py-36">
            <div className="relative z-10 mx-auto max-w-5xl px-6">
              <div className="relative text-center">
                <h1 className="mx-auto max-w-2xl text-balance text-4xl font-bold md:text-5xl">
                  Construa seu MicroSaaS com agilidade e qualidade
                </h1>

                <p className="text-muted-foreground mx-auto my-6 max-w-2xl text-balance text-xl">
                  Nextheus é o boilerplate ideal para criar, lançar e escalar
                  aplicações SaaS modernas com suporte a IA, autenticação e
                  muito mais.
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

              {/* <div className="mt-8">
                <p className="text-muted-foreground text-center">
                  Trusted by teams at :
                </p>
                <div className="mt-4 flex items-center justify-center gap-12">
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit"
                      src="https://html.tailus.io/blocks/customers/nvidia.svg"
                      alt="Nvidia Logo"
                      height="20"
                      width="auto"
                    />
                  </div>

                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit"
                      src="https://html.tailus.io/blocks/customers/column.svg"
                      alt="Column Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-4 w-fit"
                      src="https://html.tailus.io/blocks/customers/github.svg"
                      alt="GitHub Logo"
                      height="16"
                      width="auto"
                    />
                  </div>
                  <div className="flex">
                    <img
                      className="mx-auto h-5 w-fit"
                      src="https://html.tailus.io/blocks/customers/nike.svg"
                      alt="Nike Logo"
                      height="20"
                      width="auto"
                    />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
