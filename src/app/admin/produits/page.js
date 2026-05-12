'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Plus, Search, Edit, Trash2, Package, X, Upload } from 'lucide-react';
import { api } from '@/lib/api';

export default function AdminProduits() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [onlyLowStock, setOnlyLowStock] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    nom: '',
    slug: '',
    prix: '',
    prix_promo: '',
    stock: '',
    categorie_id: '',
    marque: '',
    description: '',
    actif: true
  });

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const query = new URLSearchParams();
      if (search) query.set('search', search);
      if (onlyLowStock) query.set('low_stock', '1');
      if (activeFilter === 'active') query.set('actif', '1');
      if (activeFilter === 'archived') query.set('actif', '0');

      const [productsRes, categoriesRes] = await Promise.all([
        api.getAdminProducts(query.toString()),
        api.getAdminCategories()
      ]);
      setProducts(productsRes.produits || []);
      setCategories(categoriesRes.categories || []);
    } catch (err) {
      setError(err.message || 'Erreur lors du chargement des produits.');
    } finally {
      setLoading(false);
    }
  }, [search, onlyLowStock, activeFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filtered = useMemo(
    () => products.filter((p) => p.nom.toLowerCase().includes(search.toLowerCase())),
    [products, search]
  );

  const openCreateModal = () => {
    setEditingId(null);
    setSelectedImage(null);
    setForm({ nom: '', slug: '', prix: '', prix_promo: '', stock: '', categorie_id: '', marque: '', description: '', actif: true });
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setEditingId(product.id);
    setSelectedImage(null);
    setForm({
      nom: product.nom || '',
      slug: product.slug || '',
      prix: product.prix || '',
      prix_promo: product.prix_promo || '',
      stock: product.stock || 0,
      categorie_id: product.categorie_id || '',
      marque: product.marque || '',
      description: product.description || '',
      actif: product.actif === 1
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    try {
      if (!form.nom?.trim()) {
        setError('Le nom du produit est obligatoire.');
        return;
      }
      const prixNum = Number(form.prix);
      if (!Number.isFinite(prixNum) || prixNum < 0) {
        setError('Indiquez un prix valide.');
        return;
      }

      const payload = {
        ...form,
        slug: form.slug?.trim() || undefined,
        prix: prixNum,
        prix_promo: form.prix_promo !== '' && form.prix_promo != null ? Number(form.prix_promo) : null,
        stock: Number(form.stock || 0),
        categorie_id: form.categorie_id ? Number(form.categorie_id) : null,
        actif: form.actif ? 1 : 0
      };

      let productId = editingId;
      if (editingId) {
        await api.updateProduct(editingId, payload);
      } else {
        const created = await api.createProduct(payload);
        productId = created?.id ?? created?.insertId;
        if (!productId) throw new Error('Réponse serveur inattendue après création.');
      }

      if (selectedImage && productId) {
        await api.uploadProductImage({ produit_id: productId, file: selectedImage, principale: 1, alt: form.nom });
      }

      setIsModalOpen(false);
      await fetchData();
    } catch (err) {
      setError(err.message || 'Impossible de sauvegarder le produit.');
    } finally {
      setSaving(false);
    }
  };

  const handleArchive = async (id) => {
    if (!window.confirm('Archiver ce produit ?')) return;
    try {
      await api.deleteProduct(id);
      await fetchData();
    } catch (err) {
      setError(err.message || 'Suppression impossible.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-display font-bold">Produits</h1><p className="text-gray-500 text-sm mt-1">{products.length} produits au total</p></div>
        <button onClick={openCreateModal} className="bg-primary text-dark-DEFAULT px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors"><Plus size={16} /> Ajouter</button>
      </div>

      {error && <div className="bg-red-500/10 text-red-400 p-3 rounded-lg text-sm border border-red-500/20">{error}</div>}

      <div className="flex flex-wrap gap-2">
        <button onClick={() => setActiveFilter('all')} className={`px-3 py-1.5 rounded-lg text-xs ${activeFilter === 'all' ? 'bg-primary text-dark-DEFAULT' : 'bg-white/5 text-gray-300'}`}>Tous</button>
        <button onClick={() => setActiveFilter('active')} className={`px-3 py-1.5 rounded-lg text-xs ${activeFilter === 'active' ? 'bg-primary text-dark-DEFAULT' : 'bg-white/5 text-gray-300'}`}>Actifs</button>
        <button onClick={() => setActiveFilter('archived')} className={`px-3 py-1.5 rounded-lg text-xs ${activeFilter === 'archived' ? 'bg-primary text-dark-DEFAULT' : 'bg-white/5 text-gray-300'}`}>Archivés</button>
        <button onClick={() => setOnlyLowStock((v) => !v)} className={`px-3 py-1.5 rounded-lg text-xs ${onlyLowStock ? 'bg-yellow-500/20 text-yellow-300' : 'bg-white/5 text-gray-300'}`}>Stock faible</button>
      </div>

      <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" /><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un produit..." className="w-full bg-[#16161d] border border-white/5 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:border-primary/50 outline-none" /></div>

      <div className="bg-[#16161d] rounded-xl border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wider"><th className="px-5 py-3 text-left">Produit</th><th className="px-5 py-3 text-left">Catégorie</th><th className="px-5 py-3 text-right">Prix</th><th className="px-5 py-3 text-center">Stock</th><th className="px-5 py-3 text-center">Ventes</th><th className="px-5 py-3 text-center">Actions</th></tr></thead>
            <tbody className="divide-y divide-white/5">
              {loading ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-500">Chargement des produits...</td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={6} className="px-5 py-10 text-center text-gray-500">Aucun produit trouvé.</td></tr>
              ) : filtered.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center"><Package size={16} className="text-gray-500" /></div><span className="font-medium">{p.nom}</span></div></td>
                  <td className="px-5 py-4 text-gray-400">{p.categorie_nom || '-'}</td>
                  <td className="px-5 py-4 text-right font-medium">{Number(p.prix).toFixed(2)} MAD</td>
                  <td className="px-5 py-4 text-center"><span className={`px-2 py-0.5 rounded-full text-xs ${p.stock <= 5 ? 'bg-red-500/10 text-red-500' : p.stock <= 20 ? 'bg-yellow-500/10 text-yellow-500' : 'bg-green-500/10 text-green-500'}`}>{p.stock}</span></td>
                  <td className="px-5 py-4 text-center text-gray-400">{p.ventes}</td>
                  <td className="px-5 py-4 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <button onClick={() => openEditModal(p)} className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-primary"><Edit size={15} /></button>
                      <button onClick={() => handleArchive(p.id)} className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-red-400"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-[100] flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#16161d] rounded-xl border border-white/10 p-5 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display font-bold text-lg">{editingId ? 'Modifier produit' : 'Ajouter produit'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 rounded hover:bg-white/5"><X size={16} /></button>
            </div>
            <div className="grid md:grid-cols-2 gap-3">
              <input className="input-field bg-[#0f0f12] border-white/10 text-white" placeholder="Nom" value={form.nom} onChange={(e) => setForm((p) => ({ ...p, nom: e.target.value }))} />
              <input className="input-field bg-[#0f0f12] border-white/10 text-white" placeholder="Slug" value={form.slug} onChange={(e) => setForm((p) => ({ ...p, slug: e.target.value }))} />
              <input type="number" className="input-field bg-[#0f0f12] border-white/10 text-white" placeholder="Prix" value={form.prix} onChange={(e) => setForm((p) => ({ ...p, prix: e.target.value }))} />
              <input type="number" className="input-field bg-[#0f0f12] border-white/10 text-white" placeholder="Prix promo" value={form.prix_promo} onChange={(e) => setForm((p) => ({ ...p, prix_promo: e.target.value }))} />
              <input type="number" className="input-field bg-[#0f0f12] border-white/10 text-white" placeholder="Stock" value={form.stock} onChange={(e) => setForm((p) => ({ ...p, stock: e.target.value }))} />
              <select className="input-field bg-[#0f0f12] border-white/10 text-white" value={form.categorie_id} onChange={(e) => setForm((p) => ({ ...p, categorie_id: e.target.value }))}>
                <option value="">Catégorie</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.nom}</option>)}
              </select>
              <input className="input-field bg-[#0f0f12] border-white/10 text-white md:col-span-2" placeholder="Marque" value={form.marque} onChange={(e) => setForm((p) => ({ ...p, marque: e.target.value }))} />
              <textarea rows={3} className="input-field bg-[#0f0f12] border-white/10 text-white md:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))} />
            </div>
            <label className="flex items-center gap-2 text-sm text-gray-300">
              <input type="checkbox" checked={form.actif} onChange={(e) => setForm((p) => ({ ...p, actif: e.target.checked }))} className="accent-primary" />
              Produit actif
            </label>
            <label className="flex items-center gap-2 text-sm text-gray-300 border border-dashed border-white/20 rounded-lg p-3 cursor-pointer hover:border-primary/40 transition-colors">
              <Upload size={15} />
              {selectedImage ? selectedImage.name : 'Image principale du produit'}
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setSelectedImage(e.target.files?.[0] || null)} />
            </label>
            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="btn-outline flex-1">Annuler</button>
              <button onClick={handleSave} disabled={saving} className="btn-primary flex-1 disabled:opacity-50">{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
