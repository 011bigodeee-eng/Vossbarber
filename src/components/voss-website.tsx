'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ArrowDown, Menu, X, Instagram, MapPin, ArrowRight, MessageCircle, Plus } from 'lucide-react';
import { site, whatsapp } from '@/lib/site';

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(query.matches);
    update(); query.addEventListener('change', update);
    return () => query.removeEventListener('change', update);
  }, []);
  return reduced;
}
function Booking({children = 'Agendar experiência', topic, className = ''}: {children?: React.ReactNode; topic?: string; className?: string}) {
  return <a className={`button ${className}`} href={whatsapp(topic)} target="_blank" rel="noopener noreferrer"><span>{children}</span><ArrowUpRight size={17}/></a>;
}
function Reveal({children, className = ''}: {children: React.ReactNode; className?: string}) {
  const reduced = usePrefersReducedMotion();
  return <motion.div className={className} initial={reduced ? false : {opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:0.12}} transition={{duration:0.7,ease:[0.22,1,0.36,1]}}>{children}</motion.div>;
}
function Photo({src,alt,className='',priority=false,sizes='(max-width: 760px) 100vw, 60vw'}: {src:string;alt:string;className?:string;priority?:boolean;sizes?:string}) {
  return <div className={`photo ${className}`}><Image src={src} alt={`${alt} — imagem conceitual provisória`} fill sizes={sizes} priority={priority} className="photo-image"/><span className="photo-label">Imagem conceitual</span></div>;
}
export function VossWebsite() {
  const [menu,setMenu] = useState(false);
  const [scrolled,setScrolled] = useState(false);
  const [intro,setIntro] = useState(true);
  const [selected,setSelected] = useState<number|null>(null);
  const reduced = usePrefersReducedMotion();
  const closeRef = useRef<HTMLButtonElement>(null);
  const galleryTrigger = useRef<HTMLButtonElement|null>(null);
  const menuTrigger = useRef<HTMLButtonElement>(null);
  const mobileMenu = useRef<HTMLDivElement>(null);
  useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>40);onScroll();window.addEventListener('scroll',onScroll,{passive:true});const t=setTimeout(()=>setIntro(false),1500);return()=>{clearTimeout(t);window.removeEventListener('scroll',onScroll);};},[]);
  useEffect(()=>{if(!menu && selected===null)return;const before=document.body.style.overflow;document.body.style.overflow='hidden';const target=selected!==null?closeRef.current:mobileMenu.current?.querySelector<HTMLAnchorElement>('a');target?.focus();const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape'){setMenu(false);setSelected(null);}if(e.key==='Tab'){const root=selected!==null?document.querySelector('.lightbox'):mobileMenu.current;const els=root?.querySelectorAll<HTMLElement>('a,button');if(!els?.length)return;const first=els[0],last=els[els.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}};window.addEventListener('keydown',onKey);return()=>{document.body.style.overflow=before;window.removeEventListener('keydown',onKey);if(selected!==null)galleryTrigger.current?.focus();else menuTrigger.current?.focus();};},[menu,selected]);
  return <>
    <a className="skip-link" href="#conteudo">Ir para o conteúdo</a>
    {intro&&!reduced&&<motion.div className="intro" initial={{opacity:1}} animate={{opacity:[1,1,0]}} transition={{duration:1.5,times:[0,.7,1]}} aria-hidden="true"><motion.span initial={{opacity:0,letterSpacing:'0.4em'}} animate={{opacity:1,letterSpacing:'0.15em'}} transition={{duration:0.85}}>VOSS<span className="intro-line"/></motion.span></motion.div>}
    <header className={`header ${scrolled?'solid':''}`}>
      <a href="#inicio" aria-label="VOSS — início" className="wordmark">VOSS<span>BARBER LOUNGE</span></a>
      <nav className="desktop-nav" aria-label="Navegação principal">{site.navigation.map(([label,url])=><a key={url} href={url}>{label}</a>)}</nav>
      <Booking className="header-booking">Agendar horário</Booking>
      <button ref={menuTrigger} className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label={menu?'Fechar menu':'Abrir menu'} aria-expanded={menu} aria-controls="mobile-menu">{menu?<X/>:<Menu/>}</button>
    </header>
    <AnimatePresence>{menu&&<motion.div ref={mobileMenu} id="mobile-menu" className="mobile-menu" initial={reduced?false:{opacity:0,y:-15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}}><nav aria-label="Navegação mobile">{site.navigation.map(([label,url],i)=><a href={url} key={url} onClick={()=>setMenu(false)}><small>0{i+1}</small>{label}<ArrowUpRight size={20}/></a>)}</nav><Booking>Agendar horário</Booking><p>Ribeirão Preto · São Paulo</p></motion.div>}</AnimatePresence>
    <main id="conteudo">
      <section id="inicio" className="hero">
        <Photo src="/images/lounge.jpg" alt="Ambiente de barbearia com decoração escura e cadeiras de couro" priority sizes="100vw" className="hero-photo"/>
        <div className="hero-shade"/>
        <div className="hero-content">
          <p className="eyebrow"><span/> Estilo. Presença. Identidade.</p>
          <h1>VOSS<span>BARBER LOUNGE</span></h1>
          <h2>Mais do que um corte.<br/><em>Uma experiência.</em></h2>
          <p className="hero-description">Um novo conceito em autocuidado masculino<br className="desktop-break"/> em Ribeirão Preto.</p>
          <div className="hero-actions"><Booking/><a className="text-link" href="#experiencia">Conhecer a VOSS <ArrowUpRight size={16}/></a></div>
        </div>
        <div className="hero-bottom"><a href="#experiencia" className="scroll-link"><ArrowDown size={15}/> Explore a experiência</a><span>RIBEIRÃO PRETO, SP <span className="gold-dot">•</span> ESTILO SEM EXCESSOS</span><span className="hero-index">01 <i>/</i> VOSS</span></div>
        <span className="vertical-note">O CUIDADO ESTÁ NOS DETALHES</span>
      </section>
      <div className="signature-strip"><span>O seu tempo. O seu estilo.</span><span className="strip-star">✦</span><span>Uma experiência VOSS.</span><span className="strip-location">BARBER LOUNGE · RIBEIRÃO PRETO</span></div>
      <section id="experiencia" className="section manifesto">
        <Reveal className="manifesto-photo"><Photo src="/images/cut.jpg" alt="Barbeiro aperfeiçoando um corte masculino"/><div className="image-caption"><span>01 / A ESSÊNCIA VOSS</span><span>Cuidado que se percebe.</span></div></Reveal>
        <Reveal className="manifesto-copy"><p className="eyebrow">A experiência VOSS</p><h2>O seu estilo<br/>merece <em>mais.</em></h2><div className="short-line"/><p>Há algo especial em reservar um tempo para você. Desacelerar, cuidar da imagem e reconhecer seu próprio estilo.</p><p>Na VOSS, corte e barba são o ponto de partida para uma experiência de autocuidado. Um convite a valorizar a sua identidade, com atenção a cada detalhe.</p><a href="#servicos" className="text-link gold">Descubra o seu próximo ritual <ArrowUpRight size={17}/></a></Reveal>
      </section>
      <section id="servicos" className="section services">
        <Reveal className="section-heading"><div><p className="eyebrow">O cuidado tem assinatura</p><h2>A arte de cuidar<br/>de <em>você.</em></h2></div><p>Encontre o seu momento.<br/>Deixe o resto com o cuidado.</p></Reveal>
        <div className="service-grid">{site.services.map(s=><Reveal key={s.number} className="service-card"><a href={whatsapp(s.topic)} target="_blank" rel="noopener noreferrer" aria-label={`Consultar ${s.name} pelo WhatsApp`}><div className="service-image"><Photo src={s.image} alt={s.name} sizes="(max-width: 900px) 44vw, 21vw"/><span className="service-number">{s.number}</span><span className="service-arrow"><ArrowUpRight size={22}/></span></div><h3>{s.name}</h3><p>{s.text}</p><span className="service-cta">{s.topic==='Clube VOSS'?'Conhecer o clube':'Consultar agendamento'} <ArrowRight size={14}/></span></a></Reveal>)}</div>
      </section>
      <section id="clube" className="club"><div className="club-monogram" aria-hidden="true">V</div><Reveal className="club-content"><p className="eyebrow">CLUBE VOSS · SEU PRÓXIMO RITUAL</p><h2>Faça parte<br/><em>do clube.</em></h2><p>O seu estilo. Um novo ritual.</p><div className="club-description">Transforme o cuidado em um encontro com o seu melhor estilo. Converse com a VOSS e conheça a proposta do clube.</div><Booking topic="o Clube VOSS" className="button-outline">Quero conhecer o Clube VOSS</Booking></Reveal><span className="club-side">PERTENCER É TER O SEU LUGAR.</span></section>
      <section id="estrutura" className="section gallery-section"><Reveal className="section-heading"><div><p className="eyebrow">A atmosfera faz parte</p><h2>Um espaço para<br/>ser <em>você.</em></h2></div><p>Uma prévia da atmosfera que inspira a VOSS.<br/><span className="media-note">Imagens conceituais. Fotos reais em breve.</span></p></Reveal><div className="gallery-grid">{site.gallery.map((p,i)=><Reveal key={p.src}><button className="gallery-item" onClick={e=>{galleryTrigger.current=e.currentTarget;setSelected(i);}} aria-label={`Ampliar imagem conceitual: ${p.label}`}><Photo src={p.src} alt={p.alt}/><span className="gallery-caption">{p.label}<Plus size={20}/></span></button></Reveal>)}</div></section>
      <section className="groom"><Photo src="/images/groom.jpg" alt="Preparação de um visual masculino para uma ocasião especial"/><div className="groom-shade"/><Reveal className="groom-content"><p className="eyebrow">Dia do noivo</p><h2>Antes do sim,<br/>um momento <em>seu.</em></h2><p>Um dia memorável começa nos preparativos. Reserve um tempo para cuidar de você e entrar nessa nova fase com o seu estilo.</p><Booking topic="o Dia do Noivo">Consultar Dia do Noivo</Booking></Reveal></section>
      <section id="contato" className="section contact"><Reveal><p className="eyebrow">Nos encontramos na VOSS</p><h2>Seu próximo<br/>capítulo <em>começa aqui.</em></h2><Booking>Agendar meu horário</Booking></Reveal><Reveal className="contact-details"><MapPin size={25} strokeWidth={1}/><h3>Ribeirão Preto, SP</h3><address>{site.address}<br/>{site.city}</address><a className="text-link gold" href={site.maps} target="_blank" rel="noopener noreferrer">Como chegar <ArrowUpRight size={16}/></a><div className="contact-rule"/><a href={whatsapp()} target="_blank" rel="noopener noreferrer" className="contact-social"><MessageCircle size={19}/> Falar no WhatsApp <ArrowUpRight size={16}/></a><a href={site.instagram} target="_blank" rel="noopener noreferrer" className="contact-social"><Instagram size={19}/> @voss.barberlounge <ArrowUpRight size={16}/></a></Reveal></section>
    </main>
    <footer><div className="footer-top"><a className="wordmark" href="#inicio">VOSS<span>BARBER LOUNGE</span></a><p>Mais do que um corte.<br/>Uma experiência.</p><a href="#inicio" className="text-link">Voltar ao topo <ArrowUpRight size={16}/></a></div><nav className="footer-nav" aria-label="Navegação do rodapé">{site.navigation.map(([label,url])=><a key={url} href={url}>{label}</a>)}</nav><div className="footer-bottom"><span>© {new Date().getFullYear()} VOSS Barber Lounge.</span><span>PRÉVIA CONCEITUAL · IMAGENS PROVISÓRIAS</span><span>Ribeirão Preto · SP</span></div></footer>
    <a className="floating-booking" href={whatsapp()} target="_blank" rel="noopener noreferrer"><MessageCircle size={18}/> Agendar horário <ArrowUpRight size={16}/></a>
    <AnimatePresence>{selected!==null&&<motion.div className="lightbox" role="dialog" aria-modal="true" aria-label={`Imagem ampliada: ${site.gallery[selected].label}`} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={()=>setSelected(null)}><button ref={closeRef} className="lightbox-close" onClick={()=>setSelected(null)} aria-label="Fechar imagem"><X size={27}/></button><div className="lightbox-image" onClick={e=>e.stopPropagation()}><Image src={site.gallery[selected].src} alt={`${site.gallery[selected].alt} — imagem conceitual provisória`} fill sizes="90vw"/><p>{site.gallery[selected].label} · Imagem conceitual provisória</p></div></motion.div>}</AnimatePresence>
  </>;
}
