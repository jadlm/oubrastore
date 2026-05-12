'use client';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { addItem } = useCart();

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="bg-white border-b"><div className="max-w-7xl mx-auto px-4 py-8"><h1 className="section-title flex items-center gap-3"><Heart size={28} className="text-primary" /> Mes Favoris</h1><p className="text-gray-500 mt-2">{items.length} produit(s)</p></div></div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={64} className="text-gray-200 mx-auto mb-4" />
            <h2 className="font-display text-xl font-bold mb-2">Aucun favori</h2>
            <p className="text-gray-400 mb-4">Ajoutez des produits à vos favoris pour les retrouver ici</p>
            <Link href="/boutique" className="btn-primary">Explorer la boutique</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, i) => {
              const prix = item.prix_promo && item.prix_promo < item.prix ? item.prix_promo : item.prix;
              return (
                <motion.div key={item.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card p-4 flex gap-4">
                  <div className="w-24 h-24 bg-surface-muted rounded-lg flex-shrink-0 flex items-center justify-center"><ShoppingBag size={24} className="text-gray-300" /></div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/produit/${item.slug}`}><h3 className="font-medium text-sm hover:text-primary transition-colors truncate">{item.nom}</h3></Link>
                    <p className="text-primary font-bold mt-1">{prix.toFixed(2)} MAD</p>
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => { addItem(item); removeItem(item.id); }} className="text-xs btn-primary py-1.5 px-3">Ajouter au panier</button>
                      <button onClick={() => removeItem(item.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"><Trash2 size={16} /></button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
