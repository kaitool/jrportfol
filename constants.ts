import { AppData, ThemeConfig } from './types';

export const DEFAULT_THEME: ThemeConfig = {
  primaryColor: '#3b82f6', // Default Blue
  backgroundColor: '#ffffff',
  fontPrimary: 'Inter',
  isDarkMode: false,
  companyNameTarget: '',
};

export const INITIAL_DATA: AppData = {
  profile: {
    name: "Joel Rätz",
    tagline: {
      DE: "Creator x Producer x Strategist",
      FR: "Créateur x Producteur x Stratège",
      EN: "Creator x Producer x Strategist"
    },
    bio: {
      DE: "Mediamatiker EFZ (PostFinance) & Creator. Ich verbinde Creator-Speed mit Corporate-Qualität. Erwähnt im Digital Commerce Blog der Schweizerischen Post (13.05.2022) für Social Commerce. Hybrid aus Produktion, Storytelling und Strategie.",
      FR: "Médiamaticien CFC (PostFinance) & Créateur. J'allie la rapidité d'un créateur à la qualité corporate. Mentionné dans le blog Digital Commerce de la Poste Suisse (13.05.2022). Hybride de production et stratégie.",
      EN: "Mediamatiker EFZ (PostFinance) & Creator. I combine creator speed with corporate quality. Featured in the Swiss Post Digital Commerce Blog (13.05.2022) for Social Commerce. A hybrid of production, storytelling, and strategy."
    },
    avatar: "https://picsum.photos/400/400?grayscale", // Placeholder
    location: "Fribourg / Bern, Switzerland",
    socials: [
      { platform: "Instagram", url: "https://instagram.com/widrluege_", iconName: "Instagram" },
      { platform: "TikTok", url: "https://tiktok.com/@widrluege", iconName: "Video" },
      { platform: "LinkedIn", url: "#", iconName: "Linkedin" }
    ]
  },
  cases: [
    {
      id: "c1",
      title: "Social Commerce @NIKIN",
      client: "NIKIN / Swiss Post Feature",
      role: { DE: "Creator & Producer", FR: "Créateur & Producteur", EN: "Creator & Producer" },
      description: {
        DE: "Produktion von TikTok-First Content für NIKIN. Von der Schweizerischen Post (Digital Commerce Blog, 13.05.2022) als Best Practice für Social Commerce und authentisches Storytelling hervorgehoben.",
        FR: "Production de contenu TikTok-First pour NIKIN. Mis en avant par la Poste Suisse (Blog Digital Commerce, 13.05.2022) comme exemple de réussite en commerce social.",
        EN: "Production of TikTok-First content for NIKIN. Highlighted by Swiss Post (Digital Commerce Blog, 13.05.2022) as a best practice for social commerce and authentic storytelling."
      },
      image: "https://picsum.photos/600/400?random=1",
      tags: ["Social Commerce", "TikTok", "Brand Storytelling"],
      details: {
        resultMetric: "Best Practice",
        testimonial: "Erwähnt im Artikel: 'Score! Social Commerce und Nachhaltigkeit' (digital-commerce.post.ch)",
        testimonialAuthor: "Schweizerische Post, Digital Commerce Blog"
      }
    },
    {
      id: "c3",
      title: "RadioFr. Matinale",
      client: "RadioFr.",
      role: { DE: "Host Morgenshow", FR: "Animateur Matinale", EN: "Morning Show Host" },
      description: {
        DE: "Host der Primetime-Morgenshow. Presseerwähnung in La Liberté (25.01.2023) zum neuen Team. Entwicklung von On-Air Inhalten und begleitenden Video-Kampagnen (YouTube).",
        FR: "Animateur de la matinale. Mention presse dans La Liberté (25.01.2023). Développement de contenus à l'antenne et campagnes vidéo (YouTube).",
        EN: "Host of the primetime Morning Show. Press mention in La Liberté (25.01.2023) regarding the new team. Development of on-air content and video campaigns."
      },
      image: "https://picsum.photos/600/400?random=3",
      tags: ["Broadcast", "Live Host", "Press Feature"],
      details: {
        resultMetric: "Primetime Host",
        testimonial: "Das Morgenshow-Team wurde von La Liberté (25.01.2023) und in Sender-Kampagnen porträtiert.",
        testimonialAuthor: "La Liberté / RadioFr."
      }
    },
    {
      id: "c2",
      title: "SplashMC Network",
      client: "Self-Founded",
      role: { DE: "Founder & Project Lead", FR: "Fondateur & Chef de projet", EN: "Founder & Project Lead" },
      description: {
        DE: "Aufbau eines Minecraft Minigames-Netzwerks während der Pandemie. Community Management und technische Administration.",
        FR: "Création d'un réseau de mini-jeux Minecraft pendant la pandémie. Gestion de communauté et administration technique.",
        EN: "Building a Minecraft minigames network during the pandemic. Community management and technical administration."
      },
      image: "https://picsum.photos/600/400?random=2",
      tags: ["Entrepreneurship", "Gaming", "Management"]
    }
  ],
  experience: [
    {
      id: "e1",
      period: "Present",
      company: "RadioFr. Freiburg",
      role: { DE: "Radio Host & Redakteur", FR: "Animateur Radio & Rédacteur", EN: "Radio Host & Editor" },
      description: {
        DE: "On-Air & On-Platform: Host der Morgenshow (belegt via La Liberté 25.01.2023) und Produktion von Video-Content für Social Media Kanäle.",
        FR: "On-Air & On-Platform : Animateur de la matinale (mention La Liberté 25.01.2023) et production de contenu vidéo.",
        EN: "On-Air & On-Platform: Morning Show Host (referenced in La Liberté 25.01.2023) and video content production."
      },
      iconName: "Mic"
    },
    {
      id: "e_edu",
      period: "Foundation",
      company: "PostFinance",
      role: { DE: "Mediamatiker EFZ", FR: "Médiamaticien CFC", EN: "Mediamatiker EFZ" },
      description: {
        DE: "Solides Fundament in Corporate Communications, Video und Design. Schnittstelle zwischen Technik und Marketing. Porträtiert auf Whatchado.",
        FR: "Solides bases en communication d'entreprise, vidéo et design. Interface entre technique et marketing. Portrait sur Whatchado.",
        EN: "Solid foundation in corporate communications, video, and design. Intersection of tech and marketing. Featured on Whatchado."
      },
      iconName: "Briefcase"
    },
    {
      id: "e3",
      period: "2019 - 2020",
      company: "Los Angeles",
      role: { DE: "Education & Language", FR: "Éducation & Langue", EN: "Education & Language" },
      description: {
        DE: "Ein Jahr in den USA zur Perfektionierung der Englischkenntnisse (C2 Proficiency). Kultureller Austausch und Content Creation Mindset.",
        FR: "Une année aux USA pour perfectionner l'anglais (C2 Proficiency). Échange culturel et mindset de création de contenu.",
        EN: "One year in the USA to perfect English skills (C2 Proficiency). Cultural exchange and content creation mindset."
      },
      iconName: "Plane"
    }
  ],
  skills: {
    languages: [
      { DE: "Deutsch (Muttersprache)", FR: "Allemand (Langue maternelle)", EN: "German (Native)" },
      { DE: "Französisch (Fliessend)", FR: "Français (Courant)", EN: "French (Fluent)" },
      { DE: "Englisch (C2 Proficiency)", FR: "Anglais (C2 Proficiency)", EN: "English (C2 Proficiency)" }
    ],
    tech: ["Adobe Creative Cloud", "Social Media Strategy", "Audio/Video Production", "CMS & Web Basics", "Community Management"],
    certifications: [
      { DE: "Mediamatiker EFZ (PostFinance)", FR: "Médiamaticien CFC (PostFinance)", EN: "Mediamatiker EFZ (PostFinance)" },
      { DE: "EC English C2 Proficiency", FR: "EC English C2 Proficiency", EN: "EC English C2 Proficiency" }
    ]
  }
};

export const TRANSLATIONS = {
  nav: {
    home: { DE: "Start", FR: "Accueil", EN: "Home" },
    work: { DE: "Projekte", FR: "Projets", EN: "Work" },
    cv: { DE: "Werdegang", FR: "Parcours", EN: "CV" },
    contact: { DE: "Kontakt", FR: "Contact", EN: "Contact" }
  },
  headings: {
    featuredCases: { DE: "Business Cases & Erwähnungen", FR: "Business Cases & Mentions", EN: "Business Cases & Mentions" },
    experience: { DE: "Mein Werdegang", FR: "Mon Parcours", EN: "My Journey" },
    skills: { DE: "Kompetenzen", FR: "Compétences", EN: "Skills" },
    personalize: { DE: "Für Sie personalisiert", FR: "Personnalisé pour vous", EN: "Personalized for you" }
  },
  actions: {
    viewDetails: { DE: "Details & Belege", FR: "Détails & Preuves", EN: "Details & Proof" },
    close: { DE: "Schließen", FR: "Fermer", EN: "Close" },
    contactMe: { DE: "Kontaktieren Sie mich", FR: "Contactez-moi", EN: "Contact Me" }
  }
};