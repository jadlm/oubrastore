'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Heart, ShoppingBag, Minus, Plus, Truck, Shield, RotateCcw, ChevronRight, Share2 } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/product/ProductCard';

const product = {
  id: 1, nom: 'Imprimante HP LaserJet Pro M404dn', slug: 'hp-laserjet-pro-m404dn', prix: 2890.00, prix_promo: 2490.00,
  description: '<p>L\'imprimante HP LaserJet Pro M404dn offre une impression rapide et une sécurité renforcée. Idéale pour les petites entreprises et bureaux à domicile.</p><ul><li>Vitesse d\'impression jusqu\'à 40 ppm</li><li>Impression recto verso automatique</li><li>Connexion Ethernet intégrée</li><li>Toner HP 58A/58X</li></ul>',
  description_courte: 'Imprimante laser monochrome professionnelle avec impression recto verso automatique et connectivité réseau.',
  marque: 'HP', categorie_nom: 'Informatique', sku: 'HP-LJ-M404DN', stock: 12, vues: 342,
};

const specs = [
  { label: 'Marque', value: 'HP' }, { label: 'Modèle', value: 'LaserJet Pro M404dn' },
  { label: 'Type', value: 'Laser Monochrome' }, { label: 'Vitesse', value: '40 ppm' },
  { label: 'Résolution', value: '1200 x 1200 dpi' }, { label: 'Recto verso', value: 'Automatique' },
  { label: 'Connectivité', value: 'USB, Ethernet' }, { label: 'Garantie', value: '1 an' },
];

const reviews = [
  { nom: 'Ahmed B.', note: 5, commentaire: 'Excellente imprimante, rapide et silencieuse. Qualité d\'impression top.', date: '15 Mars 2024' },
  { nom: 'Sara M.', note: 4, commentaire: 'Bon rapport qualité-prix. Installation facile.', date: '02 Fév 2024' },
];

const related = [
  { id: 3, nom: 'Cartouche HP 305XL Noir', slug: 'cartouche-hp-305xl', prix: 349, prix_promo: 299, marque: 'HP', categorie_nom: 'Cartouches', stock: 45, image_principale: null },
  { id: 6, nom: 'Clé USB SanDisk 64GB', slug: 'cle-usb-sandisk-64', prix: 89, prix_promo: null, marque: 'SanDisk', categorie_nom: 'Informatique', stock: 100, image_principale: null },
  { id: 8, nom: 'Écran Dell 24" Full HD', slug: 'ecran-dell-24', prix: 2100, prix_promo: 1890, marque: 'Dell', categorie_nom: 'Informatique', stock: 8, image_principale: null },
  { id: 12, nom: 'Souris Logitech M185', slug: 'souris-logitech-m185', prix: 120, prix_promo: 99, marque: 'Logitech', categorie_nom: 'Informatique', stock: 65, image_principale: null },
];

export default function ProductPage() {
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('description');
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const inWish = isInWishlist(product.id);
  const hasPromo = product.prix_promo && product.prix_promo < product.prix;
  const prix = hasPromo ? product.prix_promo : product.prix;
  const reduction = hasPromo ? Math.round((1 - product.prix_promo / product.prix) * 100) : 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-surface-muted border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link href="/" className="hover:text-primary">Accueil</Link><ChevronRight size={14} />
          <Link href="/boutique" className="hover:text-primary">Boutique</Link><ChevronRight size={14} />
          <span className="text-gray-600">{product.nom}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Gallery */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="aspect-square bg-surface-muted rounded-2xl flex items-center justify-center overflow-hidden">
              <ShoppingBag size={80} className="text-gray-200" />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-400 uppercase tracking-wider">{product.marque}</span>
              {hasPromo && <span className="badge-promo">-{reduction}%</span>}
            </div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-dark-DEFAULT mb-3">{product.nom}</h1>

            <div className="flex items-center gap-3 mb-4">
              <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-primary" fill={s <= 4 ? 'currentColor' : 'none'} />)}</div>
              <span className="text-sm text-gray-400">(2 avis)</span>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-green-600">En stock ({product.stock})</span>
            </div>

            <p className="text-gray-500 mb-6">{product.description_courte}</p>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-3xl font-bold text-dark-DEFAULT">{prix.toFixed(2)} MAD</span>
              {hasPromo && <span className="text-xl text-gray-400 line-through">{product.prix.toFixed(2)} MAD</span>}
            </div>

            {/* Quantity + Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              <div className="flex items-center border rounded-lg">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-gray-50"><Minus size={16} /></button>
                <span className="px-4 font-medium">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-gray-50"><Plus size={16} /></button>
              </div>
              <button onClick={() => addItem(product, qty)} className="btn-primary flex-1 flex items-center justify-center gap-2">
                <ShoppingBag size={18} /> Ajouter au panier
              </button>
              <button onClick={() => toggleItem(product)} className={`p-3 rounded-lg border-2 transition-colors ${inWish ? 'border-red-500 text-red-500 bg-red-50' : 'border-gray-200 hover:border-primary'}`}>
                <Heart size={20} fill={inWish ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* WhatsApp */}
            <a href={`https://wa.me/212600000000?text=Bonjour, je suis intéressé par: ${product.nom}`} target="_blank" rel="noopener" className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors mb-6">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/></svg>
              Commander via WhatsApp
            </a>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-3">
              {[{ icon: Truck, text: 'Livraison rapide' }, { icon: Shield, text: 'Garanti 1 an' }, { icon: RotateCcw, text: 'Retour 7j' }].map((g, i) => (
                <div key={i} className="flex flex-col items-center text-center p-3 bg-surface-muted rounded-xl">
                  <g.icon size={18} className="text-primary mb-1" /><span className="text-xs text-gray-500">{g.text}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-4">SKU: {product.sku} | Catégorie: {product.categorie_nom}</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16 border-t pt-10">
          <div className="flex gap-6 border-b mb-8">
            {['description', 'caractéristiques', 'avis'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`pb-3 px-1 font-medium capitalize transition-colors ${tab === t ? 'text-primary border-b-2 border-primary' : 'text-gray-400 hover:text-gray-600'}`}>{t}</button>
            ))}
          </div>
          {tab === 'description' && <div className="prose max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: product.description }} />}
          {tab === 'caractéristiques' && (
            <div className="grid md:grid-cols-2 gap-3">{specs.map((s, i) => (
              <div key={i} className="flex justify-between p-3 bg-surface-muted rounded-lg"><span className="text-gray-500">{s.label}</span><span className="font-medium">{s.value}</span></div>
            ))}</div>
          )}
          {tab === 'avis' && (
            <div className="space-y-4">{reviews.map((r, i) => (
              <div key={i} className="card p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">{[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-primary" fill={s <= r.note ? 'currentColor' : 'none'} />)}</div>
                  <span className="text-sm text-gray-400">{r.date}</span>
                </div>
                <p className="text-gray-600 mb-2">{r.commentaire}</p>
                <p className="text-sm font-medium">{r.nom}</p>
              </div>
            ))}</div>
          )}
        </div>

        {/* Related */}
        <div className="mt-16">
          <h2 className="section-title mb-8">Produits Similaires</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
