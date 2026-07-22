import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Eye, Flag, Flower, Sun, Mic, GraduationCap, Users, Award } from "lucide-react";

import heroOm from "@/assets/imageom/ChatGPT Image Jul 19, 2026, 07_15_16 PM.png";
import templeBg from "@/assets/temple-bg.jpg";
import meditationImg from "@/assets/imageom/Screenshot 2026-07-19 190330.png";
import speechImg from "@/assets/imageom/Screenshot 2026-07-19 190359.png";
import gatheringImg from "@/assets/imageom/Screenshot 2026-07-19 190410.png";
import manuscriptImg from "@/assets/imageom/Screenshot 2026-07-19 190428.png";
import awardImg from "@/assets/imageom/Screenshot 2026-07-19 190438.png";
import previewImg1 from "@/assets/imageom/Screenshot 2026-07-19 190448.png";
import previewImg2 from "@/assets/imageom/Screenshot 2026-07-19 190502.png";
import mediaImg1 from "@/assets/imageom/Screenshot 2026-07-19 190518.png";
import mediaImg2 from "@/assets/imageom/Screenshot 2026-07-19 190532.png";
import mediaImg3 from "@/assets/imageom/Screenshot 2026-07-19 190546.png";

import { Navbar } from "@/components/luxury/Navbar";
import { Footer } from "@/components/luxury/Footer";
import { Mandala } from "@/components/luxury/Mandala";
import { GoldParticles } from "@/components/luxury/GoldParticles";
import { Ornament, SectionLabel } from "@/components/luxury/Ornament";
import * as fallbackData from "@/lib/site-data";
import { getSiteData, getMedia } from "@/lib/api";
import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/")({
  loader: async () => {
    try {
      const siteData = await getSiteData();
      const media = await getMedia();
      if (!siteData || Object.keys(siteData).length === 0) throw new Error("No DB Data");
      return { siteData, mediaData: media?.length ? media : fallbackData.media };
    } catch (e) {
      return { siteData: fallbackData, mediaData: fallbackData.media };
    }
  },
  head: () => ({
    meta: [
      { title: "Triyambkeshwar Nath Tyagi — Environmentalist & Climate Action Advocate" },
      { name: "description", content: "Portfolio of Triyambkeshwar Nath Tyagi — working for Environment and Climate Action." },
      { property: "og:title", content: "Triyambkeshwar Nath Tyagi — Environmentalist & Climate Action Advocate" },
      { property: "og:description", content: "Portfolio of Triyambkeshwar Nath Tyagi — working for Environment and Climate Action." },
      { property: "og:url", content: "/" },
    ],
  }),
  component: HomePage,
});

const missionIcons = [Eye, Flag, Flower, Sun];

function HomePage() {
  const { t, lang } = useLang();
  const { siteData, mediaData } = Route.useLoaderData();
  const stats = siteData?.stats?.length > 0 ? siteData.stats : fallbackData.stats;
  const missionCards = siteData?.missionCards?.length > 0 ? siteData.missionCards : fallbackData.missionCards;
  const journey = siteData?.journey?.length > 0 ? siteData.journey : fallbackData.journey;
  const achievements = siteData?.achievements?.length > 0 ? siteData.achievements : fallbackData.achievements;
  const testimonials = siteData?.testimonials?.length > 0 ? siteData.testimonials : fallbackData.testimonials;
  const media = mediaData;

  return (
    <div className="relative min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <GoldParticles count={26} />
      </div>
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img src={templeBg} alt="" className="h-full w-full object-cover object-[center_30%] opacity-40 mix-blend-overlay" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background" />
        </div>
        <Mandala className="right-[-160px] top-[-140px] opacity-30" size={720} />
        <Mandala className="left-[-200px] bottom-[-140px] opacity-20" size={560} />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pt-10 pb-24 md:pt-20 md:pb-28 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          {/* Copy */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }}>
            <SectionLabel>{t("hero.role")}</SectionLabel>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              <span className="font-cursive font-extrabold text-gold-gradient" style={{ fontFamily: "cursive" }}>{t("home.name")}</span>
            </h1>
            <div className="mt-4 font-serif-lux text-xl italic text-muted-foreground">{t("hero.role")}</div>
            <div className="mt-2 text-foreground/90 font-sans">{t("hero.tag")}</div>

            <div className="mt-8 rounded-[24px] glass-card p-6 border border-gold/30">
              <p className="font-devanagari text-2xl leading-relaxed text-gold italic">
                स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥
              </p>
              <p className="mt-2 text-sm italic text-foreground/80">
                Better one's own duty, though imperfectly performed, than the duty of another, though well performed.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/journey" className="group inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest">
                {t("cta.explore")} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/achievements" className="inline-flex items-center gap-2 rounded-full btn-ghost-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-gold/10">
                {t("cta.achievements")}
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full btn-ghost-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-gold/10">
                {t("cta.contact")}
              </Link>
            </div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="pointer-events-none absolute inset-0 -m-6 rounded-[2rem] bg-gold/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] gold-border">
              <img src={heroOm} alt="Portrait of Om" className="h-[560px] w-full object-cover object-[center_30%]" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-gold">
                <span>Est. 2017</span>
                <span className="font-devanagari text-base normal-case tracking-normal">कर्मण्येवाधिकारस्ते</span>
              </div>
            </div>
            {/* floating badges */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="glass-card absolute -left-6 top-14 hidden rounded-2xl px-4 py-3 md:block">
              <div className="text-[10px] uppercase tracking-widest text-gold">{t("home.treesPlanted")}</div>
              <div className="mt-1 font-display text-2xl text-foreground">500+</div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="glass-card absolute -right-6 bottom-24 hidden rounded-2xl px-4 py-3 md:block">
              <div className="text-[10px] uppercase tracking-widest text-gold">{t("home.events")}</div>
              <div className="mt-1 font-display text-2xl text-foreground">150+</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="relative border-y border-gold/25 bg-card/70 backdrop-blur">
          <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 px-6 py-6 md:gap-16">
            {stats.map((s: any, i: number) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="text-center"
              >
                <div className="font-display text-3xl text-gold-gradient md:text-4xl">{t(s.value as any)}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.3em] text-muted-foreground">{t(s.label as any)}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>{t("home.aboutTitle")}</SectionLabel>
          <h2 className="mt-6 font-display text-4xl md:text-6xl">
            {t("home.aboutDedicated")} <span className="text-gold-gradient">{t("home.aboutEnvironment")}</span>,<br /> {t("home.aboutInspired")}
          </h2>
          <Ornament className="mt-6" />
        </div>

        <div className="mt-16 flex flex-wrap justify-center gap-6">
          {missionCards.map((c: any, i: number) => {
            const Icon = missionIcons[i] ?? Sparkles;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative flex-1 min-w-[280px] max-w-md overflow-hidden glass-card p-8 hover-lift flex flex-col items-center text-center"
              >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-gold/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold bg-background/50">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 font-display text-xl text-foreground">{t(c.title as any)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(c.body as any)}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* JOURNEY PREVIEW */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 bg-section-bg rounded-[40px] my-10">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div>
            <SectionLabel>{t("home.journeyTitle")}</SectionLabel>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">{t("home.journeyHighlights")}</h2>
            <Ornament className="mt-6" />
          </div>
          <Link to="/journey" className="mt-2 text-sm uppercase tracking-widest text-gold hover:text-gold-hover transition-colors">
            {t("home.fullJourney")}
          </Link>
        </div>

        <div className="mt-12 rounded-[24px] gold-border overflow-hidden bg-card/50 backdrop-blur-md">
          <div className="relative overflow-x-auto p-8 custom-scrollbar">
            <div className="pointer-events-none absolute left-8 right-8 top-[60px] h-[1px] bg-gradient-to-r from-gold/10 via-gold/40 to-gold/10 z-0" />
            <div className="flex min-w-[900px] items-start justify-between gap-6 relative z-10">
              {journey.slice(0, 8).map((j: any, i: number) => (
                <div key={j.year} className="relative flex flex-1 flex-col items-center text-center group">
                  <div className="inline-flex min-w-[7rem] px-6 h-14 items-center justify-center rounded-full border border-gold/40 bg-background font-display text-sm tracking-widest uppercase text-gold shadow-[0_0_20px_rgba(196,169,98,0.15)] transition-transform group-hover:scale-105">
                    {t(j.year as any)}
                  </div>
                  <div className="mt-5 text-sm font-semibold uppercase tracking-wider text-foreground">{t(j.title as any)}</div>
                  <div className="mt-2 max-w-[260px] text-xs leading-relaxed text-muted-foreground">{t(j.body as any)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS + WHAT I DO */}
      <section className="mx-auto max-w-7xl px-6 py-24 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionLabel>{t("home.achievementsTitle")}</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">{t("home.featuredHonors")}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {achievements.slice(0, 6).map((a: any, i: number) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative flex-1 min-w-[140px] max-w-[200px] overflow-hidden glass-card p-5 text-center"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold/40 text-gold bg-background/50">
                  <Award size={20} />
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-wider text-gold">{t(String(a.year) as any)}</div>
                <div className="mt-1 font-display text-sm text-foreground leading-snug">{t(a.title as any)}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative">
          <SectionLabel>{t("home.whatIDo")}</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">{t("home.serviceInMotion")}</h2>
          <div className="mt-8 space-y-3">
            {[
              { icon: Mic, title: t("service.publicSpeaking"), body: t("service.publicSpeakingDesc") },
              { icon: GraduationCap, title: t("service.teaching"), body: t("service.teachingDesc") },
              { icon: Users, title: t("service.eventMgt"), body: t("service.eventMgtDesc") },
              { icon: Sparkles, title: t("service.contentCreation"), body: t("service.contentCreationDesc") },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="group flex items-start gap-4 glass-card p-5 hover:border-gold/60">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/40 text-gold bg-background/50">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-display text-lg text-foreground">{title}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-24 bg-secondary-bg rounded-[40px] my-10">
        <div className="text-center">
          <SectionLabel>{t("home.galleryTitle")}</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">{t("home.galleryMoments")}</h2>
          <Ornament className="mt-6" />
        </div>
        <div className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {[
            speechImg,
            meditationImg,
            manuscriptImg,
            gatheringImg,
            previewImg1,
            previewImg2,
          ].map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-[20px] border border-border break-inside-avoid">
              <img src={src} alt="" className="w-full transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full btn-ghost-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-gold/10 transition-colors">
            {t("home.viewFullGallery")}
          </Link>
        </div>
      </section>

      {/* MEDIA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div>
            <SectionLabel>{t("home.mediaTitle")}</SectionLabel>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">{t("home.inThePress")}</h2>
            <Ornament className="mt-6" />
          </div>
          <Link to="/media" className="mt-2 text-sm uppercase tracking-widest text-gold hover:text-gold-hover transition-colors">{t("home.allMedia")}</Link>
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-6">
          {media.slice(0, 3).map((m: any) => (
            <div key={m.title} className="group flex-1 min-w-[300px] max-w-md overflow-hidden glass-card">
              <div className="relative aspect-[16/10] overflow-hidden rounded-t-[20px]">
                <img src={m.type === "News" ? mediaImg1 : m.type === "Interview" ? mediaImg2 : mediaImg3} alt="" className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-4 top-4 rounded-full border border-gold/50 bg-background/80 backdrop-blur-md px-3 py-1 text-[10px] uppercase tracking-widest text-gold">{t(m.type as any)}</span>
              </div>
              <div className="p-6 flex flex-col items-center text-center">
                <div className="text-[10px] uppercase tracking-widest text-gold">{t(m.source as any)} · {t(String(m.year) as any)}</div>
                <div className="mt-2 font-display text-lg text-foreground">{t(m.title as any)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-24 bg-section-bg rounded-[40px] my-10">
        <div className="text-center">
          <SectionLabel>{t("home.testimonialsTitle")}</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">{t("home.voicesOfBlessing")}</h2>
          <Ornament className="mt-6" />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {testimonials.slice(0, 4).map((t_item: any) => (
            <div key={t_item.name} className="glass-card p-8">
              <div className="font-devanagari text-4xl text-gold">"</div>
              <p className="mt-2 font-serif-lux text-lg italic leading-relaxed text-foreground">{t(t_item.quote as any)}</p>
              <div className="mt-6 border-t border-gold/20 pt-4">
                <div className="font-display text-base text-gold-gradient">{t(t_item.name as any)}</div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">{t(t_item.role as any)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-6 my-24 overflow-hidden rounded-[40px] border border-border shadow-card">
        <img src={templeBg} alt="" className="absolute inset-0 h-full w-full object-cover object-[center_30%] mix-blend-overlay opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/50" />
        <div className="relative grid gap-6 p-10 md:grid-cols-[1fr_auto] md:items-center md:p-16">
          <div>
            <div className="font-devanagari text-3xl text-gold">ॐ</div>
            <h3 className="mt-4 font-display text-3xl md:text-5xl text-gold-gradient max-w-2xl">
              {t("home.ctaJoin")}
            </h3>
            <p className="mt-3 max-w-xl text-muted-foreground">{t("home.ctaTogether")}</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full btn-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest hover:scale-105 transition-transform">
            {t("home.getInTouch")} <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
