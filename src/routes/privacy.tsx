import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";

export const Route = createFileRoute("/privacy")({
  head: () => ({ meta: [{ title: "Privacy — Om" }, { name: "description", content: "Privacy policy." }, { property: "og:url", content: "/privacy" }], links: [{ rel: "canonical", href: "/privacy" }] }),
  component: () => (
    <PageShell>
      <PageHero eyebrow="Legal" title="Privacy Policy" />
      <section className="mx-auto max-w-3xl px-6 pb-32 prose prose-invert text-[color:var(--muted-foreground)] space-y-4">
        <p>We respect your privacy. This site collects only what you voluntarily share via forms and does not sell personal data to third parties.</p>
        <p>Newsletter emails are used solely to send updates about programs, events and publications by Om. You may unsubscribe at any time.</p>
        <p>Analytics may be used in aggregate form to improve the site's usability and accessibility.</p>
      </section>
    </PageShell>
  ),
});
