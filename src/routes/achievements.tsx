import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { achievements } from "@/lib/site-data";
import { Award, Download, Share2 } from "lucide-react";

export const Route = createFileRoute("/achievements")({
  head: () => ({ meta: [{ title: "Achievements — Om" }, { name: "description", content: "Awards, honors and milestones of Om." }, { property: "og:url", content: "/achievements" }], links: [{ rel: "canonical", href: "/achievements" }] }),
  component: Achievements,
});

function Achievements() {
  return (
    <PageShell>
      <PageHero eyebrow="Achievements" title="Honors of the Journey" sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन" />
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {achievements.map((a) => (
            <div key={a.title} className="group relative overflow-hidden rounded-2xl luxury-card p-6 text-center hover-lift hover:-translate-y-1 hover:border-[color:var(--gold)]/60">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "var(--gradient-radial-gold)" }} />
              <div className="relative">
                <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)]">
                  <Award size={22} />
                </div>
                <div className="mt-4 text-[11px] uppercase tracking-widest text-[color:var(--gold)]">{a.year}</div>
                <div className="mt-1 font-display text-lg text-cream">{a.title}</div>
                <div className="text-xs text-[color:var(--muted-foreground)]">{a.org}</div>
                <div className="mt-5 flex justify-center gap-2 text-xs">
                  <button className="inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)]/40 px-3 py-1 text-[color:var(--gold)] hover:bg-[color:var(--gold)]/10"><Download size={12}/> View</button>
                  <button className="inline-flex items-center gap-1 rounded-full border border-[color:var(--gold)]/40 px-3 py-1 text-[color:var(--gold)] hover:bg-[color:var(--gold)]/10"><Share2 size={12}/> Share</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
