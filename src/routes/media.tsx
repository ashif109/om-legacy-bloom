import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { media } from "@/lib/site-data";
import speechImg from "@/assets/imageom/Screenshot 2026-07-19 190246.png";
import awardImg from "@/assets/imageom/Screenshot 2026-07-19 190259.png";
import gatheringImg from "@/assets/imageom/Screenshot 2026-07-19 190314.png";
import { Play } from "lucide-react";


import { getMedia } from "@/lib/api";

const imgFor = (t: string) => (t === "News" || t === "Press" ? speechImg : t === "Interview" || t === "Podcast" ? awardImg : gatheringImg);

export const Route = createFileRoute("/media")({
  loader: async () => {
    try {
      return await getMedia();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  head: () => ({ meta: [{ title: "Media — Om" }, { name: "description", content: "Press, interviews, videos and articles featuring Om." }, { property: "og:url", content: "/media" }], links: [{ rel: "canonical", href: "/media" }] }),
  component: Media,
});

function Media() {
  const dbMedia = Route.useLoaderData() || [];

  return (
    <PageShell>
      <PageHero eyebrow="Media" title="In the Spotlight" />
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="flex flex-wrap justify-center gap-6">
          {dbMedia.map((m, i) => (
            <div key={m._id || m.title || i} className="group flex-1 min-w-[300px] max-w-md overflow-hidden rounded-2xl glass-card hover-lift hover:-translate-y-1 hover:border-gold/60">
              <div className="relative aspect-video overflow-hidden">
                {m.thumbnail ? (
                  <img src={m.thumbnail} alt={m.title} className="h-full w-full object-cover object-[center_50%] transition-transform duration-700 group-hover:scale-110" />
                ) : (
                  <img src={imgFor(m.type)} alt={m.title} className="h-full w-full object-cover object-[center_50%] transition-transform duration-700 group-hover:scale-110" />
                )}
                {m.url ? (
                  <a href={m.url} target="_blank" rel="noopener noreferrer" className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="grid h-14 w-14 place-items-center rounded-full border border-gold bg-background/60 text-gold"><Play size={20} /></div>
                  </a>
                ) : (
                  <div className="absolute inset-0 grid place-items-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <div className="grid h-14 w-14 place-items-center rounded-full border border-gold bg-background/60 text-gold"><Play size={20} /></div>
                  </div>
                )}
                <span className="absolute left-4 top-4 rounded-full border border-gold/50 bg-background/70 px-3 py-1 text-[10px] uppercase tracking-widest text-gold backdrop-blur-sm">{m.type}</span>
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="text-[10px] uppercase tracking-widest text-gold">{m.source} · {(m.year || m.date || "")}</div>
                <div className="mt-2 font-display text-lg text-foreground">
                  {m.url ? (
                    <a href={m.url} target="_blank" rel="noopener noreferrer" className="hover:text-gold hover:underline transition-colors">{m.title}</a>
                  ) : m.title}
                </div>
                {m.description && <div className="mt-2 text-xs text-[color:var(--muted-foreground)]">{m.description}</div>}
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
