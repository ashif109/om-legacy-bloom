import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { certificates } from "@/lib/site-data";
import { FileText, Search } from "lucide-react";

export const Route = createFileRoute("/certificates")({
  head: () => ({ meta: [{ title: "Certificates — Om" }, { name: "description", content: "Certificates and credentials earned by Om." }, { property: "og:url", content: "/certificates" }], links: [{ rel: "canonical", href: "/certificates" }] }),
  component: Certificates,
});

function Certificates() {
  return (
    <PageShell>
      <PageHero eyebrow="Certificates" title="Marks of Merit" />
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mx-auto mb-10 flex max-w-md items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--card)] px-4 py-2">
          <Search size={16} className="text-[color:var(--gold)]" />
          <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--muted-foreground)]" placeholder="Search certificates..." />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((c) => (
            <div key={c} className="group relative overflow-hidden rounded-2xl gold-border p-6 hover-lift hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[color:var(--gold)]/10 text-[color:var(--gold)]">
                  <FileText size={18} />
                </div>
                <div>
                  <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)]">Certificate</div>
                  <div className="mt-1 font-display text-base text-cream">{c}</div>
                </div>
              </div>
              <div className="mt-6 flex gap-2 text-xs">
                <button className="rounded-full btn-gold px-4 py-1.5 font-semibold uppercase tracking-widest">Preview</button>
                <button className="rounded-full btn-ghost-gold px-4 py-1.5">PDF</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
