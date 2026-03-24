import { formatPrice } from '../utils/format';

export default function ProductCard({ product, onClick }) {
  const firstColorKey = product.colors[0].key;
  const coverImage = product.variants[firstColorKey].images[0];

  return (
    <div className="product-card" onClick={onClick}>
      <div className="product-card__img">
        <img src={coverImage} alt={product.name} />
      </div>
      <div className="product-card__info">
        <div>
          <p className="product-card__name">{product.nameKo}</p>
          <p className="product-card__sub">
            {product.tag} · {product.year} · {product.origin}
          </p>
        </div>
        <div className="product-card__price">
          {formatPrice(product.price)}
          <span className="currency">KRW</span>
        </div>
      </div>
    </div>
  );
}
