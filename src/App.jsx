import { useEffect, useState } from 'react';
import Inicio from './pages/Inicio.jsx';
import Servicios from './pages/Servicios.jsx';
import Contacto from './pages/Contacto.jsx';

const pages = {
  inicio: { label: 'Inicio', Component: Inicio },
  servicios: { label: 'Servicios', Component: Servicios },
  contacto: { label: 'Contacto', Component: Contacto },
};

function getPageFromHash() {
  const key = location.hash.slice(1);
  return pages[key] ? key : 'inicio';
}

export default function App() {
  const [current, setCurrent] = useState(getPageFromHash);

  useEffect(() => {
    const change = () => setCurrent(getPageFromHash());
    addEventListener('hashchange', change);
    return () => removeEventListener('hashchange', change);
  }, []);

  const go = (key) => {
    location.hash = key === 'inicio' ? '' : key;
    setCurrent(key);
  };

  const { Component: Page } = pages[current];

  return (
    <main className="site">
      <header>
        <a
          className="brand"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go('inicio');
          }}
        >
          UCASAL
        </a>

        <nav className="nav" aria-label="Navegación principal">
          {Object.entries(pages).map(([key, item]) => (
            <button
              key={key}
              className={current === key ? 'active' : ''}
              onClick={() => go(key)}
              aria-current={current === key ? 'page' : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </header>

      <Page />

      <footer>
        <span>TP 2 · Lenguajes IV · Villagrán Santiago Agustín</span>
        <span>2026</span>
      </footer>
    </main>
  );
}
