import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { testimonials } from "@/lib/site-data";

export const Route = createFileRoute("/testimonials")({
  head: () => ({ meta: [{ title: "Testimonials — Om" }, { name: "description", content: "Voices of blessing and appreciation for Om." }, { property: "og:url", content: "/testimonials" }], links: [{ rel: "canonical", href: "/testimonials" }] }),
  component: T,
});

function T() {
  return (
    <PageShell>
      <PageHero eyebrow="Testimonials" title="Voices of Blessing" />
      <section className="mx-auto max-w-6xl px-6 pb-32 grid gap-6 md:grid-cols-2">
        {testimonials.map((t) => (
          <div key={t.name} className="glass-card rounded-3xl p-10">
            <div className="font-devanagari text-5xl text-[color:var(--gold)]">"</div>
            <p className="mt-2 font-serif-lux text-xl italic leading-relaxed text-cream">{t.quote}</p>
            <div className="mt-6 border-t border-[color:var(--gold)]/20 pt-4">
              <div className="font-display text-lg text-gold-gradient">{t.name}</div>
              <div className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">{t.role}</div>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
