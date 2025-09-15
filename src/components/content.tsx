import { ArrowRight } from "lucide-react";

export default function ContentSection() {
  return (
    <section>
      <div className="py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="@container mx-auto max-w-2xl">
            <div>
              <h2 className="text-foreground text-4xl font-semibold">
                Acelere seu Desenvolvimento Next.js
              </h2>
              <p className="text-muted-foreground mb-12 mt-4 text-xl">
                O Nextheus oferece uma base robusta e componentes modernos para
                criar aplicações Next.js de alta qualidade. Desenvolvimento ágil
                com padrões de excelência.
              </p>
            </div>

            <div className="@sm:grid-cols-2 @2xl:grid-cols-3 my-12 grid gap-6">
              <div className="space-y-2">
                <span className="mb-4 block text-3xl">⚡</span>
                <h3 className="text-xl font-medium">Performance Otimizada</h3>
                <p className="text-muted-foreground">
                  Estrutura otimizada do Next.js com SSR, SSG e componentes
                  reutilizáveis para máxima performance.
                </p>
              </div>
              <div className="space-y-2">
                <span className="mb-4 block text-3xl">🔧</span>
                <h3 className="text-xl font-medium">Configuração Moderna</h3>
                <p className="text-muted-foreground">
                  TypeScript, Tailwind CSS, ESLint e ferramentas modernas
                  pré-configuradas para produtividade máxima.
                </p>
              </div>
              <div className="space-y-2">
                <span className="mb-4 block text-3xl">�</span>
                <h3 className="text-xl font-medium">Padrões de Qualidade</h3>
                <p className="text-muted-foreground">
                  Estrutura de projeto organizada com melhores práticas e
                  padrões de código para times de desenvolvimento.
                </p>
              </div>
            </div>

            <div className="border-t">
              <ul role="list" className="text-muted-foreground mt-8 space-y-2">
                {[
                  { value: "15+", label: "Componentes UI" },
                  { value: "70%", label: "Redução no Tempo de Setup" },
                  { value: "TypeScript", label: "Suporte Nativo" },
                  { value: "100%", label: "Open Source" },
                ].map((stat, index) => (
                  <li key={index} className="-ml-0.5 flex items-center gap-1.5">
                    <ArrowRight className="size-4 opacity-50" />
                    <span className="text-foreground font-medium">
                      {stat.value}
                    </span>{" "}
                    {stat.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
