'use client';
import { motion } from 'framer-motion';
import { Calendar, Eye, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const posts = [
  { id: 1, titre: 'Comment choisir la bonne imprimante pour votre bureau', slug: 'choisir-imprimante-bureau', extrait: 'Guide complet pour sélectionner l\'imprimante idéale selon vos besoins professionnels : laser vs jet d\'encre, vitesse, coût par page.', categorie: 'Guides', date: '15 Mars 2024', vues: 342 },
  { id: 2, titre: 'Rentrée scolaire 2024 : la liste complète des fournitures', slug: 'rentree-scolaire-2024-fournitures', extrait: 'Préparez la rentrée avec notre checklist détaillée par niveau scolaire. Cahiers, stylos, calculatrices et accessoires indispensables.', categorie: 'Scolaire', date: '01 Août 2024', vues: 891 },
  { id: 3, titre: 'Cartouches compatibles vs originales : que choisir ?', slug: 'cartouches-compatibles-vs-originales', extrait: 'Comparaison objective entre cartouches d\'origine et alternatives compatibles. Prix, qualité d\'impression et impact sur la garantie.', categorie: 'Conseils', date: '20 Fév 2024', vues: 567 },
  { id: 4, titre: 'Organiser son bureau : 10 accessoires indispensables', slug: 'organiser-bureau-accessoires', extrait: 'Optimisez votre espace de travail avec ces accessoires de papeterie et bureautique sélectionnés pour leur utilité et design.', categorie: 'Bureau', date: '10 Jan 2024', vues: 234 },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="bg-white border-b"><div className="max-w-7xl mx-auto px-4 py-8"><h1 className="section-title">Blog & Conseils</h1><p className="text-gray-500 mt-2">Guides, astuces et actualités pour votre bureau</p></div></div>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <motion.article key={post.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card overflow-hidden group">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center"><span className="text-6xl font-display font-bold text-primary/20">{post.categorie[0]}</span></div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3 text-sm text-gray-400">
                  <span className="bg-primary/10 text-primary px-2.5 py-0.5 rounded-full text-xs font-medium">{post.categorie}</span>
                  <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                  <span className="flex items-center gap-1"><Eye size={12} /> {post.vues}</span>
                </div>
                <Link href={`/blog/${post.slug}`}><h2 className="font-display text-lg font-bold mb-2 group-hover:text-primary transition-colors">{post.titre}</h2></Link>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4">{post.extrait}</p>
                <Link href={`/blog/${post.slug}`} className="text-primary text-sm font-medium inline-flex items-center gap-1 hover:gap-2 transition-all">Lire l&apos;article <ArrowRight size={14} /></Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
