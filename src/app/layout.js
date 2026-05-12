import './globals.css';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import { WishlistProvider } from '@/context/WishlistContext';
import { ToastProvider } from '@/context/ToastContext';
import Topbar from '@/components/layout/Topbar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata = {
  title: 'OUBRA STORE — Librairie, Papeterie & Informatique à Casablanca',
  description: 'Votre partenaire pour les fournitures scolaires, papeterie, informatique, cartouches et services d\'impression à Casablanca. Livraison rapide au Maroc.',
  keywords: 'librairie casablanca, papeterie maroc, fournitures scolaires, informatique, cartouches, imprimerie, oubra store',
  openGraph: { title: 'OUBRA STORE', description: 'Librairie, Papeterie & Informatique à Casablanca', type: 'website' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <ToastProvider>
                <Topbar />
                <Header />
                <main className="flex-1 page-enter">{children}</main>
                <Footer />
                <CartDrawer />
              </ToastProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
