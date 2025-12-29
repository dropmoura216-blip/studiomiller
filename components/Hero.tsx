import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

const HeroComponent: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    // Layout changed to justify-end to position text at the bottom, clearing the face area
    <section className="relative h-[100svh] w-full flex flex-col items-center justify-end overflow-hidden pb-24 md:pb-32">
      {/* Image Background - Optimized for LCP */}
      <div className="absolute inset-0 w-full h-full z-0">
        <img
          src="https://i.postimg.cc/6qJHMzPJ/Imagem-do-Whats-App-de-2025-12-16-a(s)-18-40-19-3798653b.jpg"
          alt="Studio Müller Ambiente"
          // object-top ensures the face (usually at the top) is never cropped out or covered
          className="absolute inset-0 w-full h-full object-cover object-top"
          fetchPriority="high"
          loading="eager"
          decoding="sync" // Changed to sync to force immediate painting
        />
        
        {/* Subtle overall overlay to reduce glare */}
        <div className="absolute inset-0 bg-black/10" />
        
        {/* Stronger bottom gradient to ensure text readability against the image */}
        <div className="absolute bottom-0 left-0 right-0 h-[70vh] bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
      </div>

      {/* Text Content - Positioned at bottom now */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }} // Reduced delay for faster perceived speed
        className="relative z-10 text-center px-6 max-w-xl w-full flex flex-col items-center transform-gpu"
      >
        <h1 className="font-serif text-5xl md:text-7xl text-[#FDFCF8] mb-6 leading-[1.1] drop-shadow-lg tracking-tight will-change-transform">
          Realce sua <br/> 
          <span className="italic text-accent font-light">beleza natural</span>
        </h1>
        
        <p className="text-[#FDFCF8]/90 text-lg md:text-xl mb-10 font-light leading-relaxed max-w-sm md:max-w-md mx-auto drop-shadow-md tracking-wide">
          Um espaço dedicado ao cuidado, autoestima e bem-estar.
        </p>

        <motion.button
          whileHover={{ 
            scale: 1.05,
            transition: { type: "spring", stiffness: 400, damping: 10 }
          }}
          whileTap={{ scale: 0.95 }}
          onClick={onCtaClick}
          className="bg-[#FDFCF8] text-primary px-10 py-4 rounded-full text-sm font-medium uppercase tracking-widest shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center gap-2 transform-gpu"
        >
          Agendar Horário
        </motion.button>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 will-change-transform"
      >
        <ArrowDown className="w-6 h-6 text-white/70 animate-bounce" strokeWidth={1} />
      </motion.div>
    </section>
  );
};

export const Hero = memo(HeroComponent);