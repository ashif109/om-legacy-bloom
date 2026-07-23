import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { achievements } from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { Award, Calendar, MapPin, Sparkles, X, ZoomIn, Newspaper, CheckCircle2, Share2, Eye, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Route = createFileRoute("/awards")({
  head: () => ({
    meta: [
      { title: "Awards & Recognitions — Om Tyagi" },
      { name: "description", content: "Distinguished environmental protection awards and official appreciation certificates received by Om Tyagi." },
      { property: "og:url", content: "/awards" }
    ],
    links: [{ rel: "canonical", href: "/awards" }]
  }),
  component: AwardsPage,
});

function AwardsPage() {
  const { t } = useLang();
  const [activeModalMedia, setActiveModalMedia] = useState<{ src: string; title: string; caption: string } | null>(null);
  const [copied, setCopied] = useState(false);

  const featuredAward = achievements.find((a) => a.featured) || achievements[0];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <PageShell>
      <PageHero
        eyebrow={t("awards.eyebrow")}
        title={t("awards.title")}
        subtitle={t("awards.subtitle")}
      />

      <section className="mx-auto max-w-6xl px-6 pb-32 space-y-16">

        {/* 🌟 FEATURED SPOTLIGHT AWARD CARD: SDM SANGEETA RAGHAV (AGE 9) */}
        {featuredAward && (
          <div className="relative overflow-hidden rounded-[36px] border border-gold/40 bg-gradient-to-br from-card/95 via-background to-card/80 p-6 md:p-10 shadow-[0_0_50px_rgba(196,169,98,0.15)] backdrop-blur-xl">
            {/* Glow orb */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />

            <div className="grid gap-10 lg:grid-cols-12 items-center">

              {/* Certificate Image Frame */}
              <div className="lg:col-span-5 space-y-3">
                <div
                  onClick={() => setActiveModalMedia(featuredAward.images ? featuredAward.images[0] : { src: featuredAward.image!, title: featuredAward.title, caption: featuredAward.description })}
                  className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gold/40 bg-slate-950 aspect-[4/3] shadow-xl hover:border-gold hover:shadow-[0_0_30px_rgba(196,169,98,0.3)] transition-all"
                >
                  <img
                    src={featuredAward.image}
                    alt={featuredAward.title}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
                  
                  <div className="absolute top-3 right-3 rounded-full bg-slate-900/90 border border-gold/40 p-2 text-gold opacity-90 group-hover:opacity-100 transition-opacity shadow-lg">
                    <ZoomIn size={16} />
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <span className="rounded-md bg-gold px-2.5 py-0.5 text-[10px] font-bold text-background uppercase tracking-widest">
                      📜 Official Certificate
                    </span>
                    <p className="mt-1 text-xs font-bold text-white leading-tight truncate">
                      Tap to view full resolution certificate
                    </p>
                  </div>
                </div>

                {/* Newspaper Clippings Thumbnails Bar */}
                {featuredAward.images && (
                  <div className="grid grid-cols-5 gap-2 pt-1">
                    {featuredAward.images.slice(1, 6).map((img, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveModalMedia(img)}
                        className="group/thumb relative cursor-pointer overflow-hidden rounded-xl border border-gold/30 bg-slate-950 aspect-[4/3] shadow-sm hover:border-gold transition-all"
                      >
                        <img
                          src={img.src}
                          alt={img.title}
                          className="h-full w-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/10 transition-colors" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Award Details & Key Achievements */}
              <div className="lg:col-span-7 space-y-5 text-left">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-xs font-bold uppercase tracking-widest text-gold shadow-sm">
                    <Sparkles size={14} /> Landmark Milestone · Age 9
                  </span>
                  <span className="rounded-full bg-secondary border border-gold/20 px-3 py-1 text-xs font-medium text-foreground">
                    <Calendar size={12} className="inline mr-1 text-gold" /> {featuredAward.year} (World Environment Day)
                  </span>
                </div>

                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                    {featuredAward.title}
                  </h2>
                  <p className="text-sm font-semibold text-gold mt-1 font-devanagari">
                    {featuredAward.hindiTitle}
                  </p>
                </div>

                <div className="bg-background/60 border border-gold/20 p-4 rounded-2xl space-y-1.5 text-xs md:text-sm">
                  <div className="font-semibold text-foreground">
                    🏆 Awarded by: <span className="text-gold">{featuredAward.presenter || featuredAward.org}</span>
                  </div>
                  <div className="text-muted-foreground">
                    📍 Location: {featuredAward.location}
                  </div>
                </div>

                {/* Key Achievements List at Age 9 */}
                <div className="space-y-2 pt-1">
                  <h4 className="text-xs font-bold text-gold uppercase tracking-wider">
                    Key Achievements at Age 9:
                  </h4>
                  <div className="grid gap-2 text-xs md:text-sm text-foreground/90">
                    {featuredAward.achievementsAtAge9?.map((ach, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-gold/5 border border-gold/20 px-3 py-2 rounded-xl">
                        <span>{ach}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3 pt-3">
                  <button
                    onClick={() => setActiveModalMedia(featuredAward.images ? featuredAward.images[0] : { src: featuredAward.image!, title: featuredAward.title, caption: featuredAward.description })}
                    className="inline-flex items-center gap-2 rounded-full btn-gold px-6 py-2.5 text-xs font-semibold uppercase tracking-widest shadow-md"
                  >
                    <Eye size={15} /> View Certificate & Clippings
                  </button>

                  <button
                    onClick={handleShare}
                    className="inline-flex items-center gap-2 rounded-full btn-ghost-gold px-5 py-2.5 text-xs font-medium"
                  >
                    <Share2 size={15} /> {copied ? "Copied Link!" : "Share"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

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
                  <Newspaper size={14} /> Official Document & Press Viewer
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
