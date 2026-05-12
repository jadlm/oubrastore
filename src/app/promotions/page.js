'use client';
import { motion } from 'framer-motion';
import { Tag, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import Link from 'next/link';

const promoProducts = [
  { id: 1, nom: 'Imprimante HP LaserJet Pro M404dn', slug: 'hp-laserjet-pro-m404dn', prix: 2890, prix_promo: 2490, marque: 'HP', categorie_nom: 'Informatique', stock: 12, image_principale: null },
  { id: 3, nom: 'Cartouche HP 305XL Noir', slug: 'cartouche-hp-305xl', prix: 349, prix_promo: 299, marque: 'HP', categorie_nom: 'Cartouches', stock: 45, image_principale: null },
  { id: 5, nom: 'Sac à Dos Eastpak Padded', slug: 'sac-eastpak-padded', prix: 450, prix_promo: 389, marque: 'Eastpak', categorie_nom: 'Scolaire', stock: 25, image_principale: null },
  { id: 7, nom: 'Agrafeuse Rapid Omnipress', slug: 'agrafeuse-rapid', prix: 125, prix_promo: 99, marque: 'Rapid', categorie_nom: 'Papeterie', stock: 60, image_principale: null },
  { id: 8, nom: 'Écran Dell 24" Full HD', slug: 'ecran-dell-24', prix: 2100, prix_promo: 1890, marque: 'Dell', categorie_nom: 'Informatique', stock: 8, image_principale: null },
  { id: 12, nom: 'Souris Logitech M185', slug: 'souris-logitech-m185', prix: 120, prix_promo: 99, marque: 'Logitech', categorie_nom: 'Informatique', stock: 65, image_principale: null },
];

export default function PromotionsPage() {
  return (
    <div className="min-h-screen bg-surface-muted">
      {/* Hero */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Tag size={40} className="mx-auto mb-4" />
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3">Promotions</h1>
            <p className="text-white/70 text-lg">Profitez de nos meilleures offres du moment</p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Promo Banner */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="bg-gradient-to-r from-primary to-primary-dark p-8 rounded-2xl mb-12 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold text-dark-DEFAULT mb-2">Jusqu&apos;à -30% sur les cartouches HP</h2>
          <p className="text-dark-DEFAULT/70 mb-4">Offre valable jusqu&apos;au 31 décembre 2024</p>
          <Link href="/boutique?categorie=cartouches-toners" className="btn-dark inline-flex items-center gap-2">Voir les offres <ArrowRight size={16} /></Link>
        </motion.div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {promoProducts.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
        </div>
      </div>
    </div>
  );
}
