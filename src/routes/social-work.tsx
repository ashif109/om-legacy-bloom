import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { socialWork, stats } from "@/lib/site-data";

export const Route = createFileRoute("/social-work")({
  head: () => ({ meta: [{ title: "Social Work — Om" }, { name: "description", content: "Campaigns and social work led by Om." }, { property: "og:url", content: "/social-work" }], links: [{ rel: "canonical", href: "/social-work" }] }),
  component: SocialWork,
});

function SocialWork() {
  return (
    <PageShell>
      <PageHero eyebrow="Social Work" title="Seva Above Self" sanskrit="परोपकाराय पुण्याय" />
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.slice(0, 4).map((s) => (
            <div key={s.label} className="rounded-2xl luxury-card p-6 text-center">
              <div className="font-display text-3xl text-gold-gradient">{s.value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-[color:var(--muted-foreground)]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {socialWork.map((s) => (
            <div key={s.title} className="rounded-2xl luxury-card p-8 hover-lift hover:-translate-y-1 hover:border-[color:var(--gold)]/60">
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{s.year}</div>
              <div className="mt-2 font-display text-xl text-cream">{s.title}</div>
              <div className="mt-3 text-sm text-[color:var(--muted-foreground)]">Impact: <span className="text-[color:var(--cream)]">{s.impact}</span></div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
