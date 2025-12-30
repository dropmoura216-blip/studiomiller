import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const HeroComponent: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    // Layout adjusted: Reduced bottom padding (pb-12 md:pb-20) to push content lower, clearing the face area
    <section className="relative h-[100svh] w-full flex flex-col items-center justify-end overflow-hidden pb-12 md:pb-20">
      {/* Image Background - Optimized for LCP */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="https://i.postimg.cc/QdnZZJ7M/ssa-fico.jpg"
          alt="Studio Müller Ambiente"
          // object-top ensures the face (usually at the top) stays anchored at the top
          className="absolute inset-0 w-full h-full object-cover object-top"
          fetchPriority="high"
          loading="eager"
          decoding="sync"
        />
        
        {/* Subtle overall overlay to reduce glare */}
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Stronger, taller bottom gradient to ensure text readability at the very bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-[60vh] bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
      </div>

      {/* Text Content - Positioned lower now */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-xl w-full flex flex-col items-center transform-gpu"
      >
        {/* Compact margins to keep content low */}
        <h1 className="font-serif text-5xl md:text-7xl text-[#FDFCF8] mb-3 leading-[1.1] drop-shadow-lg tracking-tight will-change-transform">
          Realce sua <br/> 
          <span className="italic text-accent font-light">beleza natural</span>
        </h1>
        
        <p className="text-[#FDFCF8]/90 text-lg md:text-xl mb-6 font-light leading-relaxed max-w-sm md:max-w-md mx-auto drop-shadow-md tracking-wide">
          Um espaço dedicado ao cuidado, autoestima e bem-estar.
        </p>

        <motion.button
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onCtaClick}
          className="bg-[#FDFCF8] text-primary px-10 py-3.5 rounded-full text-sm font-medium uppercase tracking-widest shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-2 transform-gpu mb-2"
        >
          Agendar Horário
        </motion.button>
      </motion.div>

      {/* Scroll Indicator - Hidden on very small screens if needed, or positioned absolutely at bottom */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 will-change-transform hidden md:block"
      >
        <ArrowDown className="w-6 h-6 text-white/70 animate-bounce" strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export const Hero = memo(HeroComponent);