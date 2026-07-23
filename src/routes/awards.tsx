import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import awardImg from "@/assets/award.jpg";
import { getAwards } from "@/lib/api";

export const Route = createFileRoute("/awards")({
  loader: async () => {
    try {
      return await getAwards();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  head: () => ({ meta: [{ title: "Awards — Om" }, { name: "description", content: "Distinguished awards received by Om." }, { property: "og:url", content: "/awards" }], links: [{ rel: "canonical", href: "/awards" }] }),
  component: Awards,
});

function Awards() {
  const dbAwards = Route.useLoaderData() || [];

  return (
    <PageShell>
      <PageHero eyebrow="Awards" title="Recognitions" />
      <section className="mx-auto max-w-6xl px-6 pb-32 space-y-10">
        {dbAwards.map((a, i) => (
          <div key={a._id || a.title || i} className={`grid gap-6 rounded-3xl gold-border overflow-hidden md:grid-cols-2 ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="aspect-[4/3] md:aspect-auto">
              {a.image ? (
                <img src={a.image} alt={a.title} className="h-full w-full object-cover object-[center_30%]" />
              ) : (
                <img src={awardImg} alt={a.title} className="h-full w-full object-cover object-[center_30%]" />
              )}
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <div className="text-xs uppercase tracking-widest text-[color:var(--gold)]">{a.year} · {(a.org || a.organization || "")}</div>
              <h3 className="mt-3 font-display text-3xl text-gold-gradient">{a.title}</h3>
              <p className="mt-4 text-[color:var(--muted-foreground)]">
                {a.description || "Presented in recognition of outstanding contribution to the propagation of environmental awareness, ecological values and youth leadership across the region."}
              </p>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
