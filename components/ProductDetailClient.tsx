'use client';

import { useState } from 'react';
import Link from 'next/link';
import Accordion from './Accordion';
import CursorIcon from './CursorIcon';
import { formatPrice } from '@/utils/format';
import { useWishlist } from '@/lib/WishlistContext';
import { useCart } from '@/lib/CartContext';
import type { Product, ProductCondition } from '@/types';

const CONDITION_COLOR: Record<ProductCondition, string> = {
  Mint: '#3a7d44',
  Excellent: '#2563a8',
  'Very Good': '#b45309',
  Good: '#9b2c2c',
};

const CONDITION_KO: Record<ProductCondition, string> = {
  Mint: '최상',
  Excellent: '상',
  'Very Good': '양호',
  Good: '보통',
};

interface ProductDetailClientProps {
  product: Product;
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const { toggle, isWishlisted } = useWishlist();
  const { addToCart, removeFromCart, isInCart } = useCart();
  const wishlisted = isWishlisted(product.id);
  const inCart = isInCart(product.id);

  const hasThumbs = product.images.length > 1;
  const measurementEntries = Object.entries(product.measurements).filter(
    ([key]) => key !== 'type'
  );

  return (
    <div>
      <Link href="/collection" className="detail-back">
        ← Collection
      </Link>

      <div className="detail-layout">
        <div className="detail-gallery">
          {hasThumbs && (
            <div className="detail-thumbs">
              {product.images.map((src, i) => (
                <div
                  key={i}
                  className={`detail-thumb${imgIndex === i ? ' active' : ''}`}
                  onClick={() => setImgIndex(i)}
                >
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          )}
          <div
            className="detail-main-img"
            style={{ gridColumn: hasThumbs ? '2' : '1 / -1' }}
          >
            <img src={product.images[imgIndex]} alt={product.name} />
          </div>
        </div>

        <div className="detail-info">
          <p className="breadcrumb">DRAGOFFICE / {product.tag}</p>

          <p className="detail-brand">{product.brand}</p>
          <h1>{product.nameKo}</h1>
          <p className="detail-en-name">{product.name}</p>

          <p className="price">{formatPrice(product.price)}</p>

          <div className="detail-meta-row">
            <div
              className="detail-condition"
              style={{ color: CONDITION_COLOR[product.condition] }}
            >
              <span
                className="condition-dot"
                style={{ background: CONDITION_COLOR[product.condition] }}
              />
              <span className="condition-text">{product.condition}</span>
              <span className="condition-ko">— {CONDITION_KO[product.condition]}</span>
            </div>
            <span className="detail-era">{product.era}</span>
            <span className="detail-origin">{product.origin}</span>
          </div>

          <p className="condition-note">{product.conditionNote}</p>

          <div className="measurements-section">
            <p className="measurements-title">실측 사이즈</p>
            <div className="measurements-grid">
              {measurementEntries.map(([key, value]) => (
                <div key={key} className="measurement-item">
                  <span className="measurement-label">{key}</span>
                  <span className="measurement-value">{value}</span>
                </div>
              ))}
            </div>
            <p className="measurements-note">* 실측 기준, 1–2cm 오차 있음</p>
          </div>

          <div className="detail-actions">
            <button
              className={`wishlist-btn-detail${wishlisted ? ' active' : ''}`}
              onClick={() => toggle(product.id)}
              title={wishlisted ? '찜 해제' : '찜하기'}
            >
              <CursorIcon size={15} filled={wishlisted} />
              {wishlisted ? '찜됨' : '찜하기'}
            </button>

            {product.soldOut ? (
              <button className="cart-btn" disabled>
                SOLD OUT
              </button>
            ) : inCart ? (
              <button
                className="cart-btn in-cart"
                onClick={() => removeFromCart(product.id)}
              >
                담겼음 — 취소
              </button>
            ) : (
              <button
                className="cart-btn"
                onClick={() => addToCart(product.id)}
              >
                장바구니 담기
              </button>
            )}
          </div>

          <Accordion title="아이템 스토리">
            <p className="product-story">{product.story}</p>
          </Accordion>

          <Accordion title="태그 정보">
            <p className="tag-info-text">{product.tagInfo}</p>
          </Accordion>

          <Accordion title="소재 및 구성">
            <p>{product.composition}</p>
          </Accordion>

          <Accordion title="케어 방법">
            <ul>
              {product.care.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Accordion>

          <Accordion title="배송 및 반품">
            <p>주문 후 1–3 영업일 이내 발송.</p>
            <p style={{ marginTop: '6px' }}>
              빈티지 특성상 실착 후 반품 불가. 실측 및 컨디션 설명 참고 후 구매 부탁드립니다.
            </p>
          </Accordion>

          <p className="oooak-note">
            <span className="oooak-badge">1 / 1</span> 세상에 단 하나뿐인 아이템입니다.
          </p>
        </div>
      </div>
    </div>
  );
}
