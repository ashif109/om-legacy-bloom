import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { contact } from "@/lib/site-data";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import { SocialIcon } from "@/components/luxury/SocialIcon";

import { useLang } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Om" }, { name: "description", content: "Get in touch with Om." }, { property: "og:url", content: "/contact" }], links: [{ rel: "canonical", href: "/contact" }] }),
  component: Contact,
});

function Contact() {
  const { t } = useLang();
  return (
    <PageShell>
      <PageHero eyebrow={t("contact.eyebrow")} title={t("contact.title")} subtitle={t("contact.subtitle")} />
      <section className="mx-auto max-w-7xl px-6 pb-32 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            { Icon: Phone, label: t("contact.phone"), value: contact.phone },
            { Icon: Mail, label: t("contact.email"), value: contact.email },
            { Icon: MapPin, label: t("contact.address"), value: contact.address },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 rounded-2xl glass-card p-5">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-gold/40 text-gold bg-background/50"><Icon size={16}/></div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-gold">{label}</div>
                <div className="mt-1 text-foreground font-medium">{value}</div>
              </div>
            </div>
          ))}

          {/* Social Links with SVG Logos */}
          <div className="rounded-2xl glass-card p-5 flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-gold font-bold">Follow & Connect</span>
            <div className="flex gap-3">
              {contact.socials.map((s) => (
                <a 
                  key={s.name} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold/35 text-foreground hover:border-gold hover:text-gold hover:bg-gold/10 transition-all hover:scale-110 bg-background/60 shadow-xs"
                  title={s.name}
                >
                  <SocialIcon name={s.name} size={18} />
                </a>
              ))}
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl gold-border aspect-[16/10] bg-background">
            <iframe
              src="https://maps.google.com/maps?q=Om%20Shree%20Platinum%20Taj%20Nagari%20Phase-2%20Agra&t=&z=14&ie=UTF8&iwloc=&output=embed"
              className="absolute inset-0 h-full w-full border-0 grayscale opacity-70 transition-all duration-500 hover:grayscale-0 hover:opacity-100"
              allowFullScreen
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="pointer-events-none absolute bottom-4 left-4 text-xs uppercase tracking-widest text-gold drop-shadow-md">Agra · Uttar Pradesh</div>
          </div>
        </div>
        <form className="glass-card rounded-3xl p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gold">{t("contact.yourName")}</label>
            <input className="mt-2 w-full rounded-lg border border-gold/25 bg-background/50 px-4 py-3 outline-none focus:border-gold text-foreground" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gold">{t("contact.yourEmail")}</label>
            <input type="email" className="mt-2 w-full rounded-lg border border-gold/25 bg-background/50 px-4 py-3 outline-none focus:border-gold text-foreground" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-gold">{t("contact.message")}</label>
            <textarea rows={6} className="mt-2 w-full rounded-lg border border-gold/25 bg-background/50 px-4 py-3 outline-none focus:border-gold text-foreground" />
          </div>
          <button className="inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:scale-105 transition-transform">
            <Send size={14}/> {t("contact.sendMessage")}
          </button>
        </form>
      </section>
    </PageShell>
  );
}
