import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Booking } from './components/Booking';
import { Footer } from './components/Footer';
import { About } from './components/About';
import { FAQ } from './components/FAQ';
import { BookingState } from './types';
import { SERVICE_CATEGORIES } from './constants';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const [bookingState, setBookingState] = useState<BookingState>({
    serviceId: null,
    date: null,
    timeSlotId: null,
    notes: ''
  });

  // Scroll listener to toggle header - Optimized with passive listener
  useEffect(() => {
    const handleScroll = () => {
      // Show header after scrolling down 50px
      const scrolled = window.scrollY > 50;
      // Only update state if it changes to avoid re-renders
      setIsScrolled(prev => prev !== scrolled ? scrolled : prev);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Refs for navigation
  const homeRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const bookingRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  // Intersection Observer to detect when Footer is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null, // viewport
        threshold: 0.1, // Trigger when 10% of the footer is visible
      }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  // Memoized handlers to prevent re-renders of children
  const updateBooking = useCallback((updates: Partial<BookingState>) => {
    setBookingState(prev => ({ ...prev, ...updates }));
  }, []);

  const handleNavigate = useCallback((section: 'home' | 'about' | 'faq' | 'contact') => {
    const refs = {
      home: homeRef,
      about: aboutRef,
      faq: faqRef,
      contact: contactRef
    };

    const targetRef = refs[section];
    targetRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  }, []);

  const scrollToServices = useCallback(() => {
    servicesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleSelectService = useCallback((id: string) => {
    setBookingState(prev => {
        if (prev.serviceId !== id) {
            return { ...prev, serviceId: id, date: null, timeSlotId: null, notes: '' };
        }
        return { ...prev, serviceId: id };
    });
  }, []);

  // Auto-scroll to booking section when a service is selected
  useEffect(() => {
    if (bookingState.serviceId && bookingRef.current) {
      setTimeout(() => {
        bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    }
  }, [bookingState.serviceId]);

  // Handle WhatsApp Redirection
  const handleConfirmBooking = () => {
    const { serviceId, notes } = bookingState;

    if (!serviceId) return;

    // Find the service variant details
    let selectedVariant = null;
    let categoryTitle = '';

    for (const cat of SERVICE_CATEGORIES) {
      const found = cat.variants.find(v => v.id === serviceId);
      if (found) {
        selectedVariant = found;
        categoryTitle = cat.title;
        break;
      }
    }

    if (!selectedVariant) return;

    // Construct WhatsApp Message - SIMPLIFIED without date/time
    const message = 
      `Olá! Gostaria de verificar disponibilidade para agendar no Studio Müller. ✨\n\n` +
      `*Serviço:* ${categoryTitle} - ${selectedVariant.name}\n` +
      (notes ? `*Observações:* ${notes}\n\n` : '\n') +
      `Gostaria de combinar o melhor dia e horário!`;

    const phoneNumber = '5518997346052';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, '_blank');
  };

  // Logic to show/enable the fixed button
  // Now simply checks if a service is selected
  const isBookingStarted = bookingState.serviceId !== null;
  
  // Header should be visible if scrolled OR if menu is open (so we can close it)
  const showHeader = isScrolled || isMenuOpen;

  // Floating button should NOT be visible if we are looking at the footer
  const showFloatingButton = isBookingStarted && !isMenuOpen && isScrolled && !isFooterVisible;

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-accent/30 selection:text-primary pb-0">
      <Header 
        onNavigate={handleNavigate} 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        isVisible={showHeader}
      />
      
      <main className={`flex flex-col w-full mx-auto ${isBookingStarted ? 'pb-0' : ''}`}>
        <div ref={homeRef}>
          <Hero onCtaClick={scrollToServices} />
        </div>
        
        <div ref={servicesRef}>
          <Services 
            selectedId={bookingState.serviceId} 
            onSelect={handleSelectService} 
          />
        </div>

        {/* Booking Section - Added scroll-mt-44 to prevent header obstruction */}
        <div ref={bookingRef} className="scroll-mt-44">
          <Booking 
            bookingState={bookingState} 
            updateBooking={updateBooking} 
          />
        </div>

        <div ref={aboutRef}>
          <About />
        </div>

        {/* Added pb-32 to create significant vertical spacing between FAQ and Footer */}
        <div ref={faqRef} className="pb-32">
          <FAQ />
        </div>
      </main>

      {/* Footer acts as the Contact section now */}
      <div ref={contactRef}>
        <Footer />
      </div>

      {/* Fixed Confirmation Button Overlay - Optimized with transform-gpu */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-8 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none transform-gpu will-change-transform"
          >
             <div className="w-full max-w-md pointer-events-auto">
                <button
                  onClick={handleConfirmBooking}
                  className={`
                    w-full py-4 rounded-full text-white font-medium text-lg tracking-wide transition-all duration-300
                    shadow-[0_10px_40px_-10px_rgba(74,59,50,0.5)] border border-white/10 backdrop-blur-sm
                    bg-primary hover:bg-primary/95 cursor-pointer transform hover:scale-[1.02] active:scale-[0.98]
                  `}
                >
                  Agendar via WhatsApp
                </button>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;