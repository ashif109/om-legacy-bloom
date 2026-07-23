import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { getSiteData } from "@/lib/api";
import * as fallbackData from "@/lib/site-data";
import { Award, Calendar, Sparkles, ChevronRight, Newspaper, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/timeline")({
  loader: async () => {
    try {
      const siteData = await getSiteData().catch(() => null);
      return { siteData };
    } catch {
      return { siteData: null };
    }
  },
  head: () => ({
    meta: [
      { title: "Chronology of Seva & Milestones — Om Tyagi" },
      { name: "description", content: "A year-by-year timeline of Om's milestones, awards, and environmental service." },
      { property: "og:url", content: "/timeline" }
    ],
    links: [{ rel: "canonical", href: "/timeline" }]
  }),
  component: Timeline,
});

function Timeline() {
  const loaderData = Route.useLoaderData();
  const journey = loaderData?.siteData?.journey?.some((j: any) => j.featured)
    ? loaderData.siteData.journey
    : fallbackData.journey;

  const [activeModalMedia, setActiveModalMedia] = useState<{ src: string; title: string; caption: string } | null>(null);

  return (
    <PageShell>
      <PageHero
        eyebrow="Timeline"
        title="Chronology of Seva"
        subtitle="A detailed year-by-year account of tree plantation drives, official recognitions, and community engagement."
      />
      <section className="mx-auto max-w-4xl px-6 pb-24">
        <div className="relative border-l border-gold/40 pl-8 md:pl-10 space-y-12">
          {journey.map((j) => (
            <div key={j.year + j.title} className="relative group">
              {/* Timeline Center Bullet */}
              <span className={`absolute -left-8 md:-left-10 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-gold bg-background transition-transform group-hover:scale-125 ${
                j.featured ? "bg-gold shadow-[0_0_12px_rgba(196,169,98,0.8)]" : ""
              }`} />

              <div className={`rounded-[24px] p-6 md:p-8 backdrop-blur-md border transition-all ${
                j.featured
                  ? "border-gold bg-gradient-to-br from-gold/15 via-card/90 to-card/70 shadow-[0_0_30px_rgba(196,169,98,0.15)]"
                  : "border-gold/30 bg-card/60 hover:border-gold/60"
              }`}>
                {/* Year & Badge header */}
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 border border-gold/30 px-3 py-1 text-xs font-bold text-gold uppercase tracking-wider">
                    <Calendar size={12} /> {j.year}
                  </span>
                  {j.age && (
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-semibold text-muted-foreground border border-border">
                      {j.age}
                    </span>
                  )}
                  {j.featured && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gold text-background px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest">
                      <Sparkles size={12} /> Featured Honor
                    </span>
                  )}
                </div>

                <h3 className="font-display text-2xl font-bold text-foreground mt-2 group-hover:text-gold transition-colors">
                  {j.title}
                </h3>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  {j.body}
                </p>

                {j.awarder && (
                  <div className="mt-3 inline-flex items-center gap-1.5 text-xs text-gold font-medium bg-gold/10 border border-gold/20 px-3 py-1.5 rounded-xl">
                    <Award size={14} /> Presented by {j.awarder}
                  </div>
                )}

                {/* 📰 VISUAL NEWSPAPER CLIPPINGS GRID INSIDE CARD */}
                {j.images && j.images.length > 0 && (
                  <div className="mt-5 pt-4 border-t border-gold/20 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1.5">
                        <Newspaper size={14} /> Newspaper Clippings & Certificates ({j.images.length} Photos)
                      </span>
                      <span className="text-[10px] text-muted-foreground">Tap to view</span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {j.images.map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveModalMedia(img)}
                          className="group/thumb relative cursor-pointer overflow-hidden rounded-xl border border-gold/30 bg-slate-950 aspect-[4/3] shadow-sm hover:border-gold hover:shadow-md transition-all"
                        >
                          <img
                            src={img.src}
                            alt={img.title}
                            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
                          <div className="absolute top-1.5 right-1.5 rounded-full bg-slate-900/90 border border-gold/30 p-1 text-gold">
                            <ZoomIn size={12} />
                          </div>
                          <div className="absolute bottom-1.5 left-2 right-2">
                            <p className="text-[10px] font-semibold text-white truncate">{img.title}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {j.highlights && j.highlights.length > 0 && (
                  <div className="mt-4 pt-3 border-t border-gold/20 flex flex-wrap gap-2">
                    {j.highlights.map((hl, idx) => (
                      <span key={idx} className="text-[11px] text-foreground/80 bg-background/50 border border-gold/20 px-2.5 py-1 rounded-lg">
                        • {hl}
                      </span>
                    ))}
                  </div>
                )}

                {j.images && j.images.length > 0 && (
                  <div className="mt-4 pt-2">
                    <Link to="/journey" className="inline-flex items-center gap-1.5 text-xs text-gold font-semibold hover:underline">
                      Explore Full Journey Gallery <ChevronRight size={14} />
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔍 LIGHTBOX MODAL */}
      <AnimatePresence>
        {activeModalMedia && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveModalMedia(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 md:p-8 backdrop-blur-2xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] rounded-3xl border border-gold/50 bg-card p-6 md:p-8 shadow-2xl overflow-y-auto custom-scrollbar flex flex-col justify-between"
            >
              <button
                onClick={() => setActiveModalMedia(null)}
                className="absolute top-4 right-4 z-30 rounded-full bg-background/90 p-2.5 text-foreground hover:bg-gold hover:text-background transition-all border border-gold/30 shadow-lg"
              >
                <X size={20} />
              </button>

              <div className="space-y-4 my-auto">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold bg-gold/10 border border-gold/30 px-3.5 py-1.5 rounded-full">
                  <Newspaper size={14} /> Press Clipping & Document Viewer
                </div>

                <div className="w-full overflow-hidden rounded-2xl bg-black/80 border border-gold/30 flex items-center justify-center p-2 min-h-[400px]">
                  <img
                    src={activeModalMedia.src}
                    alt={activeModalMedia.title}
                    className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl shadow-xl"
                  />
                </div>

                <div className="space-y-2 bg-background/60 border border-gold/20 p-4 rounded-2xl">
                  <h4 className="font-display text-xl md:text-2xl font-bold text-foreground">{activeModalMedia.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{activeModalMedia.caption}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
