import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { events } from "@/lib/site-data";
import speech from "@/assets/imageom/Screenshot 2026-07-19 190532.png";
import { getEvents } from "@/lib/api";

export const Route = createFileRoute("/events")({
  loader: async () => {
    try {
      return await getEvents();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  head: () => ({ meta: [{ title: "Events — Om" }, { name: "description", content: "Events where Om has spoken and organised." }, { property: "og:url", content: "/events" }], links: [{ rel: "canonical", href: "/events" }] }),
  component: Events,
});

function Events() {
  const dbEvents = Route.useLoaderData() || [];

  return (
    <PageShell>
      <PageHero eyebrow="Events" title="On the Stage of Bhārat" />
      <section className="mx-auto max-w-6xl px-6 pb-32 space-y-6">
          {dbEvents.map((e, i) => (
          <div key={e._id || e.title || i} className={`grid gap-6 rounded-3xl gold-border overflow-hidden md:grid-cols-[1fr_1.4fr] ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            {e.banner ? (
              <img src={e.banner} alt={e.title} className="h-full w-full object-cover object-[center_30%]" />
            ) : (
              <img src={speech} alt={e.title} className="h-full w-full object-cover object-[center_30%]" />
            )}
            <div className="p-8">
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{(e.year || e.date)} · {(e.venue || "")}</div>
              <div className="mt-2 font-display text-2xl text-gold-gradient">{e.title}</div>
              {(e.role || e.status) && <div className="mt-1 text-sm text-[color:var(--muted-foreground)]">{(e.role ? `Role · ${e.role}` : `Status · ${e.status}`)}</div>}
              <p className="mt-4 text-sm text-[color:var(--cream)]">{e.description || "A memorable gathering that brought together environmentalists, youth, and leaders in celebration of sustainability and ecological preservation."}</p>
              {e.registrationLink && (
                <a href={e.registrationLink} target="_blank" rel="noopener noreferrer" className="mt-4 inline-block text-[color:var(--gold)] hover:underline text-sm font-semibold uppercase tracking-widest">Register / Details &rarr;</a>
              )}
            </div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
