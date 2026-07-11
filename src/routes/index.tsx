import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Eye, Flag, Flower, Sun, Mic, GraduationCap, Users, Award } from "lucide-react";

import heroOm from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.13 PM.jpeg";
import templeBg from "@/assets/temple-bg.jpg";
import meditationImg from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.12 PM.jpeg";
import speechImg from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.12 PM (1).jpeg";
import gatheringImg from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.14 PM (2).jpeg";
import manuscriptImg from "@/assets/manuscript.jpg";
import awardImg from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.11 PM (1).jpeg";

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
      { title: "Triyambkeshwar Nath Tyagi — Student · Youtuber · Astrologer" },
      { name: "description", content: "Portfolio of Triyambkeshwar Nath Tyagi — working for Dharma and Society." },
      { property: "og:title", content: "Triyambkeshwar Nath Tyagi — Student · Youtuber · Astrologer" },
      { property: "og:description", content: "Portfolio of Triyambkeshwar Nath Tyagi — working for Dharma and Society." },
      { property: "og:url", content: "/" },
    ],
  }),
  component: HomePage,
});

const missionIcons = [Eye, Flag, Flower, Sun];

function HomePage() {
  const { t } = useLang();
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
          <img src={templeBg} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--background)]/70 via-[color:var(--background)]/60 to-[color:var(--background)]" />
        </div>
        <Mandala className="right-[-160px] top-[-140px] opacity-70" size={720} />
        <Mandala className="left-[-200px] bottom-[-140px] opacity-40" size={560} />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 pt-10 pb-24 md:pt-20 md:pb-28 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="relative mx-auto w-full max-w-lg"
          >
            <div className="pointer-events-none absolute inset-0 -m-6 rounded-[2rem] bg-[color:var(--gold)]/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] gold-border">
              <img src={heroOm} alt="Portrait of Om" className="h-[560px] w-full object-cover" />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[color:var(--background)] to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">
                <span>Est. 2017</span>
                <span className="font-devanagari text-base normal-case tracking-normal">कर्मण्येवाधिकारस्ते</span>
              </div>
            </div>
            {/* floating badges */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 5, repeat: Infinity }} className="glass-card absolute -left-6 top-14 hidden rounded-2xl px-4 py-3 md:block">
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">People Impacted</div>
              <div className="mt-1 font-display text-2xl text-cream">5,000+</div>
            </motion.div>
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 6, repeat: Infinity }} className="glass-card absolute -right-6 bottom-24 hidden rounded-2xl px-4 py-3 md:block">
              <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">Events</div>
              <div className="mt-1 font-display text-2xl text-cream">150+</div>
            </motion.div>
          </motion.div>

          {/* Copy */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.15 }}>
            <SectionLabel>Student · Youtuber · Astrologer</SectionLabel>
            <h1 className="mt-6 font-display text-5xl leading-[0.95] tracking-tight md:text-7xl">
              <span className="font-[cursive] font-extrabold text-gold-gradient">Triyambkeshwar Nath Tyagi</span>
            </h1>
            <div className="mt-4 font-serif-lux text-xl italic text-[color:var(--muted-foreground)]">{t("hero.role")}</div>
            <div className="mt-2 text-[color:var(--cream)]">{t("hero.tag")}</div>

            <div className="mt-8 rounded-2xl gold-border p-6">
              <p className="font-devanagari text-2xl leading-relaxed text-[color:var(--gold-soft)]">
                स्वधर्मे निधनं श्रेयः परधर्मो भयावहः॥
              </p>
              <p className="mt-2 text-sm italic text-[color:var(--muted-foreground)]">
                Better one's own duty, though imperfectly performed, than the duty of another, though well performed.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/journey" className="group inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest">
                {t("cta.explore")} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/achievements" className="inline-flex items-center gap-2 rounded-full btn-ghost-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-[color:var(--gold)]/10">
                {t("cta.achievements")}
              </Link>
              <Link to="/contact" className="inline-flex items-center gap-2 rounded-full btn-ghost-gold px-6 py-3 text-sm font-semibold uppercase tracking-widest hover:bg-[color:var(--gold)]/10">
                {t("cta.contact")}
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Stats strip */}
        <div className="relative border-y border-[color:var(--gold)]/25 bg-[oklch(0.15_0.03_45)]/70 backdrop-blur">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-6 py-6 md:grid-cols-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="text-center"
              >
                <div className="font-display text-3xl text-gold-gradient md:text-4xl">{s.value}</div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.3em] text-[color:var(--muted-foreground)]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <SectionLabel>About Me</SectionLabel>
          <h2 className="mt-6 font-display text-4xl md:text-6xl">
            Dedicated to <span className="text-gold-gradient">Dharma</span>,<br /> Inspired to <span className="text-gold-gradient">Serve</span>
          </h2>
          <Ornament className="mt-6" />
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {missionCards.map((c, i) => {
            const Icon = missionIcons[i] ?? Sparkles;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group relative overflow-hidden rounded-2xl luxury-card p-8 hover-lift hover:-translate-y-1 hover:border-[color:var(--gold)]/60"
              >
                <div className="pointer-events-none absolute inset-x-0 -top-16 h-32 bg-[radial-gradient(circle,oklch(0.83_0.14_82/0.35),transparent_60%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="grid h-14 w-14 place-items-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)]">
                  <Icon size={22} />
                </div>
                <h3 className="mt-6 font-display text-xl text-cream">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--muted-foreground)]">{c.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* JOURNEY PREVIEW */}
      <section className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Journey</SectionLabel>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">My <span className="text-gold-gradient">Highlights</span></h2>
          </div>
          <Link to="/journey" className="text-sm uppercase tracking-widest text-[color:var(--gold)] hover:text-[color:var(--gold-soft)]">
            Full Journey →
          </Link>
        </div>

        <div className="mt-12 rounded-3xl gold-border overflow-hidden">
          <div className="relative overflow-x-auto p-8">
            <div className="pointer-events-none absolute left-8 right-8 top-1/2 h-px bg-gradient-to-r from-transparent via-[color:var(--gold)]/60 to-transparent" />
            <div className="flex min-w-[900px] items-center justify-between gap-6">
              {journey.slice(0, 8).map((j, i) => (
                <div key={j.year} className="relative flex flex-1 flex-col items-center text-center">
                  <div className={`grid h-14 w-14 place-items-center rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--card)] font-display text-sm text-[color:var(--gold)] ${i % 2 === 0 ? "shadow-[0_0_25px_oklch(0.83_0.14_82/0.35)]" : ""}`}>
                    {j.year}
                  </div>
                  <div className="mt-4 text-xs font-semibold uppercase tracking-wider text-cream">{j.title}</div>
                  <div className="mt-1 max-w-[140px] text-[11px] text-[color:var(--muted-foreground)]">{j.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS + WHAT I DO */}
      <section className="mx-auto max-w-7xl px-6 py-24 grid gap-10 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <SectionLabel>Achievements</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Featured <span className="text-gold-gradient">Honors</span></h2>
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {achievements.slice(0, 6).map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative overflow-hidden rounded-2xl luxury-card p-5 text-center hover:-translate-y-1 hover:border-[color:var(--gold)]/60"
              >
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)]">
                  <Award size={20} />
                </div>
                <div className="mt-3 text-[11px] uppercase tracking-wider text-[color:var(--gold)]">{a.year}</div>
                <div className="mt-1 font-display text-sm text-cream leading-snug">{a.title}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="relative">
          <SectionLabel>What I Do</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Service in <span className="text-gold-gradient">Motion</span></h2>
          <div className="mt-8 space-y-3">
            {[
              { icon: Mic, title: "Public Speaking", body: "Delivering motivational and spiritual discourses." },
              { icon: GraduationCap, title: "Teaching & Mentoring", body: "Guiding students and youth toward purpose." },
              { icon: Users, title: "Event Management", body: "Organising cultural and social gatherings at scale." },
              { icon: Sparkles, title: "Content Creation", body: "Videos, articles and digital content on dharma." },
            ].map(({ icon: Icon, title, body }) => (
              <div key={title} className="group flex items-start gap-4 rounded-2xl luxury-card p-5 hover:border-[color:var(--gold)]/60">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)]">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-display text-lg text-cream">{title}</div>
                  <div className="mt-1 text-sm text-[color:var(--muted-foreground)]">{body}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <SectionLabel>Gallery</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Moments of <span className="text-gold-gradient">Seva & Sanskar</span></h2>
          <Ornament className="mt-6" />
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4 md:[grid-auto-rows:180px]">
          {[
            { src: speechImg, cls: "md:col-span-2 md:row-span-2" },
            { src: meditationImg, cls: "md:col-span-1 md:row-span-1" },
            { src: manuscriptImg, cls: "md:col-span-1 md:row-span-1" },
            { src: gatheringImg, cls: "md:col-span-2 md:row-span-1" },
            { src: awardImg, cls: "md:col-span-1 md:row-span-1" },
            { src: heroOm, cls: "md:col-span-1 md:row-span-1" },
          ].map((g, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-2xl gold-border ${g.cls}`}>
              <img src={g.src} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--background)]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full btn-ghost-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-[color:var(--gold)]/10">
            View Full Gallery →
          </Link>
        </div>
      </section>

      {/* MEDIA */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <SectionLabel>Media</SectionLabel>
            <h2 className="mt-4 font-display text-4xl md:text-5xl">In the <span className="text-gold-gradient">Press</span></h2>
          </div>
          <Link to="/media" className="text-sm uppercase tracking-widest text-[color:var(--gold)]">All Media →</Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {media.slice(0,3).map((m) => (
            <div key={m.title} className="group overflow-hidden rounded-2xl luxury-card hover:-translate-y-1 hover:border-[color:var(--gold)]/60">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img src={m.type === "News" ? speechImg : m.type === "Interview" ? awardImg : gatheringImg} alt="" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <span className="absolute left-4 top-4 rounded-full border border-[color:var(--gold)]/50 bg-[color:var(--background)]/60 px-3 py-1 text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{m.type}</span>
              </div>
              <div className="p-6">
                <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{m.source} · {m.year}</div>
                <div className="mt-2 font-display text-lg text-cream">{m.title}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-center">
          <SectionLabel>Kind Words</SectionLabel>
          <h2 className="mt-4 font-display text-4xl md:text-5xl">Voices of <span className="text-gold-gradient">Blessing</span></h2>
          <Ornament className="mt-6" />
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {testimonials.slice(0,4).map((t) => (
            <div key={t.name} className="glass-card rounded-2xl p-8">
              <div className="font-devanagari text-4xl text-[color:var(--gold)]">"</div>
              <p className="mt-2 font-serif-lux text-lg italic leading-relaxed text-[color:var(--cream)]">{t.quote}</p>
              <div className="mt-6 border-t border-[color:var(--gold)]/20 pt-4">
                <div className="font-display text-base text-gold-gradient">{t.name}</div>
                <div className="text-xs uppercase tracking-widest text-[color:var(--muted-foreground)]">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative mx-6 my-24 overflow-hidden rounded-3xl">
        <img src={templeBg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--background)]/95 via-[color:var(--background)]/70 to-transparent" />
        <div className="relative grid gap-6 p-10 md:grid-cols-[1fr_auto] md:items-center md:p-16">
          <div>
            <div className="font-devanagari text-3xl text-[color:var(--gold)]">ॐ</div>
            <h3 className="mt-4 font-display text-3xl md:text-5xl text-gold-gradient max-w-2xl">
              Let's join hands for Dharma, Culture & Humanity
            </h3>
            <p className="mt-3 max-w-xl text-[color:var(--muted-foreground)]">Together we can create a better, peaceful and dhārmic world.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full btn-gold px-8 py-4 text-sm font-semibold uppercase tracking-widest">
            Get in Touch <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
