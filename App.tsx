import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Globe, Moon, Sun, Menu, X, Mic, Gamepad2, Plane, Briefcase } from 'lucide-react';

// Data & Types
import { INITIAL_DATA, DEFAULT_THEME, TRANSLATIONS } from './constants';
import { AppData, Language, ThemeConfig, BusinessCase } from './types';
import { fadeInUp, staggerContainer } from './utils/animations';

// Components
import Hero from './components/Hero';
import ProjectModal from './components/ProjectModal';
import AdminDashboard from './components/AdminDashboard';

function App() {
  // --- State ---
  const [data, setData] = useState<AppData>(INITIAL_DATA);
  const [theme, setTheme] = useState<ThemeConfig>(DEFAULT_THEME);
  const [lang, setLang] = useState<Language>('DE');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<BusinessCase | null>(null);

  // --- Effects ---
  // Apply Theme Variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--font-primary', theme.fontPrimary);
    
    if (theme.isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // --- Handlers ---
  const toggleLang = () => {
    if (lang === 'DE') setLang('EN');
    else if (lang === 'EN') setLang('FR');
    else setLang('DE');
  };

  const getIcon = (name: string) => {
    switch(name) {
      case 'Mic': return <Mic size={24} />;
      case 'Gamepad2': return <Gamepad2 size={24} />;
      case 'Plane': return <Plane size={24} />;
      default: return <Briefcase size={24} />;
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 bg-white dark:bg-slate-950 font-sans text-gray-900 dark:text-gray-100`}>
      
      {/* --- Navbar --- */}
      <nav className="fixed top-0 w-full z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-gray-100 dark:border-slate-800 transition-all duration-300">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="text-xl font-bold font-serif tracking-tight flex items-center gap-2">
            <span style={{ color: theme.primaryColor }}>J</span>oel Rätz
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="hover:text-blue-500 transition">{TRANSLATIONS.nav.home[lang]}</a>
            <a href="#work" className="hover:text-blue-500 transition">{TRANSLATIONS.nav.work[lang]}</a>
            <a href="#experience" className="hover:text-blue-500 transition">{TRANSLATIONS.nav.cv[lang]}</a>
            
            <div className="h-6 w-px bg-gray-200 dark:bg-slate-700 mx-2" />
            
            <button onClick={toggleLang} className="flex items-center gap-1 font-medium hover:opacity-70 transition">
              <Globe size={16} /> {lang}
            </button>
            <button onClick={() => setTheme({...theme, isDarkMode: !theme.isDarkMode})} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition">
              {theme.isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={toggleLang} className="text-sm font-bold">{lang}</button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* --- Mobile Menu --- */}
      {isMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 z-30 bg-white dark:bg-slate-950 pt-24 px-6 md:hidden"
        >
          <div className="flex flex-col gap-6 text-2xl font-serif">
            <a href="#" onClick={() => setIsMenuOpen(false)}>{TRANSLATIONS.nav.home[lang]}</a>
            <a href="#work" onClick={() => setIsMenuOpen(false)}>{TRANSLATIONS.nav.work[lang]}</a>
            <a href="#experience" onClick={() => setIsMenuOpen(false)}>{TRANSLATIONS.nav.cv[lang]}</a>
            <hr className="border-gray-200 dark:border-slate-800" />
            <button onClick={() => setTheme({...theme, isDarkMode: !theme.isDarkMode})} className="flex items-center gap-2 text-lg">
              {theme.isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>
        </motion.div>
      )}

      {/* --- CMS Trigger (Hidden Corner) --- */}
      <button 
        onClick={() => setIsAdminOpen(true)}
        className="fixed bottom-4 left-4 z-50 p-2 bg-gray-200 dark:bg-slate-800 rounded-full opacity-30 hover:opacity-100 transition-opacity"
        title="Admin Dashboard"
      >
        <Settings size={20} />
      </button>

      {/* --- Admin Modal --- */}
      <AdminDashboard 
        isOpen={isAdminOpen} 
        onClose={() => setIsAdminOpen(false)} 
        data={data}
        onUpdateData={setData}
        theme={theme}
        onUpdateTheme={setTheme}
      />

      {/* --- Main Content --- */}
      <main>
        
        <Hero data={data} lang={lang} theme={theme} translations={TRANSLATIONS} />

        {/* --- Work Section --- */}
        <section id="work" className="py-20 bg-gray-50 dark:bg-slate-900/50">
          <div className="container mx-auto px-4 max-w-6xl">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-12"
            >
              <h2 className="text-3xl font-serif font-bold mb-4">{TRANSLATIONS.headings.featuredCases[lang]}</h2>
              <div className="w-20 h-1 bg-blue-500 rounded" style={{ backgroundColor: theme.primaryColor }} />
            </motion.div>

            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {data.cases.map((project) => (
                <motion.div 
                  key={project.id}
                  variants={fadeInUp}
                  className="group relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">{project.client}</p>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-blue-500 transition-colors" style={{ '--hover-color': theme.primaryColor } as React.CSSProperties}>{project.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">{project.description[lang]}</p>
                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-slate-700 flex justify-between items-center">
                      <span className="text-xs font-medium bg-gray-100 dark:bg-slate-700 px-2 py-1 rounded">{project.role[lang]}</span>
                      <span className="text-blue-500 text-sm font-medium" style={{ color: theme.primaryColor }}>{TRANSLATIONS.actions.viewDetails[lang]}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* --- Experience / Timeline Section --- */}
        <section id="experience" className="py-24">
          <div className="container mx-auto px-4 max-w-4xl">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="text-center mb-16"
            >
              <h2 className="text-3xl font-serif font-bold mb-4">{TRANSLATIONS.headings.experience[lang]}</h2>
              <div className="w-20 h-1 bg-blue-500 rounded mx-auto" style={{ backgroundColor: theme.primaryColor }} />
            </motion.div>

            <div className="space-y-12">
              {data.experience.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="relative flex gap-8 md:gap-12 group"
                >
                  {/* Timeline Line */}
                  <div className="absolute left-6 top-10 bottom-[-48px] w-0.5 bg-gray-200 dark:bg-slate-800 group-last:hidden" />

                  {/* Icon */}
                  <div 
                    className="relative shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white dark:bg-slate-900 border-2 z-10 shadow-sm"
                    style={{ borderColor: theme.primaryColor, color: theme.primaryColor }}
                  >
                    {getIcon(item.iconName || 'Briefcase')}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-2" style={{ backgroundColor: theme.primaryColor }}>
                      {item.period}
                    </span>
                    <h3 className="text-2xl font-bold mb-1">{item.company}</h3>
                    <h4 className="text-lg text-gray-500 dark:text-gray-400 mb-4">{item.role[lang]}</h4>
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed bg-gray-50 dark:bg-slate-900/50 p-6 rounded-xl border border-gray-100 dark:border-slate-800">
                      {item.description[lang]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Skills Section --- */}
        <section className="py-20 bg-gray-900 text-white relative overflow-hidden">
           {/* Abstract Background */}
           <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" style={{ backgroundColor: theme.primaryColor }}></div>
           <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>

          <div className="container mx-auto px-4 max-w-6xl relative z-10">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">{TRANSLATIONS.headings.skills[lang]}</h2>
            
            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">Languages</h3>
                <ul className="space-y-4">
                  {data.skills.languages.map((skill, i) => (
                    <li key={i} className="text-gray-300">{skill[lang]}</li>
                  ))}
                </ul>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">Tools & Tech</h3>
                <div className="flex flex-wrap justify-center gap-3">
                  {data.skills.tech.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-full border border-gray-700 bg-gray-800/50 text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold mb-6 border-b border-gray-700 pb-2 inline-block">Certificates</h3>
                <ul className="space-y-4">
                  {data.skills.certifications.map((skill, i) => (
                    <li key={i} className="text-gray-300 flex items-center justify-center gap-2">
                       <span className="w-2 h-2 bg-green-500 rounded-full" /> {skill[lang]}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="bg-white dark:bg-slate-950 py-12 border-t border-gray-100 dark:border-slate-900 text-center">
           <div className="container mx-auto px-4">
             <h2 className="text-2xl font-serif font-bold mb-6">Joel Rätz</h2>
             <div className="flex justify-center gap-6 mb-8">
               {data.profile.socials.map((social, idx) => (
                 <a key={idx} href={social.url} className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition">
                   {social.platform}
                 </a>
               ))}
             </div>
             <p className="text-sm text-gray-500">© {new Date().getFullYear()} Joel Rätz. All rights reserved.</p>
           </div>
        </footer>

      </main>

      {/* --- Detail Modal --- */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
        lang={lang}
        theme={theme}
      />

    </div>
  );
}

export default App;