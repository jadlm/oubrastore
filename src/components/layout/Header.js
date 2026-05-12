'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, Heart, ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useAuth } from '@/context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Accueil', href: '/' },
  { label: 'Boutique', href: '/boutique', children: [
    { label: 'Fournitures scolaires', href: '/boutique?categorie=fournitures-scolaires' },
    { label: 'Papeterie', href: '/boutique?categorie=papeterie' },
    { label: 'Informatique', href: '/boutique?categorie=informatique' },
    { label: 'Promotions', href: '/promotions' },
  ]},
  { label: 'Imprimerie', href: '/imprimerie' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { count, setIsOpen } = useCart();
  const { count: wishCount } = useWishlist();
  const { user } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg shadow-premium' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="flex-shrink-0 flex items-center" aria-label="OUBRA STORE — Accueil">
            <img
              src="/oubra-logo.svg"
              alt=""
              className="h-9 md:h-11 w-auto max-w-[200px] object-contain object-left"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <div key={link.href} className="relative group">
                <Link href={link.href} className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-primary transition-colors rounded-lg hover:bg-primary/5 flex items-center gap-1">
                  {link.label}
                  {link.children && <ChevronDown size={14} />}
                </Link>
                {link.children && (
                  <div className="absolute left-0 top-full pt-2 hidden group-hover:block">
                    <div className="w-72 bg-white border border-surface-border rounded-xl shadow-premium p-3 animate-fade-in">
                      <p className="text-xs uppercase tracking-wider text-gray-400 mb-2 px-2">Explorer</p>
                      {link.children.map((child) => (
                        <Link key={child.href} href={child.href} className="block px-3 py-2 rounded-lg text-sm hover:bg-primary/5 hover:text-primary transition-colors">
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <button onClick={() => setSearchOpen(!searchOpen)} className="p-2.5 rounded-full hover:bg-gray-100 transition-colors" aria-label="Rechercher">
              <Search size={20} className="text-gray-600" />
            </button>

            {/* Account */}
            <Link href={user ? '/compte' : '/auth/connexion'} className="p-2.5 rounded-full hover:bg-gray-100 transition-colors hidden sm:flex" aria-label="Compte">
              <User size={20} className="text-gray-600" />
            </Link>

            {/* Wishlist */}
            <Link href="/wishlist" className="p-2.5 rounded-full hover:bg-gray-100 transition-colors relative hidden sm:flex" aria-label="Favoris">
              <Heart size={20} className="text-gray-600" />
              {wishCount > 0 && <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-dark-DEFAULT text-[10px] font-bold rounded-full flex items-center justify-center">{wishCount}</span>}
            </Link>

            {/* Cart */}
            <button onClick={() => setIsOpen(true)} className="p-2.5 rounded-full hover:bg-gray-100 transition-colors relative" aria-label="Panier">
              <ShoppingBag size={20} className="text-gray-600" />
              {count > 0 && <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-primary text-dark-DEFAULT text-[10px] font-bold rounded-full flex items-center justify-center">{count}</span>}
            </button>

            {/* Mobile Menu Toggle */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="p-2.5 rounded-full hover:bg-gray-100 transition-colors lg:hidden" aria-label="Menu">
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <form action="/boutique" className="pb-4">
                <div className="relative">
                  <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input type="text" name="recherche" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Rechercher des produits, marques, catégories..." className="input-field pl-11 pr-4 bg-surface-muted" autoFocus />
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="lg:hidden bg-white border-t shadow-premium">
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="px-4 py-3 text-gray-700 hover:bg-primary/5 hover:text-primary rounded-lg transition-colors font-medium">
                  {link.label}
                </Link>
              ))}
              <div className="flex gap-2 mt-3 pt-3 border-t">
                <Link href={user ? '/compte' : '/auth/connexion'} className="flex-1 btn-dark text-center text-sm py-2.5">
                  {user ? 'Mon Compte' : 'Connexion'}
                </Link>
                <Link href="/wishlist" className="flex-1 btn-outline text-center text-sm py-2.5">
                  Favoris ({wishCount})
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
