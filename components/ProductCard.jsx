'use client';

import { useState } from 'react';
import Link from 'next/link';
import { formatPrice } from '@/utils/format';
import { useWishlist } from '@/lib/WishlistContext';
import CursorIcon from './CursorIcon';

const CONDITION_COLOR = {
  Mint: '#3a7d44',
  Excellent: '#2563a8',
  'Very Good': '#b45309',
  Good: '#9b2c2c',
};

export default function ProductCard({ product }) {
  const { toggle, isWishlisted } = useWishlist();
  const wishlisted = isWishlisted(product.id);
  const [popping, setPopping] = useState(false);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(product.id);
    setPopping(true);
    setTimeout(() => setPopping(false), 400);
  };

  return (
    <div className="product-card-wrapper">
      <Link href={`/collection/${product.id}`} className="product-card">
        <div className="product-card__img">
          <img src={product.images[0]} alt={product.name} />

          {product.soldOut && (
            <div className="product-card__sold-overlay">
              <span className="product-card__sold-label">SOLD</span>
            </div>
          )}

          <div className="product-card__top-meta">
            <span className="product-card__era">{product.era}</span>
          </div>

          {/* 찜 커서 버튼 — 이미지 우 하단 */}
          <button
            className={[
              'product-card__wishlist-btn',
              wishlisted ? 'active' : '',
              popping ? 'popping' : '',
            ]
              .filter(Boolean)
              .join(' ')}
            onClick={handleWishlist}
            aria-label={wishlisted ? '찜 해제' : '찜하기'}
          >
            <CursorIcon size={18} filled={wishlisted} />
          </button>
        </div>

        <div className="product-card__info">
          <div>
            <p className="product-card__name">{product.nameKo}</p>
            <p className="product-card__sub">
              {product.brand} · {product.origin}
            </p>
            <div className="product-card__condition">
              <span
                className="condition-dot"
                style={{ background: CONDITION_COLOR[product.condition] }}
              />
              <span className="condition-text">{product.condition}</span>
            </div>
          </div>
          <div className="product-card__price">
            {formatPrice(product.price)}
            <span className="currency">KRW</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
