import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import heroOm from "@/assets/hero-om.jpg";
import temple from "@/assets/temple-bg.jpg";
import meditation from "@/assets/meditation.jpg";
import speech from "@/assets/speech.jpg";
import gathering from "@/assets/gathering.jpg";
import manuscript from "@/assets/manuscript.jpg";
import award from "@/assets/award.jpg";
import mandala from "@/assets/mandala.jpg";

const images = [heroOm, speech, gathering, meditation, manuscript, award, temple, mandala, heroOm, speech, gathering, meditation];

export const Route = createFileRoute("/gallery")({
  head: () => ({ meta: [{ title: "Gallery — Om" }, { name: "description", content: "A visual gallery of Om's service, events and journey." }, { property: "og:url", content: "/gallery" }], links: [{ rel: "canonical", href: "/gallery" }] }),
  component: Gallery,
});

function Gallery() {
  return (
    <PageShell>
      <PageHero eyebrow="Gallery" title="Moments of Grace" />
      <section className="mx-auto max-w-7xl px-6 pb-32">
        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
          {images.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-2xl gold-border">
              <img src={src} alt="" className="w-full transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--background)]/70 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
