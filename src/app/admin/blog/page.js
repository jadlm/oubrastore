'use client';
import { Plus, Edit, Trash2, Eye, FileText } from 'lucide-react';

const posts = [
  { id: 1, titre: 'Comment choisir la bonne imprimante', categorie: 'Guides', statut: 'publie', vues: 342, date: '15 Mar 2024' },
  { id: 2, titre: 'Rentrée scolaire 2024 : fournitures', categorie: 'Scolaire', statut: 'publie', vues: 891, date: '01 Aoû 2024' },
  { id: 3, titre: 'Cartouches compatibles vs originales', categorie: 'Conseils', statut: 'brouillon', vues: 0, date: '20 Fév 2024' },
];

export default function AdminBlog() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-display font-bold">Blog</h1><p className="text-gray-500 text-sm mt-1">{posts.length} articles</p></div>
        <button className="bg-primary text-dark-DEFAULT px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2"><Plus size={16} /> Nouvel article</button>
      </div>
      <div className="bg-[#16161d] rounded-xl border border-white/5 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider"><th className="px-5 py-3 text-left">Article</th><th className="px-5 py-3 text-left">Catégorie</th><th className="px-5 py-3 text-center">Vues</th><th className="px-5 py-3 text-center">Statut</th><th className="px-5 py-3 text-left">Date</th><th className="px-5 py-3 text-center">Actions</th></tr></thead>
          <tbody className="divide-y divide-white/5">
            {posts.map(p => (
              <tr key={p.id} className="hover:bg-white/[0.02]">
                <td className="px-5 py-4"><div className="flex items-center gap-3"><FileText size={16} className="text-gray-500" /><span className="font-medium">{p.titre}</span></div></td>
                <td className="px-5 py-4 text-gray-400">{p.categorie}</td>
                <td className="px-5 py-4 text-center text-gray-400">{p.vues}</td>
                <td className="px-5 py-4 text-center"><span className={`px-2 py-0.5 rounded-full text-xs ${p.statut === 'publie' ? 'bg-green-500/10 text-green-500' : 'bg-gray-500/10 text-gray-500'}`}>{p.statut === 'publie' ? 'Publié' : 'Brouillon'}</span></td>
                <td className="px-5 py-4 text-gray-400">{p.date}</td>
                <td className="px-5 py-4 text-center"><div className="flex justify-center gap-1"><button className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-primary"><Edit size={14} /></button><button className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
