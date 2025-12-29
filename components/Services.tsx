import React, { useState, useEffect, memo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SERVICE_CATEGORIES } from '../constants';
import { Check, ChevronDown, Clock, MousePointerClick } from 'lucide-react';
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
      // The animation duration is 0.3s (300ms).
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
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl text-primary mb-3">Serviços Oferecidos</h2>
        
        {/* Enhanced Instruction Badge - Visible mainly on mobile where touch interaction is primary */}
        <div className="md:hidden inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary/5 text-secondary/80 text-xs font-medium uppercase tracking-wider border border-secondary/10">
          <MousePointerClick className="w-3.5 h-3.5 opacity-70" />
          <span>Toque na categoria para abrir</span>
        </div>
      </div>
      
      {/* Category Selectors - Grid on Desktop, Scroll on Mobile */}
      <div className="flex flex-col gap-4 pb-8">
        {/* Main Categories Row */}
        <div className="flex gap-4 overflow-x-auto -mx-4 px-4 no-scrollbar snap-x transform-gpu md:grid md:grid-cols-3 md:gap-6 md:mx-0 md:px-0 md:overflow-visible lg:grid-cols-4">
          {mainCategories.map((category) => {
            const isActive = activeCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative flex-shrink-0 w-[30%] min-w-[105px] md:w-full flex flex-col items-center gap-3 snap-center group
                  transition-opacity duration-300
                  ${activeCategory && !isActive && activeCategory !== 'packages' ? 'opacity-70' : 'opacity-100'}
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
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border ${isActive ? 'bg-[#B4F5D1] border-[#B4F5D1] scale-100' : 'bg-black/20 backdrop-blur-sm border-white/60'}`}>
                      {isActive && <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                     <span className={`block text-white font-medium text-sm tracking-wide transition-transform duration-300 ${isActive ? 'translate-y-0' : 'translate-y-0.5'}`}>{category.title}</span>
                     <span className={`block text-[10px] text-white/70 mt-0.5 font-light uppercase tracking-widest transition-opacity duration-300 ${isActive ? 'hidden' : 'opacity-100'}`}>Ver opções</span>
                  </div>
                </div>
                {isActive && <motion.div layoutId="active-indicator" className="absolute -bottom-5 text-primary md:hidden" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}><ChevronDown className="w-6 h-6 animate-bounce opacity-80" /></motion.div>}
              </motion.button>
            );
          })}

          {/* Package Category Card - Moved inside grid for desktop if possible or kept separate but styled similarly */}
          {packageCategory && (
            <motion.button
              key={packageCategory.id}
              onClick={() => handleCategoryClick(packageCategory.id)}
              whileTap={{ scale: 0.99 }}
              className={`
                relative w-full md:w-auto flex flex-col items-center group
                transition-opacity duration-300 md:col-span-1
                ${activeCategory && activeCategory !== packageCategory.id ? 'opacity-70' : 'opacity-100'}
                /* On mobile, this button was outside the loop. Here we integrate it for desktop grid, but keep it flexible */
              `}
              style={{ order: 10 }} // Ensure it stays at the end
            >
              <div className={`
                w-full aspect-[16/6] md:aspect-[3/4] rounded-2xl overflow-hidden shadow-sm transition-all duration-300 relative will-change-transform
                ${activeCategory === packageCategory.id
                  ? 'ring-[2px] ring-primary ring-offset-2 ring-offset-background'
                  : 'ring-1 ring-black/5'}
              `}>
                <img src={packageCategory.image} alt={packageCategory.title} loading="lazy" decoding="async" className={`w-full h-full object-cover transition-transform duration-500 ease-out ${activeCategory === packageCategory.id ? 'scale-105' : 'group-hover:scale-105'}`} />
                <div className={`absolute inset-0 bg-gradient-to-r md:bg-gradient-to-t from-black/70 via-black/40 to-transparent transition-opacity duration-300 ${activeCategory === packageCategory.id ? 'opacity-90' : 'opacity-60'}`} />
                <div className="absolute top-3 right-3 z-20">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 border ${activeCategory === packageCategory.id ? 'bg-[#B4F5D1] border-[#B4F5D1] scale-100' : 'bg-black/20 backdrop-blur-sm border-white/60'}`}>
                    {activeCategory === packageCategory.id && <Check className="w-3.5 h-3.5 text-primary" strokeWidth={3} />}
                  </div>
                </div>
                <div className="absolute inset-0 flex flex-col items-start justify-center text-left p-6 md:p-3 md:justify-end md:text-center md:items-center">
                   <span className={`block text-white font-semibold text-2xl md:text-sm md:font-medium tracking-wider transition-transform duration-300 ${activeCategory === packageCategory.id ? 'translate-y-0' : 'translate-y-1'}`}>{packageCategory.title}</span>
                   <span className={`block text-sm text-white/70 mt-1 md:text-[10px] md:uppercase md:tracking-widest font-light transition-opacity duration-300 ${activeCategory === packageCategory.id ? 'opacity-0' : 'opacity-100'}`}>Ver Combinações</span>
                </div>
              </div>
              {activeCategory === packageCategory.id && <motion.div layoutId="active-indicator" className="absolute -bottom-5 text-primary md:hidden" initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}><ChevronDown className="w-6 h-6 animate-bounce opacity-80" /></motion.div>}
            </motion.button>
          )}
        </div>
      </div>

      {/* Wrapper for scroll target, with scroll-margin-top to account for sticky header */}
      <div ref={variantsContainerRef} className="scroll-mt-28">
        {/* Variants List - Expands below categories */}
        <AnimatePresence mode="wait">
          {activeCategory && (
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden transform-gpu"
            >
              <div className="bg-surface/30 rounded-[2rem] p-3 border border-secondary/10 -mt-4 md:mt-2">
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
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => onSelect(variant.id)}
                        className={`
                          relative w-full p-5 rounded-[1.2rem] text-left cursor-pointer transition-all duration-200 group h-full flex flex-col justify-between
                          ${isSelected 
                            ? 'bg-white shadow-sm ring-1 ring-primary/10' 
                            : 'bg-white/40 active:bg-white/60 border border-transparent hover:bg-white/60'}
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
                                ? 'bg-primary border-primary text-white' 
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

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-primary/5">
                          <div className="flex items-center gap-1.5 text-xs text-primary/60 font-medium uppercase tracking-wide">
                            <Clock className="w-3.5 h-3.5" />
                            {variant.duration}
                          </div>
                          
                          <span className="font-bold text-lg text-primary">
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