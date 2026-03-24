const MARQUEE_ITEMS = [
  ['THE FIND', 'Curated Objects'],
  ['CONTEXT', 'Archive Reference'],
  ["SELECTOR'S EYE", 'Bespoke Selection'],
  ['DRAGOFFICE', '드래그오피스'],
  ['SINCE', '2026'],
  ['GWANGJU', 'KOREA'],
];

const EDITORIAL = [
  {
    num: '01',
    title: '발굴',
    body: '알려지지 않은 디자인 완성도 높은 오브젝트를 찾는 것. 많이가 아닌 정확하게.',
  },
  {
    num: '02',
    title: '맥락',
    body: '물건이 아니라 그 이야기를 파는 것. 이 물건이 어느 시대, 어떤 서브컬쳐에서 왔는지.',
  },
  {
    num: '03',
    title: '큐레이션',
    body: '대중이 아직 모르는 것을 먼저 알아보는 시선. 셀렉터의 시선이 곧 브랜드다.',
  },
];

// doubled for seamless infinite scroll
const marqueeItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

export default function Home({ onShop }) {
  return (
    <>
      <div className="home-hero">
        <div className="hero-visual">
          <img
            src="https://postarchivefaction.com/cdn/shop/files/DrifterTee_2026_BR1_a4da8b9f-2c63-4f72-8aae-e630d6a7447b.jpg"
            alt="Dragoffice"
          />
          <span className="hero-year">S/S 2026</span>
        </div>
        <div className="hero-copy">
          <p className="overline">드래그오피스 — 2026</p>
          <h1>
            보는 눈을
            <br />
            제안한다.
          </h1>
          <p className="tagline">
            주변에 있지만 주목받지 못한, 디자인 완성도가 높은 물건들을 발굴해서
            이를 알아볼 줄 아는 사람들에게 연결한다.
          </p>
          <button className="btn-primary" onClick={onShop}>
            컬렉션 보기
          </button>
        </div>
      </div>

      <div className="marquee-wrapper">
        <div className="marquee-track">
          {marqueeItems.map((item, i) => (
            <span key={i}>
              <b>{item[0]}</b> &nbsp;/&nbsp; {item[1]} &nbsp;&nbsp;&nbsp;
            </span>
          ))}
        </div>
      </div>

      <div className="editorial-strip">
        {EDITORIAL.map((cell) => (
          <div key={cell.num} className="editorial-cell">
            <p className="num">{cell.num}</p>
            <h3>{cell.title}</h3>
            <p>{cell.body}</p>
          </div>
        ))}
      </div>
    </>
  );
}
