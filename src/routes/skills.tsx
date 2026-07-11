import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { skills } from "@/lib/site-data";

export const Route = createFileRoute("/skills")({
  head: () => ({ meta: [{ title: "Skills — Om" }, { name: "description", content: "Skills of Om across scholarship, leadership and service." }, { property: "og:url", content: "/skills" }], links: [{ rel: "canonical", href: "/skills" }] }),
  component: Skills,
});

function Skills() {
  return (
    <PageShell>
      <PageHero eyebrow="Skills" title="Craft & Capability" />
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <div className="grid gap-8 md:grid-cols-2">
          {skills.map((s) => (
            <div key={s.name} className="rounded-2xl luxury-card p-6">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg text-cream">{s.name}</span>
                <span className="text-sm text-[color:var(--gold)]">{s.value}%</span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-[color:var(--background)]">
                <div className="h-full rounded-full shimmer" style={{ width: `${s.value}%`, background: "var(--gradient-gold-soft)" }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
