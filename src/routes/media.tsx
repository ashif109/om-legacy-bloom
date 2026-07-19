import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { media } from "@/lib/site-data";
import speechImg from "@/assets/imageom/Screenshot 2026-07-19 190246.png";
import awardImg from "@/assets/imageom/Screenshot 2026-07-19 190259.png";
import gatheringImg from "@/assets/imageom/Screenshot 2026-07-19 190314.png";
import { Play } from "lucide-react";


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
        <div className="flex flex-wrap justify-center gap-6">
          {media.map((m) => (
            <div key={m.title} className="group flex-1 min-w-[300px] max-w-md overflow-hidden rounded-2xl luxury-card hover-lift hover:-translate-y-1 hover:border-[color:var(--gold)]/60">
              <div className="relative aspect-video overflow-hidden">
                <img src={imgFor(m.type)} alt="" className="h-full w-full object-cover object-[center_50%] transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <div className="grid h-14 w-14 place-items-center rounded-full border border-[color:var(--gold)] bg-[color:var(--background)]/60 text-[color:var(--gold)]"><Play size={20} /></div>
                </div>
                <span className="absolute left-4 top-4 rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--background)]/70 px-3 py-1 text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{m.type}</span>
              </div>
              <div className="p-6 flex flex-col items-center text-center">
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
