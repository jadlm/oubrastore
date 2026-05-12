'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X } from 'lucide-react';
import ProductCard from '@/components/product/ProductCard';
import { api } from '@/lib/api';

const sortOptions = [
  { label: 'Plus récents', value: '' },
  { label: 'Prix croissant', value: 'prix_asc' },
  { label: 'Prix décroissant', value: 'prix_desc' },
  { label: 'Popularité', value: 'populaire' },
  { label: 'Nom A-Z', value: 'nom' },
];

const priceRanges = [
  { label: 'Moins de 50 MAD', min: 0, max: 50 },
  { label: '50 - 200 MAD', min: 50, max: 200 },
  { label: '200 - 500 MAD', min: 200, max: 500 },
  { label: '500 - 1000 MAD', min: 500, max: 1000 },
  { label: 'Plus de 1000 MAD', min: 1000, max: 99999 },
];

export default function BoutiquePage() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [marques, setMarques] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('');
  const [selectedMarque, setSelectedMarque] = useState('');
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('categorie') || '');

  useEffect(() => {
    setSelectedCategory(searchParams.get('categorie') || '');
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const cats = await api.getCategories();
        const flatten = (list) => list.flatMap((item) => [item, ...(item.children || []).flatMap((c) => [c])]);
        const flatCategories = flatten(cats || []);
        setCategories(flatCategories.map((c) => ({ id: c.id, nom: c.nom, slug: c.slug })));
      } catch (e) {}
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError('');
      try {
        const params = new URLSearchParams();
        if (selectedSort) params.set('tri', selectedSort);
        if (selectedMarque) params.set('marque', selectedMarque);
        if (selectedCategory) params.set('categorie', selectedCategory);
        if (selectedPrice !== null) {
          params.set('prix_min', String(priceRanges[selectedPrice].min));
          params.set('prix_max', String(priceRanges[selectedPrice].max));
        }
        const recherche = searchParams.get('recherche');
        if (recherche) params.set('recherche', recherche);

        const data = await api.getProducts(params.toString());
        setProducts(data.produits || []);
        setTotal(data.total || 0);
        const uniqueMarques = [...new Set((data.produits || []).map((p) => p.marque).filter(Boolean))];
        setMarques(uniqueMarques);
      } catch (err) {
        setError(err.message || 'Erreur de chargement des produits.');
        setProducts([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedSort, selectedMarque, selectedPrice, selectedCategory, searchParams]);

  return (
    <div className="min-h-screen bg-surface-muted">
      {/* Page Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="section-title">Boutique</h1>
          <p className="text-gray-500 mt-2">{total} produits trouvés</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              {/* Categories */}
              <div className="card p-5">
                <h3 className="font-semibold mb-4">Catégories</h3>
                <div className="space-y-2">
                  {categories.map((c) => (
                    <label key={c.id} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-primary">
                      <input type="radio" name="categorie" checked={selectedCategory === c.slug} onChange={() => setSelectedCategory(selectedCategory === c.slug ? '' : c.slug)} className="accent-primary" />
                      {c.nom}
                    </label>
                  ))}
                </div>
              </div>

              {/* Marques */}
              <div className="card p-5">
                <h3 className="font-semibold mb-4">Marques</h3>
                <div className="space-y-2">
                  {marques.map(m => (
                    <label key={m} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-primary">
                      <input type="radio" name="marque" checked={selectedMarque === m} onChange={() => setSelectedMarque(selectedMarque === m ? '' : m)} className="accent-primary" />{m}
                    </label>
                  ))}
                </div>
              </div>

              {/* Prix */}
              <div className="card p-5">
                <h3 className="font-semibold mb-4">Prix</h3>
                <div className="space-y-2">
                  {priceRanges.map((r, i) => (
                    <label key={i} className="flex items-center gap-2 cursor-pointer text-sm text-gray-600 hover:text-primary">
                      <input type="radio" name="prix" checked={selectedPrice === i} onChange={() => setSelectedPrice(selectedPrice === i ? null : i)} className="accent-primary" />{r.label}
                    </label>
                  ))}
                </div>
              </div>

              {selectedMarque || selectedPrice !== null ? (
                <button onClick={() => { setSelectedMarque(''); setSelectedPrice(null); setSelectedCategory(''); }} className="text-sm text-red-500 hover:text-red-700 flex items-center gap-1"><X size={14} /> Réinitialiser les filtres</button>
              ) : null}
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 gap-4">
              <button onClick={() => setFiltersOpen(!filtersOpen)} className="lg:hidden btn-outline text-sm py-2 px-4 flex items-center gap-2"><SlidersHorizontal size={16} /> Filtres</button>
              <div className="flex items-center gap-2 ml-auto">
                <select value={selectedSort} onChange={e => setSelectedSort(e.target.value)} className="input-field text-sm py-2 w-auto pr-8">
                  {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
              </div>
            </div>

            {/* Grid */}
            {error && <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm">{error}</div>}
            {loading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {Array.from({ length: 6 }).map((_, i) => <div key={i} className="card p-4 h-64 skeleton" />)}
              </div>
            ) : products.length === 0 ? (
              <div className="card p-10 text-center text-gray-500">Aucun produit pour ces filtres.</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {products.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
