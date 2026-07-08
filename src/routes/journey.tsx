import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { journey } from "@/lib/site-data";
import { motion } from "framer-motion";

export const Route = createFileRoute("/journey")({
  head: () => ({ meta: [{ title: "Journey — Om" }, { name: "description", content: "The complete journey of Om across years, milestones and roles." }, { property: "og:url", content: "/journey" }], links: [{ rel: "canonical", href: "/journey" }] }),
  component: Journey,
});

function Journey() {
  return (
    <PageShell>
      <PageHero eyebrow="Journey" title="A Path of Devotion" sanskrit="यत्र योगेश्वरः कृष्णो यत्र पार्थो धनुर्धरः" subtitle="Every year has added a chapter — of learning, of service, of surrender." />
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="relative">
          <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-[color:var(--gold)]/50 to-transparent" />
          <div className="space-y-16">
            {journey.map((j, i) => (
              <motion.div
                key={j.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className={`relative grid gap-6 md:grid-cols-2 md:items-center ${i % 2 ? "" : ""}`}
              >
                <div className={`${i % 2 ? "md:order-2 md:text-left md:pl-12" : "md:text-right md:pr-12"}`}>
                  <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">{j.year}</div>
                  <h3 className="mt-2 font-display text-3xl text-gold-gradient">{j.title}</h3>
                  <p className="mt-3 text-[color:var(--muted-foreground)]">{j.body}</p>
                </div>
                <div className={`${i % 2 ? "md:order-1 md:pr-12" : "md:pl-12"}`}>
                  <div className="glass-card rounded-2xl p-6 text-sm text-[color:var(--cream)]">
                    <div className="font-devanagari text-2xl text-[color:var(--gold)]">॥ {j.year} ॥</div>
                    <p className="mt-2">A year of growth, contribution and quiet transformation — carrying forward the flame lit by Guru and tradition.</p>
                  </div>
                </div>
                <span className="pointer-events-none absolute left-1/2 top-4 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-[color:var(--gold)] bg-[color:var(--background)] md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
