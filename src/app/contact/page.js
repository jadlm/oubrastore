'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Send, MessageCircle } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ nom: '', email: '', telephone: '', sujet: '', message: '' });
  const [sent, setSent] = useState(false);
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); };

  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="bg-gradient-to-br from-dark-DEFAULT to-dark-50 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-4xl font-bold mb-3">Contactez-Nous</h1>
          <p className="text-white/60 text-lg">Notre équipe est à votre écoute pour toute question</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-4">
            {[
              { icon: MapPin, title: 'Adresse', lines: ['Bd Mohammed V', 'Casablanca 20000, Maroc'] },
              { icon: Phone, title: 'Téléphone', lines: ['+212 5 22 00 00 00', '+212 6 00 00 00 00'] },
              { icon: Mail, title: 'Email', lines: ['contact@oubrastore.ma', 'devis@oubrastore.ma'] },
              { icon: Clock, title: 'Horaires', lines: ['Lun - Sam: 9h00 - 19h00', 'Dimanche: Fermé'] },
            ].map((info, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card p-5 flex items-start gap-4">
                <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0"><info.icon size={20} className="text-primary" /></div>
                <div><h3 className="font-semibold mb-1">{info.title}</h3>{info.lines.map((l, j) => <p key={j} className="text-sm text-gray-500">{l}</p>)}</div>
              </motion.div>
            ))}
            <a href="https://wa.me/212600000000" target="_blank" rel="noopener" className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-xl font-medium hover:bg-green-600 transition-colors">
              <MessageCircle size={18} /> Discuter sur WhatsApp
            </a>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="card p-6 md:p-8">
              {sent ? (
                <div className="text-center py-10">
                  <Send size={48} className="text-primary mx-auto mb-4" />
                  <h2 className="font-display text-2xl font-bold mb-2">Message envoyé !</h2>
                  <p className="text-gray-500">Nous vous répondrons dans les plus brefs délais.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h2 className="font-display text-xl font-bold mb-6">Envoyer un message</h2>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-medium text-gray-600 mb-1 block">Nom complet *</label><input value={form.nom} onChange={e => set('nom', e.target.value)} className="input-field" required /></div>
                    <div><label className="text-sm font-medium text-gray-600 mb-1 block">Email *</label><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="input-field" required /></div>
                    <div><label className="text-sm font-medium text-gray-600 mb-1 block">Téléphone</label><input value={form.telephone} onChange={e => set('telephone', e.target.value)} className="input-field" /></div>
                    <div><label className="text-sm font-medium text-gray-600 mb-1 block">Sujet *</label><input value={form.sujet} onChange={e => set('sujet', e.target.value)} className="input-field" required /></div>
                  </div>
                  <div className="mb-4"><label className="text-sm font-medium text-gray-600 mb-1 block">Message *</label><textarea value={form.message} onChange={e => set('message', e.target.value)} className="input-field" rows="5" required /></div>
                  <button type="submit" className="btn-primary w-full flex items-center justify-center gap-2"><Send size={16} /> Envoyer le message</button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Map */}
        <div className="mt-12 card overflow-hidden">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106376.72691036972!2d-7.6824!3d33.5731!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda7cd4778aa113b%3A0xb06c1d84f310fd3!2sCasablanca!5e0!3m2!1sfr!2sma!4v1" width="100%" height="350" style={{ border: 0 }} allowFullScreen loading="lazy" title="OUBRA STORE Casablanca" />
        </div>
      </div>
    </div>
  );
}
