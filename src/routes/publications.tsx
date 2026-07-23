import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { publications } from "@/lib/site-data";
import { BookOpen } from "lucide-react";
import { getPublications } from "@/lib/api";

import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/publications")({
  loader: async () => {
    try {
      return await getPublications();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  head: () => ({ meta: [{ title: "Publications — Om" }, { name: "description", content: "Books, articles and research by Om." }, { property: "og:url", content: "/publications" }], links: [{ rel: "canonical", href: "/publications" }] }),
  component: Pub,
});

function Pub() {
  const { t } = useLang();
  const dbPublications = Route.useLoaderData() || [];

  return (
    <PageShell>
      <PageHero eyebrow={t("publications.eyebrow")} title={t("publications.title")} />
      <section className="mx-auto max-w-5xl px-6 pb-32 flex flex-wrap justify-center gap-5">
        {dbPublications.map((p, i) => (
          <div key={p._id || p.title || i} className="flex gap-5 rounded-2xl glass-card p-6 hover-lift hover:-translate-y-1 hover:border-gold/60 flex-1 min-w-[300px] max-w-[480px]">
            <div className="grid h-16 w-14 shrink-0 place-items-center rounded-md bg-gradient-to-b from-gold/30 to-background/40 text-gold border border-gold/20 overflow-hidden">
              {p.cover ? (
                <img src={p.cover} alt="Cover" className="h-full w-full object-cover opacity-80" />
              ) : (
                <BookOpen size={22} />
              )}
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-gold">{p.type} {p.year ? `· ${p.year}` : ""}</div>
              <div className="mt-1 font-display text-lg text-foreground">
                {p.link ? (
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="hover:text-gold hover:underline transition-colors">{p.title}</a>
                ) : p.title}
              </div>
              {p.author && <div className="mt-1 text-xs text-muted-foreground uppercase tracking-widest">By {p.author}</div>}
              <p className="mt-2 text-sm text-muted-foreground">{p.abstract || "A meditation on the eternal path, written for the young seeker walking through modern life."}</p>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
