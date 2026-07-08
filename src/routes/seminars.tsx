import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { seminars } from "@/lib/site-data";

export const Route = createFileRoute("/seminars")({
  head: () => ({ meta: [{ title: "Seminars — Om" }, { name: "description", content: "Seminars where Om has contributed." }, { property: "og:url", content: "/seminars" }], links: [{ rel: "canonical", href: "/seminars" }] }),
  component: Seminars,
});

function Seminars() {
  return (
    <PageShell>
      <PageHero eyebrow="Seminars" title="Ideas that Ignite" />
      <section className="mx-auto max-w-5xl px-6 pb-32 grid gap-5 md:grid-cols-2">
        {seminars.map((s) => (
          <div key={s.title} className="rounded-2xl luxury-card p-8">
            <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{s.year} · {s.role}</div>
            <div className="mt-2 font-display text-xl text-cream">{s.title}</div>
            <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">A rigorous exchange of ideas connecting classical thought with contemporary questions.</p>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
