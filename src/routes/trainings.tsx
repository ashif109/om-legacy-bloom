import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { trainings } from "@/lib/site-data";

export const Route = createFileRoute("/trainings")({
  head: () => ({ meta: [{ title: "Trainings — Om" }, { name: "description", content: "Trainings undertaken by Om." }, { property: "og:url", content: "/trainings" }], links: [{ rel: "canonical", href: "/trainings" }] }),
  component: Trainings,
});

function Trainings() {
  return (
    <PageShell>
      <PageHero eyebrow="Trainings" title="Sharpening the Blade" />
      <section className="mx-auto max-w-5xl px-6 pb-32 space-y-4">
        {trainings.map((t) => (
          <div key={t.title} className="grid gap-4 rounded-2xl luxury-card p-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{t.year} · {t.duration}</div>
              <div className="mt-1 font-display text-xl text-cream">{t.title}</div>
              <div className="text-sm text-[color:var(--muted-foreground)]">{t.org}</div>
            </div>
            <button className="rounded-full btn-ghost-gold px-5 py-2 text-xs font-semibold uppercase tracking-widest hover:bg-[color:var(--gold)]/10">Certificate</button>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
