import CursorIcon from './CursorIcon';

export default function Footer() {
  return (
    <footer>
      <span className="f-logo">
        <CursorIcon size={12} filled />
        DRAGOFFICE
      </span>
      <span className="f-meta">
        드래그오피스 — 2026
        <br />
        광주광역시 · 대한민국
      </span>
    </footer>
  );
}
