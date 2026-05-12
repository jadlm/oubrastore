'use client';
import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, ShoppingCart, FolderOpen, Users, Tag, Star, FileText, Bell, Settings, Menu, X, ChevronLeft, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
  { icon: Package, label: 'Produits', href: '/admin/produits' },
  { icon: ShoppingCart, label: 'Commandes', href: '/admin/commandes' },
  { icon: FolderOpen, label: 'Catégories', href: '/admin/categories' },
  { icon: Users, label: 'Clients', href: '/admin/clients' },
  { icon: Tag, label: 'Promotions', href: '/admin/promotions' },
  { icon: Star, label: 'Avis', href: '/admin/avis' },
  { icon: FileText, label: 'Blog', href: '/admin/blog' },
  { icon: Bell, label: 'Notifications', href: '/admin/notifications' },
];

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout, isAdmin } = useAuth();

  if (!loading && !isAdmin) {
    router.push('/auth/connexion');
    return null;
  }

  return (
    <div className="min-h-screen bg-[#0f0f12] text-white flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-[#16161d] border-r border-white/5 flex flex-col transition-all duration-300 ${collapsed ? 'w-[70px]' : 'w-64'} ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          {!collapsed && <div className="flex items-center gap-2"><div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center"><span className="text-dark-DEFAULT font-bold text-sm">O</span></div><span className="font-display font-bold">OUBRA</span></div>}
          <button onClick={() => setCollapsed(!collapsed)} className="p-1.5 rounded hover:bg-white/5 hidden lg:block"><ChevronLeft size={18} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} /></button>
          <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded hover:bg-white/5 lg:hidden"><X size={18} /></button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map(item => {
            const active = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <item.icon size={18} />{!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-3 border-t border-white/5">
          <button
            onClick={async () => {
              await logout();
              router.push('/');
            }}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
          >
            <LogOut size={18} />{!collapsed && <span>Déconnexion</span>}
          </button>
        </div>
      </aside>

      {/* Overlay */}
      {mobileOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileOpen(false)} />}

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-[#16161d] border-b border-white/5 flex items-center justify-between px-4 lg:px-6">
          <button onClick={() => setMobileOpen(true)} className="p-2 rounded hover:bg-white/5 lg:hidden"><Menu size={20} /></button>
          <div className="hidden lg:block"><h2 className="text-sm text-gray-400">Bienvenue, <span className="text-white font-medium">{user?.prenom || 'Admin'}</span></h2></div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg hover:bg-white/5 relative"><Bell size={18} className="text-gray-400" /><span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" /></button>
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold text-sm">{user?.prenom?.[0] || 'A'}</div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
