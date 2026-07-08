import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "hi" | "sa";

type Dict = Record<string, { en: string; hi: string; sa: string }>;

export const dict: Dict = {
  "nav.home": { en: "Home", hi: "मुख्य", sa: "मुख्यम्" },
  "nav.about": { en: "About", hi: "परिचय", sa: "परिचयः" },
  "nav.journey": { en: "Journey", hi: "यात्रा", sa: "यात्रा" },
  "nav.timeline": { en: "Timeline", hi: "कालक्रम", sa: "कालक्रमः" },
  "nav.education": { en: "Education", hi: "शिक्षा", sa: "शिक्षा" },
  "nav.skills": { en: "Skills", hi: "कौशल", sa: "कौशलम्" },
  "nav.achievements": { en: "Achievements", hi: "उपलब्धियाँ", sa: "सिद्धयः" },
  "nav.certificates": { en: "Certificates", hi: "प्रमाणपत्र", sa: "प्रमाणपत्राणि" },
  "nav.awards": { en: "Awards", hi: "पुरस्कार", sa: "पुरस्काराः" },
  "nav.gallery": { en: "Gallery", hi: "गैलरी", sa: "चित्रशाला" },
  "nav.media": { en: "Media", hi: "मीडिया", sa: "प्रसारमाध्यमम्" },
  "nav.social": { en: "Social Work", hi: "समाज सेवा", sa: "सेवाकार्यम्" },
  "nav.trainings": { en: "Trainings", hi: "प्रशिक्षण", sa: "प्रशिक्षणम्" },
  "nav.workshops": { en: "Workshops", hi: "कार्यशाला", sa: "कार्यशाला" },
  "nav.events": { en: "Events", hi: "कार्यक्रम", sa: "कार्यक्रमाः" },
  "nav.seminars": { en: "Seminars", hi: "संगोष्ठी", sa: "संगोष्ठी" },
  "nav.camps": { en: "Camps", hi: "शिविर", sa: "शिविराणि" },
  "nav.responsibilities": { en: "Responsibilities", hi: "उत्तरदायित्व", sa: "उत्तरदायित्वम्" },
  "nav.projects": { en: "Projects", hi: "परियोजनाएँ", sa: "प्रकल्पाः" },
  "nav.publications": { en: "Publications", hi: "प्रकाशन", sa: "प्रकाशनम्" },
  "nav.testimonials": { en: "Testimonials", hi: "प्रशंसा", sa: "अभिनन्दनम्" },
  "nav.downloads": { en: "Downloads", hi: "डाउनलोड", sa: "अवचयनम्" },
  "nav.contact": { en: "Contact", hi: "संपर्क", sa: "सम्पर्कः" },
  "cta.donate": { en: "Donate", hi: "दान करें", sa: "दानम्" },
  "cta.explore": { en: "Explore My Journey", hi: "मेरी यात्रा देखें", sa: "यात्रा दृश्यताम्" },
  "cta.contact": { en: "Contact Me", hi: "संपर्क करें", sa: "सम्पर्कं कुरुत" },
  "cta.achievements": { en: "View Achievements", hi: "उपलब्धियाँ देखें", sa: "सिद्धयः पश्यत" },
  "hero.role": { en: "Sanskrit Scholar · Speaker · Leader", hi: "संस्कृत विद्वान · वक्ता · नेता", sa: "संस्कृतविद्वान् · वक्ता · नायकः" },
  "hero.tag": { en: "Working for Dharma, Education & Society", hi: "धर्म, शिक्षा एवं समाज हेतु समर्पित", sa: "धर्मशिक्षासमाजार्थं समर्पितः" },
};

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => dict[k]?.en ?? String(k),
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("om-lang") as Lang | null;
    if (saved && ["en", "hi", "sa"].includes(saved)) setLangState(saved);
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") window.localStorage.setItem("om-lang", l);
  };
  const t = (k: keyof typeof dict) => dict[k]?.[lang] ?? dict[k]?.en ?? String(k);
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
