'use client';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { motion } from 'framer-motion';
import { getBackendOrigin } from '@/lib/site';

export default function ProductCard({ product, index = 0 }) {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const inWish = isInWishlist(product.id);
  const basePrice = Number(product.prix || 0);
  const promoPrice = product.prix_promo !== null && product.prix_promo !== undefined ? Number(product.prix_promo) : null;
  const hasPromo = promoPrice !== null && promoPrice < basePrice;
  const prix = hasPromo ? promoPrice : basePrice;
  const reduction = hasPromo && basePrice > 0 ? Math.round((1 - promoPrice / basePrice) * 100) : 0;
  const imageSrc =
    product.image_principale &&
    (String(product.image_principale).startsWith('http') ? product.image_principale : `${getBackendOrigin()}${product.image_principale}`);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      className="group card overflow-hidden"
    >
      {/* Image */}
      <div className="relative aspect-square bg-surface-muted overflow-hidden">
        <Link href={`/produit/${product.slug}`}>
          {product.image_principale ? (
            <img src={imageSrc} alt={product.nom} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300"><ShoppingBag size={48} /></div>
          )}
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {hasPromo && <span className="badge-promo">-{reduction}%</span>}
          {product.nouveau && <span className="badge-new">Nouveau</span>}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
          <button onClick={() => toggleItem(product)} className={`p-2 rounded-full shadow-md transition-colors ${inWish ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:text-red-500'}`}>
            <Heart size={16} fill={inWish ? 'currentColor' : 'none'} />
          </button>
          <Link href={`/produit/${product.slug}`} className="p-2 bg-white text-gray-600 rounded-full shadow-md hover:text-primary transition-colors">
            <Eye size={16} />
          </Link>
        </div>

        {/* Add to Cart Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button onClick={() => addItem(product)} className="btn-primary w-full text-sm py-2.5 flex items-center justify-center gap-2">
            <ShoppingBag size={16} /> Ajouter au panier
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">{product.categorie_nom || product.marque || 'OUBRA STORE'}</p>
        <Link href={`/produit/${product.slug}`}>
          <h3 className="font-medium text-sm text-dark-DEFAULT line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">{product.nom}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          {[1,2,3,4,5].map(s => <Star key={s} size={12} className="text-primary" fill={s <= 4 ? 'currentColor' : 'none'} />)}
          <span className="text-xs text-gray-400 ml-1">(4.0)</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-display font-bold text-lg text-dark-DEFAULT">{prix.toFixed(2)} <span className="text-xs font-normal text-gray-400">MAD</span></span>
          {hasPromo && <span className="text-sm text-gray-400 line-through">{basePrice.toFixed(2)}</span>}
        </div>
        {product.stock <= 5 && product.stock > 0 && <p className="text-xs text-orange-500 mt-1">Plus que {product.stock} en stock</p>}
        {product.stock === 0 && <p className="text-xs text-red-500 mt-1">Rupture de stock</p>}
      </div>
    </motion.div>
  );
}
