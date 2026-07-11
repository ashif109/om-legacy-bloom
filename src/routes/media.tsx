import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { media } from "@/lib/site-data";
<<<<<<< HEAD
import speechImg from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.12 PM (1).jpeg";
import awardImg from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.11 PM (1).jpeg";
import gatheringImg from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.11 PM (1).jpeg";
import { Play } from "lucide-react";


=======
import speechImg from "@/assets/speech.jpg";
import awardImg from "@/assets/award.jpg";
import gatheringImg from "@/assets/gathering.jpg";
import { Play } from "lucide-react";

>>>>>>> origin/main
const imgFor = (t: string) => (t === "News" || t === "Press" ? speechImg : t === "Interview" || t === "Podcast" ? awardImg : gatheringImg);

export const Route = createFileRoute("/media")({
  head: () => ({ meta: [{ title: "Media — Om" }, { name: "description", content: "Press, interviews, videos and articles featuring Om." }, { property: "og:url", content: "/media" }], links: [{ rel: "canonical", href: "/media" }] }),
  component: Media,
});

function Media() {
  return (
    <PageShell>
      <PageHero eyebrow="Media" title="In the Spotlight" />
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {media.map((m) => (
            <div key={m.title} className="group overflow-hidden rounded-2xl luxury-card hover-lift hover:-translate-y-1 hover:border-[color:var(--gold)]/60">
              <div className="relative aspect-video overflow-hidden">
                <img src={imgFor(m.type)} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-[color:var(--gold)] bg-[color:var(--background)]/60 text-[color:var(--gold)]"><Play size={20} /></div>
                </div>
                <span className="absolute left-4 top-4 rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--background)]/70 px-3 py-1 text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{m.type}</span>
              </div>
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{m.source} · {m.year}</div>
                <div className="mt-2 font-display text-lg text-cream">{m.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
