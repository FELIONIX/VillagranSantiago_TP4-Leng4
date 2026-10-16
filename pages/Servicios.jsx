import Hero from '../components/Hero.jsx';
import { servicios } from '../data/servicios.js';

export default function Servicios() {
  return (
    <>
      <Hero
        className="hero-compact"
        eyebrow="LO QUE HACEMOS"
        title="Estrategia, identidad y desarrollo."
        copy="Un enfoque simple: entender el problema, ordenar lo esencial y construir una solución medible."
      />

      <section className="cards" aria-label="Tecnologías y servicios">
        {servicios.map((s) => (
          <article className="card" key={s.id}>
            <img src={s.imagen} alt={`Logo de ${s.nombre}`} loading="lazy" />

            <div className="card-body">
              <div className="card-meta">
                <span>{s.categoria}</span>
              </div>

              <h3>{s.nombre}</h3>
              <p>{s.descripcion}</p>

              <div
                className="nivel-bar"
                role="progressbar"
                aria-label={`Nivel de ${s.nombre}`}
                aria-valuenow={s.nivel}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span style={{ width: `${s.nivel}%` }} />
              </div>

              <div className="tags">
                {s.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
