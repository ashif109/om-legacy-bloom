import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { achievements } from "@/lib/site-data";
import { Award, Download, Share2 } from "lucide-react";
import { getAwards } from "@/lib/api";

export const Route = createFileRoute("/achievements")({
  loader: async () => {
    try {
      return await getAwards();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  head: () => ({ meta: [{ title: "Achievements — Om" }, { name: "description", content: "Awards, honors and milestones of Om." }, { property: "og:url", content: "/achievements" }], links: [{ rel: "canonical", href: "/achievements" }] }),
  component: Achievements,
});

function Achievements() {
  const dbAwards = Route.useLoaderData() || [];

  return (
    <PageShell>
      <PageHero eyebrow="Achievements" title="Honors of the Journey" sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन" />
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="flex flex-wrap justify-center gap-6">
          {dbAwards.map((a, i) => (
            <div key={a._id || a.title || i} className="group relative flex-1 min-w-[280px] max-w-sm overflow-hidden rounded-2xl glass-card p-6 text-center hover-lift hover:-translate-y-1 hover:border-gold/60">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gold-gradient mix-blend-overlay" />
              <div className="relative">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 text-gold bg-background/50 overflow-hidden">
                  {a.image ? (
                    <img src={a.image} alt="award" className="h-full w-full object-cover" />
                  ) : (
                    <Award size={22} />
                  )}
                </div>
                <div className="mt-4 text-[11px] uppercase tracking-widest text-gold">{a.year}</div>
                <div className="mt-1 font-display text-lg text-foreground">{a.title}</div>
                <div className="text-xs text-muted-foreground">{a.org || a.description || ""}</div>
                <div className="mt-5 flex justify-center gap-2 text-xs">
                  <button className="inline-flex items-center gap-1 rounded-full border border-gold/40 px-3 py-1 text-gold hover:bg-gold/10 transition-colors"><Download size={12}/> View</button>
                  <button className="inline-flex items-center gap-1 rounded-full border border-gold/40 px-3 py-1 text-gold hover:bg-gold/10 transition-colors"><Share2 size={12}/> Share</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
