import { useEffect, useState } from 'react';
import Hero from '../components/Hero.jsx';

// API pública de dev.to: artículos de programación con portada e información del autor
const API_URL = 'https://dev.to/api/articles?tag=javascript&per_page=6';

const IMAGEN_RESPALDO =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='400' height='225'><rect width='100%' height='100%' fill='%23dfe3d8'/><text x='50%' y='50%' text-anchor='middle' font-family='Arial' font-size='20' fill='%23555'>Sin imagen</text></svg>";

export default function Inicio() {
  const [articulos, setArticulos] = useState([]);
  const [estado, setEstado] = useState('cargando');

  useEffect(() => {
    const controller = new AbortController();

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Error ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setArticulos(data.slice(0, 6));
        setEstado('ok');
      })
      .catch((err) => {
        if (err.name !== 'AbortError') setEstado('error');
      });

    return () => controller.abort();
  }, []);

  return (
    <>
      <Hero
        className="hero-compact"
        eyebrow="ESTUDIO NORTE"
        title="Diseño digital con intención."
        copy="Creamos productos web claros, útiles y duraderos para organizaciones que quieren comunicar mejor."
      />

      <section className="api-section" aria-label="Últimas publicaciones">
        <h2 className="section-title">Últimas publicaciones de tecnología</h2>

        {estado === 'cargando' && <p className="estado">Cargando artículos...</p>}
        {estado === 'error' && (
          <p className="estado form-error">No se pudieron cargar los datos de la API.</p>
        )}

        {estado === 'ok' && (
          <div className="cards">
            {articulos.map((a) => (
              <article className="card" key={a.id}>
                <img
                  src={a.cover_image || IMAGEN_RESPALDO}
                  alt={`Portada de ${a.title}`}
                  loading="lazy"
                  onError={(e) => (e.currentTarget.src = IMAGEN_RESPALDO)}
                />

                <div className="card-body">
                  <div className="card-meta">
                    <span>{a.user.name}</span>
                    <span>❤ {a.public_reactions_count}</span>
                    <span>{new Date(a.published_at).toLocaleDateString('es-AR')}</span>
                  </div>

                  <h3>{a.title}</h3>
                  <p>{a.description}</p>

                  <div className="tags">
                    {a.tag_list.slice(0, 4).map((t) => (
                      <span key={t}>#{t}</span>
                    ))}
                  </div>

                  <a className="card-link" href={a.url} target="_blank" rel="noreferrer">
                    Leer artículo →
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
