export default function Nav({ page, onHome, onShop }) {
  return (
    <nav>
      <span className="nav-logo" onClick={onHome}>DRAGOFFICE</span>
      <ul className="nav-links">
        <li
          className={page === 'home' ? 'active' : ''}
          onClick={onHome}
        >
          Home
        </li>
        <li
          className={page === 'collection' || page === 'detail' ? 'active' : ''}
          onClick={onShop}
        >
          Collection
        </li>
        <li>About</li>
      </ul>
    </nav>
  );
}
