'use client';
import { useState, useEffect, useCallback } from 'react';
import { Eye, RefreshCw } from 'lucide-react';
import { api } from '@/lib/api';

const statusColors = { en_attente: 'bg-yellow-500/10 text-yellow-500', confirmee: 'bg-blue-500/10 text-blue-500', en_preparation: 'bg-purple-500/10 text-purple-500', expediee: 'bg-indigo-500/10 text-indigo-500', livree: 'bg-green-500/10 text-green-500', annulee: 'bg-red-500/10 text-red-500' };
const statusLabels = { en_attente: 'En attente', confirmee: 'Confirmée', en_preparation: 'Préparation', expediee: 'Expédiée', livree: 'Livrée', annulee: 'Annulée' };

export default function AdminCommandes() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getOrders(filter ? `statut=${filter}` : '');
      setOrders(data.commandes || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);


  const updateStatus = async (orderId, statut) => {
    try {
      await api.updateOrderStatus(orderId, { statut });
      await fetchOrders();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-display font-bold">Commandes</h1><p className="text-gray-500 text-sm mt-1">{orders.length} commandes au total</p></div>
        <button onClick={fetchOrders} className="p-2 rounded-lg hover:bg-white/5 text-gray-400" title="Rafraîchir"><RefreshCw size={18} className={loading ? 'animate-spin' : ''} /></button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => setFilter('')} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${!filter ? 'bg-primary text-dark-DEFAULT' : 'bg-white/5 text-gray-400 hover:text-white'}`}>Toutes</button>
        {Object.entries(statusLabels).map(([k, v]) => (
          <button key={k} onClick={() => setFilter(k)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filter === k ? 'bg-primary text-dark-DEFAULT' : 'bg-white/5 text-gray-400 hover:text-white'}`}>{v}</button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-[#16161d] rounded-xl border border-white/5 overflow-hidden overflow-x-auto">
        {loading && orders.length === 0 ? (
          <div className="p-20 text-center text-gray-500">Chargement des commandes...</div>
        ) : orders.length === 0 ? (
          <div className="p-20 text-center text-gray-500">Aucune commande trouvée.</div>
        ) : (
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider"><th className="px-5 py-3 text-left">Commande</th><th className="px-5 py-3 text-left">Client</th><th className="px-5 py-3 text-left">Ville</th><th className="px-5 py-3 text-right">Total</th><th className="px-5 py-3 text-center">Statut</th><th className="px-5 py-3 text-left">Date</th><th className="px-5 py-3 text-center">Actions</th></tr></thead>
            <tbody className="divide-y divide-white/5">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4 font-medium text-primary">{o.numero_commande}</td>
                  <td className="px-5 py-4"><div><p className="text-white">{o.nom_client}</p><p className="text-xs text-gray-500">{o.email_client || o.telephone_client}</p></div></td>
                  <td className="px-5 py-4 text-gray-400">{o.ville_livraison}</td>
                  <td className="px-5 py-4 text-right font-medium">{parseFloat(o.total).toFixed(2)} MAD</td>
                  <td className="px-5 py-4 text-center">
                    <select className="bg-[#0f0f12] border border-white/10 rounded-md px-2 py-1 text-xs" value={o.statut} onChange={(e) => updateStatus(o.id, e.target.value)}>
                      {Object.entries(statusLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                  </td>
                  <td className="px-5 py-4 text-gray-400">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="px-5 py-4 text-center"><button onClick={async () => setSelectedOrder(await api.getOrder(o.id))} className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-primary"><Eye size={15} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedOrder && (
        <div className="bg-[#16161d] rounded-xl border border-white/5 p-4">
          <h3 className="font-semibold mb-3">Détail {selectedOrder.numero_commande}</h3>
          <div className="space-y-2 text-sm">
            {(selectedOrder.details || []).map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>{item.nom_produit} x{item.quantite}</span>
                <span>{Number(item.total_ligne).toFixed(2)} MAD</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

