'use client';
import { useState, useEffect } from 'react';

import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Package, Users, TrendingUp, AlertTriangle, Clock, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { api } from '@/lib/api';

const statusColors = { en_attente: 'bg-yellow-500/10 text-yellow-500', en_preparation: 'bg-purple-500/10 text-purple-500', expediee: 'bg-blue-500/10 text-blue-500', livree: 'bg-green-500/10 text-green-500' };
const statusLabels = { en_attente: 'En attente', en_preparation: 'Préparation', expediee: 'Expédiée', livree: 'Livrée' };

export default function AdminDashboard() {
  const [data, setData] = useState({ stats: [], recentOrders: [], topProducts: [], monthlySales: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.getStats();
        setData({
          stats: {
            revenue: res.revenue,
            orders: res.commandes,
            products: res.produits,
            users: res.clients,
            pending: res.commandes_en_attente,
            lowStock: res.stock_faible
          },
          recentOrders: res.commandes_recentes,
          topProducts: res.top_produits,
          monthlySales: res.ventes_mensuelles
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { label: 'Revenu Total', value: `${(data.stats.revenue || 0).toLocaleString()} MAD`, change: '+0%', up: true, icon: DollarSign, color: 'bg-green-500/10 text-green-500' },
    { label: 'Commandes', value: (data.stats.orders || 0).toString(), change: '+0%', up: true, icon: ShoppingCart, color: 'bg-blue-500/10 text-blue-500' },
    { label: 'Produits', value: (data.stats.products || 0).toString(), change: '+0', up: true, icon: Package, color: 'bg-purple-500/10 text-purple-500' },
    { label: 'Clients', value: (data.stats.users || 0).toString(), change: '+0', up: true, icon: Users, color: 'bg-primary/10 text-primary' },
  ];

  const maxSale = data.monthlySales?.length > 0 ? Math.max(...data.monthlySales.map(m => m.total)) : 100;

  if (loading) return <div className="p-10 text-center text-gray-500">Chargement du dashboard...</div>;

  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-display font-bold">Dashboard</h1><p className="text-gray-500 text-sm mt-1">Vue d&apos;ensemble de votre boutique</p></div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="bg-[#16161d] rounded-xl p-5 border border-white/5">
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.color}`}><s.icon size={18} /></div>
              <span className={`text-xs font-medium flex items-center gap-0.5 ${s.up ? 'text-green-500' : 'text-red-500'}`}>
                {s.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}{s.change}
              </span>
            </div>
            <p className="text-2xl font-display font-bold">{s.value}</p>
            <p className="text-xs text-gray-500 mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts + Recent Orders */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-[#16161d] rounded-xl p-6 border border-white/5">
          <h3 className="font-semibold mb-6">Ventes Mensuelles</h3>
          <div className="flex items-end gap-2 h-48">
            {(data.monthlySales || []).map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <motion.div initial={{ height: 0 }} animate={{ height: `${(m.total / maxSale) * 100}%` }} transition={{ delay: i * 0.05, duration: 0.5 }} className="w-full bg-primary/20 rounded-t-md relative group cursor-pointer hover:bg-primary/40 transition-colors">
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-dark-DEFAULT text-[10px] px-2 py-1 rounded font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{m.total.toLocaleString()} MAD</div>
                </motion.div>
                <span className="text-[10px] text-gray-500">{m.mois}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-[#16161d] rounded-xl p-6 border border-white/5">
          <h3 className="font-semibold mb-4">Top Produits</h3>
          <div className="space-y-3">
            {(data.topProducts || []).map((p, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{p.nom}</p>
                  <p className="text-xs text-gray-500">{p.ventes} vendus</p>
                </div>
                <span className="text-sm font-medium text-primary">{(Number(p.prix || 0) * Number(p.ventes || 0)).toFixed(0)} MAD</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders + Alerts */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#16161d] rounded-xl border border-white/5">
          <div className="p-5 border-b border-white/5"><h3 className="font-semibold">Commandes Récentes</h3></div>
          <div className="divide-y divide-white/5">
            {(data.recentOrders || []).map((o, i) => (
              <div key={i} className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors">
                <div>
                  <p className="font-medium text-sm text-primary">{o.numero_commande}</p>
                  <p className="text-xs text-gray-500">{o.nom_client} • {new Date(o.created_at).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{parseFloat(o.total).toFixed(2)} MAD</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${statusColors[o.statut]}`}>{statusLabels[o.statut]}</span>
                </div>
              </div>
            ))}
          </div>
        </div>


        {/* Alerts */}
        <div className="bg-[#16161d] rounded-xl p-6 border border-white/5">
          <h3 className="font-semibold mb-4">Alertes</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-yellow-500/5 rounded-lg border border-yellow-500/10">
              <AlertTriangle size={16} className="text-yellow-500 mt-0.5 flex-shrink-0" />
              <div><p className="text-sm font-medium text-yellow-500">Stock faible</p><p className="text-xs text-gray-500">5 produits en stock faible</p></div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-blue-500/5 rounded-lg border border-blue-500/10">
              <Clock size={16} className="text-blue-500 mt-0.5 flex-shrink-0" />
              <div><p className="text-sm font-medium text-blue-500">Commandes en attente</p><p className="text-xs text-gray-500">3 commandes à traiter</p></div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-500/5 rounded-lg border border-green-500/10">
              <TrendingUp size={16} className="text-green-500 mt-0.5 flex-shrink-0" />
              <div><p className="text-sm font-medium text-green-500">Bon mois !</p><p className="text-xs text-gray-500">+12.5% vs mois dernier</p></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
