import Image from "next/image";

export default function TechSection() {
  return (
    <section>
      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="flex flex-wrap items-center gap-4">
          <p className="text-muted-foreground text-center">
            Construído com as melhores tecnologias:
          </p>
          <div className="flex items-center justify-center gap-8">
            <div className="flex">
              <Image
                className="mx-auto h-4 w-fit"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                alt="Next.js Logo"
                height="20"
                width="20"
              />
            </div>

            <div className="flex">
              <Image
                className="mx-auto h-3 w-fit"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                alt="TypeScript Logo"
                height="20"
                width="20"
              />
            </div>
            <div className="flex">
              <Image
                className="mx-auto h-3 w-fit"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg"
                alt="Tailwind CSS Logo"
                height="20"
                width="20"
              />
            </div>
            <div className="flex">
              <Image
                className="mx-auto h-4 w-fit"
                src="https://supabase.com/brand-assets/supabase-logo-icon.svg"
                alt="Supabase Logo"
                height="20"
                width="20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
