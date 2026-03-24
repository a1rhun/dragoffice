'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import CursorIcon from './CursorIcon';
import { useWishlist } from '@/lib/WishlistContext';
import { useCart } from '@/lib/CartContext';

export default function Nav() {
  const pathname = usePathname();
  const { wishlist } = useWishlist();
  const { cart } = useCart();

  return (
    <nav>
      <Link href="/" className="nav-logo">
        <CursorIcon size={13} filled className="nav-cursor-icon" />
        DRAGOFFICE
      </Link>
      <ul className="nav-links">
        <li className={pathname === '/' ? 'active' : ''}>
          <Link href="/">Home</Link>
        </li>
        <li className={pathname.startsWith('/collection') ? 'active' : ''}>
          <Link href="/collection">Collection</Link>
        </li>
        <li className={pathname === '/mypage' && !pathname.includes('cart') ? 'active' : ''}>
          <Link href="/mypage">
            <CursorIcon size={11} filled={wishlist.length > 0} />
            찜
            {wishlist.length > 0 && (
              <span className="nav-badge">{wishlist.length}</span>
            )}
          </Link>
        </li>
        <li className={pathname === '/mypage/cart' ? 'active' : ''}>
          <Link href="/mypage/cart">
            카트
            {cart.length > 0 && (
              <span className="nav-badge">{cart.length}</span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
}
