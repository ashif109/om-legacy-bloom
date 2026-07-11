import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { events } from "@/lib/site-data";
<<<<<<< HEAD
import speech from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.12 PM (1).jpeg";
=======
import speech from "@/assets/speech.jpg";
>>>>>>> origin/main

export const Route = createFileRoute("/events")({
  head: () => ({ meta: [{ title: "Events — Om" }, { name: "description", content: "Events where Om has spoken and organised." }, { property: "og:url", content: "/events" }], links: [{ rel: "canonical", href: "/events" }] }),
  component: Events,
});

function Events() {
  return (
    <PageShell>
      <PageHero eyebrow="Events" title="On the Stage of Bhārat" />
      <section className="mx-auto max-w-6xl px-6 pb-32 space-y-6">
        {events.map((e, i) => (
          <div key={e.title} className={`grid gap-6 rounded-3xl gold-border overflow-hidden md:grid-cols-[1fr_1.4fr] ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <img src={speech} alt="" className="h-full w-full object-cover" />
            <div className="p-8">
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{e.year} · {e.venue}</div>
              <div className="mt-2 font-display text-2xl text-gold-gradient">{e.title}</div>
              <div className="mt-1 text-sm text-[color:var(--muted-foreground)]">Role · {e.role}</div>
              <p className="mt-4 text-sm text-[color:var(--cream)]">A memorable gathering that brought together seekers, scholars and youth in celebration of dharma and cultural pride.</p>
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
