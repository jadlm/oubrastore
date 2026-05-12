'use client';
import { Plus, Edit, Trash2, Tag } from 'lucide-react';

const promos = [
  { id: 1, code: 'RENTREE2024', type: 'pourcentage', valeur: 15, debut: '01/08/2024', fin: '30/09/2024', usage: '45/100', actif: true },
  { id: 2, code: 'BIENVENUE10', type: 'pourcentage', valeur: 10, debut: '01/01/2024', fin: '31/12/2024', usage: '234/-', actif: true },
  { id: 3, code: 'LIVGRATUITE', type: 'montant', valeur: 30, debut: '01/05/2024', fin: '31/05/2024', usage: '12/50', actif: true },
  { id: 4, code: 'NOEL2023', type: 'pourcentage', valeur: 20, debut: '01/12/2023', fin: '31/12/2023', usage: '89/100', actif: false },
];

export default function AdminPromotions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-display font-bold">Promotions</h1><p className="text-gray-500 text-sm mt-1">{promos.length} codes promo</p></div>
        <button className="bg-primary text-dark-DEFAULT px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors"><Plus size={16} /> Créer un code</button>
      </div>
      <div className="bg-[#16161d] rounded-xl border border-white/5 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider"><th className="px-5 py-3 text-left">Code</th><th className="px-5 py-3 text-center">Réduction</th><th className="px-5 py-3 text-left">Période</th><th className="px-5 py-3 text-center">Utilisations</th><th className="px-5 py-3 text-center">Statut</th><th className="px-5 py-3 text-center">Actions</th></tr></thead>
          <tbody className="divide-y divide-white/5">
            {promos.map(p => (
              <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4"><div className="flex items-center gap-2"><Tag size={14} className="text-primary" /><span className="font-mono font-medium">{p.code}</span></div></td>
                <td className="px-5 py-4 text-center font-bold text-primary">{p.type === 'pourcentage' ? `${p.valeur}%` : `${p.valeur} MAD`}</td>
                <td className="px-5 py-4 text-gray-400">{p.debut} → {p.fin}</td>
                <td className="px-5 py-4 text-center text-gray-400">{p.usage}</td>
                <td className="px-5 py-4 text-center"><span className={`px-2 py-0.5 rounded-full text-xs ${p.actif ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{p.actif ? 'Actif' : 'Expiré'}</span></td>
                <td className="px-5 py-4 text-center"><div className="flex justify-center gap-1"><button className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-primary"><Edit size={14} /></button><button className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button></div></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
