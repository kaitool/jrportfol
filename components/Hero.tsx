import React from 'react';
import { motion } from 'framer-motion';
import { AppData, Language, ThemeConfig } from '../types';
import { fadeInUp } from '../utils/animations';
import { ArrowRight, Download, Instagram, Linkedin, Video, Twitter, Facebook, Youtube, Github, Mail, Globe } from 'lucide-react';

interface HeroProps {
  data: AppData;
  lang: Language;
  theme: ThemeConfig;
  translations: any;
}

const SocialIcon = ({ name }: { name: string }) => {
  switch (name) {
    case 'Instagram': return <Instagram size={20} />;
    case 'Linkedin': return <Linkedin size={20} />;
    case 'Video': return <Video size={20} />; // TikTok
    case 'Twitter': return <Twitter size={20} />;
    case 'Facebook': return <Facebook size={20} />;
    case 'Youtube': return <Youtube size={20} />;
    case 'Github': return <Github size={20} />;
    case 'Mail': return <Mail size={20} />;
    case 'Globe': return <Globe size={20} />;
    default: return <ArrowRight size={20} />;
  }
};

const Hero: React.FC<HeroProps> = ({ data, lang, theme, translations }) => {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center px-4 pt-20 pb-10 relative overflow-hidden">
      
      {/* Dynamic personalized greeting */}
      {theme.companyNameTarget && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-24 left-0 right-0 flex justify-center pointer-events-none"
        >
          <span 
            className="px-4 py-1 rounded-full text-sm font-medium bg-opacity-10 backdrop-blur-md border border-opacity-20"
            style={{ 
              backgroundColor: `${theme.primaryColor}20`, 
              color: theme.primaryColor,
              borderColor: theme.primaryColor 
            }}
          >
            {translations.headings.personalize[lang]} <strong>{theme.companyNameTarget}</strong>
          </span>
        </motion.div>
      )}

      <div className="container mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="order-2 md:order-1 space-y-6"
        >
          <h2 className="text-xl font-medium text-gray-500 dark:text-gray-400">
             Hello, I'm {data.profile.name}
          </h2>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900 dark:text-white font-serif">
            {data.profile.tagline[lang]}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
            {data.profile.bio[lang]}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              className="px-8 py-3 rounded-full text-white font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center gap-2"
              style={{ backgroundColor: theme.primaryColor }}
            >
              {translations.actions.contactMe[lang]} <ArrowRight size={18} />
            </button>
            <button 
              className="px-8 py-3 rounded-full border-2 font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition-all flex items-center gap-2 text-gray-800 dark:text-white border-gray-200 dark:border-slate-700"
            >
              CV / Werdegang <Download size={18} />
            </button>
          </div>

          <div className="flex gap-4 pt-8 border-t border-gray-100 dark:border-slate-800 mt-8">
            {data.profile.socials.map((social, idx) => (
              <a 
                key={idx}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="p-3 rounded-full bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-gray-300 hover:text-white transition-colors"
                style={{ '--hover-color': theme.primaryColor } as React.CSSProperties}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = theme.primaryColor}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = ''}
              >
                <SocialIcon name={social.iconName} />
              </a>
            ))}
          </div>
        </motion.div>

        {/* Image / Visual */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="order-1 md:order-2 flex justify-center relative"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div 
              className="absolute inset-0 rounded-full opacity-20 blur-3xl animate-pulse"
              style={{ backgroundColor: theme.primaryColor }}
            />
            <img 
              src={data.profile.avatar} 
              alt={data.profile.name} 
              className="w-full h-full object-cover rounded-3xl shadow-2xl relative z-10 rotate-3 transition-transform hover:rotate-0 duration-500 border-4 border-white dark:border-slate-800"
            />
            
            {/* Floating Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -right-4 top-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl z-20 max-w-[150px]"
            >
              <div className="font-bold text-2xl text-gray-900 dark:text-white">C2</div>
              <div className="text-xs text-gray-500">English Proficiency (LA)</div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -left-8 bottom-10 bg-white dark:bg-slate-800 p-4 rounded-xl shadow-xl z-20 max-w-[180px]"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                <span className="font-bold text-sm text-gray-900 dark:text-white">RadioFr. Host</span>
              </div>
              <div className="text-xs text-gray-500">Daytime & Feierabend</div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;