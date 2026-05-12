'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { getBackendOrigin } from '@/lib/site';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, total, count } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/50 z-[60]" onClick={() => setIsOpen(false)} />
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-[70] flex flex-col shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b">
              <h2 className="font-display font-bold text-xl flex items-center gap-2">
                <ShoppingBag size={22} className="text-primary" /> Panier <span className="text-sm text-gray-400 font-normal">({count})</span>
              </h2>
              <button onClick={() => setIsOpen(false)} className="p-2 rounded-full hover:bg-gray-100 transition-colors"><X size={20} /></button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={64} className="text-gray-200 mb-4" />
                  <p className="text-gray-400 font-medium">Votre panier est vide</p>
                  <button onClick={() => setIsOpen(false)} className="btn-primary mt-4 text-sm">Continuer mes achats</button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => {
                    const base = Number(item.prix || 0);
                    const promo = item.prix_promo != null ? Number(item.prix_promo) : null;
                    const prix = promo != null && promo < base ? promo : base;
                    const imgSrc =
                      item.image_principale &&
                      (String(item.image_principale).startsWith('http')
                        ? item.image_principale
                        : `${getBackendOrigin()}${item.image_principale}`);
                    return (
                      <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-surface-muted">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          {item.image_principale && <img src={imgSrc} alt={item.nom} className="w-full h-full object-cover" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.nom}</h4>
                          <p className="text-primary font-bold text-sm mt-1">{prix.toFixed(2)} MAD</p>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2 bg-white rounded-lg border p-0.5">
                              <button onClick={() => updateQty(item.id, item.quantite - 1)} className="p-1 hover:bg-gray-100 rounded"><Minus size={14} /></button>
                              <span className="text-sm font-medium w-6 text-center">{item.quantite}</span>
                              <button onClick={() => updateQty(item.id, item.quantite + 1)} className="p-1 hover:bg-gray-100 rounded"><Plus size={14} /></button>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t p-5 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500">Sous-total</span>
                  <span className="font-display font-bold text-xl">{Number(total).toFixed(2)} MAD</span>
                </div>
                <p className="text-xs text-gray-400">Livraison {Number(total) >= 500 ? 'gratuite' : '30 MAD'} • Paiement à la livraison</p>
                <Link href="/checkout" onClick={() => setIsOpen(false)} className="btn-primary w-full text-center block">Commander maintenant</Link>
                <button onClick={() => setIsOpen(false)} className="btn-outline w-full text-sm">Continuer mes achats</button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
