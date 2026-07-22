import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/luxury/PageShell";
import { certificates } from "@/lib/site-data";
import { Award, Download, Share2, FileText } from "lucide-react";
import { getAwards, getCertificates } from "@/lib/api";

// Load all images from campus and competition directories
const campImages = import.meta.glob("@/assets/campus/*.{png,jpg,jpeg}", { eager: true, import: "default" });
const campCertificates = Object.entries(campImages).map(([path, url]) => ({ path, url: url as string }));

const competitionImages = import.meta.glob("@/assets/competition/*.{png,jpg,jpeg}", { eager: true, import: "default" });
const competitionCertificates = Object.entries(competitionImages).map(([path, url]) => ({ path, url: url as string }));

const conferenceImages = import.meta.glob("@/assets/conference/*.{png,jpg,jpeg}", { eager: true, import: "default" });
const conferenceCertificates = Object.entries(conferenceImages).map(([path, url]) => ({ path, url: url as string }));

const awardImages = import.meta.glob("@/assets/award/*.{png,jpg,jpeg}", { eager: true, import: "default" });
const awardCertificates = Object.entries(awardImages).map(([path, url]) => ({ path, url: url as string }));

const olympiadImages = import.meta.glob("@/assets/olympiad/*.{png,jpg,jpeg}", { eager: true, import: "default" });
const olympiadCertificates = Object.entries(olympiadImages).map(([path, url]) => ({ path, url: url as string }));

export const certificateDetails: Record<string, { title?: string; category?: string; organization?: string; date?: string; achievement?: string }> = {
  "Screenshot 2026-07-09 203255.png": {
    title: "Green Selfie & Act of Kindness – Certificate of Appreciation",
    category: "Environmental Conservation & Community Service",
    organization: "Office of the SDM, Kheragarh, Agra",
    date: "10 June 2021",
  },
  "Screenshot 2026-07-09 211604.png": {
    title: "Outstanding Student Recognition",
    category: "Leadership & Public Speaking",
    organization: "Lal Bahadur Shastri Sr. Sec. School, Kota",
    achievement: "Honored by the school for exceptional confidence, communication skills, and positive contribution to the student community.",
  },
  "Screenshot 2026-07-09 211913.png": {
    title: "Winter School Program",
    category: "Academic Enrichment & Innovation",
    organization: "Shiv Nadar University – Young Thinkers Forum, Gautam Buddha Nagar, Uttar Pradesh",
    achievement: "Successfully participated in the Winter School Program held at Shiv Nadar University, gaining exposure to interdisciplinary learning, innovation, critical thinking, and academic excellence.",
    date: "2nd – 7th January, 2024",
  },
  "Screenshot 2026-07-09 211928.png": {
    title: "Educational Visit",
    category: "Learning Experience",
    organization: "Motion Education, Kota",
  },
  "Screenshot 2026-07-09 200822.png": {
    title: "Eco-Leadership Residential Camp",
    category: "Ancient Mathematics & Academic Development",
    organization: "Conservation Institute",
    achievement: "Successfully completed the 5-day Eco-Leadership Residential Camp, exploring climate action, logical reasoning, and sustainable concepts inspired by nature.",
    date: "18th – 22nd April, 2026",
  },
  "Screenshot 2026-07-09 200848.png": {
    title: "Sambhashan Shala Participation",
    category: "Sanskrit Communication & Language Development",
    organization: "Sanskrit Bharati, Delhi",
    achievement: "Successfully participated in the 'Sambhashan Shala' (Spoken Sanskrit Workshop), enhancing Sanskrit communication skills, cultural understanding, and linguistic proficiency.",
    date: "1st – 14th June, 2025",
  },
  "Screenshot 2026-07-09 200902.png": {
    title: "Winter Workshop 2023",
    category: "STEM Education & Academic Development",
    organization: "Motion Foundation, Kota",
    achievement: "Successfully completed the 7-day Winter Workshop, demonstrating dedication, academic excellence, and active participation in advanced learning activities.",
    date: "25th – 31st December, 2023",
  },
  "Screenshot 2026-07-09 200920.png": {
    title: "Winter Camp 2025",
    category: "Leadership, Discipline & Outdoor Learning",
    organization: "WEDA Gurukool × St. Joseph's School, Chhutmalpur",
    achievement: "Actively participated in the Winter Camp 2025, developing leadership, teamwork, discipline, resilience, and practical life skills through immersive outdoor and experiential learning activities.",
    date: "26th December, 2025 – 16th January, 2026",
  },
  "Screenshot 2026-07-09 200938.png": {
    title: "Spring Edu-Camp 2024",
    category: "STEM Education & Academic Enrichment",
    organization: "ALLEN Career Institute, Kota",
    achievement: "Successfully participated in the 9-day Residential Spring Edu-Camp, strengthening analytical thinking, problem-solving abilities, and academic excellence through intensive learning and collaborative activities.",
    date: "27th March – 4th April, 2024",
  },
  "Screenshot 2026-07-09 200949.png": {
    title: "Academic Language Institute (ALI) Summer Program",
    category: "English Communication & Global Learning",
    organization: "Academic Language Institute (ALI) × American Embassy School, New Delhi",
    achievement: "Successfully completed the one-week Academic Language Institute (ALI) Summer Program, enhancing English communication, leadership, collaboration, and global learning skills in an interactive academic environment.",
    date: "June, 2024",
  },
  "Screenshot 2026-07-09 201001.png": {
    title: "RSS Prarambhik Varg 2025",
    category: "Leadership, Character Building & Social Service",
    organization: "Rashtriya Swayamsevak Sangh (RSS), Kosi District",
    achievement: "Selected as a participant for the RSS Prarambhik Varg, a foundational training camp focused on leadership, discipline, teamwork, physical fitness, cultural values, and nation-building.",
    date: "31st October – 2nd November, 2025",
  },
  "Screenshot 2026-07-09 201019.png": {
    title: "Cool Conservationist Summer Camp",
    category: "Wildlife Conservation & Environmental Leadership",
    organization: "WWF-India (World Wide Fund for Nature)",
    achievement: "Successfully participated in WWF-India's 'Cool Conservationist Summer Camp', gaining hands-on experience in biodiversity conservation, wildlife awareness, environmental sustainability, and nature-based learning through interactive activities.",
    date: "17th – 27th June, 2024",
  },
  "Screenshot 2026-07-09 201029.png": {
    title: "Cool Conservationist Summer Camp",
    category: "Wildlife Conservation & Environmental Leadership",
    organization: "WWF-India (Nature Connect)",
    achievement: "Successfully participated in WWF-India's 'Cool Conservationist Summer Camp', exploring biodiversity, wildlife conservation, environmental sustainability, and nature-based learning through immersive activities and field experiences.",
    date: "17th – 27th June, 2024",
  },
  "Screenshot 2026-07-09 201906.png": {
    title: "Rakhi Making Competition",
    category: "Arts, Creativity & Cultural Activities",
    organization: "St. John's School, Nainital",
    achievement: "Awarded a Participation Certificate for actively participating in the Rakhi Making Competition, demonstrating creativity, artistic expression, and enthusiasm in cultural activities.",
    date: "14th November, 2017",
  },
  "Screenshot 2026-07-09 201918.png": {
    title: "Chair Race Competition",
    category: "Sports & Physical Activities",
    organization: "St. John's School, Nainital",
    achievement: "Awarded the Certificate of Achievement for excellence in the Chair Race competition, demonstrating agility, coordination, enthusiasm, and outstanding sportsmanship.",
    date: "14th November, 2017",
  },
  "Screenshot 2026-07-09 202843.png": {
    title: "West Asia Geopolitics Seminar",
    category: "International Relations & Strategic Affairs",
    organization: "Greater West Asia Forum (GWAFI)",
    achievement: "Successfully participated in the one-day international seminar on 'Impact of the West Asia War: Regional Order, Stability and New Alignments', engaging with diplomats, strategic affairs experts, academicians, policymakers, military veterans, and researchers on contemporary geopolitical and security challenges.",
    date: "1st June, 2026",
  },
  "Screenshot 2026-07-09 202859.png": {
    title: "Ādi Śaṅkara Jayanti Seminar",
    category: "Indian Philosophy & Spiritual Studies",
    organization: "Chinmaya International Foundation × CIF Shodha Sansthan × Janmabhoomi Daily",
    achievement: "Successfully participated in the One-Day Seminar on the occasion of Ādi Śaṅkara Jayanti, exploring the philosophical teachings, cultural heritage, and intellectual legacy of Jagadguru Adi Shankaracharya through scholarly discussions and interactive sessions.",
    date: "20th April, 2026",
  },
  "Screenshot 2026-07-09 202915.png": {
    title: "CSIR Quiz – Indian Science Congress 2023",
    category: "Science & Research",
    organization: "Council of Scientific & Industrial Research (CSIR), New Delhi",
    achievement: "Awarded the Certificate of Excellence for outstanding participation and achievement in the CSIR Quiz during the Indian Science Congress 2023, demonstrating scientific aptitude, analytical thinking, and research-oriented problem-solving skills.",
    date: "2023",
  },
  "Screenshot 2026-07-09 203555.png": {
    title: "Smart Kid General Knowledge Olympiad (SKGKO)",
    category: "Academic Olympiad & General Knowledge",
    organization: "SilverZone Foundation",
    achievement: "Successfully participated in the Smart Kid General Knowledge Olympiad (SKGKO), securing 4th position in class with a State Rank of 123, Zonal Rank of 354, and Olympiad Rank of 816, demonstrating strong general knowledge and academic excellence.",
    date: "February, 2026",
  },
  "Screenshot 2026-07-09 203608.png": {
    title: "International Olympiad of Mathematics (iOM)",
    category: "Mathematics Olympiad",
    organization: "SilverZone Foundation",
    achievement: "Successfully participated in the International Olympiad of Mathematics (iOM), securing 9th position in class with a State Rank of 1,286, Zonal Rank of 3,241, and Olympiad Rank of 6,997, demonstrating strong mathematical aptitude and analytical problem-solving skills.",
    date: "February, 2026",
  },
  "Screenshot 2026-07-09 203625.png": {
    title: "International Olympiad of Science (iOS)",
    category: "Science Olympiad",
    organization: "SilverZone Foundation",
    achievement: "Successfully participated in the International Olympiad of Science (iOS), securing 25th position in class with a State Rank of 1,885, Zonal Rank of 5,586, and Olympiad Rank of 12,748, demonstrating scientific knowledge, logical reasoning, and analytical problem-solving skills.",
    date: "February, 2026",
  },
  "Screenshot 2026-07-09 203645.png": {
    title: "International Social Studies Olympiad (iSSO)",
    category: "Social Studies Olympiad",
    organization: "SilverZone Foundation",
    achievement: "Successfully participated in the International Social Studies Olympiad (iSSO), securing 23rd position in class with a State Rank of 717, Zonal Rank of 2,313, and Olympiad Rank of 4,285, demonstrating strong knowledge of history, geography, civics, and social sciences.",
    date: "February, 2026",
  },
  "Screenshot 2026-07-09 203655.png": {
    title: "Akhil Bhartiya Hindi Olympiad (ABHO)",
    category: "Hindi Language Olympiad",
    organization: "SilverZone Foundation",
    achievement: "Successfully participated in the Akhil Bhartiya Hindi Olympiad (ABHO), securing 6th position in class with a State Rank of 309, Zonal Rank of 1,049, and Olympiad Rank of 1,881, demonstrating exceptional proficiency in the Hindi language and linguistic aptitude.",
    date: "February, 2026",
  },
  "Screenshot 2026-07-09 203708.png": {
    title: "International Informatics Olympiad (iiO)",
    category: "Computer Science & Informatics Olympiad",
    organization: "SilverZone Foundation",
    achievement: "Successfully participated in the International Informatics Olympiad (iiO), securing 7th position in class with a State Rank of 246, Zonal Rank of 869, and Olympiad Rank of 2,439, demonstrating strong computational thinking, logical reasoning, and problem-solving skills.",
    date: "February, 2026",
  },
  "Screenshot 2026-07-09 203718.png": {
    title: "International Olympiad of English Language (iOEL)",
    category: "English Language Olympiad",
    organization: "SilverZone Foundation",
    achievement: "Successfully participated in the International Olympiad of English Language (iOEL), securing 7th position in class with a State Rank of 944, Zonal Rank of 5,271, and Olympiad Rank of 13,606, demonstrating strong English proficiency, vocabulary, grammar, and communication skills.",
    date: "January, 2026",
  },
  "Screenshot 2026-07-09 203736.png": {
    title: "Akhil Bhartiya Hindi Olympiad (ABHO)",
    category: "Hindi Language Olympiad",
    organization: "SilverZone Foundation × ALLEN Career Institute, Kota",
    achievement: "Secured 2nd position in class in the Akhil Bhartiya Hindi Olympiad (ABHO), achieving State Rank 98, Zonal Rank 470, and Olympiad Rank 3,324, demonstrating outstanding proficiency in Hindi language, grammar, and linguistic aptitude.",
    date: "2024–25",
  },
  "Screenshot 2026-07-09 203750.png": {
    title: "SilverZone Olympiad Performance Analysis Report",
    category: "Academic Performance Assessment",
    organization: "SilverZone Foundation",
    achievement: "Received the official Student Performance Analysis Report (SPAR), providing a comprehensive evaluation of subject-wise performance, percentile rankings, strengths, learning outcomes, and areas for improvement across SilverZone Olympiads.",
    date: "2024–25",
  },
  "Screenshot 2026-07-09 203801.png": {
    title: "Smart Kid General Knowledge Olympiad (SKGKO)",
    category: "Academic Olympiad & General Knowledge",
    organization: "SilverZone Foundation",
    achievement: "Secured 2nd position in class in the Smart Kid General Knowledge Olympiad (SKGKO), achieving State Rank 235, Zonal Rank 986, and Olympiad Rank 2,878, demonstrating exceptional general knowledge, analytical thinking, and academic excellence.",
    date: "2024–25",
  },
  "Screenshot 2026-07-09 203815.png": {
    title: "International Social Studies Olympiad (iSSO)",
    category: "Social Studies Olympiad",
    organization: "SilverZone Foundation",
    achievement: "Secured 7th position in class in the International Social Studies Olympiad (iSSO), achieving State Rank 482, Zonal Rank 1,519, and Olympiad Rank 3,250, demonstrating strong knowledge of history, geography, civics, and social sciences.",
    date: "2024–25",
  },
  "Screenshot 2026-07-09 203829.png": {
    title: "IT-Wizard Plus Programme",
    category: "Information Technology & Digital Skills",
    organization: "NIIT nguru × Dr. MPS World School, Agra",
    achievement: "Successfully completed the IT-Wizard Plus Programme with an 'Excellent' performance rating, demonstrating proficiency in fundamental computer concepts, digital literacy, and information technology skills.",
    date: "Academic Year 2018–19",
  }
};

function LocalCertificateCard({ file, defaultCategory, defaultTitle, index }: { file: { path: string; url: string }; defaultCategory: string; defaultTitle: string; index: number }) {
  const filename = decodeURIComponent(file.path.split("/").pop() || "");
  const details = certificateDetails[filename] || {};
  const title = details.title || `${defaultTitle} ${index + 1}`;
  const category = details.category || defaultCategory;
  const organization = details.organization || "";
  const date = details.date || "";
  const achievement = details.achievement || "";

  return (
    <div className="group relative overflow-hidden flex flex-col justify-between rounded-2xl gold-border bg-[color:var(--card)]/50 p-3 hover-lift hover:-translate-y-2 transition-all duration-300">
      <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--gold)]/10 bg-black/50">
        <img
          src={file.url}
          alt={title}
          className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-4 text-center flex flex-col flex-grow justify-center">
        <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)] mb-2">{category}</div>
        <div className="font-display text-xl text-cream leading-tight">{title}</div>
        {organization && <div className="mt-3 text-xs uppercase tracking-wider text-[color:var(--muted-foreground)]">{organization}</div>}
        {date && <div className="mt-1 text-xs text-[color:var(--muted-foreground)]/70">{date}</div>}
        {achievement && <div className="mt-2 text-xs italic leading-relaxed text-[color:var(--muted-foreground)]">{achievement}</div>}
      </div>
    </div>
  );
}

function DbCertificateCard({ cert }: { cert: any }) {
  return (
    <div className="group relative overflow-hidden flex flex-col justify-between rounded-2xl gold-border bg-[color:var(--card)]/50 p-3 hover-lift hover:-translate-y-2 transition-all duration-300">
      {cert.url ? (
        <a href={cert.url} target="_blank" rel="noopener noreferrer" className="block aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--gold)]/10 bg-black/50">
          <img 
            src={cert.imageUrl} 
            alt={cert.title} 
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" 
            loading="lazy"
          />
        </a>
      ) : (
        <div className="aspect-[4/3] overflow-hidden rounded-xl border border-[color:var(--gold)]/10 bg-black/50">
          <img 
            src={cert.imageUrl} 
            alt={cert.title} 
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105" 
            loading="lazy"
          />
        </div>
      )}
      <div className="p-4 text-center flex flex-col flex-grow justify-center">
        <div className="text-[10px] uppercase tracking-widest text-[color:var(--gold)] mb-2">{cert.category} Achievement</div>
        {cert.url ? (
           <a href={cert.url} target="_blank" rel="noopener noreferrer" className="font-display text-xl text-cream leading-tight hover:text-[color:var(--gold)] transition-colors">{cert.title}</a>
        ) : (
           <div className="font-display text-xl text-cream leading-tight">{cert.title}</div>
        )}
        {cert.organization && <div className="mt-3 text-xs uppercase tracking-wider text-[color:var(--muted-foreground)]">{cert.organization}</div>}
        {cert.date && <div className="mt-1 text-xs text-[color:var(--muted-foreground)]/70">{cert.date}</div>}
        {cert.achievement && <div className="mt-2 text-xs italic leading-relaxed text-[color:var(--muted-foreground)]">{cert.achievement}</div>}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/achievements")({
  loader: async () => {
    try {
      const [awards, certificatesData] = await Promise.all([
        getAwards().catch((e) => { console.error(e); return []; }),
        getCertificates().catch((e) => { console.error(e); return []; }),
      ]);
      return { dbAwards: awards || [], dbCertificates: certificatesData || [] };
    } catch (e) {
      console.error(e);
      return { dbAwards: [], dbCertificates: [] };
    }
  },
  head: () => ({
    meta: [
      { title: "Achievements & Certificates — Om" },
      { name: "description", content: "Awards, honors, milestones and certificates of Om." },
      { property: "og:url", content: "/achievements" }
    ],
    links: [{ rel: "canonical", href: "/achievements" }]
  }),
  component: Achievements,
});

function Achievements() {
  const loaderData = Route.useLoaderData() || { dbAwards: [], dbCertificates: [] };
  const dbAwards = loaderData.dbAwards || [];
  const dbCertificates = loaderData.dbCertificates || [];

  return (
    <PageShell>
      <PageHero eyebrow="Achievements & Certificates" title="Honors & Marks of Merit" sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन" />
      
      <section className="mx-auto max-w-7xl px-6 pb-32">
        {/* Awards & Honors Section */}
     

        {/* Site Data Certificates List */}
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

        {/* Database Dynamically Uploaded Certificates (Uncategorized) */}
        {dbCertificates.filter((c: any) => !["camp", "competition", "conference", "award", "olympiad"].includes(c.category?.toLowerCase())).length > 0 && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">New Certificates</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {dbCertificates.filter((c: any) => !["camp", "competition", "conference", "award", "olympiad"].includes(c.category?.toLowerCase())).map((cert: any) => (
                <DbCertificateCard key={cert._id} cert={cert} />
              ))}
            </div>
          </div>
        )}

        {/* Camp Certificates Section */}
        {(campCertificates.length > 0 || dbCertificates.some((c: any) => c.category?.toLowerCase() === "camp")) && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">Camps</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {campCertificates.map((file, i) => (
                <LocalCertificateCard key={i} file={file} defaultCategory="Camp Achievement" defaultTitle="Certificate" index={i} />
              ))}
              {dbCertificates.filter((c: any) => c.category?.toLowerCase() === "camp").map((cert: any) => (
                <DbCertificateCard key={cert._id} cert={cert} />
              ))}
            </div>
          </div>
        )}

        {/* Competition Certificates Section */}
        {(competitionCertificates.length > 0 || dbCertificates.some((c: any) => c.category?.toLowerCase() === "competition")) && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">Participation in Competitions</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {competitionCertificates.map((file, i) => (
                <LocalCertificateCard key={i} file={file} defaultCategory="Competition Achievement" defaultTitle="Certificate" index={i} />
              ))}
              {dbCertificates.filter((c: any) => c.category?.toLowerCase() === "competition").map((cert: any) => (
                <DbCertificateCard key={cert._id} cert={cert} />
              ))}
            </div>
          </div>
        )}

        {/* Conference Certificates Section */}
        {(conferenceCertificates.length > 0 || dbCertificates.some((c: any) => c.category?.toLowerCase() === "conference")) && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">Conferences</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {conferenceCertificates.map((file, i) => (
                <LocalCertificateCard key={i} file={file} defaultCategory="Conference Achievement" defaultTitle="Certificate" index={i} />
              ))}
              {dbCertificates.filter((c: any) => c.category?.toLowerCase() === "conference").map((cert: any) => (
                <DbCertificateCard key={cert._id} cert={cert} />
              ))}
            </div>
          </div>
        )}

        {/* Awards Certificates Section */}
        {(awardCertificates.length > 0 || dbCertificates.some((c: any) => c.category?.toLowerCase() === "award")) && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">Education and Schools</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {awardCertificates.map((file, i) => (
                <LocalCertificateCard key={i} file={file} defaultCategory="Award" defaultTitle="Honor" index={i} />
              ))}
              {dbCertificates.filter((c: any) => c.category?.toLowerCase() === "award").map((cert: any) => (
                <DbCertificateCard key={cert._id} cert={cert} />
              ))}
            </div>
          </div>
        )}

        {/* Olympiad Certificates Section */}
        {(olympiadCertificates.length > 0 || dbCertificates.some((c: any) => c.category?.toLowerCase() === "olympiad")) && (
          <div className="mt-16">
            <h2 className="mb-10 font-display text-4xl text-gold-gradient text-center">Olympiad Certificates</h2>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {olympiadCertificates.map((file, i) => (
                <LocalCertificateCard key={i} file={file} defaultCategory="Olympiad Achievement" defaultTitle="Certificate" index={i} />
              ))}
              {dbCertificates.filter((c: any) => c.category?.toLowerCase() === "olympiad").map((cert: any) => (
                <DbCertificateCard key={cert._id} cert={cert} />
              ))}
            </div>
          </div>
        )}
           {dbAwards.length > 0 && (
          <div className="mb-20 mt-16">
            <h2 className="mb-10 text-center font-display text-4xl text-gold-gradient">Honors & Awards</h2>
            <div className="flex flex-wrap justify-center gap-6">
              {dbAwards.map((a: any, i: number) => (
                <div key={a._id || a.title || i} className="group relative flex-1 min-w-[280px] max-w-sm overflow-hidden rounded-2xl glass-card p-6 text-center hover-lift hover:-translate-y-1 hover:border-gold/60">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gold-gradient mix-blend-overlay" />
                  <div className="relative">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-gold/40 text-gold bg-background/50 overflow-hidden">
                      {a.image ? (
                        <img src={a.image} alt="award" className="h-full w-full object-cover" />
                      ) : (
                        <Award size={22} />
                      )}
                    </div>
                    <div className="mt-4 text-[11px] uppercase tracking-widest text-gold">{a.year}</div>
                    <div className="mt-1 font-display text-lg text-foreground">{a.title}</div>
                    <div className="text-xs text-muted-foreground">{a.org || a.description || ""}</div>
                    <div className="mt-5 flex justify-center gap-2 text-xs">
                      <button className="inline-flex items-center gap-1 rounded-full border border-gold/40 px-3 py-1 text-gold hover:bg-gold/10 transition-colors"><Download size={12}/> View</button>
                      <button className="inline-flex items-center gap-1 rounded-full border border-gold/40 px-3 py-1 text-gold hover:bg-gold/10 transition-colors"><Share2 size={12}/> Share</button>
                    </div>
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
