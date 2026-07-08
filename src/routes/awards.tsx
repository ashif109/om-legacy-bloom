import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { achievements } from "@/lib/site-data";
import awardImg from "@/assets/award.jpg";

export const Route = createFileRoute("/awards")({
  head: () => ({ meta: [{ title: "Awards — Om" }, { name: "description", content: "Distinguished awards received by Om." }, { property: "og:url", content: "/awards" }], links: [{ rel: "canonical", href: "/awards" }] }),
  component: Awards,
});

function Awards() {
  return (
    <PageShell>
      <PageHero eyebrow="Awards" title="Recognitions" sanskrit="यशसा वर्धते धर्मः" />
      <section className="mx-auto max-w-6xl px-6 pb-32 space-y-10">
        {achievements.map((a, i) => (
          <div key={a.title} className={`grid gap-6 rounded-3xl gold-border overflow-hidden md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="aspect-[4/3] md:aspect-auto">
              <img src={awardImg} alt="" className="h-full w-full object-cover" />
            </div>
            <div className="p-8 md:p-10">
              <div className="text-xs uppercase tracking-widest text-[color:var(--gold)]">{a.year} · {a.org}</div>
              <h3 className="mt-3 font-display text-3xl text-gold-gradient">{a.title}</h3>
              <p className="mt-4 text-[color:var(--muted-foreground)]">
                Presented in recognition of outstanding contribution to the propagation of dharma, cultural values and youth leadership across the region.
              </p>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
