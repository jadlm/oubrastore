'use client';
import { Plus, Edit, Trash2, FolderOpen } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [saving, setSaving] = useState(false);

  const fetchCategories = async () => {
    const data = await api.getAdminCategories();
    setCategories(data.categories || []);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async () => {
    const nom = window.prompt('Nom de la catégorie');
    if (!nom) return;
    const slug = window.prompt('Slug de la catégorie', nom.toLowerCase().replace(/\s+/g, '-'));
    if (!slug) return;
    setSaving(true);
    await api.createCategory({ nom, slug, ordre: categories.length + 1 });
    await fetchCategories();
    setSaving(false);
  };

  const handleEdit = async (cat) => {
    const nom = window.prompt('Nom', cat.nom);
    if (!nom) return;
    const slug = window.prompt('Slug', cat.slug);
    if (!slug) return;
    await api.updateCategory(cat.id, { nom, slug });
    await fetchCategories();
  };

  const handleDelete = async (cat) => {
    if (!window.confirm(`Archiver la catégorie "${cat.nom}" ?`)) return;
    await api.deleteCategory(cat.id);
    await fetchCategories();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-display font-bold">Catégories</h1><p className="text-gray-500 text-sm mt-1">{categories.length} catégories</p></div>
        <button onClick={handleAdd} disabled={saving} className="bg-primary text-dark-DEFAULT px-4 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-primary-dark transition-colors disabled:opacity-50"><Plus size={16} /> Ajouter</button>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map(c => (
          <div key={c.id} className="bg-[#16161d] rounded-xl p-5 border border-white/5 hover:border-primary/20 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center"><FolderOpen size={18} className="text-primary" /></div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(c)} className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-primary"><Edit size={14} /></button>
                <button onClick={() => handleDelete(c)} className="p-1.5 rounded hover:bg-white/5 text-gray-400 hover:text-red-400"><Trash2 size={14} /></button>
              </div>
            </div>
            <h3 className="font-medium mb-1">{c.nom}</h3>
            <p className="text-xs text-gray-500">/{c.slug} • {c.produits_count} produits</p>
            <div className="mt-3"><span className={`text-xs px-2 py-0.5 rounded-full ${c.actif ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>{c.actif ? 'Active' : 'Inactive'}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
