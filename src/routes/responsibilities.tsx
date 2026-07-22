import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { responsibilities } from "@/lib/site-data";
import { getProjects } from "@/lib/api";

export const Route = createFileRoute("/responsibilities")({
  loader: async () => {
    try {
      return await getProjects();
    } catch (e) {
      console.error(e);
      return [];
    }
  },
  head: () => ({ meta: [{ title: "Responsibilities — Om" }, { name: "description", content: "Roles held by Om across levels." }, { property: "og:url", content: "/responsibilities" }], links: [{ rel: "canonical", href: "/responsibilities" }] }),
  component: Resp,
});

function Resp() {
  const dbProjects = Route.useLoaderData() || [];
  const allResponsibilities = dbProjects.map((p: any) => ({
    position: p.name,
    org: p.description || p.teamMembers?.join(", ") || "",
    period: p.status || "",
    level: p.techStack?.[0] || "Global",
    ...p
  }));

  return (
    <PageShell>
      <PageHero eyebrow="Responsibilities" title="Roles & Service" />
      <section className="mx-auto max-w-6xl px-6 pb-32">
        {allResponsibilities.length > 0 ? (
          <div className="overflow-hidden rounded-3xl gold-border">
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
                {allResponsibilities.map((r: any, i: number) => (
                  <tr key={r._id || r.position + r.period || i} className="border-t border-[color:var(--gold)]/15 hover:bg-[color:var(--gold)]/5">
                    <td className="p-5 font-display text-base text-cream">{r.position}</td>
                    <td className="p-5 text-[color:var(--muted-foreground)]">{r.org}</td>
                    <td className="p-5 text-[color:var(--muted-foreground)]">{r.period}</td>
                    <td className="p-5"><span className="rounded-full border border-[color:var(--gold)]/40 px-3 py-1 text-xs text-[color:var(--gold)]">{r.level}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-20 text-muted-foreground">
            No responsibilities listed at this time.
          </div>
        )}
      </section>
    </PageShell>
  );
}
