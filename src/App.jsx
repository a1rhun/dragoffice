import { useState } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import Home from './pages/Home';
import Collection from './pages/Collection';
import ProductDetail from './pages/ProductDetail';

export default function App() {
  const [page, setPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = {
    home: () => { setPage('home'); window.scrollTo(0, 0); },
    collection: () => { setPage('collection'); window.scrollTo(0, 0); },
    product: (p) => { setSelectedProduct(p); setPage('detail'); window.scrollTo(0, 0); },
  };

  return (
    <>
      <Nav page={page} onHome={navigate.home} onShop={navigate.collection} />

      {page === 'home' && <Home onShop={navigate.collection} />}
      {page === 'collection' && <Collection onProduct={navigate.product} />}
      {page === 'detail' && selectedProduct && (
        <ProductDetail product={selectedProduct} onBack={navigate.collection} />
      )}

      <Footer />
    </>
  );
}
