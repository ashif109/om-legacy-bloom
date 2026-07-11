import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { certificates } from "@/lib/site-data";
import { FileText, Search } from "lucide-react";

// Load all images from campus and competition directories
const campImages = import.meta.glob("@/assets/campus/*.{png,jpg,jpeg}", { eager: true, import: "default" });
const campCertificates = Object.values(campImages) as string[];

const competitionImages = import.meta.glob("@/assets/competition/*.{png,jpg,jpeg}", { eager: true, import: "default" });
const competitionCertificates = Object.values(competitionImages) as string[];

const conferenceImages = import.meta.glob("@/assets/conference/*.{png,jpg,jpeg}", { eager: true, import: "default" });
const conferenceCertificates = Object.values(conferenceImages) as string[];

const awardImages = import.meta.glob("@/assets/award/*.{png,jpg,jpeg}", { eager: true, import: "default" });
const awardCertificates = Object.values(awardImages) as string[];

const olympiadImages = import.meta.glob("@/assets/olympiad/*.{png,jpg,jpeg}", { eager: true, import: "default" });
const olympiadCertificates = Object.values(olympiadImages) as string[];

import { getCertificates } from "@/lib/api";

export const Route = createFileRoute("/certificates")({
  loader: async () => {
    try {
      const data = await getCertificates();
      return data || [];
    } catch (e) {
      return [];
    }
  },
  head: () => ({ meta: [{ title: "Certificates — Triyambkeshwar Nath Tyagi" }, { name: "description", content: "Certificates and credentials earned by Triyambkeshwar Nath Tyagi." }, { property: "og:url", content: "/certificates" }], links: [{ rel: "canonical", href: "/certificates" }] }),
  component: Certificates,
});

function Certificates() {
  const dbCertificates = Route.useLoaderData() as any[];

  return (
    <PageShell>
      <PageHero eyebrow="Certificates" title="Marks of Merit" />
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mx-auto mb-10 flex max-w-md items-center gap-2 rounded-full border border-[color:var(--gold)]/30 bg-[color:var(--card)] px-4 py-2">
          <Search size={16} className="text-[color:var(--gold)]" />
          <input className="flex-1 bg-transparent text-sm outline-none placeholder:text-[color:var(--muted-foreground)]" placeholder="Search certificates..." />
        </div>
        
        {certificates.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-16">
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
        )}

        {/* Database Dynamically Uploaded Certificates */}
        {dbCertificates.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">New Certificates</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {dbCertificates.map((cert) => (
                <div key={cert._id} className="group relative overflow-hidden rounded-2xl gold-border bg-[color:var(--card)]/50 p-3 hover-lift hover:-translate-y-2 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--gold)]/10 bg-black/50">
                    <img 
                      src={cert.imageUrl} 
                      alt={cert.title} 
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)] mb-2">{cert.category} Achievement</div>
                    <div className="font-display text-xl text-cream">{cert.title}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Camp Certificates Section */}
        {campCertificates.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">Camp Certificates</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {campCertificates.map((imgSrc, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl gold-border bg-[color:var(--card)]/50 p-3 hover-lift hover:-translate-y-2 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--gold)]/10 bg-black/50">
                    <img 
                      src={imgSrc} 
                      alt={`Camp Certificate ${i + 1}`} 
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)] mb-2">Camp Achievement</div>
                    <div className="font-display text-xl text-cream">Certificate {i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Competition Certificates Section */}
        {competitionCertificates.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">Competition Certificates</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {competitionCertificates.map((imgSrc, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl gold-border bg-[color:var(--card)]/50 p-3 hover-lift hover:-translate-y-2 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--gold)]/10 bg-black/50">
                    <img 
                      src={imgSrc} 
                      alt={`Competition Certificate ${i + 1}`} 
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)] mb-2">Competition Achievement</div>
                    <div className="font-display text-xl text-cream">Certificate {i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Conference Certificates Section */}
        {conferenceCertificates.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">Conference Certificates</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {conferenceCertificates.map((imgSrc, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl gold-border bg-[color:var(--card)]/50 p-3 hover-lift hover:-translate-y-2 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--gold)]/10 bg-black/50">
                    <img 
                      src={imgSrc} 
                      alt={`Conference Certificate ${i + 1}`} 
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)] mb-2">Conference Achievement</div>
                    <div className="font-display text-xl text-cream">Certificate {i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Awards Certificates Section */}
        {awardCertificates.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">Awards & Honors</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {awardCertificates.map((imgSrc, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl gold-border bg-[color:var(--card)]/50 p-3 hover-lift hover:-translate-y-2 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--gold)]/10 bg-black/50">
                    <img 
                      src={imgSrc} 
                      alt={`Award Certificate ${i + 1}`} 
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)] mb-2">Award</div>
                    <div className="font-display text-xl text-cream">Honor {i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Olympiad Certificates Section */}
        {olympiadCertificates.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">Olympiad Certificates</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {olympiadCertificates.map((imgSrc, i) => (
                <div key={i} className="group relative overflow-hidden rounded-2xl gold-border bg-[color:var(--card)]/50 p-3 hover-lift hover:-translate-y-2 transition-all duration-300">
                  <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--gold)]/10 bg-black/50">
                    <img 
                      src={imgSrc} 
                      alt={`Olympiad Certificate ${i + 1}`} 
                      className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" 
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)] mb-2">Olympiad Achievement</div>
                    <div className="font-display text-xl text-cream">Certificate {i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>
    </PageShell>
  );
}
