'use client';
import { Search, Mail, Phone } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminClients() {
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getAdminClients(`search=${encodeURIComponent(search)}`);
      setClients(data.clients || []);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-display font-bold">Clients</h1><p className="text-gray-500 text-sm mt-1">{clients.length} clients inscrits</p></div>
      <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input value={search} onChange={e => setSearch(e.target.value)} onBlur={fetchClients} placeholder="Rechercher un client..." className="w-full bg-[#16161d] border border-white/5 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-primary/50 outline-none" /></div>
      <div className="bg-[#16161d] rounded-xl border border-white/5 overflow-hidden overflow-x-auto">
        <table className="w-full text-sm">
          <thead><tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider"><th className="px-5 py-3 text-left">Client</th><th className="px-5 py-3 text-left">Contact</th><th className="px-5 py-3 text-left">Ville</th><th className="px-5 py-3 text-center">Commandes</th><th className="px-5 py-3 text-right">Total</th><th className="px-5 py-3 text-left">Dernière activité</th></tr></thead>
          <tbody className="divide-y divide-white/5">
            {loading ? (
              <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-500">Chargement des clients...</td></tr>
            ) : clients.map(c => (
              <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary text-sm font-bold">{(c.prenom?.[0] || c.nom?.[0] || 'C')}</div><span className="font-medium">{c.prenom} {c.nom}</span></div></td>
                <td className="px-5 py-4"><div><p className="flex items-center gap-1 text-gray-400"><Mail size={12} /> {c.email}</p><p className="flex items-center gap-1 text-gray-500 text-xs mt-0.5"><Phone size={10} /> {c.telephone}</p></div></td>
                <td className="px-5 py-4 text-gray-400">{c.ville}</td>
                <td className="px-5 py-4 text-center"><span className="bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full text-xs">{c.commandes_count}</span></td>
                <td className="px-5 py-4 text-right font-medium">{Number(c.commandes_total).toLocaleString()} MAD</td>
                <td className="px-5 py-4 text-gray-500">{new Date(c.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
