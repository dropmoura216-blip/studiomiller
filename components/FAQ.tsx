import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Section } from './ui/Section';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: "Onde fica o studio?",
    answer: (
      <span>
        O Studio Müller está localizado na <strong>Zona Sul de Marília</strong>. Por se tratar de um atendimento exclusivo, o endereço completo e a localização exata são enviados via <a href="https://wa.me/5518997346052" target="_blank" rel="noopener noreferrer" className="text-primary font-medium underline decoration-primary/30 underline-offset-2">WhatsApp</a> após o contato inicial.
      </span>
    )
  },
  {
    question: "Quais são as formas de pagamento?",
    answer: (
      <span>
        Pagamentos via <strong>Pix</strong>, <strong>dinheiro</strong> e <strong>cartão de crédito ou débito</strong> (Link de pagamento ou aproximação).
      </span>
    )
  },
  {
    question: "Qual a tolerância de atraso?",
    answer: (
      <span>
        Para garantir que todas as clientes sejam atendidas com excelência e sem pressa, a tolerância máxima é de <strong>15 minutos</strong>. Atrasos superiores podem exigir o reagendamento.
      </span>
    )
  },
  {
    question: "Como devo me preparar para o atendimento?",
    answer: "Para garantir um atendimento mais eficiente e um resultado impecável, recomenda-se comparecer com a pele do rosto limpa e sem maquiagem, facilitando a realização dos procedimentos de design de sobrancelhas e maquiagem. Para serviços que envolvem babyliss ou chapinha, o cabelo deve estar limpo e completamente seco."
  },
  {
    question: "Posso levar acompanhante?",
    answer: "Como o espaço é compacto, o ideal é levar apenas 1 acompanhante. Caso haja necessidade de levar mais pessoas, peço que entre em contato previamente para alinharmos."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section className="py-10">
      <div className="text-center mb-10">
        <h2 className="font-serif text-3xl text-primary mb-3">Informações Importantes</h2>
        <div className="w-16 h-0.5 bg-primary/20 mx-auto rounded-full" />
      </div>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={index}
              initial={false}
              className={`
                border rounded-2xl overflow-hidden transition-colors duration-300
                ${isOpen ? 'bg-white border-primary/10 shadow-sm' : 'bg-surface/30 border-transparent hover:bg-surface/50'}
              `}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left gap-4"
              >
                <span className={`font-medium text-lg leading-snug transition-colors ${isOpen ? 'text-primary' : 'text-primary/80'}`}>
                  {faq.question}
                </span>
                <span className={`
                  flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300
                  ${isOpen ? 'bg-primary text-white border-primary rotate-180' : 'bg-transparent text-secondary border-secondary/20'}
                `}>
                  {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-6 text-secondary/90 leading-relaxed font-light text-[15px]">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
};