import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="pt-20 md:pt-32 pb-5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl"
      >
        <p className="text-swiss-red font-mono text-xs md:text-sm mb-6 uppercase tracking-widest">
          Portfolio &mdash; 2025
        </p>
        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.9] text-ink mb-5">
          DANCER<br />
          <span className="text-gray-400">MODEL</span><br />
          MC<br />
          IT GIRL.
        </h2>
        
      </motion.div>
    </section>
  );
};