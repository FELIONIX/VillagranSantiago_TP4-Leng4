export default function Hero({ eyebrow, title, copy, className = '' }) {
  return (
    <section className={`hero ${className}`} aria-labelledby="title">
      <p className="eyebrow">{eyebrow}</p>
      <h1 id="title">{title}</h1>
      <p className="copy">{copy}</p>
    </section>
  );
}
