/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Eye, Sparkles, Brush } from 'lucide-react';

const LINKS = {
  INSTAGRAM: 'https://thr.ee/kuklastudio',
  BEHANCE: 'https://thr.ee/kuklastudio',
  ARTSTATION: 'https://thr.ee/kuklastudio',
  LOCATION: 'https://thr.ee/kuklastudio',
  WHATSAPP: 'https://thr.ee/kuklastudio',
  CREATOR_TG: 'https://t.me/nilshade',
};

const NAV_ITEMS = [
  {
    id: 'kids',
    label: 'Acrílico Kids',
    image: '/images/enroll.jpg', // Replace with your file in public/images/enroll.jpg
    color: 'bg-blue-500',
    description: 'El núcleo de nuestra escuela. Aprendizaje de color, texturas y composición desde cero. (Niños 6-12 años)',
    link: LINKS.WHATSAPP
  },
  {
    id: 'workshops',
    label: 'Talleres Intensivos',
    image: '/images/workshops.jpg', // Replace with your file in public/images/workshops.jpg
    color: 'bg-amber-400',
    description: 'Sesiones temáticas de fin de semana para proyectos específicos y técnicas mixtas. (Jóvenes y Adultos)',
    link: LINKS.WHATSAPP
  },
  {
    id: 'specialized',
    label: 'Cursos Especializados',
    image: '/images/gallery.jpg', // Replace with your file in public/images/gallery.jpg
    color: 'bg-emerald-500',
    description: 'Programas mensuales para perfeccionar el trazo y la teoría del arte. (Nivel Intermedio)',
    link: LINKS.INSTAGRAM
  }
];

const HERO_IMAGE = '/images/hero_art.jpg'; // Replace with your file in public/images/hero_art.jpg
const CREATOR_IMAGE = '/images/creator.jpg'; // Replace with your file in public/images/creator.jpg

const PAINT_FONTS = [
  { name: 'Lobster', family: '"Lobster", cursive' },
  { name: 'Pacifico', family: '"Pacifico", cursive' },
  { name: 'Creepster', family: '"Creepster", cursive' },
  { name: 'Bangers', family: '"Bangers", cursive' },
  { name: 'Righteous', family: '"Righteous", cursive' },
  { name: 'Cinzel Decorative', family: '"Cinzel Decorative", cursive' },
  { name: 'Abril Fatface', family: '"Abril Fatface", cursive' },
  { name: 'Kaushan Script', family: '"Kaushan Script", cursive' },
  { name: 'Playfair Display', family: '"Playfair Display", serif' }
];

const InteractiveLetter = ({ letter, index }: { letter: string; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="inline-block pointer-events-auto"
      animate={{
        y: isHovered ? -40 : [0, -15, 0],
        rotate: isHovered ? (index % 2 === 0 ? 15 : -15) : 0,
        scale: isHovered ? 1.2 : 1,
        color: isHovered ? "#f43f5e" : "rgba(255, 255, 255, 0.05)",
      }}
      transition={{
        y: isHovered
          ? { type: "spring", stiffness: 300, damping: 10 }
          : { repeat: Infinity, duration: 4, delay: index * 0.2, ease: "easeInOut" },
        default: { duration: 0.5 }
      }}
    >
      <h2 className="text-8xl md:text-[14rem] lg:text-[20rem] font-script leading-none px-2 drop-shadow-[0_0_30px_rgba(244,63,94,0.1)]">
        {letter}
      </h2>
    </motion.span>
  );
};

export default function App() {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentFontIndex, setCurrentFontIndex] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isAuthorHovered, setIsAuthorHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFontIndex((prev) => (prev + 1) % PAINT_FONTS.length);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-x-hidden selection:bg-rose-100 no-scrollbar">
      {/* Branding - Top Left (Professional Background Layer) */}
      <div
        className={`fixed top-6 left-6 md:top-8 md:left-8 z-[70] transition-all duration-1000 ${scrolled ? 'opacity-30 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`cursor-pointer transition-colors duration-500 active:scale-95 ${scrolled ? 'text-zinc-400 mix-blend-overlay' : 'text-rose-600'}`}
        >
          <h2 className="text-4xl md:text-5xl font-script drop-shadow-[0_2px_10px_rgba(0,0,0,0.1)] filter contrast-125">Kukla</h2>
        </button>
      </div>

      {/* Hamburger - Top Right */}
      {!isMenuOpen && (
        <button
          onClick={() => setIsMenuOpen(true)}
          className={`fixed top-6 right-6 md:top-8 md:right-8 z-[70] p-2 transition-all duration-500 rounded-full ${scrolled ? 'bg-white/10 backdrop-blur-sm text-zinc-600 mix-blend-difference' : 'text-black'}`}
        >
          <Menu size={32} />
        </button>
      )}

      {/* HERO SECTION */}
      <section className="relative min-h-[90vh] md:h-screen w-full flex flex-col md:flex-row bg-white overflow-hidden">
        {/* Main Content Area - Left Side - Shifted more to the right */}
        <main className="flex-1 flex flex-col justify-center px-6 pt-24 pb-12 md:py-0 md:pl-48 lg:pl-64 md:pr-12 relative h-1/2 md:h-full">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-[0.85] tracking-tighter mb-8 uppercase">
              <span className="inline-grid grid-cols-1 grid-rows-1">
                <span
                  className="col-start-1 row-start-1 flex items-center h-[1.1em]"
                  style={{ fontFamily: PAINT_FONTS[currentFontIndex].family }}
                >
                  Pinta
                </span>
              </span><br />
              Su Futuro.
            </h1>

            <div className="max-w-md">
              <p className="font-mono text-[10px] md:text-sm leading-relaxed text-zinc-500 opacity-80 mb-10 md:mb-12">
                En Kukla, transformamos la curiosidad en arte. Escuela especializada en acrílico para niños, talleres creativos y cursos para todas las edades en Manta.
              </p>
            </div>

            {/* Inset Image & Info Block */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="w-full h-32 sm:w-48 sm:h-32 md:w-64 md:h-44 bg-zinc-100 relative overflow-hidden block cursor-pointer shrink-0"
                onClick={() => scrollToSection('kids')}
              >
                <img
                  src={HERO_IMAGE}
                  alt="Niño pintando"
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to unsplash if local image is missing
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1549490349-8643362247b5?auto=format&fit=crop&q=80";
                  }}
                />
                <div className="absolute top-0 left-0 w-full h-full border border-black/5 pointer-events-none" />
              </motion.div>

              <div className="flex flex-col gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href={LINKS.WHATSAPP}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-4 bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-rose-600 transition-colors w-full sm:w-auto cursor-pointer"
                >
                  Inscríbete Ahora
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#kids"
                  onClick={(e) => { e.preventDefault(); scrollToSection('kids'); }}
                  className="inline-flex items-center justify-center gap-4 bg-transparent text-black border border-black/20 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-black hover:text-white transition-colors w-full sm:w-auto cursor-pointer"
                >
                  Ver Talleres
                </motion.a>
              </div>
            </div>
          </motion.div>
        </main>

        {/* Navigation Sections Area - Right Side */}
        <div className="flex flex-row h-1/2 md:h-full md:w-[45%] lg:w-[40%] flex-nowrap border-t md:border-t-0 md:border-l border-zinc-100">
          {NAV_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              layout
              onMouseEnter={() => setExpandedId(item.id)}
              onMouseLeave={() => setExpandedId(null)}
              onClick={() => scrollToSection(item.id)}
              className={`relative flex-1 group transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer overflow-hidden border-l border-white/10 ${expandedId === item.id ? 'flex-[6] md:flex-[8]' : 'flex-1 md:flex-1'}`}
            >
              <motion.div
                className="absolute inset-0 z-0"
                animate={{
                  scale: expandedId === item.id ? 1.1 : 1,
                  x: expandedId === item.id ? (mousePos.x - window.innerWidth / 2) / 40 : 0,
                  y: expandedId === item.id ? (mousePos.y - window.innerHeight / 2) / 40 : 0,
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-opacity duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback to placeholder if local image is missing
                    const fallbacks: { [key: string]: string } = {
                      'Acrílico Kids': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
                      'Talleres Intensivos': 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80',
                      'Cursos Especializados': 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80'
                    };
                    (e.target as HTMLImageElement).src = fallbacks[item.label] || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80";
                  }}
                />
                <div className={`absolute inset-0 ${item.color} opacity-40 mix-blend-multiply group-hover:opacity-20 transition-opacity duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)]`} />
                <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/90 opacity-80" />
              </motion.div>

              <div className="relative z-10 h-full flex items-center justify-center p-4">
                <div className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${expandedId === item.id ? 'opacity-0 scale-90 -translate-y-4' : 'opacity-100 scale-100 translate-y-0'}`}>
                  <h3 className="writing-vertical text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold uppercase tracking-[0.2em] text-white drop-shadow-2xl">
                    {item.label}
                  </h3>
                </div>

                <AnimatePresence>
                  {expandedId === item.id && (
                    <motion.div
                      key="expanded-content"
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black/10 backdrop-blur-[1px] pointer-events-none"
                    >
                      <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6 }}
                        className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-6 uppercase tracking-tighter text-center leading-none"
                      >
                        {item.label}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="font-mono text-[8px] sm:text-[10px] md:text-[11px] uppercase text-white/90 leading-[1.3] max-w-[120px] md:max-w-xs tracking-widest text-center lg:block hidden"
                      >
                        {item.description}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* NUESTRA ESENCIA SECTION */}
      <section className="w-full bg-zinc-950 text-white py-24 md:py-32 px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80')] opacity-5 bg-cover bg-center grayscale mix-blend-screen pointer-events-none"></div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="max-w-4xl mx-auto relative z-10"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-rose-500 mb-8 block"
          >
            Nuestra Esencia
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-[1.2] tracking-tight text-zinc-100">
            Creemos que cada pincelada es un paso hacia la confianza. En Kukla, liderado por artistas que entienden que el arte es el lenguaje de la libertad, brindamos un espacio donde los más pequeños —y los no tan pequeños— pueden explorar su potencial creativo sin límites.
          </h2>
        </motion.div>
      </section>

      {/* CONTENT SECTIONS */}
      {NAV_ITEMS.map((section, idx) => (
        <section
          id={section.id}
          key={section.id}
          className={`min-h-screen w-full flex flex-col md:flex-row items-center justify-between py-20 px-6 md:px-12 lg:px-24 overflow-hidden ${idx % 2 === 0 ? 'bg-zinc-50' : 'bg-white'}`}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[48%] md:pr-8 lg:pr-16 mb-12 md:mb-0 z-10 text-center md:text-left"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-rose-500 mb-4 block">0{idx + 1} // {section.label}</span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter uppercase mb-6 leading-[0.9] break-words">
              {section.label}
            </h2>
            <p className="text-sm md:text-base lg:text-lg text-zinc-600 leading-relaxed mb-10 max-w-xl mx-auto md:mx-0">
              {section.description}
            </p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={section.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-4 bg-black text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-rose-600 transition-colors cursor-pointer"
            >
              Más Información <ArrowRight size={18} />
            </motion.a>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-[45%] h-[40vh] md:h-[65vh] relative group overflow-hidden bg-zinc-100 rounded-sm"
          >
            <img
              src={section.image}
              alt={section.label}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              referrerPolicy="no-referrer"
              onError={(e) => {
                const fallbacks: { [key: string]: string } = {
                  'Acrílico Kids': 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80',
                  'Talleres Intensivos': 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80',
                  'Cursos Especializados': 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?auto=format&fit=crop&q=80'
                };
                (e.target as HTMLImageElement).src = fallbacks[section.label] || "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80";
              }}
            />
            <div className={`absolute inset-0 ${section.color} opacity-20`} />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </motion.div>
        </section>
      ))}

      {/* POR QUÉ ELEGIR KUKLA */}
      <section className="w-full bg-white py-24 md:py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-rose-500 mb-4 block">Beneficios</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tighter">¿Por qué elegir Kukla?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-6 text-zinc-800 transition-colors hover:bg-rose-50 hover:text-rose-500">
                <Eye size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-tight">Aprendizaje Orgánico</h3>
              <p className="text-zinc-500 leading-relaxed text-sm md:text-base max-w-sm">No solo enseñamos a pintar, enseñamos a observar el mundo.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-6 text-zinc-800 transition-colors hover:bg-rose-50 hover:text-rose-500">
                <Sparkles size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-tight">Ambiente Inspirador</h3>
              <p className="text-zinc-500 leading-relaxed text-sm md:text-base max-w-sm">Un estudio diseñado para que la creatividad fluya sin distracciones.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-zinc-50 flex items-center justify-center mb-6 text-zinc-800 transition-colors hover:bg-rose-50 hover:text-rose-500">
                <Brush size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-4 uppercase tracking-tight">Materiales de Calidad</h3>
              <p className="text-zinc-500 leading-relaxed text-sm md:text-base max-w-sm">Trabajamos con los mejores pigmentos para que cada obra dure para siempre.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="w-full bg-zinc-950 px-6 py-12 md:px-8 md:py-32 border-t border-white/5 flex flex-col items-center justify-center gap-16 relative overflow-hidden">

        <div className="text-center max-w-3xl mx-auto mb-8 z-10">
          <h2 className="text-3xl md:text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tighter uppercase">¿Listo para llenar tu mundo de color?</h2>
          <p className="text-zinc-400 font-mono text-xs md:text-sm uppercase tracking-[0.2em]">Manta, Manabí</p>
        </div>

        {/* Artistic Logo Background with Letter Interaction */}
        <div className="text-center w-full relative">
          <div className="flex justify-center items-center select-none pointer-events-none mb-12 overflow-visible">
            {"Kukla".split("").map((letter, i) => (
              <InteractiveLetter key={i} letter={letter} index={i} />
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-16 font-mono text-[9px] md:text-[11px] uppercase tracking-[0.4em] text-zinc-500 relative z-10">
            <a href={LINKS.INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors">Instagram</a>
            <a href={LINKS.BEHANCE} target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors">Behance</a>
            <a href={LINKS.ARTSTATION} target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors">ArtStation</a>
            <a href={LINKS.LOCATION} target="_blank" rel="noopener noreferrer" className="hover:text-rose-500 transition-colors">Location</a>
          </div>
        </div>

        <div className="w-full border-t border-white/10 pt-10 flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-6 relative z-10">
          <div className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-zinc-500 flex flex-col md:flex-row items-center gap-2 md:gap-0 text-center md:text-left">
            <div className="flex items-center">
              <span className="text-zinc-300">© 2026</span>
              <span className="mx-3 opacity-20 text-white">|</span>
              <span className="font-bold text-zinc-100">Kukla Studio</span>
            </div>
            <span className="hidden md:block mx-3 opacity-20 text-white">|</span>
            <div className="flex items-center relative">
              <span className="opacity-60">Visual Identity by</span>
              <a
                href={LINKS.CREATOR_TG}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setIsAuthorHovered(true)}
                onMouseLeave={() => setIsAuthorHovered(false)}
                className="font-bold text-rose-500 ml-2 hover:text-rose-400 transition-colors cursor-pointer"
              >
                Alexander Zubatov
              </a>

              {/* Author Preview Image */}
              <AnimatePresence>
                {isAuthorHovered && (
                  <motion.div
                    key="author-tooltip"
                    initial={{ opacity: 0, y: 10, scale: 0.8 }}
                    animate={{ opacity: 1, y: -20, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.8 }}
                    className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 p-1 bg-white rounded shadow-2xl z-[100] pointer-events-none"
                  >
                    <img
                      src={CREATOR_IMAGE}
                      alt="Creator preview"
                      className="max-w-[150px] md:max-w-[200px] h-auto rounded-sm block"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=400";
                      }}
                    />
                    <div className="absolute inset-0 bg-rose-500/10 mix-blend-multiply" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-10 h-10 md:w-12 md:h-12 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group"
            >
              <ArrowRight size={20} className="-rotate-90 group-hover:-translate-y-1 transition-all" />
            </button>
          </div>
        </div>
      </footer>

      {/* Global Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 150 }}
            className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-8"
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:opacity-50 transition-opacity p-2"
            >
              <X size={40} strokeWidth={1.5} />
            </button>

            <div className="text-center space-y-6 md:space-y-12 max-w-full">
              {[
                { label: 'Acrílico Kids', link: '#kids', scroll: true },
                { label: 'Talleres Intensivos', link: '#workshops', scroll: true },
                { label: 'Cursos Especializados', link: '#specialized', scroll: true },
                { label: 'Instagram', link: LINKS.INSTAGRAM, scroll: false },
              ].map((link, idx) => (
                <motion.a
                  key={link.label}
                  href={link.link}
                  target={link.scroll ? "_self" : "_blank"}
                  rel={link.scroll ? "" : "noopener noreferrer"}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * idx, duration: 0.5 }}
                  onClick={(e) => {
                    if (link.scroll) {
                      e.preventDefault();
                      scrollToSection(link.link.substring(1));
                    }
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-4xl sm:text-6xl md:text-8xl font-bold text-white hover:text-rose-400 transition-colors uppercase tracking-tighter cursor-pointer"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
