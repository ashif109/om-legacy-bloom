import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { publications } from "@/lib/site-data";
import { BookOpen } from "lucide-react";

export const Route = createFileRoute("/publications")({
  head: () => ({ meta: [{ title: "Publications — Om" }, { name: "description", content: "Books, articles and research by Om." }, { property: "og:url", content: "/publications" }], links: [{ rel: "canonical", href: "/publications" }] }),
  component: Pub,
});

function Pub() {
  return (
    <PageShell>
      <PageHero eyebrow="Publications" title="Words that Endure" />
      <section className="mx-auto max-w-5xl px-6 pb-32 grid gap-5 md:grid-cols-2">
        {publications.map((p) => (
          <div key={p.title} className="flex gap-5 rounded-2xl luxury-card p-6 hover-lift hover:-translate-y-1 hover:border-[color:var(--gold)]/60">
            <div className="grid h-16 w-14 shrink-0 place-items-center rounded-md bg-gradient-to-b from-[color:var(--gold)]/30 to-[color:var(--deep-red)]/40 text-[color:var(--gold)]">
              <BookOpen size={22} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{p.type} · {p.year}</div>
              <div className="mt-1 font-display text-lg text-cream">{p.title}</div>
              <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">A meditation on the eternal path, written for the young seeker walking through modern life.</p>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
