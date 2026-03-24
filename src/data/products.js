export const products = [
  {
    id: 1,
    name: 'Drifter Tee',
    nameKo: '드리프터 티',
    year: '2026',
    origin: 'KR',
    price: 300000,
    tag: 'KNITWEAR',
    colors: [
      { key: 'brown', label: 'Brown', hex: '#413210' },
      { key: 'white', label: 'White', hex: '#f0f3f3' },
      { key: 'black', label: 'Black', hex: '#0d0d0d' },
    ],
    variants: {
      brown: {
        images: [
          'https://postarchivefaction.com/cdn/shop/files/DrifterTee_2026_BR1_a4da8b9f-2c63-4f72-8aae-e630d6a7447b.jpg',
          'https://postarchivefaction.com/cdn/shop/files/DrifterTee_2026_BR4.jpg',
          'https://postarchivefaction.com/cdn/shop/files/DrifterTee_2026_BR5.jpg',
          'https://postarchivefaction.com/cdn/shop/files/PAFS26Lookbook27-2.jpg',
        ],
        sizes: [
          { value: 'XS', available: true },
          { value: 'S',  available: true },
          { value: 'M',  available: true },
          { value: 'L',  available: false },
          { value: 'XL', available: false },
        ],
      },
      white: {
        images: [
          'https://postarchivefaction.com/cdn/shop/files/DrifterTee_2026_WH1.jpg',
        ],
        sizes: [
          { value: 'XS', available: true },
          { value: 'S',  available: true },
          { value: 'M',  available: false },
          { value: 'L',  available: false },
          { value: 'XL', available: false },
        ],
      },
      black: {
        images: [
          'https://postarchivefaction.com/cdn/shop/files/DrifterTee_2026_BK1.jpg',
        ],
        sizes: [
          { value: 'XS', available: true },
          { value: 'S',  available: true },
          { value: 'M',  available: true },
          { value: 'L',  available: true },
          { value: 'XL', available: false },
        ],
      },
    },
    description: [
      '크루넥 니트 티셔츠',
      '몸을 감싸는 드레이핑 디자인',
      '부드러운 촉감의 라이오셀 혼방 소재',
      '립 마감 처리된 넥라인',
      '릴랙스드 핏',
      '대한민국 원단',
    ],
    composition: '라이오셀 86% / 모 10% / 폴리우레탄 4%',
    madeIn: '대한민국',
    care: ['드라이클리닝 전용', '섬유 유연제 사용 금지', '표백 금지', '다림질 금지', '기계 건조 금지'],
    sizeGuide: [
      { size: 'XS', total: 56, chest: 51, sleeve: 13, shoulder: 51 },
      { size: 'S',  total: 58, chest: 53, sleeve: 14, shoulder: 53 },
      { size: 'M',  total: 60, chest: 56, sleeve: 15, shoulder: 56 },
      { size: 'L',  total: 62, chest: 59, sleeve: 16, shoulder: 59 },
      { size: 'XL', total: 64, chest: 62, sleeve: 17, shoulder: 62 },
    ],
  },
  {
    id: 2,
    name: 'Archive Coat',
    nameKo: '아카이브 코트',
    year: '1994',
    origin: 'JP',
    price: 680000,
    tag: 'OUTERWEAR',
    colors: [
      { key: 'olive',  label: 'Olive', hex: '#5c5a3a' },
      { key: 'black',  label: 'Black', hex: '#0d0d0d' },
    ],
    variants: {
      olive: {
        images: [
          'https://postarchivefaction.com/cdn/shop/files/DrifterTee_2026_BR1_a4da8b9f-2c63-4f72-8aae-e630d6a7447b.jpg',
        ],
        sizes: [
          { value: 'S', available: true },
          { value: 'M', available: true },
          { value: 'L', available: false },
        ],
      },
      black: {
        images: [
          'https://postarchivefaction.com/cdn/shop/files/DrifterTee_2026_BK1.jpg',
        ],
        sizes: [
          { value: 'S', available: true },
          { value: 'M', available: true },
          { value: 'L', available: true },
        ],
      },
    },
    description: [
      '오버사이즈 더블 브레스트 코트',
      '울 혼방 소재',
      '비스코스 안감',
      '대형 라펠',
      '일본 원단 및 제조',
    ],
    composition: '울 70% / 폴리에스터 25% / 기타 5%',
    madeIn: '일본',
    care: ['드라이클리닝만 가능', '세탁기 세탁 불가', '표백 금지'],
    sizeGuide: [
      { size: 'S', total: 110, chest: 58, sleeve: 62, shoulder: 50 },
      { size: 'M', total: 112, chest: 62, sleeve: 63, shoulder: 52 },
      { size: 'L', total: 114, chest: 66, sleeve: 64, shoulder: 54 },
    ],
  },
  {
    id: 3,
    name: 'Selector Pant',
    nameKo: '셀렉터 팬츠',
    year: '2026',
    origin: 'KR',
    price: 420000,
    tag: 'BOTTOMS',
    colors: [
      { key: 'ivory',    label: 'Ivory',    hex: '#e8e0d0' },
      { key: 'charcoal', label: 'Charcoal', hex: '#3a3a3a' },
    ],
    variants: {
      ivory: {
        images: [
          'https://postarchivefaction.com/cdn/shop/files/DrifterTee_2026_WH1.jpg',
        ],
        sizes: [
          { value: 'XS', available: true },
          { value: 'S',  available: true },
          { value: 'M',  available: true },
          { value: 'L',  available: true },
          { value: 'XL', available: true },
        ],
      },
      charcoal: {
        images: [
          'https://postarchivefaction.com/cdn/shop/files/DrifterTee_2026_BK1.jpg',
        ],
        sizes: [
          { value: 'XS', available: false },
          { value: 'S',  available: true },
          { value: 'M',  available: true },
          { value: 'L',  available: false },
          { value: 'XL', available: false },
        ],
      },
    },
    description: [
      '와이드 테이퍼드 팬츠',
      '높은 허리선',
      '측면 슬릿 포켓',
      '맥스마라 원단 사용',
      '릴랙스드 실루엣',
    ],
    composition: '울 80% / 폴리에스터 20%',
    madeIn: '대한민국',
    care: ['드라이클리닝만 가능', '표백 금지', '다림질 낮은 온도'],
    sizeGuide: [
      { size: 'XS', total: 96,  chest: 37, sleeve: 0, shoulder: 0 },
      { size: 'S',  total: 98,  chest: 39, sleeve: 0, shoulder: 0 },
      { size: 'M',  total: 100, chest: 41, sleeve: 0, shoulder: 0 },
      { size: 'L',  total: 102, chest: 43, sleeve: 0, shoulder: 0 },
      { size: 'XL', total: 104, chest: 45, sleeve: 0, shoulder: 0 },
    ],
  },
];
