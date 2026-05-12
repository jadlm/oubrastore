'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Phone, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ConnexionPage() {
  const [form, setForm] = useState({ email: '', mot_de_passe: '' });
  const [showPwd, setShowPwd] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { api } = await import('@/lib/api');
      const data = await api.login(form);
      login(data.token, data.refreshToken, data.user);
      router.push(data.user.role === 'admin' ? '/admin' : '/compte');
    } catch (err) { setError(err.message); }
  };

  return (
    <div className="min-h-screen bg-surface-muted flex items-center justify-center px-4 py-16">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4"><span className="text-dark-DEFAULT font-display font-extrabold text-2xl">O</span></div>
          <h1 className="font-display text-2xl font-bold">Connexion</h1>
          <p className="text-gray-500 mt-1">Accédez à votre compte OUBRA STORE</p>
        </div>
        <div className="card p-6 md:p-8">
          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4"><label className="text-sm font-medium text-gray-600 mb-1 block">Email</label>
              <div className="relative"><Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type="email" value={form.email} onChange={e => set('email', e.target.value)} className="input-field pl-10" placeholder="votre@email.com" required /></div>
            </div>
            <div className="mb-6"><label className="text-sm font-medium text-gray-600 mb-1 block">Mot de passe</label>
              <div className="relative"><Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" /><input type={showPwd ? 'text' : 'password'} value={form.mot_de_passe} onChange={e => set('mot_de_passe', e.target.value)} className="input-field pl-10 pr-10" required />
                <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">{showPwd ? <EyeOff size={16} /> : <Eye size={16} />}</button>
              </div>
            </div>
            <button type="submit" className="btn-primary w-full">Se connecter</button>
          </form>
          <p className="text-center text-sm text-gray-500 mt-6">Pas encore de compte ? <Link href="/auth/inscription" className="text-primary font-medium hover:underline">S&apos;inscrire</Link></p>
        </div>
      </motion.div>
    </div>
  );
}
