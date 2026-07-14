import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import img1 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.11 PM (1).jpeg";
import img2 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.11 PM.jpeg";
import img3 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.12 PM (1).jpeg";
import img4 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.12 PM (2).jpeg";
import img5 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.12 PM (3).jpeg";
import img6 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.12 PM.jpeg";
import img7 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.13 PM (1).jpeg";
import img8 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.13 PM (2).jpeg";
import img9 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.13 PM.jpeg";
import img10 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.14 PM (1).jpeg";
import img11 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.14 PM (2).jpeg";
import img12 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.14 PM.jpeg";
import img13 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.15 PM (1).jpeg";
import img14 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.15 PM (2).jpeg";
import img15 from "@/assets/img/WhatsApp Image 2026-05-10 at 6.46.15 PM.jpeg";

const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15];

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
