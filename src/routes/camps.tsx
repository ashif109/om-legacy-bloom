import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { camps } from "@/lib/site-data";
import gathering from "@/assets/imageom/Screenshot 2026-07-19 190546.png";

export const Route = createFileRoute("/camps")({
  head: () => ({ meta: [{ title: "Camps — Om" }, { name: "description", content: "Residential camps and shivirs." }, { property: "og:url", content: "/camps" }], links: [{ rel: "canonical", href: "/camps" }] }),
  component: Camps,
});

function Camps() {
  return (
    <PageShell>
      <PageHero eyebrow="Camps" title="Shivirs of Sanskar" />
      <section className="mx-auto max-w-7xl px-6 pb-32 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {camps.map((c) => (
          <div key={c.title} className="group overflow-hidden rounded-2xl gold-border">
            <div className="aspect-[4/5] overflow-hidden">
              <img src={gathering} alt="" className="h-full w-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-5">
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{c.year} · {c.place}</div>
              <div className="mt-1 font-display text-base text-cream">{c.title}</div>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
