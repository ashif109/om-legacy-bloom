import { Link } from "@tanstack/react-router";
import { contact } from "@/lib/site-data";
import { Ornament } from "./Ornament";
import { useLang } from "@/lib/i18n";
import footerBg from "@/assets/footer.png";
import logo from "@/assets/logo.png";
import { SocialIcon } from "./SocialIcon";

export function Footer() {
  const { t } = useLang();
  return (
    <footer
      className="relative mt-32 border-t border-gold/30 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${footerBg})` }}
    >
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex justify-center">
            <img src={logo} alt="Triyambakam Logo" className="h-16 w-auto object-contain" />
          </div>
          <h3 className="mt-6 font-display text-3xl md:text-4xl text-gold-gradient">{t("footer.pathTogether")}</h3>
          <p className="mt-3 text-muted-foreground">{t("footer.subscribeUpdates")}</p>
          <form className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-full border border-gold/30 bg-card/90 backdrop-blur-sm p-1.5">
            <input type="email" placeholder="you@example.com" className="flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted-foreground text-foreground" />
            <button type="button" className="rounded-[999px] btn-gold px-5 py-2 text-xs font-semibold uppercase tracking-widest">{t("footer.subscribe")}</button>
          </form>
        </div>

        <Ornament className="my-14" />

        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Triyambakam Logo" className="h-9 w-auto object-contain" />
              <div className="font-display text-xl font-bold tracking-widest text-gold-gradient">TRIYAMBAKAM</div>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {t("footer.bio")}
            </p>
            <div className="mt-5 flex gap-2.5">
              {contact.socials.map((s) => (
                <a 
                  key={s.name} 
                  href={s.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="grid h-10 w-10 place-items-center rounded-full border border-gold/35 text-foreground hover:border-gold hover:text-gold hover:bg-gold/10 transition-all hover:scale-110 bg-background/60 backdrop-blur-sm shadow-xs"
                  title={s.name}
                >
                  <SocialIcon name={s.name} size={18} />
                </a>
              ))}
            </div>
          </div>
          <FooterCol title={t("footer.quickLinks")} items={[[t("nav.home"), "/"], [t("nav.about"), "/about"], [t("nav.journey"), "/journey"], [t("nav.achievements"), "/achievements"], [t("nav.timeline"), "/timeline"]]} />
          <FooterCol title={t("footer.explore")} items={[[t("nav.gallery"), "/gallery"], [t("nav.media"), "/media"], [t("nav.publications"), "/publications"]]} />
          <FooterCol title={t("footer.contact")} items={[[contact.phone, "#"], [contact.email, "#"], [contact.address, "#"], [t("Privacy"), "/privacy"], [t("Terms"), "/terms"]]} />
        </div>

        <div className="mt-14 border-t border-gold/15 pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <div className="mb-4 text-xs uppercase tracking-[0.3em] text-gold">{title}</div>
      <ul className="space-y-2 text-sm">
        {items.map(([label, to]) => (
          <li key={label}>
            {to.startsWith("/") ? (
              <Link to={to} className="text-foreground hover:text-gold transition-colors">{label}</Link>
            ) : (
              <a href={to} className="text-foreground hover:text-gold transition-colors">{label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
