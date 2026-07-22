import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";

export const Route = createFileRoute("/terms")({
  head: () => ({ meta: [{ title: "Terms — Om" }, { name: "description", content: "Terms of use." }, { property: "og:url", content: "/terms" }], links: [{ rel: "canonical", href: "/terms" }] }),
  component: () => (
    <PageShell>
      <PageHero eyebrow="Legal" title="Terms of Use" />
      <section className="mx-auto max-w-3xl px-6 pb-32 space-y-4 text-[color:var(--muted-foreground)]">
        <p>By using this site you agree to use content for personal, educational and non-commercial purposes. Images and text are the property of Om and Triyambakam Environmental Initiatives unless otherwise stated.</p>
        <p>Republishing requires written permission. Testimonials shown are provided in good faith by their attributed authors.</p>
      </section>
    </PageShell>
  ),
});
