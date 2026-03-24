import { useState } from 'react';
import Accordion from '../components/Accordion';
import { formatPrice } from '../utils/format';

export default function ProductDetail({ product, onBack }) {
  const [color, setColor] = useState(product.colors[0].key);
  const [size, setSize] = useState(() => {
    const first = product.variants[product.colors[0].key].sizes.find((s) => s.available);
    return first?.value ?? '';
  });
  const [imgIndex, setImgIndex] = useState(0);

  const variant = product.variants[color];
  const hasThumbs = variant.images.length > 1;
  const showSleeveAndShoulder = product.sizeGuide[0].sleeve > 0;

  const handleColorChange = (key) => {
    setColor(key);
    setImgIndex(0);
    const first = product.variants[key].sizes.find((s) => s.available);
    setSize(first?.value ?? '');
  };

  return (
    <div>
      <div className="detail-back" onClick={onBack}>
        ← Collection
      </div>

      <div className="detail-layout">
        {/* 이미지 갤러리 */}
        <div className="detail-gallery">
          {hasThumbs && (
            <div className="detail-thumbs">
              {variant.images.map((src, i) => (
                <div
                  key={i}
                  className={`detail-thumb${imgIndex === i ? ' active' : ''}`}
                  onClick={() => setImgIndex(i)}
                >
                  <img src={src} alt="" />
                </div>
              ))}
            </div>
          )}
          <div
            className="detail-main-img"
            style={{ gridColumn: hasThumbs ? '2' : '1 / -1' }}
          >
            <img src={variant.images[imgIndex]} alt={product.name} />
          </div>
        </div>

        {/* 상품 정보 */}
        <div className="detail-info">
          <p className="breadcrumb">DRAGOFFICE / {product.tag}</p>
          <h1>{product.nameKo}</h1>
          <p className="price">
            {formatPrice(product.price)}{' '}
            <span style={{ fontSize: '11px', color: 'var(--warm-gray)' }}>KRW</span>
          </p>

          {/* 색상 선택 */}
          <p className="selector-label">색상</p>
          <div className="color-swatches">
            {product.colors.map((c) => {
              const isLight = c.hex === '#f0f3f3' || c.hex === '#e8e0d0';
              return (
                <button
                  key={c.key}
                  className={`color-swatch${color === c.key ? ' selected' : ''}`}
                  style={{
                    backgroundColor: c.hex,
                    border: isLight ? '1px solid #dedad4' : undefined,
                  }}
                  title={c.label}
                  onClick={() => handleColorChange(c.key)}
                />
              );
            })}
          </div>

          {/* 사이즈 선택 */}
          <p className="selector-label">사이즈</p>
          <div className="size-options">
            {variant.sizes.map((s) => (
              <div
                key={s.value}
                className={[
                  'size-option',
                  size === s.value ? 'selected' : '',
                  !s.available ? 'sold-out' : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                onClick={() => s.available && setSize(s.value)}
              >
                {s.value}
              </div>
            ))}
          </div>

          <button className="add-to-cart" disabled={!size}>
            카트에 추가
          </button>

          {/* 상품 설명 */}
          <ul className="product-desc">
            {product.description.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>

          {/* 아코디언 */}
          <Accordion title="소재 및 원산지">
            <p>{product.composition}</p>
            <p style={{ marginTop: '6px' }}>제조국: {product.madeIn}</p>
          </Accordion>

          <Accordion title="사이즈 가이드">
            <table className="size-table">
              <thead>
                <tr>
                  <th>SIZE</th>
                  <th>총장</th>
                  <th>가슴</th>
                  {showSleeveAndShoulder && (
                    <>
                      <th>소매</th>
                      <th>어깨</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {product.sizeGuide.map((r) => (
                  <tr key={r.size}>
                    <td>{r.size}</td>
                    <td>{r.total}</td>
                    <td>{r.chest}</td>
                    {showSleeveAndShoulder && (
                      <>
                        <td>{r.sleeve}</td>
                        <td>{r.shoulder}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </Accordion>

          <Accordion title="케어 방법">
            <ul>
              {product.care.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
