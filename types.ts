export type Language = 'DE' | 'FR' | 'EN';

export type FontStyle = 'Inter' | 'Playfair Display' | 'Space Grotesk';

export interface ThemeConfig {
  primaryColor: string;
  backgroundColor: string;
  fontPrimary: FontStyle;
  isDarkMode: boolean;
  companyNameTarget?: string; // For personalization
}

export interface LocalizedString {
  DE: string;
  FR: string;
  EN: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  iconName: string; // Lucide icon name
}

export interface BusinessCase {
  id: string;
  title: string;
  client: string;
  role: LocalizedString;
  description: LocalizedString;
  image: string;
  tags: string[];
  details?: {
    testimonial?: string;
    testimonialAuthor?: string;
    images?: string[];
    videoUrl?: string;
    audioUrl?: string;
    resultMetric?: string;
  };
}

export interface ExperienceItem {
  id: string;
  period: string;
  company: string;
  role: LocalizedString;
  description: LocalizedString;
  iconName?: string;
}

export interface AppData {
  profile: {
    name: string;
    tagline: LocalizedString;
    bio: LocalizedString;
    avatar: string;
    location: string;
    socials: SocialLink[];
  };
  cases: BusinessCase[];
  experience: ExperienceItem[];
  skills: {
    languages: LocalizedString[];
    tech: string[];
    certifications: LocalizedString[];
  };
}