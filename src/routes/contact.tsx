import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { contact } from "@/lib/site-data";
import { Phone, Mail, MapPin, Send } from "lucide-react";
import temple from "@/assets/temple-bg.jpg";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Om" }, { name: "description", content: "Get in touch with Om." }, { property: "og:url", content: "/contact" }], links: [{ rel: "canonical", href: "/contact" }] }),
  component: Contact,
});

function Contact() {
  return (
    <PageShell>
      <PageHero eyebrow="Contact" title="Let's Connect" sanskrit="वसुधैव कुटुम्बकम्" />
      <section className="mx-auto max-w-7xl px-6 pb-32 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4">
          {[
            { Icon: Phone, label: "Phone", value: contact.phone },
            { Icon: Mail, label: "Email", value: contact.email },
            { Icon: MapPin, label: "Address", value: contact.address },
          ].map(({ Icon, label, value }) => (
            <div key={label} className="flex items-start gap-4 rounded-2xl luxury-card p-5">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-[color:var(--gold)]/40 text-[color:var(--gold)]"><Icon size={16}/></div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{label}</div>
                <div className="mt-1 text-cream">{value}</div>
              </div>
            </div>
          ))}
          <div className="relative overflow-hidden rounded-3xl gold-border aspect-[16/10]">
            <img src={temple} alt="" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--background)]/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-xs uppercase tracking-widest text-[color:var(--gold)]">Kashi · Uttar Pradesh</div>
          </div>
        </div>
        <form className="glass-card rounded-3xl p-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">Your Name</label>
            <input className="mt-2 w-full rounded-lg border border-[color:var(--gold)]/25 bg-[color:var(--background)]/50 px-4 py-3 outline-none focus:border-[color:var(--gold)]" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">Your Email</label>
            <input type="email" className="mt-2 w-full rounded-lg border border-[color:var(--gold)]/25 bg-[color:var(--background)]/50 px-4 py-3 outline-none focus:border-[color:var(--gold)]" />
          </div>
          <div>
            <label className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">Message</label>
            <textarea rows={6} className="mt-2 w-full rounded-lg border border-[color:var(--gold)]/25 bg-[color:var(--background)]/50 px-4 py-3 outline-none focus:border-[color:var(--gold)]" />
          </div>
          <button className="inline-flex items-center gap-2 rounded-full btn-gold px-6 py-3 text-xs font-semibold uppercase tracking-widest">
            <Send size={14}/> Send Message
          </button>
        </form>
      </section>
    </PageShell>
  );
}
