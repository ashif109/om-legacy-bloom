import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Search, Heart, Globe } from "lucide-react";
import { useLang, type Lang } from "@/lib/i18n";
import { DonationModal } from "@/components/DonationModal";
import { TriyambakamLogo } from "./TriyambakamLogo";

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
  ["nav.events", "/events"],
  ["nav.camps", "/camps"],
  ["nav.publications", "/publications"],
] as const;

export function Navbar() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showLang, setShowLang] = useState(false);
  const [showDonation, setShowDonation] = useState(false);
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
      <div className="hidden md:block border-b border-gold/20 bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 px-6 py-1.5 text-[12px] tracking-[0.25em] text-gold/90 font-devanagari">
          <span>ॐ सर्वे भवन्तु सुखिनः · सर्वे सन्तु निरामयाः ॐ</span>
        </div>
      </div>

      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-background/85 backdrop-blur-xl border-b border-gold/30" : "bg-transparent border-b border-transparent"
          }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-6 py-3">
          {/* Logo */}
          <Link to="/" className="group flex items-center gap-3">
            <div className="transition-transform group-hover:scale-105">
              <TriyambakamLogo size={42} />
            </div>
            <span className="leading-tight">
              <span className="block font-display text-xl font-bold tracking-[0.18em] text-gold-gradient">TRIYAMBAKAM</span>
              <span className="block text-[9px] font-semibold tracking-[0.28em] uppercase text-gold/80">ENVIRONMENTAL ACTIVIST</span>
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
                  className={`relative px-3 py-2 text-sm tracking-wide transition-colors ${active ? "text-gold" : "text-foreground hover:text-gold"
                    }`}
                >
                  {t(l.key)}
                  <span
                    className={`absolute inset-x-3 -bottom-0.5 h-[2px] origin-left scale-x-0 bg-gold transition-transform duration-300 ${active ? "scale-x-100" : "group-hover:scale-x-100"
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
              <button className="px-3 py-2 text-sm text-foreground hover:text-gold transition-colors">{t("nav.more")}</button>
              {showMore && (
                <div className="absolute right-0 top-full w-[520px] pt-2">
                  <div className="glass-card grid grid-cols-2 gap-1 rounded-[24px] p-4">
                    {more.map(([k, to]) => (
                      <Link key={to} to={to} className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-gold/10 hover:text-gold transition-colors">
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
            <div className="relative">
              <button
                onClick={() => setShowLang((v) => !v)}
                className="flex h-10 items-center gap-2 rounded-full border border-gold/25 px-3 text-xs text-foreground hover:border-gold hover:text-gold transition-colors"
              >
                <Globe size={14} />
                <span className="tracking-wider">{langs.find((l) => l.code === lang)?.label}</span>
              </button>
              {showLang && (
                <div className="absolute right-0 top-12 z-50 w-40 rounded-[20px] glass-card p-2">
                  {langs.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setShowLang(false); }}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition-colors ${lang === l.code ? "bg-gold/15 text-gold" : "text-foreground hover:bg-gold/10"}`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Link to="/admin" className="hidden md:inline-flex h-10 items-center justify-center gap-2 rounded-full border border-gold/25 px-4 text-xs font-semibold tracking-widest uppercase text-foreground hover:border-gold hover:text-gold transition-colors">
              {t("nav.admin")}
            </Link>
            <button
              onClick={() => setShowDonation(true)}
              className="hidden md:inline-flex h-10 items-center gap-2 rounded-[999px] btn-gold px-5 text-xs font-semibold tracking-widest uppercase"
            >
              <Heart size={14} /> {t("cta.donate")}
            </button>
            <button className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-gold/30 text-foreground transition-colors hover:text-gold hover:border-gold" onClick={() => setOpen((v) => !v)} aria-label="Menu">
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {open && (
          <div className="lg:hidden border-t border-gold/15 bg-background/95 backdrop-blur-xl">
            <div className="max-h-[70vh] overflow-y-auto p-4 grid grid-cols-2 gap-2">
              {[...links, ...more.map(([k, to]) => ({ to: to as string, key: k as never }))].map((l) => (
                <Link key={l.to} to={l.to} className="rounded-lg px-3 py-2 text-sm text-foreground hover:bg-gold/10 hover:text-gold transition-colors">
                  {t(l.key)}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>
      <DonationModal isOpen={showDonation} onClose={() => setShowDonation(false)} />
    </>
  );
}

