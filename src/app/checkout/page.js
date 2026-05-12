'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CreditCard, CheckCircle, ChevronRight, Truck, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import { api } from '@/lib/api';
import { useToast } from '@/context/ToastContext';
import { SITE_WHATSAPP_URL } from '@/lib/site';

const cities = ['Casablanca','Rabat','Marrakech','Fès','Tanger','Agadir','Meknès','Oujda','Kénitra','Tétouan','Salé','Nador','Mohammedia','El Jadida','Béni Mellal'];
const steps = [{ icon: MapPin, label: 'Adresse' }, { icon: Truck, label: 'Livraison' }, { icon: CreditCard, label: 'Paiement' }, { icon: CheckCircle, label: 'Confirmation' }];

function roundDh(n) {
  return Math.round((Number(n) + Number.EPSILON) * 100) / 100;
}

export default function CheckoutPage() {
  const { items, total, clearCart } = useCart();
  const { pushToast } = useToast();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ nom: '', prenom: '', telephone: '', email: '', adresse: '', ville: 'Casablanca', code_postal: '', notes: '', code_promo: '' });
  const [orderNumber, setOrderNumber] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const minOrderAmount = 100;

  const cartSubtotal = roundDh(items.reduce((sum, item) => {
    const base = Number(item.prix || 0);
    const promo = item.prix_promo != null && item.prix_promo !== '' ? Number(item.prix_promo) : null;
    const unitPrice = promo != null && !Number.isNaN(promo) && promo < base ? promo : base;
    return sum + unitPrice * Number(item.quantite || 0);
  }, 0));
  const frais = cartSubtotal >= 500 ? 0 : 30;
  const finalTotal = roundDh(cartSubtotal + frais);

  const buildOrderData = (source = 'web') => ({
    nom_client: `${form.prenom} ${form.nom}`.trim(),
    telephone_client: form.telephone,
    email_client: form.email,
    adresse_livraison: form.adresse,
    ville_livraison: form.ville,
    code_postal_livraison: form.code_postal,
    notes: form.notes,
    total: finalTotal,
    sous_total: cartSubtotal,
    frais_livraison: frais,
    methode_paiement: 'livraison',
    source,
    items: items.map(item => {
      const base = Number(item.prix || 0);
      const promo = item.prix_promo != null ? Number(item.prix_promo) : null;
      const unit = promo != null && promo < base ? promo : base;
      return {
        produit_id: item.id,
        quantite: item.quantite,
        prix_unitaire: unit
      };
    })
  });

  const handleSubmit = async () => {
    if (finalTotal < minOrderAmount) {
      setError(`Le montant minimum est de ${minOrderAmount} DH (total avec livraison).`);
      return;
    }
    setLoading(true);
    setError('');
    try {
      const orderData = buildOrderData('web');
      const res = await api.createOrder(orderData);

      setOrderNumber(res.numero_commande);
      setStep(3);
      clearCart();
      pushToast('Commande créée avec succès.', 'success');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la commande.');
      pushToast(err.message || 'Erreur de commande.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleWhatsAppOrder = async () => {
    if (finalTotal < minOrderAmount) {
      setError(`Le montant minimum est de ${minOrderAmount} DH (total avec livraison).`);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const orderData = buildOrderData('whatsapp');
      const res = await api.createOrder(orderData);
      const orderLines = items
        .map((item) => {
          const base = Number(item.prix || 0);
          const promo = item.prix_promo != null ? Number(item.prix_promo) : null;
          const price = promo != null && promo < base ? promo : base;
          return `- ${item.nom} x${item.quantite} (${(price * item.quantite).toFixed(2)} DH)`;
        })
        .join('%0A');

      const message = [
        `Bonjour OUBRA STORE,`,
        `Je confirme ma commande ${res.numero_commande}.`,
        '',
        `Produits:`,
        orderLines,
        '',
        `Total: ${finalTotal.toFixed(2)} DH`,
        `Client: ${form.prenom} ${form.nom}`.trim(),
        `Téléphone: ${form.telephone}`,
        `Adresse: ${form.adresse}, ${form.ville}`,
      ].join('%0A');

      window.open(`${SITE_WHATSAPP_URL}?text=${message}`, '_blank', 'noopener,noreferrer');
      setOrderNumber(res.numero_commande);
      setStep(3);
      clearCart();
      pushToast('Commande WhatsApp créée et enregistrée.', 'success');
    } catch (err) {
      setError(err.message || 'Impossible de créer la commande WhatsApp.');
      pushToast(err.message || 'Erreur commande WhatsApp.', 'error');
    } finally {
      setLoading(false);
    }
  };


  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  if (items.length === 0 && !orderNumber) return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <ShoppingBag size={64} className="text-gray-200 mb-4" />
      <h2 className="font-display text-2xl font-bold mb-2">Votre panier est vide</h2>
      <Link href="/boutique" className="btn-primary mt-4">Continuer mes achats</Link>
    </div>
  );

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {/* Steps */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${i <= step ? 'bg-primary text-dark-DEFAULT' : 'bg-gray-200 text-gray-400'}`}>
                <s.icon size={18} />
              </div>
              <span className={`hidden sm:inline text-sm font-medium ${i <= step ? 'text-dark-DEFAULT' : 'text-gray-400'}`}>{s.label}</span>
              {i < steps.length - 1 && <div className={`w-8 md:w-16 h-0.5 ${i < step ? 'bg-primary' : 'bg-gray-200'}`} />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            {step === 0 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6 md:p-8">
                <h2 className="font-display text-xl font-bold mb-6">Adresse de livraison</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div><label className="text-sm font-medium text-gray-600 mb-1 block">Prénom *</label><input value={form.prenom} onChange={e => set('prenom', e.target.value)} className="input-field" required /></div>
                  <div><label className="text-sm font-medium text-gray-600 mb-1 block">Nom *</label><input value={form.nom} onChange={e => set('nom', e.target.value)} className="input-field" required /></div>
                  <div><label className="text-sm font-medium text-gray-600 mb-1 block">Téléphone *</label><input value={form.telephone} onChange={e => set('telephone', e.target.value)} className="input-field" placeholder="+212 6..." required /></div>
                  <div><label className="text-sm font-medium text-gray-600 mb-1 block">Email</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="input-field" /></div>
                  <div className="md:col-span-2"><label className="text-sm font-medium text-gray-600 mb-1 block">Adresse complète *</label><input value={form.adresse} onChange={e => set('adresse', e.target.value)} className="input-field" required /></div>
                  <div><label className="text-sm font-medium text-gray-600 mb-1 block">Ville *</label><select value={form.ville} onChange={e => set('ville', e.target.value)} className="input-field">{cities.map(c => <option key={c}>{c}</option>)}</select></div>
                  <div><label className="text-sm font-medium text-gray-600 mb-1 block">Code postal</label><input value={form.code_postal} onChange={e => set('code_postal', e.target.value)} className="input-field" /></div>
                </div>
                <button onClick={() => setStep(1)} className="btn-primary mt-6 w-full" disabled={!form.nom || !form.telephone || !form.adresse}>Continuer</button>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6 md:p-8">
                <h2 className="font-display text-xl font-bold mb-6">Méthode de livraison</h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-4 p-4 border-2 border-primary rounded-xl cursor-pointer bg-primary/5">
                    <input type="radio" name="livraison" defaultChecked className="accent-primary" />
                    <div className="flex-1"><p className="font-medium">Livraison standard</p><p className="text-sm text-gray-400">24-48h Casablanca • 2-5j autres villes</p></div>
                    <span className="font-bold">{frais === 0 ? 'Gratuit' : `${frais} MAD`}</span>
                  </label>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn-outline flex-1">Retour</button>
                  <button onClick={() => setStep(2)} className="btn-primary flex-1">Continuer</button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6 md:p-8">
                <h2 className="font-display text-xl font-bold mb-6">Paiement</h2>
                <label className="flex items-center gap-4 p-4 border-2 border-primary rounded-xl bg-primary/5 cursor-pointer">
                  <input type="radio" name="paiement" defaultChecked className="accent-primary" />
                  <div><p className="font-medium">Paiement à la livraison</p><p className="text-sm text-gray-400">Payez en espèces à la réception</p></div>
                </label>
                <div><label className="text-sm font-medium text-gray-600 mb-1 block mt-4">Notes (optionnel)</label><textarea value={form.notes} onChange={e => set('notes', e.target.value)} className="input-field" rows="3" /></div>
                {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
                <div className="flex flex-col gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-outline flex-1" disabled={loading}>Retour</button>
                  <button onClick={handleSubmit} className="btn-primary flex-1 disabled:opacity-50" disabled={loading}>
                    {loading ? 'Traitement...' : 'Confirmer la commande'}
                  </button>
                  <button onClick={handleWhatsAppOrder} className="btn-dark flex-1 disabled:opacity-50" disabled={loading}>
                    Commander via WhatsApp
                  </button>
                </div>

              </motion.div>
            )}

            {step === 3 && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center">
                <CheckCircle size={64} className="text-green-500 mx-auto mb-4" />
                <h2 className="font-display text-2xl font-bold mb-2">Commande confirmée !</h2>
                <p className="text-gray-500 mb-2">Numéro de commande: <strong className="text-primary">{orderNumber}</strong></p>
                <p className="text-gray-400 text-sm mb-6">Vous recevrez un appel de confirmation sous 24h</p>
                <Link href="/boutique" className="btn-primary inline-block">Continuer mes achats</Link>
              </motion.div>
            )}
          </div>

          {/* Summary */}
          {step < 3 && (
            <div className="card p-6 h-fit sticky top-24">
              <h3 className="font-display font-bold mb-4">Résumé</h3>
              <div className="space-y-3 mb-4 max-h-60 overflow-y-auto">
                {items.map(item => {
                  const base = Number(item.prix || 0);
                  const promo = item.prix_promo != null ? Number(item.prix_promo) : null;
                  const unit = promo != null && promo < base ? promo : base;
                  return (
                  <div key={item.id} className="flex gap-3">
                    <div className="w-12 h-12 bg-surface-muted rounded-lg flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm truncate">{item.nom}</p>
                      <p className="text-xs text-gray-400">{item.quantite} × {unit.toFixed(2)} MAD</p>
                    </div>
                  </div>
                  );
                })}
              </div>
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Sous-total</span><span>{cartSubtotal.toFixed(2)} MAD</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Livraison</span><span>{frais === 0 ? 'Gratuit' : `${frais} MAD`}</span></div>
                <div className="flex justify-between font-display font-bold text-lg border-t pt-3"><span>Total</span><span>{finalTotal.toFixed(2)} MAD</span></div>
                {finalTotal < minOrderAmount && (
                  <p className="text-xs text-red-500 pt-2">Minimum {minOrderAmount} DH sur le total à payer (sous-total + livraison).</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
