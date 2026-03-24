'use client';

import Link from 'next/link';
import { useWishlist } from '@/lib/WishlistContext';
import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import CursorIcon from '@/components/CursorIcon';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const wishlisted = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="mypage">
      <div className="mypage-header">
        <p className="mypage-overline">DRAGOFFICE</p>
        <h1>찜 목록</h1>
        <div className="mypage-tabs">
          <Link href="/mypage" className="mypage-tab active">
            <CursorIcon size={12} filled />
            찜 <span>{wishlist.length}</span>
          </Link>
          <Link href="/mypage/cart" className="mypage-tab">
            카트
          </Link>
        </div>
      </div>

      {wishlisted.length === 0 ? (
        <div className="wishlist-empty">
          <CursorIcon size={44} filled={false} className="wishlist-empty-icon" />
          <p>아직 찜한 아이템이 없어요.</p>
          <p className="wishlist-empty-sub">컬렉션에서 커서를 눌러 찜해보세요.</p>
          <Link href="/collection" className="wishlist-empty-link">
            컬렉션 보기 →
          </Link>
        </div>
      ) : (
        <div className="product-grid">
          {wishlisted.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
