'use client';
import { motion } from 'framer-motion';
import { Printer, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function ImprimeriePage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="bg-gradient-to-br from-dark-DEFAULT to-dark-50 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium">Services Professionnels</span>
            <h1 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-4">Services d&apos;Impression</h1>
            <p className="text-white/70 text-lg max-w-2xl">Des solutions d&apos;impression professionnelles pour entreprises, associations et particuliers à Casablanca. Rapide, fiable et sur mesure.</p>
          </motion.div>
        </div>
      </div>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl">
              <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <Printer size={18} /> Impression & reprographie
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">Tout ce dont vous avez besoin pour vos documents, flyers, posters et supports pro.</h2>
              <p className="text-gray-600 text-base leading-8 mb-6">Nous réalisons vos impressions en noir et blanc ou couleur, sur papier classique ou premium, avec des finitions professionnelles. Nos services sont adaptés aux petites et grandes quantités, et nous garantissons un rendu rapide et net.</p>
              <ul className="space-y-4 mb-8">
                {[
                  'Impression de documents A4, A3, A2 et A1',
                  'Flyers, dépliants, affiches, posters et banderoles',
                  'Reliure, plastification et façonnage sur mesure',
                  'Cartes de visite et supports publicitaires personnalisés',
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Contactez-nous <ChevronRight size={18} />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-4">
            <div className="overflow-hidden rounded-[2rem] shadow-lg">
              <img src="/hero/banner-4-promo-papier.png" alt="Impression papier et service reprographie" className="w-full h-auto object-cover" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="overflow-hidden rounded-[1.5rem] shadow-lg">
                <img src="/hero/banner-1-bureau.png" alt="Impression de documents professionnels" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden rounded-[1.5rem] shadow-lg">
                <img src="/hero/banner-3-informatique.png" alt="Solutions impression et informatique" className="w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-surface-muted">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-10 lg:grid-cols-3">
            {[
              {
                title: 'Impression rapide',
                text: 'Livraison express ou retrait en boutique selon vos besoins, même pour les petits tirages.',
              },
              {
                title: 'Qualité professionnelle',
                text: 'Papier premium, couleurs fidèles et finitions soignées pour un rendu haut de gamme.',
              },
              {
                title: 'Accompagnement dédié',
                text: 'Conseil personnalisé et suivi de votre projet dès la commande jusqu’à la livraison.',
              },
            ].map((item, index) => (
              <div key={index} className="card p-8">
                <h3 className="font-display text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-7">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
