import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, Heart, Globe } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
<<<<<<< HEAD
import { DonationModal } from "@/components/DonationModal";
=======
>>>>>>> origin/main

const links = [
  { to: "/", key: "nav.home" as const },
  { to: "/about", key: "nav.about" as const },
  { to: "/journey", key: "nav.journey" as const },
  { to: "/achievements", key: "nav.achievements" as const },
  { to: "/gallery", key: "nav.gallery" as const },
  { to: "/media", key: "nav.media" as const },
  { to: "/contact", key: "nav.contact" as const },
];

const more = [
  ["nav.timeline", "/timeline"],
  ["nav.education", "/education"],
  ["nav.skills", "/skills"],
  ["nav.certificates", "/certificates"],
  ["nav.awards", "/awards"],
  ["nav.social", "/social-work"],
  ["nav.trainings", "/trainings"],
  ["nav.workshops", "/workshops"],
  ["nav.events", "/events"],
  ["nav.seminars", "/seminars"],
  ["nav.camps", "/camps"],
  ["nav.responsibilities", "/responsibilities"],
  ["nav.projects", "/projects"],
  ["nav.publications", "/publications"],
  ["nav.testimonials", "/testimonials"],
  ["nav.downloads", "/downloads"],
] as const;

export function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showLang, setShowLang] = useState(false);
<<<<<<< HEAD
  const [showDonation, setShowDonation] = useState(false);
=======
>>>>>>> origin/main
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  const langs: { code: Lang; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "hi", label: "हिन्दी" },
    { code: "sa", label: "संस्कृतम्" },
  ];

  return (
    <>
      {/* Top strip */}
      <div className="hidden md:block border-b border-[color:var(--gold)]/15 bg-[oklch(0.11_0.025_45)]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-1.5 text-[11px] tracking-[0.25em] text-[color:var(--gold-soft)] font-devanagari">
          <span>ॐ</span>
          <span>सर्वे भवन्तु सुखिनः · सर्वे सन्तु निरामयाः</span>
          <span>ॐ</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all ${
          scrolled ? "bg-[oklch(0.11_0.025_45)]/85 backdrop-blur-xl border-b border-[color:var(--gold)]/20" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-3">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)]/40 bg-[oklch(0.18_0.035_45)] font-devanagari text-2xl text-[color:var(--gold)] shadow-[0_0_25px_oklch(0.83_0.14_82/0.25)] transition-transform group-hover:scale-105">
              ॐ
            </span>
            <span className="leading-tight">
              <span className="block font-display text-xl tracking-[0.18em] text-gold-gradient">OM</span>
              <span className="block text-[9px] tracking-[0.3em] uppercase text-[color:var(--muted-foreground)]">Sanatan Gurukulam</span>
            </span>
          </Link>

          {/* Desktop */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => {
              const active = path === l.to;
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative px-3 py-2 text-sm tracking-wide transition-colors ${
                    active ? "text-[color:var(--gold)]" : "text-[color:var(--cream)] hover:text-[color:var(--gold)]"
                  }`}
                >
                  {t(l.key)}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-transparent via-[color:var(--gold)] to-transparent transition-transform duration-500 ${
                      active ? "scale-x-100" : "group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
            <div
              className="relative"
              onMouseEnter={() => setShowMore(true)}
              onMouseLeave={() => setShowMore(false)}
            >
              <button className="px-3 py-2 text-sm text-[color:var(--cream)] hover:text-[color:var(--gold)]">More ▾</button>
              {showMore && (
                <div className="absolute right-0 top-full w-[520px] pt-2">
                  <div className="glass-card grid grid-cols-2 gap-1 rounded-2xl p-3">
                    {more.map(([k, to]) => (
                      <Link key={to} to={to} className="rounded-lg px-3 py-2 text-sm text-[color:var(--cream)] hover:bg-[color:var(--gold)]/10 hover:text-[color:var(--gold)]">
                        {t(k as never)}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right cluster */}
          <div className="flex items-center gap-2">
            <button aria-label="Search" className="hidden md:grid h-10 w-10 place-items-center rounded-full border border-[color:var(--gold)]/25 text-[color:var(--cream)] hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]">
              <Search size={16} />
            </button>
            <div className="relative">
              <button
                onClick={() => setShowLang((v) => !v)}
                className="flex h-10 items-center gap-2 rounded-full border border-[color:var(--gold)]/25 px-3 text-xs text-[color:var(--cream)] hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]"
              >
                <Globe size={14} />
                <span className="tracking-wider">{langs.find((l) => l.code === lang)?.label}</span>
              </button>
              {showLang && (
                <div className="absolute right-0 top-12 z-50 w-40 rounded-xl glass-card p-1">
                  {langs.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setShowLang(false); }}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-sm ${lang === l.code ? "bg-[color:var(--gold)]/15 text-[color:var(--gold)]" : "text-[color:var(--cream)] hover:bg-[color:var(--gold)]/10"}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
<<<<<<< HEAD
            <Link to="/admin" className="hidden md:inline-flex h-10 items-center justify-center gap-2 rounded-full border border-[color:var(--gold)]/25 px-4 text-xs font-semibold tracking-widest uppercase text-[color:var(--cream)] hover:border-[color:var(--gold)] hover:text-[color:var(--gold)] transition-colors">
              Admin
            </Link>
            <button 
              onClick={() => setShowDonation(true)}
              className="hidden md:inline-flex h-10 items-center gap-2 rounded-full btn-gold px-4 text-xs font-semibold tracking-widest uppercase"
            >
=======
            <button className="hidden md:inline-flex h-10 items-center gap-2 rounded-full btn-gold px-4 text-xs font-semibold tracking-widest uppercase">
>>>>>>> origin/main
              <Heart size={14} /> {t("cta.donate")}
            </button>
            <button className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-[color:var(--gold)]/30 text-[color:var(--cream)]" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden border-t border-[color:var(--gold)]/15 bg-[oklch(0.11_0.025_45)]/95 backdrop-blur-xl">
            <div className="max-h-[70vh] overflow-y-auto p-4 grid grid-cols-2 gap-1">
              {[...links, ...more.map(([k, to]) => ({ to: to as string, key: k as never }))].map((l) => (
                <Link key={l.to} to={l.to} className="rounded-lg px-3 py-2 text-sm text-[color:var(--cream)] hover:bg-[color:var(--gold)]/10 hover:text-[color:var(--gold)]">
                  {t(l.key)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
<<<<<<< HEAD

      <DonationModal isOpen={showDonation} onClose={() => setShowDonation(false)} />
=======
>>>>>>> origin/main
    </>
  );
}
