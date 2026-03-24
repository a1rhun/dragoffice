import { Metadata } from 'next';
import { products } from '@/data/products';
import CollectionClient from '@/components/CollectionClient';

export const metadata: Metadata = {
  title: 'Collection — DRAGOFFICE',
};

export default function CollectionPage() {
  return <CollectionClient products={products} />;
}
