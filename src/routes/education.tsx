import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { education } from "@/lib/site-data";
import { GraduationCap } from "lucide-react";
import { getEducations } from "@/lib/api";

export const Route = createFileRoute("/education")({
  loader: async () => {
    try {
      return await getEducations();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  head: () => ({ meta: [{ title: "Education — Om" }, { name: "description", content: "Academic path, courses and certifications." }, { property: "og:url", content: "/education" }], links: [{ rel: "canonical", href: "/education" }] }),
  component: Education,
});

function Education() {
  const dbEducations = Route.useLoaderData() || [];

  return (
    <PageShell>
      <PageHero eyebrow="Education" title="Environmental & Academic Studies" sanskrit="सा विद्या या विमुक्तये" />
      <section className="mx-auto max-w-5xl px-6 pb-32">
        <div className="flex flex-wrap justify-center gap-6">
          {dbEducations.map((e, i) => (
            <div key={e._id || e.degree || i} className="flex-1 min-w-[300px] max-w-[480px] rounded-2xl luxury-card p-8 hover-lift hover:-translate-y-1 hover:border-[color:var(--gold)]/60">
              <div className="grid h-12 w-12 place-items-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)]">
                <GraduationCap size={20} />
              </div>
              <div className="mt-5 text-[11px] uppercase tracking-widest text-[color:var(--gold)]">{e.period || e.year}</div>
              <div className="mt-1 font-display text-xl text-cream">{e.degree}</div>
              <div className="text-sm text-[color:var(--muted-foreground)]">{e.org || e.institution}</div>
              {e.grade && <div className="mt-2 text-xs font-semibold text-gold">Grade: {e.grade}</div>}
            </div>
          ))}
        </div>
        <div className="mt-14 glass-card rounded-3xl p-10">
          <div className="text-xs uppercase tracking-widest text-[color:var(--gold)]">Ongoing Study</div>
          <p className="mt-3 text-lg text-[color:var(--cream)]">
            Independent research on environmental ethics, ecological restoration, and the role of sustainability in modern civic life — supported by weekly field studies and month-long eco-retreats.
          </p>
        </div>
      </section>
    </PageShell>
  );
}
