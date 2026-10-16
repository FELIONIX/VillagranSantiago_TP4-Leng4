import Hero from '../components/Hero.jsx';
import ContactForm from '../components/ContactForm.jsx';
import MapaUbicacion from '../components/MapaUbicacion.jsx';

export default function Contacto() {
  return (
    <>
      <Hero
        className="contact-hero"
        eyebrow="HABLEMOS"
        title="Un buen proyecto empieza con una conversación."
        copy="Escribinos para conocer tu idea y definir un próximo paso concreto."
      />

      <div className="contact-layout">
        <ContactForm />
        <MapaUbicacion />
      </div>
    </>
  );
}
