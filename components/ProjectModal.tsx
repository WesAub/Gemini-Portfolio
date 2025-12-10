import React from 'react';
import { Project } from '../types';
import { X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      >
        <div 
          className="absolute inset-0 bg-white/90 backdrop-blur-sm" 
          onClick={onClose}
        />
        
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="relative w-full max-w-6xl h-full max-h-[90vh] bg-white shadow-2xl overflow-hidden flex flex-col md:flex-row"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 z-10 p-2 bg-white rounded-full hover:bg-swiss-red hover:text-white transition-colors"
          >
            <X size={24} />
          </button>

          {/* Left: Image */}
          <div className="w-full md:w-2/3 h-1/2 md:h-full bg-gray-100">
            <img 
              src={project.imageUrl} 
              alt={project.title} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: Content */}
          <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-between overflow-y-auto">
            <div>
              <span className="text-xs font-bold text-swiss-red uppercase tracking-widest mb-4 block">
                {project.category}
              </span>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-none mb-8">
                {project.title}
              </h2>
              
              <div className="w-12 h-1 bg-black mb-8"></div>

              <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8">
                {project.description}
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono text-gray-500 mb-12">
                <div>
                  <span className="block font-bold text-black mb-1">Year</span>
                  {project.year}
                </div>
                <div>
                  <span className="block font-bold text-black mb-1">Client</span>
                  Private Commission
                </div>
              </div>
            </div>

            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-swiss-red transition-colors"
              >
                Visit Live Site <ArrowUpRight size={16} />
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};