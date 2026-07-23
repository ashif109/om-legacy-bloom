import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "hi" | "sa";

type Dict = Record<string, { en: string; hi: string; sa: string }>;

export const dict: Dict = {
  // Navbar
  "nav.home": { en: "Home", hi: "मुख्य पृष्ठ", sa: "मुख्यम्" },
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
  "nav.more": { en: "More ▾", hi: "और ▾", sa: "अधिकम् ▾" },
  "nav.admin": { en: "Admin", hi: "व्यवस्थापक", sa: "प्रशासकः" },

  // CTAs & Buttons
  "cta.donate": { en: "Donate", hi: "दान करें", sa: "दानम्" },
  "cta.explore": { en: "Explore My Journey", hi: "मेरी यात्रा देखें", sa: "यात्रा दृश्यताम्" },
  "cta.contact": { en: "Contact Me", hi: "संपर्क करें", sa: "सम्पर्कं कुरुत" },
  "cta.achievements": { en: "View Achievements", hi: "उपलब्धियाँ देखें", sa: "सिद्धयः पश्यत" },
  "btn.share": { en: "Share", hi: "शेयर करें", sa: "विभजत" },
  "btn.copied": { en: "Copied Link!", hi: "लिंक कॉपी हो गया!", sa: "अनुबद्धम्!" },
  "btn.close": { en: "Close", hi: "बंद करें", sa: "पिदधातु" },
  "btn.view": { en: "View", hi: "देखें", sa: "पश्यत" },
  "btn.preview": { en: "Preview", hi: "पूर्वावलोकन", sa: "पूर्वावलोकनम्" },
  "btn.pdf": { en: "PDF", hi: "पीडीएफ", sa: "पीडीएफ" },

  // Hero section
  "hero.role": { en: "Student · Youtuber · Environmentalist", hi: "छात्र · यूट्यूबर · पर्यावरणविद", sa: "छात्रः · यूट्यूबर · पर्यावरणविद्" },
  "hero.tag": { en: "Environmental advocate working to combat climate change and protect our planet's future", hi: "जलवायु परिवर्तन से लड़ने और हमारे ग्रह के भविष्य की रक्षा के लिए समर्पित पर्यावरण कार्यकर्ता", sa: "जलवायुपरिवर्तनेन सह युध्दाय मम पृथिव्याः भविष्यस्य रक्षणाय च कटिबद्धः पर्यावरणप्रचारकः" },

  // Home Page
  "home.name": { en: "Triyambkeshwar Nath Tyagi", hi: "त्र्यम्बकेश्वर नाथ त्यागी", sa: "त्र्यम्बकेश्वरनाथत्यागी" },
  "home.peopleImpacted": { en: "People Impacted", hi: "लोग जुड़े", sa: "जनाः सम्बद्धाः" },
  "home.treesPlanted": { en: "Trees Planted", hi: "वृक्षारोपण", sa: "वृक्षारोपणम्" },
  "home.events": { en: "Events", hi: "कार्यक्रम", sa: "कार्यक्रमाः" },
  "home.aboutTitle": { en: "About Me", hi: "मेरे बारे में", sa: "मम परिचयः" },
  "home.aboutDedicated": { en: "Dedicated to", hi: "प्रति समर्पित", sa: "समर्पितः" },
  "home.aboutEnvironment": { en: "Environment", hi: "पर्यावरण के", sa: "पर्यावरणाय" },
  "home.aboutInspired": { en: "Inspired to Serve", hi: "सेवा के लिए प्रेरित", sa: "सेवायै प्रेरितः" },
  "home.journeyTitle": { en: "Journey", hi: "यात्रा", sa: "यात्रा" },
  "home.journeyHighlights": { en: "My Highlights", hi: "मेरी मुख्य झलकियाँ", sa: "मम प्रमुखांशाः" },
  "home.fullJourney": { en: "Full Journey →", hi: "पूरी यात्रा →", sa: "पूर्णा यात्रा →" },
  "home.achievementsTitle": { en: "Achievements", hi: "उपलब्धियाँ", sa: "सिद्धयः" },
  "home.featuredHonors": { en: "Featured Honors", hi: "प्रमुख सम्मान", sa: "प्रमुखाः सम्मानाः" },
  "home.whatIDo": { en: "What I Do", hi: "मैं क्या करता हूँ", sa: "मम कार्याणि" },
  "home.serviceInMotion": { en: "Service in Motion", hi: "सेवा कार्य", sa: "सेवाकार्यम्" },
  "home.galleryTitle": { en: "Gallery", hi: "गैलरी", sa: "चित्रशाला" },
  "home.galleryMoments": { en: "Moments of Environmental Leadership", hi: "पर्यावरणीय नेतृत्व के क्षण", sa: "पर्यावरणीयनेतृत्वस्य क्षणाः" },
  "home.viewFullGallery": { en: "View Full Gallery →", hi: "पूरी गैलरी देखें →", sa: "पूर्णां चित्रशालां पश्यत →" },
  "home.mediaTitle": { en: "Media", hi: "मीडिया", sa: "प्रसारमाध्यमम्" },
  "home.inThePress": { en: "Videos & Awareness", hi: "प्रेस और वीडियो", sa: "समाचारपत्रेषु चलचित्रेषु च" },
  "home.allMedia": { en: "All Media →", hi: "सभी मीडिया →", sa: "सर्वाणि प्रसारमाध्यमानि →" },
  "home.testimonialsTitle": { en: "Kind Words", hi: "शुभकामनाएं", sa: "शुभवचनानि" },
  "home.voicesOfBlessing": { en: "Voices of Blessing", hi: "आशीर्वाद के स्वर", sa: "आशीर्वादस्य स्वराः" },
  "home.ctaJoin": { en: "Let's join hands for the Earth, Nature & Humanity", hi: "पृथ्वी, प्रकृति और मानवता के लिए हाथ मिलाएं", sa: "पृथिव्यै, प्रकृत्यै, मानवतायै च सङ्घटीभवाम" },
  "home.ctaTogether": { en: "Together we can create a better, peaceful and sustainable world.", hi: "हम सब मिलकर एक बेहतर, शांतिपूर्ण और सतत विश्व का निर्माण कर सकते हैं।", sa: "वयं मिलित्वा उत्तमं, शान्तिपूर्णं, सततञ्च विश्वं निर्मातुं शक्नुमः।" },
  "home.getInTouch": { en: "Get in Touch", hi: "संपर्क करें", sa: "सम्पर्कं कुर्वन्तु" },

  // Services / What I do
  "service.publicSpeaking": { en: "Public Speaking", hi: "सार्वजनिक भाषण", sa: "सार्वजनिकभाषणम्" },
  "service.publicSpeakingDesc": { en: "Delivering motivational and environmental discourses.", hi: "प्रेरक और पर्यावरण संबंधित वक्तव्य देना।", sa: "प्रेरक-पर्यावरण-भाषणानं प्रदानम्।" },
  "service.teaching": { en: "Teaching & Mentoring", hi: "शिक्षण और मार्गदर्शन", sa: "शिक्षणं मार्गदर्शनञ्च" },
  "service.teachingDesc": { en: "Guiding students and youth toward purpose.", hi: "छात्रों और युवाओं को उनके उद्देश्य की ओर मार्गदर्शन करना।", sa: "छात्रान् यूवकान् च स्वोद्देश्यं प्रति मार्गदर्शनम्।" },
  "service.eventMgt": { en: "Event Management", hi: "कार्यक्रम प्रबंधन", sa: "कार्यक्रमप्रबन्धनम्" },
  "service.eventMgtDesc": { en: "Organising cultural and social gatherings at scale.", hi: "बड़े पैमाने पर सांस्कृतिक और सामाजिक सम्मेलनों का आयोजन करना।", sa: "विशालस्तरे सांस्कृतिक-सामाजिक-सम्मेलनानाम् आयोजनम्।" },
  "service.contentCreation": { en: "Content Creation", hi: "सामग्री निर्माण", sa: "सामग्रीनिर्माणम्" },
  "service.contentCreationDesc": { en: "Videos, articles and digital content on environment.", hi: "पर्यावरण पर वीडियो, लेख और डिजिटल सामग्री।", sa: "पर्यावरणविषये चलचित्राणि, लेखाः, डिजिटल-सामग्री च।" },

  // Journey Page
  "journey.eyebrow": { en: "Journey & Milestones", hi: "यात्रा और मील के पत्थर", sa: "यात्रा प्रमुखाङ्काश्च" },
  "journey.title": { en: "A Path of Devotion & Climate Action", hi: "समर्पण और जलवायु कार्य का मार्ग", sa: "समर्पणस्य जलवायुकार्यस्य च मार्गः" },
  "journey.subtitle": { en: "Tracing the milestones of tree plantation, youth climate awareness, and official recognitions from childhood to present.", hi: "बचपन से लेकर वर्तमान तक वृक्षारोपण, युवा जलवायु जागरूकता और आधिकारिक सम्मान का विस्तृत विवरण।", sa: "बाल्यकालात् अद्य पर्यन्तं वृक्षारोपणस्य, युवा-जागरूकतायाः, सम्मानानाञ्च विवरणम्।" },
  "journey.spotlightBadge": { en: "Featured Award at Age 9 · 10 Jun 2021", hi: "9 वर्ष की आयु का प्रमुख पुरस्कार · 10 जून 2021", sa: "९ वर्षस्य वयसि प्रमुखः पुरस्कारः · १० जून २०२१" },
  "journey.clickClipping": { en: "Click Any Clipping To Read Full View", hi: "पूरा देखने के लिए किसी भी पेपर क्लिपिंग पर क्लिक करें", sa: "पूर्णं द्रष्टुं चित्रं स्पृशत" },

  // Timeline Page
  "timeline.eyebrow": { en: "Timeline", hi: "कालक्रम", sa: "कालक्रमः" },
  "timeline.title": { en: "Chronology of Seva", hi: "सेवा का कालक्रम", sa: "सेवाकालक्रमः" },
  "timeline.subtitle": { en: "A detailed year-by-year account of tree plantation drives, official recognitions, and community engagement.", hi: "वृक्षारोपण अभियानों, आधिकारिक सम्मानों और सामुदायिक भागीदारी का वर्ष-दर-वर्ष विस्तृत विवरण।", sa: "वृक्षारोपण-अभियानानां सम्मानानाञ्च वर्ष-क्रमेण विवरणम्।" },

  // About Page
  "about.eyebrow": { en: "About Me", hi: "मेरे बारे में", sa: "मम परिचयः" },
  "about.title": { en: "A Life Rooted in Nature", hi: "प्रकृति में निहित जीवन", sa: "प्रकृतौ निहितं जीवनम्" },
  "about.subtitle": { en: "Student, Youtuber, and young environmentalist devoted to the revival of our ecosystems through education, conservation and selfless service.", hi: "शिक्षा, संरक्षण और निःस्वार्थ सेवा के माध्यम से हमारे पारिस्थितिक तंत्र के पुनरुद्धार के लिए समर्पित छात्र, यूट्यूबर और युवा पर्यावरणविद।", sa: "शिक्षया, संरक्षणेन, निःस्वार्थसेवया च प्रकृतये समर्पितः छात्रः।" },
  "about.introduction": { en: "Introduction", hi: "परिचय", sa: "परिचयः" },
  "about.skillsTitle": { en: "Skills & Qualities", hi: "कौशल और क्षमताएं", sa: "कौशलानि गुणाश्च" },
  "about.educationTitle": { en: "Education & Studies", hi: "शिक्षा और अध्ययन", sa: "शिक्षा अध्ययनानि च" },

  // Awards Page
  "awards.eyebrow": { en: "Honors & Recognitions", hi: "सम्मान और पुरस्कार", sa: "सम्मानाः पुरस्काराश्च" },
  "awards.title": { en: "Awards & Official Certificates", hi: "पुरस्कार और आधिकारिक प्रमाणपत्र", sa: "पुरस्काराः आधिकारिक-प्रमाणपत्राणि च" },
  "awards.subtitle": { en: "Official commendations, certificates of appreciation, and environmental awards honoring Om Tyagi's eco-conservation work.", hi: "ओम त्यागी के पर्यावरण संरक्षण कार्य को सम्मानित करने वाले आधिकारिक प्रशस्ति पत्र और पुरस्कार।", sa: "ओम त्यागी वर्यस्य पर्यावरण-संरक्षण-कार्याणां सम्मानाः प्रमाणपत्राणि च।" },
  "awards.viewCertificate": { en: "View Certificate & Clippings", hi: "प्रमाणपत्र और समाचार पत्र देखें", sa: "प्रमाणपत्रं समाचारपत्राणि च पश्यत" },
  "awards.keyAchievements": { en: "Key Achievements at Age 9:", hi: "9 वर्ष की आयु की प्रमुख उपलब्धियां:", sa: "९ वर्षस्य वयसि प्रमुखाः सिद्धयः:" },

  // Achievements Page
  "achievements.eyebrow": { en: "Achievements & Certificates", hi: "उपलब्धियाँ और प्रमाणपत्र", sa: "सिद्धयः प्रमाणपत्राणि च" },
  "achievements.title": { en: "Honors & Marks of Merit", hi: "सम्मान और योग्यता पत्र", sa: "सम्मानाः योग्यतापत्राणि च" },

  // Contact Page
  "contact.eyebrow": { en: "Contact", hi: "संपर्क करें", sa: "सम्पर्कः" },
  "contact.title": { en: "Let's Connect", hi: "आइए जुड़ें", sa: "सम्पर्कं कुर्वन्तु" },
  "contact.subtitle": { en: "Reach out for environmental plantation drives, youth talks, workshops, or collaborations.", hi: "वृक्षारोपण अभियानों, युवा सम्मेलनों, कार्यशालाओं या सहयोग के लिए संपर्क करें।", sa: "वृक्षारोपण-अभियानाय, युवा-भाषणाय, कार्यशालाभ्यः च सम्पर्कं कुर्वन्तु।" },
  "contact.phone": { en: "Phone", hi: "फ़ोन", sa: "दूरवाणी" },
  "contact.email": { en: "Email", hi: "ईमेल", sa: "ईमेल" },
  "contact.address": { en: "Address", hi: "पता", sa: "सङ्केतः" },
  "contact.sendMessage": { en: "Send Message", hi: "संदेश भेजें", sa: "सन्देशं प्रेषयन्तु" },
  "contact.yourName": { en: "Your Name", hi: "आपका नाम", sa: "भवतः नाम" },
  "contact.yourEmail": { en: "Your Email", hi: "आपका ईमेल", sa: "भवतः ईमेल" },
  "contact.subject": { en: "Subject", hi: "विषय", sa: "विषयः" },
  "contact.message": { en: "Message", hi: "संदेश", sa: "सन्देशः" },

  // Social Work Page
  "social.eyebrow": { en: "Social Work", hi: "समाज सेवा", sa: "समाजसेवा" },
  "social.title": { en: "Seva Above Self", hi: "निःस्वार्थ सेवा", sa: "निःस्वार्थसेवा" },

  // Education Page
  "education.eyebrow": { en: "Education", hi: "शिक्षा", sa: "शिक्षा" },
  "education.title": { en: "Environmental & Academic Studies", hi: "पर्यावरण और अकादमिक अध्ययन", sa: "पर्यावरण-शैक्षणिक-अध्ययनानि" },

  // Gallery Page
  "gallery.eyebrow": { en: "Gallery", hi: "गैलरी", sa: "चित्रशाला" },
  "gallery.title": { en: "Moments of Grace", hi: "प्रेरक क्षण", sa: "प्रेरक-क्षणाः" },

  // Media Page
  "media.eyebrow": { en: "Media", hi: "मीडिया", sa: "प्रसारमाध्यमम्" },
  "media.title": { en: "In the Spotlight", hi: "खबरों और वीडियो में", sa: "समाचारेषु चलचित्रेषु च" },

  // Events Page
  "events.eyebrow": { en: "Events", hi: "कार्यक्रम", sa: "कार्यक्रमाः" },
  "events.title": { en: "On the Stage of Bharat", hi: "भारत के मंच पर", sa: "भारतस्य मञ्चे" },

  // Camps Page
  "camps.eyebrow": { en: "Camps", hi: "शिविर", sa: "शिविराणि" },
  "camps.title": { en: "Shivirs of Sanskar", hi: "संस्कार शिविर", sa: "संस्कार-शिविराणि" },

  // Publications Page
  "publications.eyebrow": { en: "Publications", hi: "प्रकाशन", sa: "प्रकाशनम्" },
  "publications.title": { en: "Words that Endure", hi: "प्रेरक शब्द और शोध", sa: "प्रेरक-वचनानि" },

  // Footer
  "footer.pathTogether": { en: "Let's walk the path of Nature together", hi: "आइए एक साथ प्रकृति के मार्ग पर चलें", sa: "आगच्छ, वयं सहैव प्रकृत्याः मार्गे चलाम" },
  "footer.subscribeUpdates": { en: "Subscribe for updates on programs, camps and publications.", hi: "कार्यक्रमों, शिविरों और प्रकाशनों पर अपडेट के लिए सदस्यता लें।", sa: "कार्यक्रमाणां, शिबिराणां, प्रकाशनानां च अद्यतनाय सदस्यतां गृह्णन्तु।" },
  "footer.subscribe": { en: "Subscribe", hi: "सदस्यता लें", sa: "सदस्यतां गृह्णन्तु" },
  "footer.quickLinks": { en: "Quick Links", hi: "महत्वपूर्ण लिंक", sa: "महत्त्वपूर्ण-सम्पर्काः" },
  "footer.explore": { en: "Explore", hi: "अन्वेषण करें", sa: "अन्वेषणं कुर्वन्तु" },
  "footer.contact": { en: "Contact", hi: "संपर्क", sa: "सम्पर्कः" },
  "footer.bio": { en: "Environmentalist · Speaker · Leader. Working for Climate Action and Society.", hi: "पर्यावरणविद · वक्ता · नेता। जलवायु कार्रवाई और समाज के लिए कार्यरत।", sa: "पर्यावरणविद् · वक्ता · नेता। जलवायुकार्याय समाजाय च कार्यरतः।" },
  "footer.copyright": { en: "Om · All Rights Reserved · Designed with devotion for the Earth", hi: "ओम · सर्वाधिकार सुरक्षित · पृथ्वी के प्रति भक्ति के साथ निर्मित", sa: "ओम् · सर्वाधिकाराः सुरक्षिताः · पृथिव्यै भक्त्या निर्मितम्" },
  "Privacy": { en: "Privacy", hi: "गोपनीयता", sa: "गोपनीयता" },
  "Terms": { en: "Terms", hi: "नियम", sa: "नियमाः" },
};

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: keyof typeof dict | string) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => dict[k as keyof typeof dict]?.en ?? String(k),
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem("om-lang") as Lang | null;
    const initialLang = saved && ["en", "hi", "sa"].includes(saved) ? saved : "en";
    setLangState(initialLang);
    document.documentElement.classList.remove("lang-en", "lang-hi", "lang-sa");
    document.documentElement.classList.add(`lang-${initialLang}`);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("om-lang", l);
      document.documentElement.classList.remove("lang-en", "lang-hi", "lang-sa");
      document.documentElement.classList.add(`lang-${l}`);
    }
  };

  const t = (k: keyof typeof dict | string) => {
    if (!k) return "";
    const entry = dict[k as keyof typeof dict];
    if (entry && entry[lang]) {
      return entry[lang];
    }
    if (entry && entry.en) {
      return entry.en;
    }
    return String(k);
  };

  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
