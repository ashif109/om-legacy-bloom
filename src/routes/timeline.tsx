import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { journey } from "@/lib/site-data";

export const Route = createFileRoute("/timeline")({
  head: () => ({ meta: [{ title: "Timeline — Om" }, { name: "description", content: "A year-by-year timeline of Om's milestones and service." }, { property: "og:url", content: "/timeline" }], links: [{ rel: "canonical", href: "/timeline" }] }),
  component: Timeline,
});

function Timeline() {
  return (
    <PageShell>
      <PageHero eyebrow="Timeline" title="Chronology of Seva" />
      <section className="mx-auto max-w-4xl px-6 pb-6">
        <div className="relative border-l border-gold/30 pl-10">
          {journey.map((j) => (
            <div key={j.year} className="relative mb-10 last:mb-0">
              <span className="absolute -left-10 top-[26px] h-3 w-3 -translate-x-1/2 rounded-full border-2 border-gold bg-background" />
              <div className="rounded-[24px] glass-card p-6 border border-gold/30">
                <div className="text-xs uppercase tracking-widest text-gold">{j.year}</div>
                <div className="mt-1 font-display text-2xl text-foreground">{j.title}</div>
                <p className="mt-2 text-muted-foreground">{j.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
