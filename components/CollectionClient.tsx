'use client';

import { useState } from 'react';
import ProductCard from './ProductCard';
import type { Product, ProductCategory, ProductCondition } from '@/types';

interface FilterOption<T extends string> {
  key: T | 'all';
  label: string;
}

const CATEGORIES: FilterOption<ProductCategory>[] = [
  { key: 'all', label: 'All' },
  { key: 'tops', label: 'Tops' },
  { key: 'outerwear', label: 'Outerwear' },
  { key: 'bottoms', label: 'Bottoms' },
  { key: 'shoes', label: 'Shoes' },
];

const ERAS: FilterOption<string>[] = [
  { key: 'all', label: 'All' },
  { key: '1980s', label: '80s' },
  { key: '1990s', label: '90s' },
  { key: '2000s', label: '00s' },
];

const CONDITIONS: FilterOption<ProductCondition>[] = [
  { key: 'all', label: 'All' },
  { key: 'Mint', label: 'Mint' },
  { key: 'Excellent', label: 'Excellent' },
  { key: 'Very Good', label: 'Very Good' },
  { key: 'Good', label: 'Good' },
];

interface CollectionClientProps {
  products: Product[];
}

export default function CollectionClient({ products }: CollectionClientProps) {
  const [category, setCategory] = useState<ProductCategory | 'all'>('all');
  const [era, setEra] = useState<string>('all');
  const [condition, setCondition] = useState<ProductCondition | 'all'>('all');

  const filtered = products.filter((p) => {
    if (category !== 'all' && p.category !== category) return false;
    if (era !== 'all' && p.era !== era) return false;
    if (condition !== 'all' && p.condition !== condition) return false;
    return true;
  });

  return (
    <div>
      <div className="collection-header">
        <h2>Collection</h2>
        <span className="count">{filtered.length} items</span>
      </div>

      <div className="filter-bar">
        <div className="filter-group">
          <span className="filter-group-label">Category</span>
          {CATEGORIES.map((c) => (
            <button
              key={c.key}
              className={`filter-chip${category === c.key ? ' active' : ''}`}
              onClick={() => setCategory(c.key as ProductCategory | 'all')}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-group-label">Era</span>
          {ERAS.map((e) => (
            <button
              key={e.key}
              className={`filter-chip${era === e.key ? ' active' : ''}`}
              onClick={() => setEra(e.key)}
            >
              {e.label}
            </button>
          ))}
        </div>

        <div className="filter-group">
          <span className="filter-group-label">Condition</span>
          {CONDITIONS.map((c) => (
            <button
              key={c.key}
              className={`filter-chip${condition === c.key ? ' active' : ''}`}
              onClick={() => setCondition(c.key as ProductCondition | 'all')}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="collection-empty">
          <p>해당하는 아이템이 없습니다.</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
