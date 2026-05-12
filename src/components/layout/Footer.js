'use client';
import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { SITE_MAP_URL, SITE_MAP_EMBED_URL, SITE_SERVICE_PHONE_DISPLAY, SITE_SERVICE_PHONE_TEL, SITE_WHATSAPP_URL } from '@/lib/site';


const categories = [
  { label: 'Fournitures Scolaires', href: '/boutique?categorie=fournitures-scolaires' },
  { label: 'Papeterie', href: '/boutique?categorie=papeterie' },
  { label: 'Informatique', href: '/boutique?categorie=informatique' },
  { label: 'Cartouches & Toners', href: '/boutique?categorie=cartouches-toners' },
  { label: 'Mobilier de Bureau', href: '/boutique?categorie=mobilier-bureau' },
  { label: 'Imprimerie', href: '/imprimerie' },
];

const quickLinks = [
  { label: 'À Propos', href: '/a-propos' },
  { label: 'Promotions', href: '/promotions' },
  { label: 'Blog', href: '/blog' },
  { label: 'Demander un Devis', href: '/imprimerie' },
  { label: 'Mon Compte', href: '/compte' },
  { label: 'Suivi Commande', href: '/compte' },
];

export default function Footer() {
  return (
    <footer className="bg-dark-DEFAULT text-white/70">
      {/* Newsletter */}
      <div className="border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-white font-display text-2xl font-bold">Restez informé</h3>
              <p className="text-white/50 mt-1">Recevez nos offres exclusives et nouveautés</p>
            </div>
            <form className="flex w-full md:w-auto gap-2" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Votre email" className="px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white placeholder-white/30 focus:border-primary outline-none w-full md:w-80 transition-colors" />
              <button type="submit" className="btn-primary whitespace-nowrap">S&apos;inscrire</button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="mb-5">
              <img
                src="/oubra-logo.svg"
                alt="OUBRA STORE — Librairie, Papeterie, Imprimerie"
                className="h-14 md:h-16 w-auto max-w-[260px] object-contain object-left"
              />
            </div>
            <p className="text-sm leading-relaxed mb-5">Votre partenaire de confiance pour les fournitures scolaires, papeterie, informatique et services d&apos;impression à Casablanca.</p>
            <div className="flex flex-wrap gap-3">
              <a
                href={SITE_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#25D366] text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={18} />
                Commandes WhatsApp
              </a>
              <a
                href={SITE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-colors"
              >
                <MapPin size={18} className="text-primary" />
                Google Maps
              </a>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-white font-semibold mb-5">Catégories</h4>
            <ul className="space-y-3">
              {categories.map(cat => (
                <li key={cat.href}><Link href={cat.href} className="hover:text-primary transition-colors text-sm">{cat.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-5">Liens Rapides</h4>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.href}><Link href={link.href} className="hover:text-primary transition-colors text-sm">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact + carte */}
          <div>
            <h4 className="text-white font-semibold mb-5">Contact</h4>
            <div className="mb-4 rounded-xl overflow-hidden border border-white/15 bg-white/5 ring-1 ring-white/5">
              <div className="relative w-full h-[140px] sm:h-[160px]">
                <iframe
                  title="Carte — Oubra Store, Casablanca"
                  src={SITE_MAP_EMBED_URL}
                  className="absolute inset-0 w-full h-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
              <a
                href={SITE_MAP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-primary hover:text-primary/90 px-3 py-2 border-t border-white/10 bg-white/5 transition-colors"
              >
                Agrandir sur Google Maps →
              </a>
            </div>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <a href={SITE_MAP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  Oubra Store — voir sur la carte
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary flex-shrink-0" />
                <a href={`tel:${SITE_SERVICE_PHONE_TEL}`} className="hover:text-primary transition-colors">
                  Service client {SITE_SERVICE_PHONE_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={16} className="text-primary flex-shrink-0" />
                <a href={SITE_WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  WhatsApp — toutes les commandes
                </a>
              </li>
              <li className="flex items-center gap-3"><Mail size={16} className="text-primary flex-shrink-0" /><a href="mailto:contact@oubrastore.ma" className="hover:text-primary transition-colors">contact@oubrastore.ma</a></li>
              <li className="flex items-start gap-3"><Clock size={16} className="text-primary mt-0.5 flex-shrink-0" /><span>Lun - Sam: 9h00 - 19h00<br/>Dimanche: Fermé</span></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/40">
          <p>&copy; {new Date().getFullYear()} OUBRA STORE. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-primary transition-colors">Conditions d&apos;utilisation</Link>
            <Link href="#" className="hover:text-primary transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
