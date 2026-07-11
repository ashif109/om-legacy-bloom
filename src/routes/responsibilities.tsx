import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { responsibilities } from "@/lib/site-data";

export const Route = createFileRoute("/responsibilities")({
  head: () => ({ meta: [{ title: "Responsibilities — Om" }, { name: "description", content: "Roles held by Om across levels." }, { property: "og:url", content: "/responsibilities" }], links: [{ rel: "canonical", href: "/responsibilities" }] }),
  component: Resp,
});

function Resp() {
  return (
    <PageShell>
      <PageHero eyebrow="Responsibilities" title="Duty as Devotion" />
      <section className="mx-auto max-w-6xl px-6 pb-32 overflow-hidden rounded-3xl gold-border">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="text-[11px] uppercase tracking-widest text-[color:var(--gold)]">
              <th className="p-5">Position</th>
              <th className="p-5">Organization</th>
              <th className="p-5">Duration</th>
              <th className="p-5">Level</th>
            </tr>
          </thead>
          <tbody>
            {responsibilities.map((r) => (
              <tr key={r.position + r.period} className="border-t border-[color:var(--gold)]/15 hover:bg-[color:var(--gold)]/5">
                <td className="p-5 font-display text-base text-cream">{r.position}</td>
                <td className="p-5 text-[color:var(--muted-foreground)]">{r.org}</td>
                <td className="p-5 text-[color:var(--muted-foreground)]">{r.period}</td>
                <td className="p-5"><span className="rounded-full border border-[color:var(--gold)]/40 px-3 py-1 text-xs text-[color:var(--gold)]">{r.level}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </PageShell>
  );
}
