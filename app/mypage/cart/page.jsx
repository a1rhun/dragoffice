'use client';

import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { products } from '@/data/products';
import { formatPrice } from '@/utils/format';
import CursorIcon from '@/components/CursorIcon';

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const cartItems = products.filter((p) => cart.includes(p.id));
  const total = cartItems.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="mypage">
      <div className="mypage-header">
        <p className="mypage-overline">DRAGOFFICE</p>
        <h1>장바구니</h1>
        <div className="mypage-tabs">
          <Link href="/mypage" className="mypage-tab">
            <CursorIcon size={12} filled />
            찜
          </Link>
          <Link href="/mypage/cart" className="mypage-tab active">
            카트 <span>{cart.length}</span>
          </Link>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="wishlist-empty">
          <p>장바구니가 비어있어요.</p>
          <p className="wishlist-empty-sub">상품 상세 페이지에서 담아보세요.</p>
          <Link href="/collection" className="wishlist-empty-link">
            컬렉션 보기 →
          </Link>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((p) => (
              <div key={p.id} className="cart-item">
                <Link href={`/collection/${p.id}`} className="cart-item__img">
                  <img src={p.images[0]} alt={p.name} />
                </Link>
                <div className="cart-item__info">
                  <p className="cart-item__brand">{p.brand}</p>
                  <p className="cart-item__name">{p.nameKo}</p>
                  <p className="cart-item__meta">{p.era} · {p.origin} · {p.condition}</p>
                </div>
                <div className="cart-item__right">
                  <p className="cart-item__price">{formatPrice(p.price)}</p>
                  <button
                    className="cart-item__remove"
                    onClick={() => removeFromCart(p.id)}
                  >
                    제거
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="cart-total">
              <span className="cart-total__label">Total</span>
              <span className="cart-total__value">{formatPrice(total)}</span>
            </div>
            <button className="cart-checkout-btn">주문하기</button>
            <p className="cart-note">
              빈티지 특성상 모든 아이템은 1/1입니다. 결제 전 실측 및 컨디션을 다시 한번 확인해주세요.
            </p>
          </div>
        </>
      )}
    </div>
  );
}
