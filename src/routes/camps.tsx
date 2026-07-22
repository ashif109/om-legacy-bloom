import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { camps } from "@/lib/site-data";
import gathering from "@/assets/imageom/Screenshot 2026-07-19 190546.png";
import { getCamps } from "@/lib/api";

export const Route = createFileRoute("/camps")({
  loader: async () => {
    try {
      return await getCamps();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  head: () => ({ meta: [{ title: "Camps — Om" }, { name: "description", content: "Residential camps and shivirs." }, { property: "og:url", content: "/camps" }], links: [{ rel: "canonical", href: "/camps" }] }),
  component: Camps,
});

function Camps() {
  const dbCamps = Route.useLoaderData() || [];

  return (
    <PageShell>
      <PageHero eyebrow="Camps" title="Shivirs of Sanskar" />
      <section className="mx-auto max-w-7xl px-6 pb-32 flex flex-wrap justify-center gap-6">
        {dbCamps.map((c, idx) => (
          <div key={c._id || c.title || idx} className="group overflow-hidden rounded-2xl gold-border flex-1 min-w-[250px] max-w-[300px]">
            <div className="aspect-[4/5] overflow-hidden bg-black/50">
              {c.gallery && c.gallery[0] ? (
                <img src={c.gallery[0]} alt={c.title || c.name} className="h-full w-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-110" />
              ) : (
                <img src={gathering} alt={c.title || c.name} className="h-full w-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-110" />
              )}
            </div>
            <div className="p-5">
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{(c.year || c.dates)} · {(c.place || c.location)}</div>
              <div className="mt-1 font-display text-base text-cream">{c.title || c.name}</div>
              {c.organizer && <div className="mt-2 text-xs text-[color:var(--muted-foreground)]">{c.organizer}</div>}
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
