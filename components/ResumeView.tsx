
import React from 'react';
import { ResumeData } from '../types';
import { motion } from 'framer-motion';
import { Download, ArrowUpRight } from 'lucide-react';

interface ResumeViewProps {
  data: ResumeData;
}

export const ResumeView: React.FC<ResumeViewProps> = ({ data }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl"
    >
      <div className="mb-16 border-b border-black pb-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-6">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-black">
            {data.title.toUpperCase()}
          </h2>
          
          {data.pdfUrl && (
            <a 
              href={data.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-black hover:bg-black hover:text-white transition-colors duration-300 text-xs font-bold uppercase tracking-widest mt-2 md:mt-4 self-start"
            >
              <Download size={14} />
              <span>Download PDF</span>
            </a>
          )}
        </div>
        
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl font-light">
          {data.summary}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left Column: Education, Experience, Projects, Leadership */}
        <div className="md:col-span-8 space-y-16">
          
          {/* Education Section - Moved to Top */}
          <section>
             <h3 className="text-xs font-bold uppercase tracking-widest text-swiss-red mb-8">Education</h3>
             <div className="space-y-8">
              {data.education.map((item, idx) => (
                <div key={idx}>
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                    <h4 className="text-xl font-bold tracking-tight">{item.role}</h4>
                    <span className="text-xs font-mono text-gray-400">{item.period}</span>
                  </div>
                   <div className="text-sm font-bold uppercase tracking-wider mb-2 text-gray-800">{item.company}</div>
                   <p className="text-xs text-gray-500">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-swiss-red mb-8">Work Experience</h3>
            <div className="space-y-12">
              {data.experience.map((item, idx) => (
                <div key={idx} className="group">
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                    <h4 className="text-2xl font-bold tracking-tight">{item.role}</h4>
                    <span className="text-xs font-mono text-gray-400">{item.period}</span>
                  </div>
                  <div className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-800">{item.company}</div>
                  <p className="text-sm text-gray-600 leading-relaxed max-w-xl whitespace-pre-line">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {data.projects && data.projects.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-swiss-red mb-8">Selected Projects & Hackathons</h3>
              <div className="space-y-12">
                {data.projects.map((item, idx) => (
                  <div key={idx} className="group">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                      <h4 className="text-xl font-bold tracking-tight">
                        <a href="mailto:wnaubynn@mun.ca" className="group inline-flex items-center gap-1 text-sm font-bold underline hover:text-swiss-red transition-colors">
                          {item.role}<ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                      </h4>
                      <span className="text-xs font-mono text-gray-400">{item.period}</span>
                    </div>
                    <div className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-800">{item.company}</div>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-xl whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {data.leadership && data.leadership.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-widest text-swiss-red mb-8">Leadership & Volunteering</h3>
              <div className="space-y-8">
                {data.leadership.map((item, idx) => (
                  <div key={idx} className="group">
                    <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                      <h4 className="text-xl font-bold tracking-tight">{item.role}</h4>
                      <span className="text-xs font-mono text-gray-400">{item.period}</span>
                    </div>
                    <div className="text-sm font-bold uppercase tracking-wider mb-3 text-gray-800">{item.company}</div>
                    <p className="text-sm text-gray-600 leading-relaxed max-w-xl whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column: Skills */}
        <div className="md:col-span-4">
          <div className="sticky top-32">
            <h3 className="text-xs font-bold uppercase tracking-widest text-swiss-red mb-6">Expertise</h3>
            <ul className="space-y-3">
              {data.skills.map((skill, idx) => (
                <li key={idx} className="text-sm font-medium border-b border-gray-200 pb-2">
                  {skill}
                </li>
              ))}
            </ul>
            
          </div>
        </div>
      </div>
    </motion.div>
  );
};
