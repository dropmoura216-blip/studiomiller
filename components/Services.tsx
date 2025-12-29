import React, { useState, useEffect, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICE_CATEGORIES } from '../constants';
import { Check, ChevronDown, Clock, MousePointerClick, Sparkles } from 'lucide-react';
import { Section } from './ui/Section';

interface ServicesProps {
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const ServicesComponent: React.FC<ServicesProps> = ({ selectedId, onSelect }) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const variantsContainerRef = useRef<HTMLDivElement>(null);

  // If a service is selected externally (or pre-selected), open its category
  useEffect(() => {
    if (selectedId) {
      const category = SERVICE_CATEGORIES.find(cat => 
        cat.variants.some(v => v.id === selectedId)
      );
      if (category) {
        setActiveCategory(category.id);
      }
    }
  }, [selectedId]);

  const handleCategoryClick = (categoryId: string) => {
    const isOpeningANewCategory = activeCategory !== categoryId;
    const newActiveCategory = isOpeningANewCategory ? categoryId : null;
    setActiveCategory(newActiveCategory);

    if (isOpeningANewCategory) {
      // Use a timeout to ensure the element is visible before scrolling.
      setTimeout(() => {
        variantsContainerRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }, 250); 
    }
  };


  const mainCategories = SERVICE_CATEGORIES.filter(cat => cat.id !== 'packages');
  const packageCategory = SERVICE_CATEGORIES.find(cat => cat.id === 'packages');

  return (
    <Section delay={0.1} className="py-6 section-optimize">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl text-primary mb-3">Serviços Oferecidos</h2>
        
        {/* Enhanced Instruction Badge - Visible mainly on mobile where touch interaction is primary */}
        <div className="md:hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/5 text-secondary/80 text-xs font-medium uppercase tracking-wider border border-secondary/10">
          <MousePointerClick className="w-3.5 h-3.5 opacity-70" />
          <span>Toque na categoria para abrir</span>
        </div>
      </div>
      
      {/* Container for Layout */}
      <div className="flex flex-col gap-6 pb-8">
        
        {/* 1. Main Categories Row (Grid on Mobile and Desktop for perfect centering) */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 w-full">
          {mainCategories.map((category) => {
            const isActive = activeCategory === category.id;
            const isPackageActive = activeCategory === 'packages';
            
            return (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative w-full flex flex-col items-center gap-3 group
                  transition-opacity duration-300
                  ${activeCategory && !isActive && !isPackageActive ? 'opacity-70' : 'opacity-100'}
                `}
              >
                <div className={`
                  w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 relative will-change-transform
                  ${isActive 
                    ? 'ring-[2px] ring-primary ring-offset-2 ring-offset-background' 
                    : 'ring-1 ring-black/5'}
                `}>
                  <img 
                    src={category.image} 
                    alt={category.title}
                    loading="lazy"
                    decoding="async"
                    className={`w-full h-full object-cover transition-transform duration-500 ease-out ${isActive ? 'scale-105' : 'group-hover:scale-105'}`}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 ${isActive ? 'opacity-90' : 'opacity-60'}`} />
                  <div className="absolute top-2.5 right-2.5 z-20">
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex items-center justify-center transition-all duration-300 border ${isActive ? 'bg-[#B4F5D1] border-[#B4F5D1] scale-100' : 'bg-black/20 backdrop-blur-sm border-white/60'}`}>
                      {isActive && <Check className="w-3 md:w-3.5 h-3 md:h-3.5 text-primary" strokeWidth={3} />}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-2 md:p-3 text-center">
                     <span className={`block text-white font-medium text-xs md:text-sm tracking-wide transition-transform duration-300 ${isActive ? 'translate-y-0' : 'translate-y-0.5'}`}>{category.title}</span>
                     <span className={`block text-[9px] md:text-[10px] text-white/70 mt-0.5 font-light uppercase tracking-widest transition-opacity duration-300 ${isActive ? 'hidden' : 'opacity-100'}`}>Ver opções</span>
                  </div>
                </div>
                {isActive && <motion.div layoutId="active-indicator" className="absolute -bottom-5 text-primary md:hidden" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}><ChevronDown className="w-5 h-5 animate-bounce opacity-80" /></motion.div>}
              </motion.button>
            );
          })}
        </div>

        {/* 2. Packages Feature Card (Full Width Banner Style) */}
        {packageCategory && (
            <motion.button
              key={packageCategory.id}
              onClick={() => handleCategoryClick(packageCategory.id)}
              whileTap={{ scale: 0.99 }}
              whileHover={{ scale: 1.01 }}
              className={`
                relative w-full overflow-hidden rounded-[1.5rem] group cursor-pointer
                transition-all duration-300 shadow-md hover:shadow-xl
                aspect-[2/1] md:aspect-[3/1] lg:aspect-[4/1]
                ${activeCategory === packageCategory.id
                  ? 'ring-[2px] ring-primary ring-offset-2 ring-offset-background'
                  : 'ring-1 ring-black/5'}
              `}
            >
              {/* Background Image */}
              <img 
                src={packageCategory.image} 
                alt={packageCategory.title} 
                loading="lazy" 
                decoding="async" 
                className={`w-full h-full object-cover object-[center_30%] transition-transform duration-700 ease-out ${activeCategory === packageCategory.id ? 'scale-105' : 'group-hover:scale-105'}`} 
              />
              
              {/* Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent transition-opacity duration-300 ${activeCategory === packageCategory.id ? 'opacity-90' : 'opacity-80'}`} />

              {/* Content Layout */}
              <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 text-left">
                  <div className="flex items-center gap-2 mb-1">
                     <div className="bg-[#B4F5D1] text-primary p-1 rounded-md">
                        <Sparkles className="w-3.5 h-3.5" />
                     </div>
                     <span className="text-[#B4F5D1] text-xs font-bold uppercase tracking-widest">Combos Especiais</span>
                  </div>
                  
                  <h3 className="font-serif text-3xl md:text-4xl text-white mb-2 leading-tight">
                    {packageCategory.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm md:text-base font-light max-w-[200px] md:max-w-md leading-relaxed">
                    Experiências completas com condições exclusivas para você.
                  </p>

                  <div className={`mt-4 inline-flex items-center gap-2 text-white/90 text-xs font-medium uppercase tracking-widest border-b border-white/30 pb-0.5 w-fit transition-all duration-300 ${activeCategory === packageCategory.id ? 'border-white' : 'group-hover:border-white/70'}`}>
                    {activeCategory === packageCategory.id ? 'Visualizando' : 'Ver Combinações'}
                  </div>
              </div>

              {/* Status Indicator (Top Right) */}
              <div className="absolute top-4 right-4 z-20">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border ${activeCategory === packageCategory.id ? 'bg-[#B4F5D1] border-[#B4F5D1] scale-100' : 'bg-white/10 backdrop-blur-md border-white/20'}`}>
                  {activeCategory === packageCategory.id && <Check className="w-4 h-4 text-primary" strokeWidth={3} />}
                </div>
              </div>

              {activeCategory === packageCategory.id && <motion.div layoutId="active-indicator" className="absolute bottom-2 left-1/2 -translate-x-1/2 text-white md:hidden" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}><ChevronDown className="w-6 h-6 animate-bounce opacity-80" /></motion.div>}
            </motion.button>
        )}
      </div>

      {/* Wrapper for scroll target, with scroll-margin-top to account for sticky header */}
      <div ref={variantsContainerRef} className="scroll-mt-32">
        {/* Variants List - Expands below categories */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }} // Smooth "Lovable" easing
              className="overflow-hidden transform-gpu"
            >
              <div className="bg-surface/30 rounded-[2rem] p-3 border border-secondary/10 mt-2">
                <div className="text-center py-4">
                  <h4 className="font-serif text-lg font-medium text-primary/90">
                    {SERVICE_CATEGORIES.find(c => c.id === activeCategory)?.title} - Selecione uma opção
                  </h4>
                </div>
                <div className="flex flex-col gap-3 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-4">
                  {SERVICE_CATEGORIES.find(c => c.id === activeCategory)?.variants.map((variant, index) => {
                    const isSelected = selectedId === variant.id;
                    
                    return (
                      <motion.div
                        key={variant.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.3 }}
                        onClick={() => onSelect(variant.id)}
                        className={`
                          relative w-full p-5 rounded-[1.2rem] text-left cursor-pointer transition-all duration-200 group h-full flex flex-col justify-between
                          ${isSelected 
                            ? 'bg-white shadow-md ring-1 ring-primary/10 scale-[1.01]' 
                            : 'bg-white/40 hover:bg-white/70 active:scale-[0.99] border border-transparent'}
                        `}
                      >
                        <div>
                            <div className="flex justify-between items-start mb-2.5">
                            <h3 className={`font-semibold text-lg leading-tight transition-colors ${isSelected ? 'text-primary' : 'text-primary/90'}`}>
                                {variant.name}
                            </h3>
                            
                            <div className={`
                                w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0 border ml-3
                                ${isSelected 
                                ? 'bg-primary border-primary text-white shadow-sm' 
                                : 'border-secondary/30 bg-transparent group-hover:border-primary/50'}
                            `}>
                                {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                            </div>
                            </div>
                            
                            {variant.description && (
                            <p className="text-[15px] text-secondary/80 mb-4 leading-relaxed pr-2 font-light">
                                {variant.description}
                            </p>
                            )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-3 border-t border-primary/5">
                          <div className="flex items-center gap-1.5 text-xs text-primary/60 font-medium uppercase tracking-wide">
                            <Clock className="w-3.5 h-3.5" />
                            {variant.duration}
                          </div>
                          
                          <span className={`font-bold text-lg transition-colors ${isSelected ? 'text-primary' : 'text-primary/90'}`}>
                            {variant.price}
                          </span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
};

export const Services = memo(ServicesComponent);