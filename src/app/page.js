'use client';
import { motion } from 'framer-motion';
import { ArrowRight, Printer, Monitor, BookOpen, PenTool, Package, Headphones, ChevronRight, Star, Quote, Truck, Shield, RotateCcw, Phone } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import HeroCarousel from '@/components/layout/HeroCarousel';
import ProductCard from '@/components/product/ProductCard';
import { api } from '@/lib/api';

/* ── Static data for demo (replaced by API in production) ── */
const categories = [
  { nom: 'Fournitures Scolaires', icon: BookOpen, slug: 'fournitures-scolaires', count: '120+ produits' },
  { nom: 'Papeterie', icon: PenTool, slug: 'papeterie', count: '85+ produits' },
  { nom: 'Informatique', icon: Monitor, slug: 'informatique', count: '60+ produits' },
  { nom: 'Imprimerie', icon: Printer, slug: 'imprimerie', count: 'Services pro' },
  { nom: 'Cartouches & Toners', icon: Package, slug: 'cartouches-toners', count: '200+ références' },
  { nom: 'Mobilier de Bureau', icon: Monitor, slug: 'mobilier-bureau', count: '40+ produits' },
];

const demoProducts = [
  { id: 1, nom: 'Imprimante HP LaserJet Pro M404dn', slug: 'hp-laserjet-pro-m404dn', prix: 2890.00, prix_promo: 2490.00, marque: 'HP', categorie_nom: 'Informatique', stock: 12, nouveau: true, image_principale: null },
  { id: 2, nom: 'Pack 12 Stylos BIC Cristal Original', slug: 'pack-stylos-bic-cristal', prix: 45.00, prix_promo: null, marque: 'BIC', categorie_nom: 'Papeterie', stock: 250, nouveau: false, image_principale: null },
  { id: 3, nom: 'Cartouche HP 305XL Noir Original', slug: 'cartouche-hp-305xl-noir', prix: 349.00, prix_promo: 299.00, marque: 'HP', categorie_nom: 'Cartouches', stock: 45, nouveau: false, image_principale: null },
  { id: 4, nom: 'Cahier Oxford 200 Pages Grand Format', slug: 'cahier-oxford-200-pages', prix: 35.00, prix_promo: null, marque: 'Oxford', categorie_nom: 'Papeterie', stock: 500, nouveau: false, image_principale: null },
  { id: 5, nom: 'Sac à Dos Eastpak Padded', slug: 'sac-eastpak-padded', prix: 450.00, prix_promo: 389.00, marque: 'Eastpak', categorie_nom: 'Scolaire', stock: 25, nouveau: true, image_principale: null },
  { id: 6, nom: 'Clé USB SanDisk 64GB Ultra', slug: 'cle-usb-sandisk-64gb', prix: 89.00, prix_promo: null, marque: 'SanDisk', categorie_nom: 'Informatique', stock: 100, nouveau: false, image_principale: null },
  { id: 7, nom: 'Agrafeuse Rapid Omnipress 30', slug: 'agrafeuse-rapid-omnipress', prix: 125.00, prix_promo: 99.00, marque: 'Rapid', categorie_nom: 'Papeterie', stock: 60, nouveau: false, image_principale: null },
  { id: 8, nom: 'Écran Dell 24" Full HD IPS', slug: 'ecran-dell-24-fhd', prix: 2100.00, prix_promo: 1890.00, marque: 'Dell', categorie_nom: 'Informatique', stock: 8, nouveau: true, image_principale: null },
];

const testimonials = [
  { nom: 'Mohammed A.', role: 'Directeur d\'école', text: 'OUBRA STORE est notre fournisseur depuis 5 ans. Service irréprochable et prix compétitifs pour nos fournitures scolaires.', note: 5 },
  { nom: 'Fatima Z.', role: 'Responsable achat', text: 'La qualité des services d\'impression est excellente. Livraison toujours ponctuelle et équipe très professionnelle.', note: 5 },
  { nom: 'Youssef K.', role: 'Entrepreneur', text: 'Excellent rapport qualité-prix pour les cartouches et le matériel informatique. Je recommande vivement.', note: 4 },
];

const brands = ['HP', 'Canon', 'Epson', 'BIC', 'Oxford', 'Pilot', 'Dell', 'Brother', 'Eastpak', 'SanDisk', 'Stabilo', 'Maped'];

const faqs = [
  { q: 'Quels sont les délais de livraison ?', a: 'Livraison en 24-48h sur Casablanca, 2-5 jours pour le reste du Maroc.' },
  { q: 'Acceptez-vous le paiement à la livraison ?', a: 'Oui, nous acceptons le paiement à la livraison partout au Maroc.' },
  { q: 'Proposez-vous des devis pour les entreprises ?', a: 'Oui, contactez-nous ou remplissez le formulaire de demande de devis pour recevoir une offre personnalisée.' },
  { q: 'Vos cartouches sont-elles originales ?', a: 'Nous proposons des cartouches originales et des alternatives compatibles de haute qualité.' },
];

const fadeUp = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.getFeatured().then((res) => setProducts(res || [])).catch(() => setProducts(demoProducts.slice(0, 8)));
  }, []);

  return (
    <>
      {/* ═══ TRUST BAR ═══ */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, label: 'Livraison Rapide', desc: '24-48h Casablanca' },
            { icon: Shield, label: 'Paiement Sécurisé', desc: 'À la livraison' },
            { icon: RotateCcw, label: 'Retour Gratuit', desc: 'Sous 7 jours' },
            { icon: Phone, label: 'Support 24/7', desc: '+212 5 22 00 00 00' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><item.icon size={20} className="text-primary" /></div>
              <div><p className="font-semibold text-sm">{item.label}</p><p className="text-xs text-gray-400">{item.desc}</p></div>
            </div>
          ))}
        </div>
      </section>

      <HeroCarousel />

      {/* ═══ CATEGORIES ═══ */}
      <section className="py-16 md:py-20 bg-surface-muted">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="section-title">Nos Catégories</h2>
            <p className="section-subtitle mx-auto">Trouvez tout ce dont vous avez besoin pour votre bureau, école ou entreprise</p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, i) => (
              <motion.div key={cat.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link href={cat.slug === 'imprimerie' ? '/imprimerie' : `/boutique?categorie=${cat.slug}`} className="card p-6 text-center group hover:-translate-y-1 block">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <cat.icon size={24} className="text-primary group-hover:text-dark-DEFAULT transition-colors" />
                  </div>
                  <h3 className="font-semibold text-sm mb-1">{cat.nom}</h3>
                  <p className="text-xs text-gray-400">{cat.count}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TRENDING PRODUCTS ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
            <div><h2 className="section-title">Produits Tendances</h2><p className="section-subtitle">Les plus demandés par nos clients</p></div>
            <Link href="/boutique" className="hidden md:flex items-center gap-1 text-primary font-medium hover:gap-2 transition-all">Voir tout <ChevronRight size={18} /></Link>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {(products.length > 0 ? products : demoProducts.slice(0, 8)).map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
        </div>
      </section>

      {/* ═══ PROMO BANNER ═══ */}
      <motion.section {...fadeUp} className="py-16 bg-gradient-to-r from-dark-DEFAULT to-dark-50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white max-w-lg">
            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">Offre Spéciale</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mt-4 mb-3">Jusqu&apos;à -30% sur les cartouches HP</h2>
            <p className="text-white/60 mb-6">Profitez de nos prix imbattables sur les cartouches et toners HP originaux. Offre limitée.</p>
            <Link href="/promotions" className="btn-primary inline-flex items-center gap-2">Voir les promotions <ArrowRight size={18} /></Link>
          </div>
          <div className="text-8xl md:text-9xl font-display font-extrabold text-primary/20 select-none">-30%</div>
        </div>
      </motion.section>

      {/* ═══ PRINTING SERVICES ═══ */}
      <section className="py-16 md:py-20 bg-surface-muted">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="section-title">Services d&apos;Impression</h2>
            <p className="section-subtitle mx-auto">Des services professionnels pour tous vos besoins d&apos;impression</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Impression Documents', desc: 'Noir & blanc, couleur, tous formats. À partir de 0.50 MAD/page.', icon: '📄' },
              { title: 'Cartes de Visite', desc: 'Design professionnel, papier premium, finitions variées. Dès 150 MAD/100.', icon: '💼' },
              { title: 'Grand Format', desc: 'Affiches, banderoles, bâches, roll-ups pour vos événements.', icon: '🖼️' },
            ].map((s, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="card p-8 text-center hover:-translate-y-1">
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-display font-bold text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm mb-4">{s.desc}</p>
                <Link href="/imprimerie" className="text-primary font-medium text-sm inline-flex items-center gap-1 hover:gap-2 transition-all">Demander un devis <ChevronRight size={16} /></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ BRANDS ═══ */}
      <section className="py-14 border-y">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-10">
            <h2 className="text-lg font-semibold text-gray-400 uppercase tracking-wider">Nos marques partenaires</h2>
          </motion.div>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {brands.map((b, i) => (
              <motion.span key={b} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="text-2xl font-display font-bold text-gray-200 hover:text-primary transition-colors cursor-default">{b}</motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="section-title">Avis de nos Clients</h2>
            <p className="section-subtitle mx-auto">Ce que nos clients disent de nous</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.1 }} className="card p-8">
                <Quote size={24} className="text-primary/30 mb-4" />
                <p className="text-gray-600 mb-6 leading-relaxed">{t.text}</p>
                <div className="flex items-center gap-1 mb-3">{[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-primary" fill={s <= t.note ? 'currentColor' : 'none'} />)}</div>
                <p className="font-semibold text-sm">{t.nom}</p>
                <p className="text-xs text-gray-400">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FAQ ═══ */}
      <section className="py-16 md:py-20 bg-surface-muted">
        <div className="max-w-3xl mx-auto px-4">
          <motion.div {...fadeUp} className="text-center mb-12">
            <h2 className="section-title">Questions Fréquentes</h2>
          </motion.div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div key={i} {...fadeUp} transition={{ delay: i * 0.08 }} className="card overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left font-medium hover:text-primary transition-colors">
                  {faq.q} <ChevronRight size={18} className={`transition-transform ${openFaq === i ? 'rotate-90' : ''}`} />
                </button>
                {openFaq === i && <div className="px-5 pb-5 text-gray-500 text-sm leading-relaxed border-t pt-4">{faq.a}</div>}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA WhatsApp ═══ */}
      <motion.section {...fadeUp} className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-dark-DEFAULT mb-4">Besoin d&apos;aide ? Contactez-nous</h2>
          <p className="text-dark-DEFAULT/60 mb-8 text-lg">Notre équipe est disponible pour vous accompagner dans vos achats</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://wa.me/212600000000" target="_blank" rel="noopener" className="btn-dark flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.116.549 4.106 1.514 5.834L.045 23.5l5.834-1.469A11.955 11.955 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.82c-1.97 0-3.867-.53-5.523-1.533l-.396-.236-3.465.872.912-3.33-.26-.413A9.784 9.784 0 012.18 12c0-5.422 4.398-9.82 9.82-9.82 5.422 0 9.82 4.398 9.82 9.82 0 5.422-4.398 9.82-9.82 9.82z"/></svg>
              WhatsApp
            </a>
            <Link href="/contact" className="px-6 py-3 bg-dark-DEFAULT/10 text-dark-DEFAULT font-semibold rounded-lg hover:bg-dark-DEFAULT/20 transition-all">Formulaire de contact</Link>
          </div>
        </div>
      </motion.section>
    </>
  );
}
