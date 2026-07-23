import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { skills as fallbackSkills } from "@/lib/site-data";
import { getSkills } from "@/lib/api";

export const Route = createFileRoute("/skills")({
  loader: async () => {
    try {
      const data = await getSkills();
      return Array.isArray(data) ? data : [];
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  head: () => ({ 
    meta: [
      { title: "Skills — Triyambakam" }, 
      { name: "description", content: "Skills of Triyambakam across environmental leadership, advocacy and service." }, 
      { property: "og:url", content: "/skills" }
    ], 
    links: [{ rel: "canonical", href: "/skills" }] 
  }),
  component: Skills,
});

import { useLang } from "@/lib/i18n";

function Skills() {
  const { t } = useLang();
  const dbSkills = Route.useLoaderData();
  const list = dbSkills && dbSkills.length > 0 ? dbSkills : fallbackSkills;

  return (
    <PageShell>
      <PageHero 
        eyebrow={t("nav.skills")} 
        title={t("about.skillsTitle")} 
        subtitle="Dedicated to spreading climate action awareness, youth empowerment, and environmental preservation." 
      />
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <div className="grid gap-6 md:grid-cols-2">
          {list.map((s: any, i: number) => {
            const val = s.value || s.proficiency || 85;
            return (
              <div 
                key={s._id || s.name || i} 
                className="group relative overflow-hidden rounded-2xl glass-card p-6 border border-gold/30 hover-lift transition-all"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 border border-gold/30 text-gold text-xs font-bold font-display">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-semibold text-lg text-gold tracking-wide">{s.name}</h3>
                      {s.category && (
                        <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-0.5">{s.category}</div>
                      )}
                    </div>
                  </div>
                  <span className="rounded-full bg-gold/10 border border-gold/30 px-3.5 py-1 font-display text-sm font-bold text-gold">
                    {val}%
                  </span>
                </div>

                <div className="mt-5 h-3 w-full overflow-hidden rounded-full bg-black/10 border border-gold/20 p-0.5">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-primary via-gold to-gold-hover shadow-[0_0_10px_rgba(74,101,78,0.3)] transition-all duration-1000" 
                    style={{ width: `${val}%` }} 
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
