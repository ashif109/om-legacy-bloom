import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { media } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import speechImg from "@/assets/imageom/Screenshot 2026-07-19 190246.png";
import awardImg from "@/assets/imageom/Screenshot 2026-07-19 190259.png";
import gatheringImg from "@/assets/imageom/Screenshot 2026-07-19 190314.png";
import { Play } from "lucide-react";
import { getMedia } from "@/lib/api";

const imgFor = (t: string) => (t === "News" || t === "Press" ? speechImg : t === "Interview" || t === "Podcast" ? awardImg : gatheringImg);

function formatYouTubeUrl(url?: string) {
  if (!url) return "https://www.youtube.com/watch?v=0foE_izpiBE";
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://www.youtube.com/watch?v=${match[1]}`;
  }
  return url;
}

function getYouTubeThumbnail(url?: string) {
  if (!url) return null;
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/);
  if (match && match[1]) {
    return `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg`;
  }
  return null;
}

export const Route = createFileRoute("/media")({
  loader: async () => {
    try {
      const data = await getMedia().catch(() => []);
      const combined = [...(data || []), ...media];
      const unique = combined.filter((m, index, self) =>
        index === self.findIndex((t) => (t.title && t.title === m.title) || (t.url && t.url === m.url))
      );
      return unique;
    } catch (e) {
      return media;
    }
  },
  head: () => ({ meta: [{ title: "Media — Om" }, { name: "description", content: "Press, interviews, videos and articles featuring Om." }, { property: "og:url", content: "/media" }], links: [{ rel: "canonical", href: "/media" }] }),
  component: Media,
});

function Media() {
  const { t } = useLang();
  const dbMedia = Route.useLoaderData() || [];

  return (
    <PageShell>
      <PageHero eyebrow={t("media.eyebrow")} title={t("media.title")} />
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dbMedia.map((m: any, i: number) => {
            const videoUrl = formatYouTubeUrl(m.url);
            const thumbnail = m.thumbnail || m.image || getYouTubeThumbnail(m.url) || imgFor(m.type);

            return (
              <a
                key={m._id || m.title || i}
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-[24px] glass-card hover-lift hover:border-gold/60 cursor-pointer transition-all border border-gold/30 shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/5">
                  <img src={thumbnail} alt={m.title} className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors" />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/60 bg-background/90 text-gold shadow-lg backdrop-blur-md transition-transform group-hover:scale-110">
                      <Play size={22} className="ml-0.5 fill-gold/30" />
                    </div>
                  </div>
                  <span className="absolute left-4 top-4 rounded-full border border-gold/50 bg-background/90 px-3.5 py-1 text-[10px] uppercase tracking-widest font-semibold text-gold shadow-xs backdrop-blur-md">{m.type}</span>
                </div>
                <div className="p-6 flex flex-1 flex-col items-center justify-between text-center">
                  <div>
                    <div className="text-[10px] uppercase tracking-widest font-medium text-gold">{m.source} · {(m.year || m.date || "")}</div>
                    <div className="mt-2 font-display text-lg text-foreground group-hover:text-gold transition-colors leading-snug">{m.title}</div>
                  </div>
                  {m.description && <div className="mt-2 text-xs text-muted-foreground">{m.description}</div>}
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
