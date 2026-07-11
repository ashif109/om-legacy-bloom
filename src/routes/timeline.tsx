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
      <section className="mx-auto max-w-4xl px-6 pb-32">
        <div className="relative border-l border-[color:var(--gold)]/30 pl-10">
          {journey.map((j) => (
            <div key={j.year} className="relative mb-10">
              <span className="absolute -left-[46px] top-2 grid h-9 w-9 place-items-center rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--background)] font-display text-xs text-[color:var(--gold)]">{j.year.slice(2)}</span>
              <div className="rounded-2xl luxury-card p-6">
                <div className="text-xs uppercase tracking-widest text-[color:var(--gold)]">{j.year}</div>
                <div className="mt-1 font-display text-2xl text-cream">{j.title}</div>
                <p className="mt-2 text-[color:var(--muted-foreground)]">{j.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
