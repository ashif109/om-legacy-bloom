// Central content for Om's portfolio. All strings are English fallbacks;
// short UI labels live in i18n.tsx.

export const stats = [
  { value: "14", label: "Years of Age" },
  { value: "10th", label: "CBSE Board Student" },
  { value: "5+", label: "Years in Conservation" },
];

export const missionCards = [
  { title: "Vision", body: "Creating a future where thriving ecosystems, clean energy, and sustainable communities exist in harmony with nature. We envision a world where every individual becomes a responsible guardian of the Earth, ensuring a healthier planet for future generations." },
  { title: "Mission", body: "To restore ecosystems, protect biodiversity, promote climate awareness, and inspire sustainable living through education, conservation initiatives, research, and community-driven environmental action. Every project we undertake is dedicated to creating measurable and lasting environmental impact." },
  { title: "Values", body: "Our work is guided by integrity, sustainability, innovation, collaboration, and respect for nature. We believe that meaningful environmental change is achieved when communities, science, and collective action come together to protect our planet for generations to come." },
];

import sdmCeremonyImg from "@/assets/award/sdm-award/sdm-award-ceremony.png";
import sdmCloseImg from "@/assets/award/sdm-award/sdm-award-close.png";
import newsJagranImg from "@/assets/award/sdm-award/news-jagran.jpg";
import newsKheragarhImg from "@/assets/award/sdm-award/news-kheragarh.jpg";
import newsHindustanImg from "@/assets/award/sdm-award/news-hindustan.png";
import sdmCertificateImg from "@/assets/award/Screenshot 2026-07-09 203255.png";

export const journey = [
  {
    year: "2017 - 2019",
    age: "Age 5 - 7",
    title: "Early Green Roots & First Sapling",
    category: "Plantation Drives",
    body: "Started environmental preservation journey at the young age of 5. Planted native tree species and developed a deep reverence for nature and ecological conservation in village Saiyan, Agra.",
    highlights: ["First plantation drive at age 5", "Village awareness initiatives"],
  },
  {
    year: "10 Jun 2021",
    age: "Age 9",
    title: "World Environment Day Honor by SDM Sangeeta Raghav",
    category: "Awards & Honors",
    featured: true,
    tag: "World Environment Day Milestone",
    body: "Honoured with an official Certificate of Appreciation and sapling by SDM Sangeeta Raghav (UPPCS Rank 2 / SDM Kheragarh, Agra) for extraordinary plantation drive of 21+ trees in a single day and creating 46+ awareness videos.",
    fullDetails: "On World Environment Day drive (5-10 June 2021), 9-year-old Om Tyagi planted 21+ saplings across surrounding villages and pledged a target of 10,000 trees. Recognizing his extraordinary dedication, SDM Kheragarh Smt. Sangeeta Raghav invited Om to the Tehsil Auditorium, presented him with an official appreciation certificate, and applauded his YouTube initiative educating children on 10 benefits of tree planting.",
    awarder: "Smt. Sangeeta Raghav (UPPCS 2018 Batch Rank 2, SDM Kheragarh)",
    location: "Tehsil Auditorium, Kheragarh, Agra (UP)",
    certificateTitle: "Green Selfie & Act of Kindness Award",
    images: [
      { src: sdmCloseImg, title: "Award Ceremony with SDM Sangeeta Raghav", caption: "Om Tyagi receiving official certificate & tree sapling from SDM Sangeeta Raghav at Age 9 on World Environment Day." },
      { src: sdmCeremonyImg, title: "Full Ceremony View", caption: "Om Tyagi standing with SDM Sangeeta Raghav holding the tree sapling and official certificate." },
      { src: sdmCertificateImg, title: "Official Appreciation Certificate", caption: "Issued by Office of SDM Kheragarh, Agra on 10th June 2021." },
      { src: newsJagranImg, title: "Agra Dehat Jagran Press Coverage", caption: "Featured in Dainik Jagran: 'प्रकृति ने हमें बहुत दिया, हम भी अपना कर्तव्य निभाएं'." },
      { src: newsHindustanImg, title: "Hindustan Press Coverage", caption: "Hindustan News: 'पौधरोपण पर एसडीएम ने बच्चों को किया सम्मानित'." },
      { src: newsKheragarhImg, title: "Kheragarh Samvad News", caption: "Newspaper Clipping: 'वृक्षारोपण करने पर बच्चों को किया एसडीएम खेरागढ़ ने प्रोत्साहन'." }
    ],
    stats: [
      { label: "Age at Award", value: "9 Years" },
      { label: "Trees Planted (Day 1)", value: "21+ Saplings" },
      { label: "Target Set", value: "10,000 Trees" },
      { label: "Awareness Videos", value: "46+ Videos" },
    ],
    highlights: [
      "Awarded by SDM Sangeeta Raghav (UPPCS Rank 2)",
      "World Environment Day Special Recognition (10 June 2021)",
      "Planted 21+ trees in a single day & pledged 10,000 target",
      "Front-page coverage in Dainik Jagran & Hindustan news"
    ],
  },
  {
    year: "2022 - 2023",
    age: "Age 10 - 11",
    title: "Mass Village Plantation & Youth Campaigns",
    category: "Plantation Drives",
    body: "Expanded tree-planting drives across multiple villages in Agra district. Organized door-to-door awareness campaigns encouraging students and villagers to plant native trees like Neem, Banyan, Peepal, and Jamun.",
    highlights: ["Door-to-door sapling distribution", "Village eco-clubs formation"],
  },
  {
    year: "Jan 2024",
    age: "Age 12",
    title: "Shiv Nadar University Winter School & Seminars",
    category: "Media & Press",
    body: "Participated in the Winter School Program hosted by Young Thinkers Forum at Shiv Nadar University. Spoke on environmental action and youth leadership in regional forums.",
    highlights: ["Shiv Nadar University Certificate", "Youth Thinkers Forum Representation"],
  },
  {
    year: "2025 - Present",
    age: "Age 14",
    title: "10th CBSE Student & Digital Eco-Champion",
    category: "Media & Press",
    body: "Balancing academic excellence in 10th CBSE with nationwide digital awareness through YouTube channel 'Omjiworld'. Inspiring thousands of young minds to take active responsibility for climate protection.",
    highlights: ["10th CBSE Student at LBS School, Kota", "Active YouTube Climate Channel 'Omjiworld'"],
  },
];

export const achievements = [
  {
    id: "sdm-environment-award-2021",
    title: "Green Selfie & Act of Kindness Award",
    hindiTitle: "पर्यावरण संरक्षण व जागरूकता प्रशस्ति पत्र",
    year: "10 Jun 2021",
    event: "World Environment Day",
    age: "Age 9 Milestone",
    org: "Awarded by Smt. Sangeeta Raghav (UPPCS Rank 2 / SDM Kheragarh)",
    presenter: "Smt. Sangeeta Raghav (SDM Kheragarh, Agra)",
    location: "Kheragarh Tehsil Auditorium, Agra",
    badge: "Official Honor",
    featured: true,
    image: sdmCertificateImg,
    ceremonyImage: sdmCloseImg,
    images: [
      { src: sdmCertificateImg, title: "Official Appreciation Certificate", caption: "Issued by Office of SDM Kheragarh, Agra on 10th June 2021." },
      { src: sdmCloseImg, title: "Award Ceremony Photo with SDM Sangeeta Raghav", caption: "Om Tyagi receiving official certificate & tree sapling from SDM Sangeeta Raghav at Age 9." },
      { src: sdmCeremonyImg, title: "Full Award Ceremony Moment", caption: "Standing with SDM Sangeeta Raghav holding tree sapling and official certificate." },
      { src: newsJagranImg, title: "Agra Dehat Jagran Press Coverage", caption: "Headline: 'प्रकृति ने हमें बहुत दिया, हम भी अपना कर्तव्य निभाएं'." },
      { src: newsHindustanImg, title: "Hindustan Samvad Press Coverage", caption: "Headline: 'पौधरोपण पर एसडीएम ने बच्चों को किया सम्मानित'." },
      { src: newsKheragarhImg, title: "Kheragarh Press Clipping", caption: "Headline: 'वृक्षारोपण करने पर बच्चों को किया एसडीएम खेरागढ़ ने प्रोत्साहन'." }
    ],
    achievementsAtAge9: [
      "🌿 Ek hi din mein 21+ paudhe lagakar gaon ke bacho ko prerit kiya.",
      "🎯 10,000 paudhe lagane ka lakshya nirdharit kiya.",
      "🎥 YouTube par 46+ environmental awareness videos banaye."
    ],
    description: "Honoured on World Environment Day for extraordinary tree plantation drive of 21+ trees in a single day, setting a 10,000 tree goal, and creating 46+ educational YouTube videos."
  },
  {
    id: "snu-winter-school-2024",
    title: "Shiv Nadar University Winter School",
    year: 2024,
    org: "Young Thinkers Forum, SNU",
    badge: "Participation",
  },
];

export const skills = [
  { name: "भाषण देना (Speech)", value: 95 },
  { name: "मंच संचालन (Hosting)", value: 90 },
  { name: "नेतृत्व (Leadership)", value: 92 },
  { name: "पढ़ाना (Teaching)", value: 85 },
  { name: "लेखन (Writing)", value: 88 },
  { name: "आयोजन करना (Organizing)", value: 90 },
  { name: "कंप्यूटर (Computer)", value: 80 },
  { name: "सोशल मीडिया (Social Media)", value: 95 },
  { name: "वीडियो बनाना (Video Making)", value: 95 },
];

export const education = [
  { period: "Present", degree: "10th Standard (CBSE)", org: "Lal Bahadur Shashtri School, Ranpur Kota" },
  { period: "Since age 5", degree: "Environmental Studies, Ecology", org: "Eco-Conservation Institute" },
];

export const certificates: any[] = [];

export const media = [
  { 
    type: "YouTube", 
    title: "Connecting Youth to Climate Action", 
    source: "Omjiworld", 
    year: 2024,
    url: "https://www.youtube.com/watch?v=0foE_izpiBE",
    thumbnail: "https://img.youtube.com/vi/0foE_izpiBE/hqdefault.jpg"
  },
  { 
    type: "YouTube", 
    title: "Prize Distribution by UPPCS 2018 batch 2nd Rank holder & SDM Kheragarh Smt Sangeeta Raghav", 
    source: "Omjiworld", 
    year: 2021,
    url: "https://www.youtube.com/watch?v=2IBc9tyucOI",
    thumbnail: "https://img.youtube.com/vi/2IBc9tyucOI/hqdefault.jpg"
  },
];

export const socialWork = [
  { title: "Planted Trees", impact: "Award from IAS Officer Sangeeta Raghav", year: 2024 },
  { title: "Knowledge Sharing", impact: "YouTube videos for every group of society", year: 2024 },
];

export const trainings: any[] = [];
export const workshops: any[] = [];
export const events: any[] = [];
export const seminars: any[] = [];
export const camps: any[] = [];

export const responsibilities: any[] = [];

export const projects: any[] = [];
export const publications: any[] = [];
export const testimonials: any[] = [];
export const downloads: any[] = [];

export const contact = {
  phone: "9412162807",
  email: "omjiworld@gmail.com",
  address: "A- 1006 Om Shree Platinum Taj Nagari Phase-2 Agra UP",
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/lal.singh.52090" },
    { name: "Instagram", href: "https://instagram.com/omjiworld_05" },
    { name: "WhatsApp", href: "https://wa.me/919412162807" },
    { name: "YouTube", href: "https://www.youtube.com/@omjiworld1700" },
  ],
};
