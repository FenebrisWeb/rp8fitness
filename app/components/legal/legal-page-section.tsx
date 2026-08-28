import type { LegalPageContent } from "@/app/types/legal-page";

export default function LegalPageSection({ content }: { content: LegalPageContent }) {
  const { title, updated, intro, sections } = content;

  return (
    <section className="relative overflow-hidden bg-transparent pb-16 pt-10 sm:pb-20 sm:pt-14">
      <div className="mx-auto w-full max-w-[1000px] px-6 sm:px-10">
        <h1 className="font-display text-3xl font-black uppercase leading-tight tracking-tight text-foreground sm:text-4xl">
          {title}
        </h1>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.1em] text-foreground">
          Last Updated: {updated}
        </p>
        <span aria-hidden className="mt-4 block h-1 w-16 rounded-full bg-accent-strong" />

        <div className="mt-8 rounded-2xl border border-chalk/10 bg-ink p-6 sm:mt-10 sm:rounded-3xl sm:p-10">
          <p className="font-mono text-sm leading-relaxed text-chalk">{intro}</p>

          <div className="mt-8 flex flex-col gap-8">
            {sections.map((section, i) => (
              <div key={section.heading}>
                <h2 className="font-display text-lg font-black uppercase tracking-tight text-chalk">
                  {i + 1}. {section.heading}
                </h2>
                <div className="mt-3 flex flex-col gap-3">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph} className="font-mono text-sm leading-relaxed text-chalk">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list && (
                  <ul className="mt-3 flex flex-col gap-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-2 font-mono text-sm leading-relaxed text-chalk">
                        <span aria-hidden className="mt-2 h-1 w-1 flex-none rounded-full bg-accent-vivid" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
