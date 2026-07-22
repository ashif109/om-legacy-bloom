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
  "hero.role": { en: "Student · Youtuber · Environmentalist", hi: "छात्र · यूट्यूबर · पर्यावरणविद", sa: "छात्रः · यूट्यूबर · पर्यावरणविद्" },
  "hero.tag": { en: "Environmental advocate working to combat climate change and protect our planet's future", hi: "जलवायु परिवर्तन से लड़ने और हमारे ग्रह के भविष्य की रक्षा के लिए समर्पित पर्यावरण कार्यकर्ता", sa: "जलवायुपरिवर्तनेन सह युध्दाय मम पृथिव्याः भविष्यस्य रक्षणाय च कटिबद्धः पर्यावरणप्रचारकः" },
  
  "home.peopleImpacted": { en: "People Impacted", hi: "लोग जुड़े", sa: "जनाः सम्बद्धाः" },
  "home.treesPlanted": { en: "Trees Planted", hi: "वृक्षारोपण", sa: "वृक्षारोपणम्" },
  "home.events": { en: "Events", hi: "कार्यक्रम", sa: "कार्यक्रमाः" },
  "home.name": { en: "Triyambkeshwar Nath Tyagi", hi: "त्र्यम्बकेश्वर नाथ त्यागी", sa: "त्र्यम्बकेश्वरनाथत्यागी" },
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
  
  "service.publicSpeaking": { en: "Public Speaking", hi: "सार्वजनिक भाषण", sa: "सार्वजनिकभाषणम्" },
  "service.publicSpeakingDesc": { en: "Delivering motivational and environmental discourses.", hi: "प्रेरक और पर्यावरण संबंधित वक्तव्य देना।", sa: "प्रेरक-पर्यावरण-भाषणानं प्रदानम्।" },
  "service.teaching": { en: "Teaching & Mentoring", hi: "शिक्षण और मार्गदर्शन", sa: "शिक्षणं मार्गदर्शनञ्च" },
  "service.teachingDesc": { en: "Guiding students and youth toward purpose.", hi: "छात्रों और युवाओं को उनके उद्देश्य की ओर मार्गदर्शन करना।", sa: "छात्रान् यूवकान् च स्वोद्देश्यं प्रति मार्गदर्शनम्।" },
  "service.eventMgt": { en: "Event Management", hi: "कार्यक्रम प्रबंधन", sa: "कार्यक्रमप्रबन्धनम्" },
  "service.eventMgtDesc": { en: "Organising cultural and social gatherings at scale.", hi: "बड़े पैमाने पर सांस्कृतिक और सामाजिक सम्मेलनों का आयोजन करना।", sa: "विशालस्तरे सांस्कृतिक-सामाजिक-सम्मेलनानाम् आयोजनम्।" },
  "service.contentCreation": { en: "Content Creation", hi: "सामग्री निर्माण", sa: "सामग्रीनिर्माणम्" },
  "service.contentCreationDesc": { en: "Videos, articles and digital content on environment.", hi: "पर्यावरण पर वीडियो, लेख और डिजिटल सामग्री।", sa: "पर्यावरणविषये चलचित्राणि, लेखाः, डिजिटल-सामग्री च।" },

  "home.galleryTitle": { en: "Gallery", hi: "गैलरी", sa: "चित्रशाला" },
  "home.galleryMoments": { en: "Moments of Environmental Leadership", hi: "पर्यावरणीय नेतृत्व के क्षण", sa: "पर्यावरणीयनेतृत्वस्य क्षणाः" },
  "home.viewFullGallery": { en: "View Full Gallery →", hi: "पूरी गैलरी देखें →", sa: "पूर्णां चित्रशालां पश्यत →" },
  
  "home.mediaTitle": { en: "Media", hi: "मीडिया", sa: "प्रसारमाध्यमम्" },
  "home.inThePress": { en: "Videos & Awareness", hi: "प्रेस में", sa: "समाचारपत्रेषु" },
  "home.allMedia": { en: "All Media →", hi: "सभी मीडिया →", sa: "सर्वाणि प्रसारमाध्यमानि →" },
  
  "home.testimonialsTitle": { en: "Kind Words", hi: "शुभकामनाएं", sa: "शुभवचनानि" },
  "home.voicesOfBlessing": { en: "Voices of Blessing", hi: "आशीर्वाद के स्वर", sa: "आशीर्वादस्य स्वराः" },
  
  "home.ctaJoin": { en: "Let's join hands for the Earth, Nature & Humanity", hi: "पृथ्वी, प्रकृति और मानवता के लिए हाथ मिलाएं", sa: "पृथिव्यै, प्रकृत्यै, मानवतायै च सङ्घटीभवाम" },
  "home.ctaTogether": { en: "Together we can create a better, peaceful and sustainable world.", hi: "हम सब मिलकर एक बेहतर, शांतिपूर्ण और सतत विश्व का निर्माण कर सकते हैं।", sa: "वयं मिलित्वा उत्तमं, शान्तिपूर्णं, सततञ्च विश्वं निर्मातुं शक्नुमः।" },
  "home.getInTouch": { en: "Get in Touch", hi: "संपर्क करें", sa: "सम्पर्कं कुर्वन्तु" },

  "14": { en: "14", hi: "14", sa: "१४" },
  "Years of Age": { en: "Years of Age", hi: "वर्ष की आयु", sa: "वर्षस्य आयुः" },
  "10th": { en: "10th", hi: "10वीं", sa: "१०मः" },
  "CBSE Board Student": { en: "CBSE Board Student", hi: "सीबीएसई बोर्ड के छात्र", sa: "सीबीएसई-मण्डलस्य छात्रः" },
  "5+": { en: "5+", hi: "5+", sa: "५+" },
  "Years in Conservation": { en: "Years in Conservation", hi: "संरक्षण में वर्ष", sa: "संरक्षणे वर्षाणि" },

  "Tree Plantation Award": { en: "Tree Plantation Award", hi: "वृक्षारोपण पुरस्कार", sa: "वृक्षारोपणपुरस्कारः" },
  "Awarded by IAS Officer Sangeeta Raghav": { en: "Awarded by IAS Officer Sangeeta Raghav", hi: "आईएएस अधिकारी संगीता राघव द्वारा सम्मानित", sa: "आईएएस अधिकारिण्या सङ्गीतराघवेण सम्मानितः" },
  
  "Connecting Youth to Climate Action": { en: "Connecting Youth to Climate Action", hi: "युवाओं को जलवायु कार्रवाई से जोड़ना", sa: "यूवकान् जलवायुकार्येण सह योजनम्" },
  "News": { en: "News", hi: "समाचार", sa: "वार्ता" },
  "Interview": { en: "Interview", hi: "साक्षात्कार", sa: "साक्षात्कारः" },
  "YouTube": { en: "YouTube", hi: "यूट्यूब", sa: "यूट्यूब" },
  "Omjiworld": { en: "Omjiworld", hi: "ओमजीवर्ल्ड", sa: "ओमजीवर्ल्ड" },

  "Vision": { en: "Vision", hi: "दृष्टिकोण", sa: "दृष्टिकोणः" },
  "Mission": { en: "Mission", hi: "लक्ष्य", sa: "लक्ष्यम्" },
  "Values": { en: "Values", hi: "मूल्य", sa: "मूल्यानि" },
  "Ecosystem Restoration": { en: "Ecosystem Restoration", hi: "पारिस्थितिकी तंत्र बहाली", sa: "पारिस्थितिकीतन्त्रस्य पुनरुद्धारः" },
  "Sustainable Living": { en: "Sustainable Living", hi: "सतत जीवन", sa: "सततजीवनम्" },
  "Native tree planting, soil health preservation, and habitat protection.": { en: "Native tree planting, soil health preservation, and habitat protection.", hi: "देसी पौधे लगाना, मिट्टी के स्वास्थ्य का संरक्षण और आवास सुरक्षा।", sa: "स्वदेशीवृक्षारोपणम्, मृदास्वास्थ्यसंरक्षणम्, आवाससुरक्षा च।" },
  "Raising awareness, publishing research, and empowering youth voices.": { en: "Raising awareness, publishing research, and empowering youth voices.", hi: "जागरूकता बढ़ाना, शोध प्रकाशित करना और युवाओं की आवाज को सशक्त बनाना।", sa: "जागरूकता-प्रसारः, शोध-प्रकाशनम्, युवानां सशक्तिकरणञ्च।" },
  "Promoting waste reduction, circular economy practices, and renewable energy solutions.": { en: "Promoting waste reduction, circular economy practices, and renewable energy solutions.", hi: "अपशिष्ट में कमी, परिपत्र अर्थव्यवस्था प्रथाओं और नवीकरणीय ऊर्जा समाधानों को बढ़ावा देना।", sa: "अपशिष्टन्यूनता, चक्रीय-अर्थव्यवस्था, नवीकरणीय-ऊर्जा-समाधानानां प्रोत्साहनम्।" },

  "Childhood": { en: "Childhood", hi: "बचपन", sa: "बाल्यकालः" },
  "Ongoing": { en: "Ongoing", hi: "जारी है", sa: "प्रचलति" },
  "Present": { en: "Present", hi: "वर्तमान", sa: "वर्तमानकालः" },
  "Joined Environmental Movement": { en: "Joined Environmental Movement", hi: "पर्यावरण आंदोलन में शामिल हुए", sa: "पर्यावरणांदोलने प्रविष्टः" },
  "बचपन से ही प्रकृति के प्रति मेरे लगाव ने मुझे पर्यावरण संरक्षण की दिशा में आगे बढ़ने के लिए प्रेरित किया।": { en: "From childhood, my love for nature inspired me to move towards environmental conservation.", hi: "बचपन से ही प्रकृति के प्रति मेरे लगाव ने मुझे पर्यावरण संरक्षण की दिशा में आगे बढ़ने के लिए प्रेरित किया।", sa: "बाल्यकालादेव प्रकृत्याः प्रति मम अनुरागो मां पर्यावरणसंरक्षणार्थं प्रेरितवान्।" },
  "Climate Education": { en: "Climate Education", hi: "जलवायु शिक्षा", sa: "जलवायुशिक्षा" },
  "मैंने सतत विकास, पारिस्थितिकी और जलवायु परिवर्तन के विभिन्न पहलुओं का अध्ययन किया है और इसके लिए जागरूकता फैला रहा हूँ।": { en: "I have studied various aspects of sustainable development, ecology, and climate change and am spreading awareness about it.", hi: "मैंने सतत विकास, पारिस्थितिकी और जलवायु परिवर्तन के विभिन्न पहलुओं का अध्ययन किया है और इसके लिए जागरूकता फैला रहा हूँ।", sa: "मया सततविकासस्य, पारिस्थितिक्याः, जलवायुपरिवर्तनस्य च विविधपक्षाणाम् अध्ययनं कृतम्, तदर्थं जागरूकता च प्रसार्यते।" },
  "Spreading Awareness": { en: "Spreading Awareness", hi: "जागरूकता फैलाना", sa: "जागरूकताप्रसारः" },
  "अपने प्रयासों और अभियानों के माध्यम से मैं युवाओं को जलवायु परिवर्तन और पर्यावरण संरक्षण के प्रति जागरूक करने का काम कर रहा हूँ।": { en: "Through my efforts and campaigns, I am working to make the youth aware of climate change and environmental conservation.", hi: "अपने प्रयासों और अभियानों के माध्यम से मैं युवाओं को जलवायु परिवर्तन और पर्यावरण संरक्षण के प्रति जागरूक करने का काम कर रहा हूँ।", sa: "स्वप्रयासैः अभियानैश्च अहं यूवकान् जलवायुपरिवर्तनं पर्यावरणसंरक्षणं च प्रति जागरूकान् कर्तुं यते।" },

  // Navbar Extras
  "nav.more": { en: "More ▾", hi: "और ▾", sa: "अधिकम् ▾" },
  "nav.admin": { en: "Admin", hi: "व्यवस्थापक", sa: "प्रशासकः" },

  // Footer Strings
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
  const t = (k: keyof typeof dict | string) => dict[k as keyof typeof dict]?.[lang] ?? dict[k as keyof typeof dict]?.en ?? k;
  return <Ctx.Provider value={{ lang, setLang, t }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
