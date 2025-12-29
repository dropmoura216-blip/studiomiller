import React, { memo } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Section } from './ui/Section';

const LocationComponent: React.FC = () => {
  return (
    <Section className="py-8">
      <h2 className="font-serif text-3xl text-primary mb-6 text-center">Localização</h2>
      
      <div className="bg-surface rounded-[2rem] overflow-hidden border border-secondary/10">
        {/* Placeholder for map */}
        <div className="h-48 bg-[#E5E0D8] relative flex items-center justify-center">
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#8C7A6B 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          <div className="bg-white/80 backdrop-blur-sm p-3.5 rounded-full shadow-lg z-10">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
        </div>

        <div className="p-8">
          <h3 className="font-medium text-lg text-primary mb-2">Studio Müller</h3>
          <p className="text-secondary/80 text-base mb-6 leading-relaxed">
            Av. Mem De Sá, 444a<br />
            Jardim Monte Castelo
          </p>
          
          <button className="w-full flex items-center justify-center gap-2 border border-primary/20 text-primary py-3.5 rounded-xl hover:bg-white transition-colors text-sm font-medium uppercase tracking-wide">
            <Navigation className="w-4 h-4" />
            Abrir no Maps
          </button>
        </div>
      </div>
    </Section>
  );
};

export const Location = memo(LocationComponent);