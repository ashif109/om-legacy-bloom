import { Link } from "@tanstack/react-router";
import { contact } from "@/lib/site-data";
import { Ornament } from "./Ornament";
import { useLang } from "@/lib/i18n";

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative mt-32 border-t border-[color:var(--gold)]/20 bg-[oklch(0.10_0.02_45)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.68_0.17_55/0.25),transparent_60%)]" />
      <div className="relative mx-auto max-w-7xl px-6 pt-20 pb-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-[color:var(--gold)]/40 font-devanagari text-3xl text-[color:var(--gold)]">ॐ</div>
          <h3 className="mt-6 font-display text-3xl md:text-4xl text-gold-gradient">{t("footer.pathTogether")}</h3>
          <p className="mt-3 text-[color:var(--muted-foreground)]">{t("footer.subscribeUpdates")}</p>
          <form className="mx-auto mt-6 flex max-w-md items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--card)] p-1.5">
            <input type="email" placeholder="you@example.com" className="flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-[color:var(--muted-foreground)]" />
            <button type="button" className="rounded-full btn-gold px-5 py-2 text-xs font-semibold uppercase tracking-widest">{t("footer.subscribe")}</button>
          </form>
        </div>

        <Ornament className="my-14" />

        <div className="grid gap-10 md:grid-cols-5">
          <div className="md:col-span-2">
            <div className="font-display text-2xl tracking-widest text-gold-gradient">OM</div>
            <p className="mt-3 max-w-sm text-sm text-[color:var(--muted-foreground)]">
              {t("footer.bio")}
            </p>
            <div className="mt-5 flex gap-2">
              {contact.socials.map((s) => (
                <a key={s.name} href={s.href} className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--gold)]/30 text-xs text-[color:var(--cream)] hover:border-[color:var(--gold)] hover:text-[color:var(--gold)]">
                  {s.name[0]}
                </a>
              ))}
            </div>
          </div>
          <FooterCol title={t("footer.quickLinks")} items={[[t("nav.home"),"/"],[t("nav.about"),"/about"],[t("nav.journey"),"/journey"],[t("nav.achievements"),"/achievements"],[t("nav.timeline"),"/timeline"]]} />
          <FooterCol title={t("footer.explore")} items={[[t("nav.gallery"),"/gallery"],[t("nav.media"),"/media"],[t("nav.publications"),"/publications"]]} />
          <FooterCol title={t("footer.contact")} items={[[contact.phone, "#"],[contact.email, "#"],[contact.address, "#"],[t("Privacy"),"/privacy"],[t("Terms"),"/terms"]]} />
        </div>

        <div className="mt-14 border-t border-[color:var(--gold)]/15 pt-6 text-center text-xs text-[color:var(--muted-foreground)]">
          © {new Date().getFullYear()} {t("footer.copyright")}
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }: { title: string; items: [string, string][] }) {
  return (
    <div>
      <div className="mb-4 text-xs uppercase tracking-[0.3em] text-[color:var(--gold)]">{title}</div>
      <ul className="space-y-2 text-sm">
        {items.map(([label, to]) => (
          <li key={label}>
            {to.startsWith("/") ? (
              <Link to={to} className="text-[color:var(--cream)] hover:text-[color:var(--gold)]">{label}</Link>
            ) : (
              <a href={to} className="text-[color:var(--cream)] hover:text-[color:var(--gold)]">{label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
