import { Suspense } from 'react';
import BoutiqueClient from './BoutiqueClient';

function BoutiqueFallback() {
  return (
    <div className="min-h-screen bg-surface-muted">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-9 w-40 skeleton rounded" />
          <div className="h-5 w-36 skeleton rounded mt-3" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-4 h-64 skeleton" />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function BoutiquePage() {
  return (
    <Suspense fallback={<BoutiqueFallback />}>
      <BoutiqueClient />
    </Suspense>
  );
}
