import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

export default function Collection({ onProduct }) {
  return (
    <div>
      <div className="collection-header">
        <h2>Collection</h2>
        <span className="count">{products.length} items</span>
      </div>
      <div className="product-grid">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} onClick={() => onProduct(p)} />
        ))}
      </div>
    </div>
  );
}
