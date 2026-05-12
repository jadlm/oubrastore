'use client';
import { motion } from 'framer-motion';
import { User, Package, Heart, Settings, LogOut, ChevronRight, Clock, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

const orders = [
  { numero: 'OUB-M3K9X2', date: '10 Mai 2024', total: 2590.00, statut: 'livree', items: 3 },
  { numero: 'OUB-L8P4W1', date: '25 Avr 2024', total: 455.00, statut: 'en_preparation', items: 5 },
  { numero: 'OUB-K7N2R6', date: '12 Avr 2024', total: 89.00, statut: 'livree', items: 1 },
];

const statusColors = { en_attente: 'bg-yellow-100 text-yellow-700', confirmee: 'bg-blue-100 text-blue-700', en_preparation: 'bg-purple-100 text-purple-700', expediee: 'bg-indigo-100 text-indigo-700', livree: 'bg-green-100 text-green-700', annulee: 'bg-red-100 text-red-700' };
const statusLabels = { en_attente: 'En attente', confirmee: 'Confirmée', en_preparation: 'En préparation', expediee: 'Expédiée', livree: 'Livrée', annulee: 'Annulée' };

export default function ComptePage() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="bg-white border-b"><div className="max-w-7xl mx-auto px-4 py-8"><h1 className="section-title">Mon Compte</h1></div></div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            {[
              { icon: User, label: 'Profil', active: true },
              { icon: Package, label: 'Mes Commandes' },
              { icon: Heart, label: 'Favoris', href: '/wishlist' },
              { icon: Settings, label: 'Paramètres' },
            ].map((item, i) => (
              <Link key={i} href={item.href || '#'} className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${item.active ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-100 text-gray-600'}`}>
                <item.icon size={18} />{item.label}
              </Link>
            ))}
            <button onClick={handleLogout} className="flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors w-full"><LogOut size={18} /> Déconnexion</button>
          </div>

          {/* Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Profile Card */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center"><span className="font-display font-bold text-2xl text-primary">{user?.prenom?.[0] || 'U'}</span></div>
                <div><h2 className="font-display font-bold text-xl">{user?.prenom || 'Utilisateur'} {user?.nom || ''}</h2><p className="text-gray-400 text-sm">{user?.email || 'utilisateur@email.com'}</p></div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-surface-muted rounded-xl text-center"><Package size={22} className="text-primary mx-auto mb-1" /><p className="font-bold text-lg">{orders.length}</p><p className="text-xs text-gray-400">Commandes</p></div>
                <div className="p-4 bg-surface-muted rounded-xl text-center"><Heart size={22} className="text-primary mx-auto mb-1" /><p className="font-bold text-lg">4</p><p className="text-xs text-gray-400">Favoris</p></div>
                <div className="p-4 bg-surface-muted rounded-xl text-center"><MapPin size={22} className="text-primary mx-auto mb-1" /><p className="font-bold text-lg">Casablanca</p><p className="text-xs text-gray-400">Ville</p></div>
              </div>
            </motion.div>

            {/* Orders */}
            <div className="card p-6">
              <h3 className="font-display font-bold text-lg mb-4">Commandes récentes</h3>
              <div className="space-y-3">
                {orders.map((o, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-surface-muted rounded-xl">
                    <div>
                      <p className="font-medium text-sm">{o.numero}</p>
                      <p className="text-xs text-gray-400 flex items-center gap-1 mt-1"><Clock size={12} /> {o.date} • {o.items} articles</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-sm">{o.total.toFixed(2)} MAD</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[o.statut]}`}>{statusLabels[o.statut]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
