import { ServiceCategory, Testimonial, TimeSlot } from './types';

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  {
    id: 'makeup',
    title: 'Maquiagem',
    image: 'https://i.postimg.cc/R04KpKP5/Imagem-do-Whats-App-de-2025-12-16-a(s)-18-15-59-d2a4b765.jpg',
    variants: [
      {
        id: 'makeup-social',
        name: 'Maquiagem Social',
        price: 'R$ 80',
        duration: '50 a 60 min',
        description: 'Ideal para convidadas e eventos. Pele corrigida com naturalidade e olhos marcados na medida certa.'
      },
      {
        id: 'makeup-party',
        name: 'Maquiagem Festa',
        price: 'R$ 120',
        duration: '1h15 a 1h30',
        description: 'Produção completa com alta durabilidade, ideal para ocasiões especiais que pedem um visual mais elaborado.'
      }
    ]
  },
  {
    id: 'brows',
    title: 'Sobrancelha',
    image: 'https://i.postimg.cc/wjSb1fjp/Imagem-do-Whats-App-de-2025-12-16-a(s)-18-11-09-8414b38b.jpg',
    variants: [
      {
        id: 'brows-design',
        name: 'Design de Sobrancelhas',
        price: 'R$ 25',
        duration: '15 a 20 min',
        description: 'Mapeamento facial para encontrar o formato ideal, realçando seu olhar.'
      },
      {
        id: 'brows-henna',
        name: 'Design com Henna',
        price: 'R$ 35',
        duration: '25 a 30 min',
        description: 'Design completo com aplicação de henna para preenchimento e definição.'
      }
    ]
  },
  {
    id: 'hair',
    title: 'Cabelo',
    image: 'https://i.postimg.cc/tgqnNyTy/Imagem-do-Whats-App-de-2025-12-16-a(s)-18-09-29-3383f52d.jpg',
    variants: [
      {
        id: 'hair-flatiron',
        name: 'Chapinha',
        price: 'R$ 50',
        duration: '30 a 40 min',
        description: 'Alinhamento dos fios com finalização profissional. Cabelo deve estar limpo e seco.'
      },
      {
        id: 'hair-babyliss',
        name: 'Babyliss',
        price: 'R$ 50',
        duration: '35 a 45 min',
        description: 'Ondas soltas e modernas com fixação. Cabelo deve estar limpo e seco.'
      },
      {
        id: 'hair-combo',
        name: 'Chapinha + Babyliss',
        price: 'R$ 80',
        duration: '50 a 60 min',
        description: 'Finalização completa para um look sofisticado. Cabelo deve estar limpo e seco.'
      }
    ]
  },
  {
    id: 'packages',
    title: 'Pacotes',
    image: 'https://i.postimg.cc/pXJBbKrN/Imagem-do-Whats-App-de-2025-12-16-a(s)-23-03-28-2d5e099d.jpg',
    variants: [
        {
            id: 'package-basico',
            name: 'Essencial',
            price: 'R$ 100',
            duration: '1h05 a 1h15',
            description: 'Design sem henna + maquiagem social'
        },
        {
            id: 'package-glow',
            name: 'Glow',
            price: 'R$ 110',
            duration: '1h15 a 1h30',
            description: 'Design com henna + maquiagem social'
        },
        {
            id: 'package-power',
            name: 'Luxo',
            price: 'R$ 150',
            duration: '1h40 a 1h55',
            description: 'Design com henna + maquiagem festa'
        },
        {
            id: 'package-evento',
            name: 'Diamante',
            price: 'R$ 160',
            duration: '1h50 a 2h15',
            description: 'Maquiagem festa + chapinha OU babyliss'
        },
        {
            id: 'package-completao',
            name: 'Premium',
            price: 'R$ 200',
            duration: '2h05 a 2h25',
            description: 'Design com henna + maquiagem festa + chapinha OU babyliss'
        }
    ]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Daniele",
    text: "Fiquei apaixonada pelo design! A Iris conseguiu valorizar meu olhar mantendo a naturalidade que eu tanto queria. Simplesmente perfeito.",
    rating: 5,
    image: "https://i.postimg.cc/cJbjdkyG/Imagem-do-Whats-App-de-2025-12-16-a(s)-16-03-21-69f5f8b1.jpg"
  },
  {
    id: 2,
    name: "Isis",
    text: "Eu tinha receio de fazer henna, mas o resultado ficou incrível. A cor ficou super harmoniosa e o desenho impecável. Recomendo demais!",
    rating: 5,
    image: "https://i.postimg.cc/C108nSV4/Imagem-do-Whats-App-de-2025-12-16-a(s)-16-05-52-9e69d328.jpg"
  },
  {
    id: 3,
    name: "Natália",
    text: "A maquiagem ficou deslumbrante e durou a festa inteira! O cuidado com cada detalhe e a preparação da pele fizeram toda a diferença.",
    rating: 5,
    image: "https://i.postimg.cc/3J0whVsK/Imagem-do-Whats-App-de-2025-12-16-a(s)-16-09-10-708f2432.jpg"
  }
];

export const AVAILABLE_TIMES: TimeSlot[] = [
  { id: '09:00', time: '09:00', available: true },
  { id: '10:00', time: '10:00', available: true },
  { id: '11:00', time: '11:00', available: false },
  { id: '13:00', time: '13:00', available: true },
  { id: '14:30', time: '14:30', available: true },
  { id: '16:00', time: '16:00', available: true },
  { id: '17:00', time: '17:00', available: true },
];