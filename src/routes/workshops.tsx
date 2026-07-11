import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { workshops } from "@/lib/site-data";
import gathering from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.14 PM (2).jpeg";

export const Route = createFileRoute("/workshops")({
  head: () => ({ meta: [{ title: "Workshops — Om" }, { name: "description", content: "Workshops conducted and attended by Om." }, { property: "og:url", content: "/workshops" }], links: [{ rel: "canonical", href: "/workshops" }] }),
  component: Workshops,
});

function Workshops() {
  return (
    <PageShell>
      <PageHero eyebrow="Workshops" title="Learning in Action" />
      <section className="mx-auto max-w-7xl px-6 pb-32 grid gap-6 md:grid-cols-2">
        {workshops.map((w) => (
          <div key={w.title} className="group overflow-hidden rounded-2xl gold-border">
            <div className="relative aspect-[16/9] overflow-hidden">
              <img src={gathering} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-6">
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{w.place} · {w.year}</div>
              <div className="mt-2 font-display text-xl text-cream">{w.title}</div>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
