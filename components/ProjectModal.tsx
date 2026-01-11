import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Quote, Video, Image as ImageIcon } from 'lucide-react';
import { BusinessCase, Language, ThemeConfig } from '../types';

interface ProjectModalProps {
  project: BusinessCase | null;
  onClose: () => void;
  lang: Language;
  theme: ThemeConfig;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, lang, theme }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          className="relative bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-black/50 rounded-full hover:bg-white dark:hover:bg-slate-700 transition"
          >
            <X size={24} className="text-gray-800 dark:text-white" />
          </button>

          {/* Hero Image */}
          <div className="h-64 md:h-80 w-full overflow-hidden relative">
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-0" />
            <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-6 left-6 z-10 text-white">
              <span 
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 inline-block bg-white/20 backdrop-blur-md"
              >
                {project.client}
              </span>
              <h2 className="text-3xl font-bold font-serif">{project.title}</h2>
            </div>
          </div>

          <div className="p-8 grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              
              <div>
                <h3 className="text-xl font-bold mb-3 dark:text-white">About the Project</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {project.description[lang]}
                </p>
              </div>

              {project.details?.testimonial && (
                <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl border-l-4" style={{ borderColor: theme.primaryColor }}>
                  <Quote className="text-gray-300 mb-2" size={32} />
                  <p className="text-lg italic text-gray-700 dark:text-gray-200 mb-4">"{project.details.testimonial}"</p>
                  <p className="font-bold text-sm text-gray-900 dark:text-white">— {project.details.testimonialAuthor}</p>
                </div>
              )}

              {/* Media Section */}
              <div className="space-y-6">
                 {/* Video Embed */}
                 {project.details?.videoUrl && (
                     <div>
                        <h4 className="font-bold mb-3 flex items-center gap-2 dark:text-white"><Video size={18}/> Video</h4>
                        <div className="aspect-video bg-black rounded-lg overflow-hidden">
                             {project.details.videoUrl.includes('youtube') || project.details.videoUrl.includes('youtu.be') ? (
                                <iframe 
                                    width="100%" 
                                    height="100%" 
                                    src={`https://www.youtube.com/embed/${project.details.videoUrl.split('v=')[1] || project.details.videoUrl.split('/').pop()}`} 
                                    title="Video player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                             ) : (
                                <video src={project.details.videoUrl} controls className="w-full h-full" />
                             )}
                        </div>
                     </div>
                 )}

                 {/* Gallery Grid */}
                 {project.details?.images && project.details.images.length > 0 && (
                     <div>
                         <h4 className="font-bold mb-3 flex items-center gap-2 dark:text-white"><ImageIcon size={18}/> Gallery</h4>
                         <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                             {project.details.images.map((img, idx) => (
                                 <div key={idx} className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-800 cursor-pointer hover:opacity-90 transition">
                                     <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                                 </div>
                             ))}
                         </div>
                     </div>
                 )}
              </div>

            </div>

            <div className="md:col-span-1 space-y-6">
              <div className="bg-gray-50 dark:bg-slate-800 p-5 rounded-xl sticky top-4">
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Project Info</h4>
                
                <div className="space-y-4">
                  <div>
                    <span className="block text-xs text-gray-400">Role</span>
                    <span className="font-medium dark:text-white">{project.role[lang]}</span>
                  </div>
                  {project.details?.resultMetric && (
                    <div>
                      <span className="block text-xs text-gray-400">Impact</span>
                      <span className="font-bold text-xl" style={{ color: theme.primaryColor }}>{project.details.resultMetric}</span>
                    </div>
                  )}
                  <div>
                    <span className="block text-xs text-gray-400">Tags</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs bg-white dark:bg-slate-700 border dark:border-slate-600 px-2 py-1 rounded text-gray-600 dark:text-gray-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button 
                  className="w-full mt-6 py-2 rounded-lg text-white font-medium flex items-center justify-center gap-2 transition hover:opacity-90"
                  style={{ backgroundColor: theme.primaryColor }}
                >
                  Visit Link <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;