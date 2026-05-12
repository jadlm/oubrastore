'use client';
import { Star, Check, X, Trash2 } from 'lucide-react';

const reviews = [
  { id: 1, client: 'Ahmed B.', produit: 'Imprimante HP LaserJet Pro', note: 5, commentaire: 'Excellente imprimante, rapide et silencieuse.', approuve: true, date: '15 Mar 2024' },
  { id: 2, client: 'Sara M.', produit: 'Cahier Oxford 200 Pages', note: 4, commentaire: 'Bon rapport qualité-prix.', approuve: true, date: '02 Fév 2024' },
  { id: 3, client: 'Youssef K.', produit: 'Cartouche HP 305XL', note: 3, commentaire: 'Qualité correcte mais prix un peu élevé.', approuve: false, date: '20 Jan 2024' },
  { id: 4, client: 'Nadia F.', produit: 'Stylos BIC Cristal', note: 5, commentaire: 'Classique et fiable, toujours satisfaite.', approuve: false, date: '15 Jan 2024' },
];

export default function AdminAvis() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-display font-bold">Avis Clients</h1><p className="text-gray-500 text-sm mt-1">{reviews.filter(r => !r.approuve).length} en attente de modération</p></div>
      <div className="space-y-3">
        {reviews.map(r => (
          <div key={r.id} className={`bg-[#16161d] rounded-xl p-5 border ${r.approuve ? 'border-white/5' : 'border-yellow-500/20'}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">{r.client}</span>
                  <span className="text-gray-500 text-xs">sur</span>
                  <span className="text-primary text-sm">{r.produit}</span>
                  {!r.approuve && <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-0.5 rounded-full">En attente</span>}
                </div>
                <div className="flex gap-0.5 mb-2">{[1,2,3,4,5].map(s => <Star key={s} size={14} className="text-primary" fill={s <= r.note ? 'currentColor' : 'none'} />)}</div>
                <p className="text-gray-400 text-sm">{r.commentaire}</p>
                <p className="text-gray-600 text-xs mt-2">{r.date}</p>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                {!r.approuve && <button className="p-2 rounded-lg hover:bg-green-500/10 text-gray-400 hover:text-green-500 transition-colors"><Check size={16} /></button>}
                <button className="p-2 rounded-lg hover:bg-red-500/10 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
