import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { stats } from "@/lib/site-data";
import { getSocialWorks } from "@/lib/api";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/social-work")({
  loader: async () => {
    try {
      const data = await getSocialWorks();
      return data || [];
    } catch (e) {
      return [];
    }
  },
  head: () => ({ meta: [{ title: "Social Work — Om" }, { name: "description", content: "Campaigns and social work led by Om." }, { property: "og:url", content: "/social-work" }], links: [{ rel: "canonical", href: "/social-work" }] }),
  component: SocialWork,
});

function SocialWork() {
  const { t } = useLang();
  const dbSocialWorks = Route.useLoaderData() as any[];

  return (
    <PageShell>
      <PageHero eyebrow={t("social.eyebrow")} title={t("social.title")} />
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex flex-wrap justify-center gap-4">
          {stats.slice(0, 4).map((s) => (
            <div key={s.label} className="flex-1 min-w-[200px] max-w-[280px] rounded-2xl luxury-card p-6 text-center">
              <div className="font-display text-3xl text-gold-gradient">{s.value}</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-[color:var(--muted-foreground)]">{s.label}</div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="flex flex-wrap justify-center gap-6">

          {dbSocialWorks.map((s) => (
            <div key={s._id} className="flex-1 min-w-[300px] max-w-[400px] rounded-2xl luxury-card p-8 hover-lift hover:-translate-y-1 hover:border-[color:var(--gold)]/60">
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{s.date}</div>
              <div className="mt-2 font-display text-xl text-cream">{s.title}</div>
              <div className="mt-3 text-sm text-[color:var(--muted-foreground)]">Organization: <span className="text-[color:var(--cream)]">{s.organization}</span></div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
