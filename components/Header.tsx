import React, { useEffect } from 'react';
import { Menu as MenuIcon, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  onNavigate: (section: 'home' | 'about' | 'faq' | 'contact') => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  isVisible: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate, isMenuOpen, setIsMenuOpen, isVisible }) => {
  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavClick = (section: 'home' | 'about' | 'faq' | 'contact') => {
    setIsMenuOpen(false);
    setTimeout(() => onNavigate(section), 100);
  };

  const menuItems = [
    { id: 'home', label: 'Início' },
    { id: 'about', label: 'Sobre Mim' },
    { id: 'faq', label: 'Informações' },
    { id: 'contact', label: 'Contato' },
  ] as const;

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100,
          opacity: isVisible ? 1 : 0
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, // Reduced stiffness for lighter JS load
          damping: 25,
          mass: 0.8
        }}
        className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none"
      >
        <div className="pointer-events-auto w-full max-w-[90%] md:max-w-3xl lg:max-w-4xl relative group">
          
          {/* 
            Premium Glassmorphism Container 
            OPTIMIZED: Reduced blur from xl to md/lg for better mobile FPS
          */}
          <div className="
            relative 
            flex items-center justify-between 
            px-6 py-3 md:py-4
            rounded-full 
            bg-white/80 
            backdrop-blur-md
            backdrop-saturate-150 
            border border-white/50 
            shadow-sm
          ">
            
            {/* Logo Area */}
            <div 
              onClick={() => onNavigate('home')}
              className="flex flex-col cursor-pointer pl-1 group/logo"
            >
              <span className="font-serif text-lg md:text-xl font-semibold tracking-wide text-primary/90 transition-colors group-hover/logo:text-primary">
                Studio Müller
              </span>
            </div>
            
            {/* Desktop Navigation Links (Optional - currently using hamburger for all for vibe) */}
            {/* Keeping hamburger for consistent experience as per request, but wider container looks better on desktop */}
            
            {/* Menu Toggle Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="
                relative 
                p-2 
                rounded-full 
                transition-all 
                duration-300 
                hover:bg-primary/5 
                active:scale-95
                group/btn
              "
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-primary" strokeWidth={1.5} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="flex flex-col gap-1.5 items-end justify-center w-6 h-6">
                      <span className="w-6 h-[1.5px] bg-primary rounded-full transition-all duration-300 group-hover/btn:w-5" />
                      <span className="w-4 h-[1.5px] bg-primary rounded-full transition-all duration-300 group-hover/btn:w-6" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full Screen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }} // Faster transition
            className="fixed inset-0 z-40 bg-[#FDFCF8] flex flex-col justify-center items-center overflow-hidden"
          >
            {/* Background elements simplified for performance */}
            <div className="absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <nav className="flex flex-col items-center gap-10 relative z-10">
              {menuItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ 
                    delay: index * 0.05, 
                    duration: 0.5,
                  }}
                  className="font-serif text-4xl md:text-5xl text-primary relative group"
                >
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-primary/70">{item.label}</span>
                </motion.button>
              ))}
            </nav>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="absolute bottom-12 flex flex-col items-center gap-4"
            >
              <div className="w-px h-16 bg-gradient-to-b from-transparent via-primary/20 to-transparent"></div>
              <span className="text-xs text-secondary/60 font-medium tracking-[0.3em] uppercase">
                Studio Müller
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};