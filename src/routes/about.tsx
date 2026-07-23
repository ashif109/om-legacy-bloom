import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import heroOm from "@/assets/imageom/ChatGPT Image Jul 19, 2026, 07_15_16 PM.png";
import meditation from "@/assets/imageom/Screenshot 2026-07-19 190607.png";
import { getSiteData } from "@/lib/api";
import * as fallbackData from "@/lib/site-data";
import { useLang } from "@/lib/i18n";

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
  const { t } = useLang();
  const siteData = Route.useLoaderData();
  const skills = siteData?.skills?.length > 0 ? siteData.skills : fallbackData.skills;
  const education = siteData?.education?.length > 0 ? siteData.education : fallbackData.education;

  return (
    <PageShell>
      <PageHero
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        subtitle={t("about.subtitle")}
      />
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.3fr]">
          <div className="relative overflow-hidden rounded-3xl gold-border">
            <img src={heroOm} alt="Triyambkeshwar Nath Tyagi" className="h-full w-full object-cover object-[center_30%]" />
          </div>
          <div className="space-y-6">
            <h2 className="font-display text-4xl text-gold-gradient">{t("about.introduction")}</h2>
            <p className="text-lg leading-relaxed text-foreground">
              I am Om — a young environmentalist and a Class 10 student, driven by a deep passion for protecting nature and creating a sustainable future. I believe that even the smallest actions can inspire meaningful environmental change.
            </p>
            <p className="leading-relaxed text-muted-foreground">
             My journey is built on four core principles — protecting ecosystems, spreading environmental awareness, inspiring climate action among young people, and encouraging sustainable living. Through education, community initiatives, and responsible action, I strive to make a positive impact on our planet, one step at a time.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {details.map(([k, v]) => (
                <div key={k} className="rounded-xl glass-card px-4 py-3">
                  <div className="text-[10px] uppercase tracking-widest text-gold">{k}</div>
                  <div className="mt-1 text-sm text-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 grid gap-6 md:grid-cols-2">
          <div className="glass-card rounded-3xl p-10">
            <div className="text-xs uppercase tracking-widest text-gold">Life Purpose</div>
            <p className="mt-4 font-serif-lux text-2xl italic leading-relaxed text-foreground">
              "My purpose is to inspire people to care for nature, take meaningful environmental action, and build a future where humanity and the Earth thrive together."
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
                <div key={e.degree} className="rounded-2xl glass-card p-5">
                  <div className="text-[10px] uppercase tracking-widest text-gold">{e.period}</div>
                  <div className="mt-1 font-display text-lg text-foreground">{e.degree}</div>
                  <div className="text-sm text-muted-foreground">{e.org}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-display text-3xl text-gold-gradient">Skills</h3>
            <div className="mt-6 space-y-3">
              {skills.slice(0, 6).map((s) => (
                <div key={s.name}>
                  <div className="flex justify-between text-sm text-foreground">
                    <span>{s.name}</span>
                    <span className="text-gold">{s.value}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-card">
                    <div className="h-full rounded-full bg-gold-gradient" style={{ width: `${s.value}%` }} />
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
