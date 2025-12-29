import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../constants';
import { Star, Quote } from 'lucide-react';
import { Section } from './ui/Section';

export const Testimonials: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000); 
    return () => clearInterval(timer);
  }, []);

  return (
    <Section className="mt-6 mb-4 py-6 section-optimize">
      <h2 className="font-serif text-3xl text-primary mb-8 text-center">Depoimentos</h2>
      
      <div className="bg-surface/30 rounded-[2.5rem] pt-10 pb-8 px-6 relative border border-secondary/5 max-w-2xl mx-auto">
        
        {/* Decorative Quote Icon */}
        <div className="absolute top-8 left-8 opacity-10">
          <Quote className="w-10 h-10 text-primary fill-primary" />
        </div>

        <div className="relative h-[420px]"> 
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center transform-gpu"
            >
              {/* Result Image */}
              <div className="relative w-48 h-48 mb-8 group">
                <div className="absolute inset-0 bg-primary/5 rounded-2xl rotate-3 transform-gpu" />
                <div className="relative w-full h-full rounded-2xl overflow-hidden border border-white/50 shadow-sm">
                  <img 
                    src={TESTIMONIALS[index].image} 
                    alt={`Resultado ${TESTIMONIALS[index].name}`}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Text - Larger Font */}
              <p className="text-primary/80 font-serif italic text-lg leading-relaxed mb-5 line-clamp-3 max-w-[320px]">
                "{TESTIMONIALS[index].text}"
              </p>
              
              {/* Rating */}
              <div className="flex gap-1.5 mb-3">
                {[...Array(TESTIMONIALS[index].rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              
              {/* Name */}
              <p className="font-medium text-xs text-secondary uppercase tracking-widest">
                {TESTIMONIALS[index].name}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${i === index ? 'w-5 bg-secondary' : 'w-1.5 bg-secondary/20'}`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};