import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { skills } from "@/lib/site-data";
import { getSkills } from "@/lib/api";

export const Route = createFileRoute("/skills")({
  loader: async () => {
    try {
      return await getSkills();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  head: () => ({ meta: [{ title: "Skills — Om" }, { name: "description", content: "Skills of Om across scholarship, leadership and service." }, { property: "og:url", content: "/skills" }], links: [{ rel: "canonical", href: "/skills" }] }),
  component: Skills,
});

function Skills() {
  const dbSkills = Route.useLoaderData() || [];

  return (
    <PageShell>
      <PageHero eyebrow="Skills" title="Craft & Capability" />
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <div className="grid gap-8 md:grid-cols-2">
          {dbSkills.map((s, i) => (
            <div key={s._id || s.name || i} className="rounded-2xl border border-white/5 bg-[#183B2D]/80 p-6 shadow-sm transition-all hover:bg-[#183B2D]">
              <div className="flex items-center justify-between">
                <span className="font-display text-lg tracking-wide text-foreground">{s.name}</span>
                <span className="text-sm font-medium tracking-wider text-gold">{s.value || s.proficiency || 0}%</span>
              </div>
              {s.category && <div className="text-xs text-muted-foreground mt-1 uppercase tracking-widest">{s.category}</div>}
              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-black/20">
                <div className="h-full rounded-full bg-[#0B2418] transition-all duration-1000" style={{ width: `${(s.value || s.proficiency || 0)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
