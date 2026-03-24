import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { products } from '@/data/products';
import ProductDetailClient from '@/components/ProductDetailClient';

interface PageProps {
  params: { id: string };
}

export function generateStaticParams() {
  return products.map((p) => ({ id: String(p.id) }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const product = products.find((p) => p.id === Number(params.id));
  if (!product) return {};
  return { title: `${product.nameKo} — DRAGOFFICE` };
}

export default function ProductDetailPage({ params }: PageProps) {
  const product = products.find((p) => p.id === Number(params.id));
  if (!product) notFound();

  return <ProductDetailClient product={product} />;
}
