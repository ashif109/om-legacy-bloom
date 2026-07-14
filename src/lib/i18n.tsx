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
  "hero.role": { en: "Student · Youtuber · Astrologer", hi: "छात्र · यूट्यूबर · ज्योतिषी", sa: "छात्रः · यूट्यूबर · ज्योतिषी" },
  "hero.tag": { en: "Working for Dharma & Vedic Astrology", hi: "सनातन धर्म और वैदिक ज्योतिष के लिए समर्पित", sa: "सनातनधर्मस्य वैदिकज्योतिषस्य च प्रसारे समर्पितः" },
  
  "home.peopleImpacted": { en: "People Impacted", hi: "लोग जुड़े", sa: "जनाः सम्बद्धाः" },
  "home.events": { en: "Events", hi: "कार्यक्रम", sa: "कार्यक्रमाः" },
  "home.name": { en: "Triyambkeshwar Nath Tyagi", hi: "त्र्यम्बकेश्वर नाथ त्यागी", sa: "त्र्यम्बकेश्वरनाथत्यागी" },
  "home.aboutTitle": { en: "About Me", hi: "मेरे बारे में", sa: "मम परिचयः" },
  "home.aboutDedicated": { en: "Dedicated to Dharma,", hi: "धर्म के प्रति समर्पित,", sa: "धर्माय समर्पितः," },
  "home.aboutInspired": { en: "Inspired to Serve", hi: "सेवा के लिए प्रेरित", sa: "सेवायै प्रेरितः" },
  "home.journeyTitle": { en: "Journey", hi: "यात्रा", sa: "यात्रा" },
  "home.journeyHighlights": { en: "My Highlights", hi: "मेरी मुख्य झलकियाँ", sa: "मम प्रमुखांशाः" },
  "home.fullJourney": { en: "Full Journey →", hi: "पूरी यात्रा →", sa: "पूर्णा यात्रा →" },
  "home.achievementsTitle": { en: "Achievements", hi: "उपलब्धियाँ", sa: "सिद्धयः" },
  "home.featuredHonors": { en: "Featured Honors", hi: "प्रमुख सम्मान", sa: "प्रमुखाः सम्मानाः" },
  "home.whatIDo": { en: "What I Do", hi: "मैं क्या करता हूँ", sa: "मम कार्याणि" },
  "home.serviceInMotion": { en: "Service in Motion", hi: "सेवा कार्य", sa: "सेवाकार्यम्" },
  
  "service.publicSpeaking": { en: "Public Speaking", hi: "सार्वजनिक भाषण", sa: "सार्वजनिकभाषणम्" },
  "service.publicSpeakingDesc": { en: "Delivering motivational and spiritual discourses.", hi: "प्रेरक और आध्यात्मिक प्रवचन देना।", sa: "प्रेरक-आध्यात्मिक-प्रवचनानां प्रदानम्।" },
  "service.teaching": { en: "Teaching & Mentoring", hi: "शिक्षण और मार्गदर्शन", sa: "शिक्षणं मार्गदर्शनञ्च" },
  "service.teachingDesc": { en: "Guiding students and youth toward purpose.", hi: "छात्रों और युवाओं को उनके उद्देश्य की ओर मार्गदर्शन करना।", sa: "छात्रान् यूवकान् च स्वोद्देश्यं प्रति मार्गदर्शनम्।" },
  "service.eventMgt": { en: "Event Management", hi: "कार्यक्रम प्रबंधन", sa: "कार्यक्रमप्रबन्धनम्" },
  "service.eventMgtDesc": { en: "Organising cultural and social gatherings at scale.", hi: "बड़े पैमाने पर सांस्कृतिक और सामाजिक सम्मेलनों का आयोजन करना।", sa: "विशालस्तरे सांस्कृतिक-सामाजिक-सम्मेलनानाम् आयोजनम्।" },
  "service.contentCreation": { en: "Content Creation", hi: "सामग्री निर्माण", sa: "सामग्रीनिर्माणम्" },
  "service.contentCreationDesc": { en: "Videos, articles and digital content on dharma.", hi: "धर्म पर वीडियो, लेख और डिजिटल सामग्री।", sa: "धर्मविषये चलचित्राणि, लेखाः, डिजिटल-सामग्री च।" },

  "home.galleryTitle": { en: "Gallery", hi: "गैलरी", sa: "चित्रशाला" },
  "home.galleryMoments": { en: "Moments of Seva & Sanskar", hi: "सेवा और संस्कार के क्षण", sa: "सेवा-संस्कारयोः क्षणाः" },
  "home.viewFullGallery": { en: "View Full Gallery →", hi: "पूरी गैलरी देखें →", sa: "पूर्णां चित्रशालां पश्यत →" },
  
  "home.mediaTitle": { en: "Media", hi: "मीडिया", sa: "प्रसारमाध्यमम्" },
  "home.inThePress": { en: "In the Press", hi: "प्रेस में", sa: "समाचारपत्रेषु" },
  "home.allMedia": { en: "All Media →", hi: "सभी मीडिया →", sa: "सर्वाणि प्रसारमाध्यमानि →" },
  
  "home.testimonialsTitle": { en: "Kind Words", hi: "शुभकामनाएं", sa: "शुभवचनानि" },
  "home.voicesOfBlessing": { en: "Voices of Blessing", hi: "आशीर्वाद के स्वर", sa: "आशीर्वादस्य स्वराः" },
  
  "home.ctaJoin": { en: "Let's join hands for Dharma, Culture & Humanity", hi: "धर्म, संस्कृति और मानवता के लिए हाथ मिलाएं", sa: "धर्माय, संस्कृत्यै, मानवतायै च सङ्घटीभवाम" },
  "home.ctaTogether": { en: "Together we can create a better, peaceful and dhārmic world.", hi: "हम सब मिलकर एक बेहतर, शांतिपूर्ण और धार्मिक विश्व का निर्माण कर सकते हैं।", sa: "वयं मिलित्वा उत्तमं, शान्तिपूर्णं, धार्मिकं च विश्वं निर्मातुं शक्नुमः।" },
  "home.getInTouch": { en: "Get in Touch", hi: "संपर्क करें", sa: "सम्पर्कं कुर्वन्तु" },

  // Stats Data
  "14": { en: "14", hi: "14", sa: "१४" },
  "Years of Age": { en: "Years of Age", hi: "वर्ष की आयु", sa: "वर्षस्य आयुः" },
  "10th": { en: "10th", hi: "10वीं", sa: "१०मः" },
  "CBSE Board Student": { en: "CBSE Board Student", hi: "सीबीएसई बोर्ड के छात्र", sa: "सीबीएसई-मण्डलस्य छात्रः" },
  "5+": { en: "5+", hi: "5+", sa: "५+" },
  "Years in Gurukul": { en: "Years in Gurukul", hi: "गुरुकुल में वर्ष", sa: "गुरुकुले वर्षाणि" },

  // DB Fallback texts that appear
  "Tree Plantation Award": { en: "Tree Plantation Award", hi: "वृक्षारोपण पुरस्कार", sa: "वृक्षारोपणपुरस्कारः" },
  "Awarded by IAS Officer Sangeeta Raghav": { en: "Awarded by IAS Officer Sangeeta Raghav", hi: "आईएएस अधिकारी संगीता राघव द्वारा सम्मानित", sa: "आईएएस अधिकारिण्या सङ्गीतराघवेण सम्मानितः" },
  
  "Connecting Youth to Sanatan Dharma": { en: "Connecting Youth to Sanatan Dharma", hi: "युवाओं को सनातन धर्म से जोड़ना", sa: "यूवकान् सनातनधर्मेण सह योजनम्" },
  "News": { en: "News", hi: "समाचार", sa: "वार्ता" },
  "Interview": { en: "Interview", hi: "साक्षात्कार", sa: "साक्षात्कारः" },
  "YouTube": { en: "YouTube", hi: "यूट्यूब", sa: "यूट्यूब" },
  "Omjiworld": { en: "Omjiworld", hi: "ओमजीवर्ल्ड", sa: "ओमजीवर्ल्ड" },

  // Site Data text content (mixed with Hindi already in source)
  "Vision": { en: "Vision", hi: "दृष्टिकोण", sa: "दृष्टिकोणः" },
  "Mission": { en: "Mission", hi: "लक्ष्य", sa: "लक्ष्यम्" },
  "Values": { en: "Values", hi: "मूल्य", sa: "मूल्यानि" },
  "ज्योतिष, वेदों और शास्त्रों के वैज्ञानिक और आध्यात्मिक महत्व को पूरी दुनिया में फैलाकर हिंदू धर्म और सनातन धर्म के उत्थान के लिए कुछ महान और ऐतिहासिक कार्य करना है।": { en: "To do some great and historic work for the upliftment of Hinduism and Sanatan Dharma by spreading the scientific and spiritual importance of Astrology, Vedas and Shastras across the world.", hi: "ज्योतिष, वेदों और शास्त्रों के वैज्ञानिक और आध्यात्मिक महत्व को पूरी दुनिया में फैलाकर हिंदू धर्म और सनातन धर्म के उत्थान के लिए कुछ महान और ऐतिहासिक कार्य करना है।", sa: "सम्पूर्णविश्वे ज्योतिषस्य, वेदानां, शास्त्राणां च वैज्ञानिकम् आध्यात्मिकं च महत्त्वं प्रसार्य हिन्दुधर्मस्य सनातनधर्मस्य च उत्थानाय किमपि महत् ऐतिहासिकं च कार्यं कर्तुम् अस्ति।" },
  "सनातन धर्म केवल एक परंपरा नहीं, बल्कि जीवन जीने का सबसे उत्तम विज्ञान है। अपनी जड़ों (Roots) से जुड़िए।": { en: "Sanatan Dharma is not just a tradition, but the best science of living life. Connect with your roots.", hi: "सनातन धर्म केवल एक परंपरा नहीं, बल्कि जीवन जीने का सबसे उत्तम विज्ञान है। अपनी जड़ों (Roots) से जुड़िए।", sa: "सनातनधर्मः न केवलं परम्परा, अपितु जीवनयापनस्य सर्वोत्तमं विज्ञानम् अस्ति। स्वमूलैः सह सम्बद्धाः भवन्तु।" },
  "उम्र चाहे जो भी हो, यदि हमारे पास अपने धर्म के प्रति अटूट निष्ठा और अनुशासन है, तो हम आधुनिक शिक्षा और प्राचीन विद्या दोनों में एक साथ महारत हासिल कर सकते हैं।": { en: "Whatever the age, if we have unwavering devotion and discipline towards our religion, then we can master both modern education and ancient knowledge at the same time.", hi: "उम्र चाहे जो भी हो, यदि हमारे पास अपने धर्म के प्रति अटूट निष्ठा और अनुशासन है, तो हम आधुनिक शिक्षा और प्राचीन विद्या दोनों में एक साथ महारत हासिल कर सकते हैं।", sa: "वयोऽपि यत् किमपि भवेत्, यदि अस्माकं धर्मं प्रति अतुला निष्ठा अनुशासनञ्च अस्ति, तर्हि वयं युगपदेव आधुनिकशिक्षायां प्राचीनायां विद्यायाञ्च नैपुण्यं प्राप्तुं शक्नुमः।" },

  "Childhood": { en: "Childhood", hi: "बचपन", sa: "बाल्यकालः" },
  "Ongoing": { en: "Ongoing", hi: "जारी है", sa: "प्रचलति" },
  "Present": { en: "Present", hi: "वर्तमान", sa: "वर्तमानकालः" },
  "Joined Sanatan Gurukulam": { en: "Joined Sanatan Gurukulam", hi: "सनातन गुरुकुल में शामिल हुए", sa: "सनातनगुरुकुले प्रविष्टः" },
  "जब मैं बहुत छोटा (5 वर्ष) था, तब मेरे माता-पिता और परिवार की प्रेरणा से मेरा दाखिला वाराणसी (काशी) के इस पावन गुरुकुल में हुआ।": { en: "When I was very young (5 years old), with the inspiration of my parents and family, I got enrolled in this holy Gurukul of Varanasi (Kashi).", hi: "जब मैं बहुत छोटा (5 वर्ष) था, तब मेरे माता-पिता और परिवार की प्रेरणा से मेरा दाखिला वाराणसी (काशी) के इस पावन गुरुकुल में हुआ।", sa: "यदा अहम् अतीव बालः (५ वर्षस्य) आसम्, तदा मातापित्रोः परिवारस्य च प्रेरणया वाराणस्याः (काश्याः) अस्मिन् पवित्रे गुरुकुले मम प्रवेशः अभवत्।" },
  "Vedic Education": { en: "Vedic Education", hi: "वैदिक शिक्षा", sa: "वैदिकी शिक्षा" },
  "गुरुकुल में रहकर मैंने पारंपरिक रूप से वेदों, मंत्रों, शास्त्रों और वैदिक ज्योतिष का गहन अध्ययन किया है।": { en: "Living in Gurukul, I have traditionally studied Vedas, Mantras, Shastras and Vedic Astrology deeply.", hi: "गुरुकुल में रहकर मैंने पारंपरिक रूप से वेदों, मंत्रों, शास्त्रों और वैदिक ज्योतिष का गहन अध्ययन किया है।", sa: "गुरुकुले स्थित्वा मया परम्परानुसारं वेदानां, मन्त्राणां, शास्त्राणां, वैदिकज्योतिषस्य च गहनम् अध्ययनं कृतम् अस्ति।" },
  "Spreading Knowledge": { en: "Spreading Knowledge", hi: "ज्ञान का प्रसार", sa: "ज्ञानस्य प्रसारः" },
  "अपने यूट्यूब चैनल के माध्यम से युवाओं को सनातन धर्म की जड़ों से जोड़ने का प्रयास कर रहा हूँ।": { en: "Trying to connect the youth with the roots of Sanatan Dharma through my YouTube channel.", hi: "अपने यूट्यूब चैनल के माध्यम से युवाओं को सनातन धर्म की जड़ों से जोड़ने का प्रयास कर रहा हूँ।", sa: "स्वयूट्यूब-माध्यमेन यूवकान् सनातनधर्मस्य मूलैः सह संयोजयितुं प्रयासं करोमि।" },

  // Navbar Extras
  "nav.more": { en: "More ▾", hi: "और ▾", sa: "अधिकम् ▾" },
  "nav.admin": { en: "Admin", hi: "व्यवस्थापक", sa: "प्रशासकः" },

  // Footer Strings
  "footer.pathTogether": { en: "Let's walk the path of Dharma together", hi: "आइए एक साथ धर्म के मार्ग पर चलें", sa: "आगच्छ, वयं सहैव धर्मस्य मार्गे चलाम" },
  "footer.subscribeUpdates": { en: "Subscribe for updates on programs, camps and publications.", hi: "कार्यक्रमों, शिविरों और प्रकाशनों पर अपडेट के लिए सदस्यता लें।", sa: "कार्यक्रमाणां, शिबिराणां, प्रकाशनानां च अद्यतनाय सदस्यतां गृह्णन्तु।" },
  "footer.subscribe": { en: "Subscribe", hi: "सदस्यता लें", sa: "सदस्यतां गृह्णन्तु" },
  "footer.quickLinks": { en: "Quick Links", hi: "महत्वपूर्ण लिंक", sa: "महत्त्वपूर्ण-सम्पर्काः" },
  "footer.explore": { en: "Explore", hi: "अन्वेषण करें", sa: "अन्वेषणं कुर्वन्तु" },
  "footer.contact": { en: "Contact", hi: "संपर्क", sa: "सम्पर्कः" },
  "footer.bio": { en: "Sanskrit Scholar · Speaker · Leader. Working for Dharma, Education and Society.", hi: "संस्कृत विद्वान · वक्ता · नेता। धर्म, शिक्षा और समाज के लिए कार्यरत।", sa: "संस्कृतविद्वान् · वक्ता · नेता। धर्माय, शिक्षायै, समाजाय च कार्यरतः।" },
  "footer.copyright": { en: "Om · All Rights Reserved · Designed with devotion for Dharma", hi: "ओम · सर्वाधिकार सुरक्षित · धर्म के प्रति भक्ति के साथ निर्मित", sa: "ओम् · सर्वाधिकाराः सुरक्षिताः · धर्माय भक्त्या निर्मितम्" },
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
