import React, { memo } from 'react';
import { Instagram, MessageCircle, MapPin, Clock, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const FooterComponent: React.FC = () => {
  return (
    <footer className="bg-primary text-[#FDFCF8] pt-20 pb-10 px-6 rounded-t-[3rem] -mt-8 relative z-20 overflow-hidden shadow-[0_-10px_60px_rgba(0,0,0,0.3)]">
      
      {/* 1. Background Ambience (Premium Feel) */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grain Texture overlay could go here if using images, but we'll use gradients */}
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] bg-accent/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-[0%] right-[-10%] w-[50%] h-[50%] bg-[#B4F5D1]/5 rounded-full blur-[60px]" />
      </div>

      <div className="relative z-10 max-w-md md:max-w-4xl lg:max-w-5xl mx-auto flex flex-col items-center">
        
        {/* 2. Header: Personal & Elegant */}
        <div className="text-center mb-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className="font-serif text-4xl md:text-5xl mb-2 tracking-tight">Fale Comigo</h2>
            <p className="text-accent/80 font-sans text-sm tracking-widest uppercase">Studio Müller</p>
          </motion.div>
        </div>

        {/* Content Wrapper for Desktop Grid */}
        <div className="w-full flex flex-col md:flex-row md:gap-8 lg:gap-12 md:items-stretch mb-10">

            {/* 3. Main CTA: WhatsApp (The "Chamativo" Element) */}
            <motion.a
            href="https://wa.me/5518997346052?text=Ol%C3%A1!%20Tenho%20uma%20d%C3%BAvida%20sobre%20os%20servi%C3%A7os%20do%20Studio%20M%C3%BCller."
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="
                w-full md:flex-1 relative overflow-hidden
                bg-white/5 backdrop-blur-xl border border-white/10
                p-1 rounded-[2.5rem] mb-8 md:mb-0
                group cursor-pointer
                shadow-2xl shadow-black/20
                flex flex-col
            "
            >
            {/* Inner Container */}
            <div className="
                bg-white/5 rounded-[2.2rem] px-6 py-7 h-full
                flex items-center justify-between gap-5
                transition-colors duration-300 group-hover:bg-white/10
            ">
                <div className="flex flex-col gap-1">
                <span className="text-sm text-accent font-medium tracking-wide uppercase flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online agora
                </span>
                <span className="font-serif text-2xl text-white leading-tight">
                    Tirar Dúvidas
                </span>
                <span className="text-sm text-white/50 font-light mt-1 group-hover:text-white/70 transition-colors">
                    Toque para iniciar conversa
                </span>
                </div>

                {/* Icon Button */}
                <div className="
                w-14 h-14 rounded-full 
                bg-gradient-to-tr from-[#25D366] to-[#60F589]
                flex items-center justify-center shrink-0 
                shadow-lg shadow-green-900/20
                group-hover:scale-110 group-hover:rotate-12 transition-all duration-300
                ">
                <MessageCircle className="w-7 h-7 text-white fill-white/20" />
                </div>
            </div>
            </motion.a>

            {/* 4. Information Cluster (Clean & Professional) */}
            <div className="w-full md:w-auto md:min-w-[320px] grid grid-cols-2 gap-px bg-white/10 rounded-3xl overflow-hidden border border-white/10">
            
            {/* Location */}
            <div className="bg-primary/50 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/5 transition-colors">
                <div className="p-2.5 rounded-full bg-white/5 text-accent">
                <MapPin className="w-5 h-5" />
                </div>
                <div>
                <h4 className="font-medium text-white text-sm mb-1">Localização</h4>
                <p className="text-[11px] text-white/50 leading-relaxed uppercase tracking-wide">
                    Zona Sul<br/>Marília - SP
                </p>
                </div>
            </div>

            {/* Hours */}
            <div className="bg-primary/50 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center gap-3 hover:bg-white/5 transition-colors">
                <div className="p-2.5 rounded-full bg-white/5 text-accent">
                <Clock className="w-5 h-5" />
                </div>
                <div>
                <h4 className="font-medium text-white text-sm mb-1">Horários</h4>
                <p className="text-[11px] text-white/50 leading-relaxed uppercase tracking-wide">
                    Dom a Dom<br/>Com agendamento
                </p>
                </div>
            </div>
            </div>
        </div>

        {/* 5. Footer Bottom: Social & Copyright */}
        <div className="flex flex-col items-center w-full">
          <a 
            href="https://www.instagram.com/studiomullerr/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="
              flex items-center gap-3 px-6 py-3 rounded-full 
              bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20
              transition-all duration-300 group mb-8
            "
          >
            <Instagram className="w-5 h-5 text-white/80 group-hover:text-white transition-colors" />
            <span className="text-sm text-white/80 group-hover:text-white tracking-wide">
              Acompanhe no Instagram
            </span>
            <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white/60 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

          <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] text-center font-light hover:text-white/50 transition-colors cursor-default">
            &copy; {new Date().getFullYear()} Studio Müller • All rights reserved
          </p>
        </div>

      </div>
    </footer>
  );
};

export const Footer = memo(FooterComponent);