import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import heroOm from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.13 PM.jpeg";
import meditation from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.12 PM.jpeg";
import { getSiteData } from "@/lib/api";
import * as fallbackData from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  loader: async () => {
    try {
      const data = await getSiteData();
      if (!data || Object.keys(data).length === 0) throw new Error("No DB Data");
      return data;
    } catch (e) {
      return fallbackData;
    }
  },
  head: () => ({ meta: [{ title: "About — Triyambkeshwar Nath Tyagi" }, { name: "description", content: "The story, values and vision of Triyambkeshwar Nath Tyagi." }, { property: "og:url", content: "/about" }], links: [{ rel: "canonical", href: "/about" }] }),
  component: About,
});

const details = [
  ["Full Name", "Triyambkeshwar Nath Tyagi"],
  ["Date of Birth", "08/08/2012"],
  ["City", "Agra, Uttar Pradesh"],
  ["Residence", "A- 1006 Om Shree Platinum Taj Nagari Phase-2 Agra UP"],
  ["Languages", "Sanskrit, Hindi, English"],
  ["Father's Name", "Rajneesh Kumar Tyagi"],
];

function About() {
  const siteData = Route.useLoaderData();
  const skills = siteData?.skills?.length > 0 ? siteData.skills : fallbackData.skills;
  const education = siteData?.education?.length > 0 ? siteData.education : fallbackData.education;

  return (
    <PageShell>
      <PageHero
        eyebrow="About Me"
        title="A Life Rooted in Dharma"
        sanskrit="विद्या ददाति विनयं विनयाद् याति पात्रताम्"
        subtitle="Student, Youtuber, and young astrologer devoted to the revival of Sanatan values through education, culture and selfless service."
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="relative overflow-hidden rounded-3xl gold-border">
            <img src={heroOm} alt="Triyambkeshwar Nath Tyagi" className="h-full w-full object-cover object-[center_30%]" />
          </div>
          <div className="space-y-6">
            <h2 className="font-display text-4xl text-gold-gradient">Introduction</h2>
            <p className="text-lg leading-relaxed text-[color:var(--cream)]">
              I am Om — a passionate student of Sanatan Dharma, an orator, and a worker for society. From the ancient ghats of Kashi to the auditoriums of modern India, I carry one message: our culture is not a memory, it is a living force.
            </p>
            <p className="leading-relaxed text-[color:var(--muted-foreground)]">
              My work stands on four pillars — spreading the essence of Sanatan Dharma, empowering youth through knowledge, serving society with humility, and believing that service to humanity is service to the divine.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {details.map(([k, v]) => (
                <div key={k} className="rounded-xl luxury-card px-4 py-3">
                  <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{k}</div>
                  <div className="mt-1 text-sm text-cream">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-3xl p-10">
            <div className="text-xs uppercase tracking-widest text-[color:var(--gold)]">Life Purpose</div>
            <p className="mt-4 font-serif-lux text-2xl italic leading-relaxed text-[color:var(--cream)]">
              "Service to humanity is service to God. My life is a small offering at the feet of Bhārat."
            </p>
          </div>
          <div className="relative overflow-hidden rounded-3xl gold-border">
            <img src={meditation} alt="" className="h-full w-full object-cover object-[center_30%]" />
          </div>
        </div>

        <div className="mt-24 grid gap-10 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-3xl text-gold-gradient">Education</h3>
            <div className="mt-6 space-y-3">
              {education.slice(0, 4).map((e) => (
                <div key={e.degree} className="rounded-2xl luxury-card p-5">
                  <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">{e.period}</div>
                  <div className="mt-1 font-display text-lg text-cream">{e.degree}</div>
                  <div className="text-sm text-[color:var(--muted-foreground)]">{e.org}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-3xl text-gold-gradient">Skills</h3>
            <div className="mt-6 space-y-3">
              {skills.slice(0, 6).map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm text-cream">
                    <span>{s.name}</span>
                    <span className="text-[color:var(--gold)]">{s.value}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[color:var(--card)]">
                    <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: "var(--gradient-gold-soft)" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
