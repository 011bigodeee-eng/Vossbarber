export const site = {
  name: 'VOSS Barber Lounge',
  address: 'Marechal Deodoro, 1774',
  city: 'Ribeirão Preto/SP',
  instagram: 'https://www.instagram.com/voss.barberlounge/',
  whatsapp: 'https://wa.me/5516996143108',
  maps: 'https://www.google.com/maps/search/?api=1&query=VOSS+Barber+Lounge+Marechal+Deodoro+1774+Ribeir%C3%A3o+Preto+SP',
  navigation: [['Início', '#inicio'], ['Experiência', '#experiencia'], ['Serviços', '#servicos'], ['Clube VOSS', '#clube'], ['Nossa estrutura', '#estrutura'], ['Contato', '#contato']],
  services: [
    { number: '01', name: 'Corte masculino', text: 'Seu estilo, em cada detalhe.', image: '/images/cut.jpg', topic: 'Corte Masculino' },
    { number: '02', name: 'Barba', text: 'Presença que se revela no cuidado.', image: '/images/beard.jpg', topic: 'Barba' },
    { number: '03', name: 'Clube VOSS', text: 'O cuidado como parte da sua rotina.', image: '/images/lounge.jpg', topic: 'Clube VOSS' },
    { number: '04', name: 'Dia do noivo', text: 'Um novo capítulo começa aqui.', image: '/images/groom.jpg', topic: 'Dia do Noivo' },
  ],
  gallery: [
    { src: '/images/lounge.jpg', alt: 'Interior de barbearia com cadeiras e espelhos', label: 'O ambiente' },
    { src: '/images/cut.jpg', alt: 'Detalhe de um corte masculino', label: 'O cuidado' },
    { src: '/images/beard.jpg', alt: 'Barbeiro trabalhando nos detalhes da barba', label: 'Os detalhes' },
  ],
};
export const whatsapp = (topic = 'uma experiência na VOSS') => `${site.whatsapp}?text=${encodeURIComponent(`Olá! Gostaria de saber mais sobre ${topic} e consultar disponibilidade.`)}`;
