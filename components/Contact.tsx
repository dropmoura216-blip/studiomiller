import React, { memo } from 'react';
import { Section } from './ui/Section';
import { motion } from 'framer-motion';
import { MessageCircle, Instagram, Clock, MapPin } from 'lucide-react';

const ContactComponent: React.FC = () => {
  return (
    <Section className="py-12 mb-8">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl text-primary mb-3">Fale Conosco</h2>
        <div className="w-16 h-0.5 bg-primary/20 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* WhatsApp Card - Primary Action */}
        <motion.a
          href="https://wa.me/5518997346052"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="
            md:col-span-2
            bg-primary text-[#FDFCF8]
            p-8 rounded-[2rem]
            flex flex-col items-center justify-center gap-4
            shadow-lg shadow-primary/20
            group cursor-pointer
            relative overflow-hidden
          "
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors duration-500" />
          
          <div className="relative z-10 flex flex-col items-center">
            <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-2 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                <MessageCircle className="w-7 h-7 text-white" />
            </div>
            <h3 className="font-serif text-2xl">Agendar no WhatsApp</h3>
            <p className="text-white/70 text-sm font-light text-center max-w-xs">
              Atendimento personalizado para tirar dúvidas e reservar seu horário.
            </p>
          </div>
        </motion.a>

        {/* Attendance Info Card */}
        <div className="bg-white p-6 rounded-[2rem] border border-secondary/10 shadow-sm flex flex-col gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-surface rounded-full shrink-0 text-primary">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-primary mb-1">Horários</h4>
              <p className="text-sm text-secondary/80 font-light leading-relaxed">
                Atendimento exclusivo com hora marcada.
                <br />
                <span className="opacity-70 text-xs uppercase tracking-wide mt-1 block">Domingo a Domingo</span>
              </p>
            </div>
          </div>

          <div className="w-full h-px bg-primary/5" />

          <div className="flex items-start gap-4">
            <div className="p-3 bg-surface rounded-full shrink-0 text-primary">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-medium text-primary mb-1">Localização</h4>
              <p className="text-sm text-secondary/80 font-light leading-relaxed">
                Zona Sul de Marília
                <br />
                <span className="text-xs opacity-60">(Endereço completo via WhatsApp)</span>
              </p>
            </div>
          </div>
        </div>

        {/* Instagram Card */}
        <a 
          href="https.instagram.com/studiomullerr/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-white p-6 rounded-[2rem] border border-secondary/10 shadow-sm flex flex-col items-center justify-center gap-3 group hover:border-primary/20 transition-colors"
        >
          <div className="p-4 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full text-white shadow-md group-hover:scale-110 transition-transform duration-300">
            <Instagram className="w-6 h-6" />
          </div>
          <div className="text-center">
            <h4 className="font-medium text-primary">Siga no Instagram</h4>
            <p className="text-xs text-secondary/60 mt-1 uppercase tracking-wider">@studiomullerr</p>
          </div>
        </a>
      </div>
    </Section>
  );
};

export const Contact = memo(ContactComponent);