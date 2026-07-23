import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { getSiteData } from "@/lib/api";
import * as fallbackData from "@/lib/site-data";
import { useLang } from "@/lib/i18n";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, MapPin, Sparkles, X, ZoomIn, Newspaper, CheckCircle2, TreePine, Eye, FileText } from "lucide-react";

export const Route = createFileRoute("/journey")({
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
      { title: "Journey & Environmental Milestones — Om Tyagi" },
      { name: "description", content: "Explore Om Tyagi's environmental conservation journey, featuring the 2021 World Environment Day Award presented by SDM Sangeeta Raghav." },
      { property: "og:url", content: "/journey" }
    ],
    links: [{ rel: "canonical", href: "/journey" }]
  }),
  component: JourneyPage,
});

function JourneyPage() {
  const { t } = useLang();
  const loaderData = Route.useLoaderData();
  const journey = loaderData?.siteData?.journey?.some((j: any) => j.featured)
    ? loaderData.siteData.journey
    : fallbackData.journey;

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalMedia, setActiveModalMedia] = useState<{ src: string; title: string; caption: string; type?: string } | null>(null);

  const categories = ["All", "Awards & Honors", "Plantation Drives", "Media & Press"];

  const filteredJourney = selectedCategory === "All"
    ? journey
    : journey.filter((item) => item.category === selectedCategory);

  const featuredEvent = journey.find((j) => j.featured);

  return (
    <PageShell>
      <PageHero
        eyebrow={t("journey.eyebrow")}
        title={t("journey.title")}
        subtitle={t("journey.subtitle")}
      />

      <div className="mx-auto max-w-7xl px-6 pb-24 space-y-20">

        {/* 🌟 FEATURED SPOTLIGHT: SDM SANGEETA RAGHAV ENVIRONMENT AWARD (AGE 9) */}
        {featuredEvent && (
          <section className="relative overflow-hidden rounded-[36px] border border-gold/50 bg-gradient-to-br from-card/95 via-background to-card/80 p-6 md:p-10 shadow-[0_0_60px_rgba(196,169,98,0.2)] backdrop-blur-xl">
            {/* Glow Orbs */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-emerald-600/15 blur-3xl" />

            <div className="relative z-10 space-y-10">
              {/* Header & Badges */}
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-gold/20">
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-gold shadow-sm">
                    <Sparkles size={14} className="animate-pulse text-gold" />
                    Landmark Milestone · Age 9 · World Environment Day 2021
                  </div>

                  <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
                    World Environment Day Honor <br />
                    <span className="text-gold-gradient">by SDM Sangeeta Raghav</span>
                  </h2>

                  <p className="text-sm text-muted-foreground max-w-3xl leading-relaxed">
                    At age 9, Om Tyagi planted 21+ saplings in a single day, pledged a target of 10,000 trees, and was officially honoured by SDM Sangeeta Raghav (UPPCS Rank 2 / SDM Kheragarh, Agra) with an official Appreciation Certificate and press coverage in Dainik Jagran, Hindustan, and local newspapers.
                  </p>
                </div>

                {/* Quick Stats Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-3 shrink-0">
                  <div className="bg-background/80 border border-gold/30 p-3 rounded-2xl text-center min-w-[110px]">
                    <div className="font-display text-xl font-bold text-gold">Age 9</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-medium">Milestone</div>
                  </div>
                  <div className="bg-background/80 border border-gold/30 p-3 rounded-2xl text-center min-w-[110px]">
                    <div className="font-display text-xl font-bold text-gold">21+</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-medium">Trees / Day 1</div>
                  </div>
                  <div className="bg-background/80 border border-gold/30 p-3 rounded-2xl text-center min-w-[110px]">
                    <div className="font-display text-xl font-bold text-gold">10,000</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-medium">Tree Goal</div>
                  </div>
                  <div className="bg-background/80 border border-gold/30 p-3 rounded-2xl text-center min-w-[110px]">
                    <div className="font-display text-xl font-bold text-gold">46+</div>
                    <div className="text-[10px] text-muted-foreground uppercase font-medium">YouTube Videos</div>
                  </div>
                </div>
              </div>

              {/* 📰 VISUAL NEWSPAPER CLIPPINGS & CERTIFICATE GALLERY */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Newspaper className="text-gold" size={20} />
                    <h3 className="font-display text-lg md:text-xl font-bold text-foreground">
                      Newspaper Clippings & Official Certificate Gallery
                    </h3>
                  </div>
                  <span className="text-xs text-gold font-semibold uppercase tracking-wider bg-gold/10 border border-gold/30 px-3 py-1 rounded-full">
                    Click Any Clipping To Read Full View
                  </span>
                </div>

                {/* Grid displaying actual newspaper clipping cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {featuredEvent.images?.map((img, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{ y: -5, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveModalMedia(img)}
                      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-gold/40 bg-card/90 shadow-lg transition-all hover:border-gold hover:shadow-[0_0_25px_rgba(196,169,98,0.35)] flex flex-col"
                    >
                      {/* Image Thumbnail Container */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950">
                        <img
                          src={img.src}
                          alt={img.title}
                          className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        />
                        {/* Subtle bottom gradient only for readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                        
                        {/* Zoom Icon Badge */}
                        <div className="absolute top-2.5 right-2.5 rounded-full bg-slate-900/90 border border-gold/40 p-1.5 text-gold opacity-90 group-hover:opacity-100 transition-opacity shadow-md">
                          <ZoomIn size={15} />
                        </div>

                        {/* Title Badge */}
                        <div className="absolute bottom-2.5 left-2.5 right-2.5">
                          <span className="inline-block rounded-md bg-gold px-2 py-0.5 text-[9px] font-bold text-background uppercase tracking-widest mb-1 shadow-sm">
                            {idx === 0 ? "📷 Award Photo" : idx === 2 ? "📜 Certificate" : "🗞️ Newspaper Clipping"}
                          </span>
                          <p className="text-xs font-bold text-white leading-tight drop-shadow-md truncate">
                            {img.title}
                          </p>
                        </div>
                      </div>

                      {/* Content Caption below image */}
                      <div className="p-3.5 bg-card border-t border-gold/20 text-left flex-1 flex flex-col justify-between">
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                          {img.caption}
                        </p>
                        <div className="mt-2 text-[11px] font-semibold text-gold flex items-center gap-1 group-hover:underline">
                          <Eye size={13} /> Tap to expand newspaper clipping
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quotes Callout */}
                <div className="grid md:grid-cols-2 gap-4 pt-2">
                  <div className="rounded-2xl bg-gold/10 border border-gold/30 p-4 text-xs text-foreground/90 space-y-1">
                    <span className="font-bold text-gold flex items-center gap-1.5">
                      <Newspaper size={14} /> Dainik Jagran (Agra Dehat):
                    </span>
                    <p className="italic">"प्रकृति ने हमें बहुत दिया, हम भी अपना कर्तव्य निभाएं — 10 वर्षीय ओम त्यागी ने लगाए 21+ पौधे, एसडीएम खेरागढ़ संगीता राघव ने दिया प्रशस्ति पत्र।"</p>
                  </div>

                  <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4 text-xs text-foreground/90 space-y-1">
                    <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                      <TreePine size={14} /> Hindustan Samvad:
                    </span>
                    <p className="italic">"पौधरोपण पर एसडीएम संगीता राघव ने बच्चों को किया सम्मानित। 10 वर्षीय ओम ने कहा— वर्तमान में ऑक्सीजन की किल्लत को देखते हुए पौधे लगाना बेहद जरूरी है।"</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 🏷️ CATEGORY FILTER TABS */}
        <div className="flex flex-col items-center gap-6">
          <div className="text-center">
            <h3 className="font-display text-2xl md:text-3xl text-foreground">Explore Full Timeline</h3>
            <p className="text-xs text-muted-foreground mt-1">Filter milestones across awards, plantation drives, and media coverage</p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 p-1.5 rounded-full border border-gold/30 bg-card/60 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  selectedCategory === cat
                    ? "bg-gold text-background shadow-[0_0_15px_rgba(196,169,98,0.4)]"
                    : "text-muted-foreground hover:text-foreground hover:bg-gold/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* ⏳ INTERACTIVE TIMELINE STREAM */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Golden Timeline Stem */}
          <div className="pointer-events-none absolute left-4 md:left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-gold/80 via-gold/40 to-gold/10" />

          <div className="space-y-12">
            {filteredJourney.map((j, i) => {
              const isEven = i % 2 === 0;

              return (
                <motion.div
                  key={j.year + j.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Timeline Center Node */}
                  <div className="absolute left-4 md:left-1/2 top-6 h-5 w-5 -translate-x-1/2 rounded-full border-2 border-gold bg-background z-20 shadow-[0_0_12px_rgba(196,169,98,0.8)] flex items-center justify-center">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-ping" />
                  </div>

                  {/* Content Box (Half Width) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-0 ${isEven ? "md:pr-12 md:text-right" : "md:pl-12 md:text-left"}`}>
                    <div className="group relative overflow-hidden rounded-2xl border border-gold/30 bg-card/70 p-6 backdrop-blur-md transition-all hover:border-gold hover:shadow-[0_0_30px_rgba(196,169,98,0.2)]">
                      
                      {/* Year & Age Badge */}
                      <div className={`flex items-center gap-2 mb-3 flex-wrap ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                        <span className="inline-flex items-center gap-1 rounded-full bg-gold/15 border border-gold/40 px-3 py-1 text-xs font-bold text-gold tracking-widest uppercase">
                          <Calendar size={12} /> {j.year}
                        </span>
                        {j.age && (
                          <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-semibold text-muted-foreground border border-border">
                            {j.age}
                          </span>
                        )}
                        {j.tag && (
                          <span className="rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 text-[10px] font-medium">
                            {j.tag}
                          </span>
                        )}
                      </div>

                      {/* Title & Body */}
                      <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-gold transition-colors">
                        {j.title}
                      </h3>

                      <p className="mt-3 text-xs md:text-sm text-muted-foreground leading-relaxed">
                        {j.body}
                      </p>

                      {/* Highlights */}
                      {j.highlights && j.highlights.length > 0 && (
                        <div className={`mt-4 pt-3 border-t border-gold/20 flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                          {j.highlights.map((hl, idx) => (
                            <span key={idx} className="text-[11px] text-foreground/80 bg-background/60 border border-gold/20 px-2.5 py-1 rounded-lg">
                              • {hl}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* 📰 VISUAL NEWSPAPER & PHOTO THUMBNAILS INSIDE TIMELINE ITEM */}
                      {j.images && j.images.length > 0 && (
                        <div className="mt-5 pt-4 border-t border-gold/20 space-y-3">
                          <div className={`text-xs font-bold text-gold uppercase tracking-wider flex items-center gap-1.5 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                            <Newspaper size={14} /> Newspaper Clippings & Award Photos:
                          </div>

                          <div className={`grid grid-cols-3 gap-2 ${isEven ? "md:justify-end" : "md:justify-start"}`}>
                            {j.images.slice(0, 3).map((img, idx) => (
                              <div
                                key={idx}
                                onClick={() => setActiveModalMedia(img)}
                                className="group/thumb relative cursor-pointer overflow-hidden rounded-xl border border-gold/30 bg-black/40 aspect-[4/3] shadow-sm hover:border-gold hover:shadow-md transition-all"
                              >
                                <img
                                  src={img.src}
                                  alt={img.title}
                                  className="h-full w-full object-cover object-top transition-transform duration-300 group-hover/thumb:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover/thumb:bg-black/10 transition-colors flex items-center justify-center">
                                  <ZoomIn size={14} className="text-gold opacity-90" />
                                </div>
                              </div>
                            ))}
                          </div>

                          <button
                            onClick={() => setActiveModalMedia(j.images![0])}
                            className={`w-full text-center text-xs text-gold hover:underline font-semibold pt-1 flex items-center justify-center gap-1`}
                          >
                            <FileText size={13} /> Tap to read all {j.images.length} newspaper clippings & certificates
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>

      {/* 🔍 FULL-SCREEN MEDIA LIGHTBOX MODAL */}
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
              {/* Close Button */}
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
