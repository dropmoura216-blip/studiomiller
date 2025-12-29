import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookingState } from '../types';
import { CalendarClock, PenTool, MessageCircleHeart } from 'lucide-react';
import { Section } from './ui/Section';
import { SERVICE_CATEGORIES } from '../constants';

interface BookingProps {
  bookingState: BookingState;
  updateBooking: (updates: Partial<BookingState>) => void;
}

const BookingComponent: React.FC<BookingProps> = ({ bookingState, updateBooking }) => {
  // Only show if a service is selected
  if (!bookingState.serviceId) {
    return null;
  }

  // Find selected service name for display
  let selectedServiceName = "";
  for (const cat of SERVICE_CATEGORIES) {
    const found = cat.variants.find(v => v.id === bookingState.serviceId);
    if (found) {
      selectedServiceName = found.name;
      break;
    }
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] mt-4 pb-10 overflow-hidden"
      >
        <Section delay={0.2} className="pt-10 pb-0">
          
          <div className="flex flex-col items-center justify-center gap-3 mb-8 text-center">
            <div className="w-16 h-16 bg-primary/5 rounded-full flex items-center justify-center mb-2">
               <CalendarClock className="w-8 h-8 text-primary" strokeWidth={1.5} />
            </div>
            <h2 className="font-serif text-3xl text-primary">Finalizar Agendamento</h2>
            <p className="text-secondary/70 max-w-xs mx-auto text-sm leading-relaxed">
              Você selecionou: <span className="font-semibold text-primary block text-lg mt-1">{selectedServiceName}</span>
            </p>
          </div>

          <div className="bg-surface/50 p-6 rounded-3xl mb-8 border border-secondary/10 relative overflow-hidden">
             {/* Decorative background blur */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#B4F5D1]/20 rounded-full blur-3xl" />
             
             <div className="relative z-10 flex gap-4">
                <div className="shrink-0 mt-1">
                   <MessageCircleHeart className="w-6 h-6 text-primary" />
                </div>
                <div className="flex flex-col gap-2">
                   <h3 className="font-serif text-lg text-primary font-medium">Data e Horário</h3>
                   <p className="text-secondary/80 text-sm leading-relaxed font-light text-justify">
                      Para garantir um atendimento personalizado e verificar a disponibilidade exata, <strong>o dia e o horário serão combinados diretamente pelo WhatsApp</strong> após você clicar em finalizar.
                   </p>
                </div>
             </div>
          </div>

          {/* OBSERVATIONS */}
          <div className="mb-0">
            <div className="flex items-center gap-2 mb-3 text-primary px-1">
              <PenTool className="w-4 h-4" />
              <span className="font-medium text-sm uppercase tracking-wide">Alguma observação?</span>
            </div>

            <textarea 
              value={bookingState.notes}
              onChange={(e) => updateBooking({ notes: e.target.value })}
              placeholder="Ex: Tenho alergia a algum produto, prefiro horário pela manhã..."
              className="w-full bg-surface border-0 rounded-2xl p-5 text-base text-primary placeholder:text-secondary/40 focus:ring-2 focus:ring-accent/50 focus:outline-none resize-none h-32 transition-all shadow-inner"
            />
          </div>

        </Section>
      </motion.div>
    </AnimatePresence>
  );
};

export const Booking = memo(BookingComponent);