import React from 'react';
import { Project } from '../types';
import { motion } from 'framer-motion';

interface ProjectGridProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ projects, onProjectClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-24">
      {projects.map((project, index) => (
        <motion.div 
          key={project.id}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className={`group cursor-pointer ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
          onClick={() => onProjectClick(project)}
        >
          {/* Image Container */}
          <div className="relative aspect-[4/5] overflow-hidden bg-gray-200 mb-6">
            <img 
              src={project.imageUrl} 
              alt={project.title}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-[0.16,1,0.3,1] scale-100 group-hover:scale-105"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-swiss-red mix-blend-multiply opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
          </div>

          {/* Typography */}
          <div className="flex justify-between items-start border-t border-black pt-4">
            <div>
              <h3 className="text-2xl font-bold tracking-tight leading-none mb-1 group-hover:text-swiss-red transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-gray-500 font-mono uppercase tracking-wider">
                {project.category}
              </p>
            </div>
            <span className="text-xs font-mono">{project.year}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};