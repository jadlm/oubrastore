'use client';
import { Bell, Check, ShoppingCart, Package, Star, AlertTriangle } from 'lucide-react';

const notifications = [
  { id: 1, titre: 'Nouvelle commande', message: 'Commande #OUB-M3K9X2 de Mohammed A. — 2,590 MAD', type: 'commande', lu: false, date: 'Il y a 2h', icon: ShoppingCart, color: 'text-blue-500' },
  { id: 2, titre: 'Stock faible', message: 'Écran Dell 24" — Plus que 3 en stock', type: 'stock', lu: false, date: 'Il y a 4h', icon: AlertTriangle, color: 'text-yellow-500' },
  { id: 3, titre: 'Nouvel avis', message: 'Ahmed B. a laissé un avis 5★ sur Imprimante HP', type: 'avis', lu: false, date: 'Il y a 6h', icon: Star, color: 'text-primary' },
  { id: 4, titre: 'Commande livrée', message: 'Commande #OUB-K7N2R6 livrée avec succès', type: 'commande', lu: true, date: 'Hier', icon: Package, color: 'text-green-500' },
  { id: 5, titre: 'Nouvelle commande', message: 'Commande #OUB-L8P4W1 de Fatima Z. — 455 MAD', type: 'commande', lu: true, date: 'Hier', icon: ShoppingCart, color: 'text-blue-500' },
];

export default function AdminNotifications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-display font-bold">Notifications</h1><p className="text-gray-500 text-sm mt-1">{notifications.filter(n => !n.lu).length} non lues</p></div>
        <button className="text-sm text-primary hover:text-primary-dark flex items-center gap-1"><Check size={14} /> Tout marquer comme lu</button>
      </div>
      <div className="space-y-2">
        {notifications.map(n => (
          <div key={n.id} className={`bg-[#16161d] rounded-xl p-4 border flex items-start gap-4 transition-colors ${n.lu ? 'border-white/5' : 'border-primary/20 bg-primary/[0.02]'}`}>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${n.lu ? 'bg-white/5' : 'bg-primary/10'}`}>
              <n.icon size={18} className={n.color} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className={`font-medium text-sm ${n.lu ? 'text-gray-400' : 'text-white'}`}>{n.titre}</h3>
                {!n.lu && <span className="w-2 h-2 bg-primary rounded-full" />}
              </div>
              <p className="text-gray-500 text-sm mt-0.5">{n.message}</p>
              <p className="text-gray-600 text-xs mt-1">{n.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
