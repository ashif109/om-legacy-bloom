import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { downloads } from "@/lib/site-data";
import { Download } from "lucide-react";

export const Route = createFileRoute("/downloads")({
  head: () => ({ meta: [{ title: "Downloads — Om" }, { name: "description", content: "Resume, media kit and press materials." }, { property: "og:url", content: "/downloads" }], links: [{ rel: "canonical", href: "/downloads" }] }),
  component: D,
});

function D() {
  return (
    <PageShell>
      <PageHero eyebrow="Downloads" title="Press & Resources" />
      <section className="mx-auto max-w-4xl px-6 pb-32 space-y-3">
        {downloads.map((d) => (
          <div key={d.title} className="flex items-center justify-between rounded-2xl luxury-card p-5">
            <div>
              <div className="font-display text-lg text-cream">{d.title}</div>
              <div className="text-xs text-[color:var(--muted-foreground)]">{d.size}</div>
            </div>
            <button className="inline-flex items-center gap-2 rounded-full btn-gold px-5 py-2 text-xs font-semibold uppercase tracking-widest">
              <Download size={14}/> Download
            </button>
          </div>
        ))}
      </section>
    </PageShell>
  );
}
