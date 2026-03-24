export type ProductCategory = 'tops' | 'outerwear' | 'bottoms' | 'shoes';
export type ProductCondition = 'Mint' | 'Excellent' | 'Very Good' | 'Good';

export type TopMeasurements = {
  type: 'top';
  총장: string;
  가슴: string;
  어깨: string;
  소매: string;
};

export type BottomMeasurements = {
  type: 'bottom';
  총장: string;
  허리: string;
  힙: string;
  밑위: string;
  밑단: string;
};

export type ShoesMeasurements = {
  type: 'shoes';
  '한국 사이즈': string;
  '발 길이': string;
  '인솔 길이': string;
};

export type Measurements = TopMeasurements | BottomMeasurements | ShoesMeasurements;

export interface Product {
  id: number;
  name: string;
  nameKo: string;
  era: string;
  origin: string;
  price: number;
  category: ProductCategory;
  tag: string;
  condition: ProductCondition;
  conditionNote: string;
  brand: string;
  tagInfo: string;
  story: string;
  images: string[];
  measurements: Measurements;
  composition: string;
  care: string[];
  soldOut: boolean;
}
