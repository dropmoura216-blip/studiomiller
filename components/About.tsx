import React, { useState, memo, useEffect } from 'react';
import { Section } from './ui/Section';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Quote } from 'lucide-react';

const AboutComponent: React.FC = () => {
  const [isFullOpen, setIsFullOpen] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isFullOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isFullOpen]);

  return (
    <>
      <Section className="pt-8 pb-10 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="font-serif text-3xl text-primary mb-6 text-center">Sobre Mim</h2>
          
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-secondary/10 relative overflow-hidden">
            
            {/* Preview Content */}
            <div className="space-y-4 text-[15px] text-secondary/80 leading-relaxed font-light text-center">
              <p>
                Meu nome é <strong className="text-primary font-medium">Iris Müller</strong>, tenho 17 anos e atuo como maquiadora e designer de sobrancelhas.
              </p>
              <p className="opacity-70 line-clamp-2">
                Me formei em maquiagem profissional e design de sobrancelhas em 2024 e busco constantemente evoluir...
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <button 
                onClick={() => setIsFullOpen(true)}
                className="
                  group
                  flex items-center gap-2 
                  bg-secondary/10 text-primary 
                  px-8 py-3.5 rounded-full 
                  text-sm font-medium uppercase tracking-wide
                  hover:bg-secondary/20 transition-all duration-300
                  active:scale-95
                "
              >
                Ler tudo
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
            
            {/* Decorative background element for preview card */}
            <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-accent/20 rounded-full blur-2xl z-0 pointer-events-none" />
          </div>
        </div>
      </Section>

      {/* Full Screen Overlay (Pseudo-Page) */}
      <AnimatePresence>
        {isFullOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-[#FDFCF8] overflow-y-auto"
          >
             {/* Sticky Header */}
             <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#FDFCF8]/90 backdrop-blur-xl border-b border-secondary/10 shadow-sm">
                <span className="font-serif text-xl text-primary">Sobre Mim</span>
                <button 
                  onClick={() => setIsFullOpen(false)}
                  className="p-2.5 bg-secondary/10 rounded-full hover:bg-secondary/20 transition-colors text-primary active:bg-secondary/30"
                >
                  <X className="w-5 h-5" />
                </button>
             </div>

             {/* Content */}
             <div className="px-6 py-8 max-w-2xl mx-auto pb-32">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6 text-[16px] text-secondary/90 leading-relaxed font-light text-justify"
                >
                    <p>
                    Meu nome é <strong className="text-primary font-medium">Iris Müller</strong>, tenho 17 anos e atuo como maquiadora e designer de sobrancelhas.
                    </p>
                    
                    <p>
                    Me formei em maquiagem profissional e design de sobrancelhas em 2024 e, desde então, realizo atendimentos em meu studio em casa, oferecendo uma experiência personalizada, cuidadosa e focada em resultados que valorizam cada cliente de forma única.
                    </p>

                    <p>
                    Desde sempre fui apaixonada pela área da estética e simplesmente amo o que eu faço. Busco constantemente evoluir, aprimorar minhas técnicas e proporcionar, a cada atendimento, uma experiência ainda mais especial para as clientes que confiam em meu trabalho.
                    </p>

                    <p>
                    Todos os serviços que ofereço a vocês são guiados por técnica, sensibilidade e atenção aos detalhes.
                    </p>

                    {/* Styled Quote */}
                    <div className="relative my-10 pl-6 pr-4 py-6 bg-surface/60 rounded-2xl border border-secondary/5">
                        <Quote className="absolute top-4 left-4 w-6 h-6 text-accent/40" />
                        <p className="text-lg text-primary font-serif italic leading-relaxed text-center px-2 pt-4">
                            "Acredito que a beleza está no equilíbrio e na harmonia, e por isso tudo é pensado de acordo com o formato do rosto, respeitando traços e identidade individual."
                        </p>
                    </div>

                    <p>
                    Mais do que procedimentos, meu propósito é elevar a autoestima, proporcionando segurança, conforto e confiança em cada atendimento. Aqui, nada é genérico: cada resultado é construído com intenção, precisão e responsabilidade profissional.
                    </p>

                    <div className="h-px w-24 mx-auto bg-primary/20 my-10"></div>

                    <p className="font-medium text-primary text-center text-lg md:text-xl">
                    Se você busca um atendimento próximo, elegante e feito por quem entende o que faz, será um prazer te receber!
                    </p>
                    
                    <div className="flex flex-col items-center mt-12 gap-2 opacity-60">
                       <span className="font-serif text-2xl text-primary">Iris Müller</span>
                       <span className="text-xs uppercase tracking-[0.3em] text-secondary">Beauty Artist</span>
                    </div>
                </motion.div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export const About = memo(AboutComponent);