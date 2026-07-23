import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { GoldParticles } from "./GoldParticles";
import { Ornament, SectionLabel } from "./Ornament";
import { Mandala } from "./Mandala";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  sanskrit,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  sanskrit?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-16 pb-24 md:pt-24 md:pb-32">
      <Mandala className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" size={820} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      <div className="relative mx-auto max-w-5xl px-6 text-center animate-fade-in-up">
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-6 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-gold-gradient drop-shadow-xs">{title}</h1>
        {sanskrit && (
          <p className="mt-6 font-devanagari text-xl md:text-2xl text-muted-foreground font-medium">{sanskrit}</p>
        )}
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">{subtitle}</p>
        )}
        <Ornament className="mt-10" />
      </div>
    </section>
  );
}

export { Ornament, SectionLabel };
