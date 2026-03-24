import { useState } from 'react';

export default function Accordion({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="accordion">
      <button className="accordion-btn" onClick={() => setOpen((p) => !p)}>
        {title}
        <span className="accordion-icon">{open ? '−' : '+'}</span>
      </button>
      {open && <div className="accordion-body">{children}</div>}
    </div>
  );
}
