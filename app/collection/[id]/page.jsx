import { notFound } from 'next/navigation';
import { products } from '@/data/products';
import ProductDetailClient from '@/components/ProductDetailClient';

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export function generateMetadata({ params }) {
  const product = products.find((p) => p.id === Number(params.id));
  if (!product) return {};
  return { title: `${product.nameKo} — DRAGOFFICE` };
}

export default function ProductDetailPage({ params }) {
  const product = products.find((p) => p.id === Number(params.id));
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
