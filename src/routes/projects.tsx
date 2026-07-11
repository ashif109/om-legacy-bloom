import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { projects } from "@/lib/site-data";
import manuscript from "@/assets/manuscript.jpg";
import speech from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.12 PM (1).jpeg";
import meditation from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.12 PM.jpeg";
import gathering from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.14 PM (2).jpeg";
const imgs = [manuscript, speech, meditation, gathering];

export const Route = createFileRoute("/projects")({
  head: () => ({ meta: [{ title: "Projects — Om" }, { name: "description", content: "Signature projects run by Om." }, { property: "og:url", content: "/projects" }], links: [{ rel: "canonical", href: "/projects" }] }),
  component: Projects,
});

function Projects() {
  return (
    <PageShell>
      <PageHero eyebrow="Projects" title="Ideas that Serve" />
      <section className="mx-auto max-w-7xl px-6 pb-32 grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <div key={p.title} className="group overflow-hidden rounded-3xl gold-border">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img src={imgs[i % imgs.length]} alt="" className="h-full w-full object-cover object-[center_30%] transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--background)]/90 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="font-display text-2xl text-gold-gradient">{p.title}</div>
              </div>
            </div>
            <div className="p-6 text-sm text-[color:var(--muted-foreground)]">{p.body}</div>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
