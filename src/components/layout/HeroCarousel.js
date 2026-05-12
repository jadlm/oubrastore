'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AUTO_MS = 6000;

const SLIDES = [
  {
    src: '/hero/banner-1-bureau.png',
    href: '/boutique?categorie=papeterie',
    alt: 'Fournitures de bureau — large gamme à petit prix',
  },
  {
    src: '/hero/banner-2-scolaire.png',
    href: '/boutique?categorie=fournitures-scolaires',
    alt: 'Fournitures scolaires — vaste choix pas cher',
  },
  {
    src: '/hero/banner-3-informatique.png',
    href: '/boutique?categorie=informatique',
    alt: 'Matériel informatique et accessoires',
  },
  {
    src: '/hero/banner-4-promo-papier.png',
    href: '/promotions',
    alt: 'Promo papier A4 Omnia — offre spéciale',
  },
];

export default function HeroCarousel() {
  const pathname = usePathname();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const len = SLIDES.length;
  const go = useCallback(
    (dir) => {
      setIndex((i) => (i + dir + len) % len);
    },
    [len]
  );

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => go(1), AUTO_MS);
    return () => clearInterval(t);
  }, [paused, go]);

  if (pathname?.startsWith('/admin')) return null;

  const slide = SLIDES[index];

  return (
    <section
      className="relative w-full min-w-0 overflow-x-hidden bg-neutral-100 border-b border-black/5"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Bannières promotions"
    >
      {/* Pleine largeur viewport : pas de max-w, image w-full h-auto = 100 % largeur, hauteur naturelle */}
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.src}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="w-full"
          >
            <Link
              href={slide.href}
              className="block w-full outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- bannières panoramiques : ratio variable, affichage 100 % largeur sans rogner */}
              <img
                src={slide.src}
                alt={slide.alt}
                className="w-full h-auto max-w-none block align-top select-none"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
                draggable={false}
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={() => go(-1)}
          className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/55 transition-colors backdrop-blur-sm"
          aria-label="Bannière précédente"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/55 transition-colors backdrop-blur-sm"
          aria-label="Bannière suivante"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      <div className="flex justify-center gap-2 py-2.5 sm:py-3 bg-white/90 backdrop-blur-sm border-t border-black/5">
        {SLIDES.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-primary' : 'w-2 bg-gray-300 hover:bg-gray-400'}`}
            aria-label={`Afficher la bannière ${i + 1}`}
            aria-current={i === index ? 'true' : undefined}
          />
        ))}
      </div>
    </section>
  );
}
