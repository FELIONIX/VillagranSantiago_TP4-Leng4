import { useState } from 'react';

export default function ContactForm() {
  const [errors, setErrors] = useState({});
  const [messageLength, setMessageLength] = useState(0);

  const validateForm = (event) => {
    const form = event.currentTarget;

    const nombre = form.nombre.value.trim();
    const email = form.email.value.trim();
    const mensaje = form.mensaje.value.trim();

    const newErrors = {};

    // Nombre y apellido
    if (nombre === '') {
      newErrors.nombre = 'Ingrese su nombre y apellido.';
    } else if (nombre.length < 3) {
      newErrors.nombre = 'El nombre debe tener al menos 3 caracteres.';
    } else if (!/^[A-Za-zÁÉÍÓÚáéíóúÑñÜü\s]+$/.test(nombre)) {
      newErrors.nombre = 'El nombre solo puede contener letras y espacios.';
    }

    // Correo
    if (email === '') {
      newErrors.email = 'Ingrese su correo electrónico.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Ingrese un correo electrónico válido.';
    }

    // Mensaje
    if (mensaje === '') {
      newErrors.mensaje = 'Ingrese un mensaje.';
    } else if (mensaje.length > 300) {
      newErrors.mensaje = 'El mensaje no puede superar los 300 caracteres.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      event.preventDefault();
    }
  };

  return (
    <form
      className="contact-form"
      action="https://formsubmit.co/capacheco@ucasal.edu.ar"
      method="POST"
      onSubmit={validateForm}
    >
      {/* Configuración de FormSubmit */}
      <input type="hidden" name="_subject" value="Nuevo mensaje desde Estudio Norte" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="true" />

      <div className="form-group">
        <label htmlFor="nombre">Nombre y Apellido</label>
        <input
          id="nombre"
          name="nombre"
          type="text"
          placeholder="Juan Pérez"
          autoComplete="name"
          required
          aria-invalid={errors.nombre ? 'true' : 'false'}
        />
        {errors.nombre && <p className="form-error">{errors.nombre}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="nombre@ejemplo.com"
          autoComplete="email"
          required
          aria-invalid={errors.email ? 'true' : 'false'}
        />
        {errors.email && <p className="form-error">{errors.email}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          placeholder="Contanos brevemente sobre tu proyecto..."
          maxLength={300}
          required
          rows={5}
          onChange={(e) => setMessageLength(e.target.value.length)}
          aria-invalid={errors.mensaje ? 'true' : 'false'}
        />
        <div className="message-info">
          {errors.mensaje && <p className="form-error">{errors.mensaje}</p>}
          <span className="character-count">{messageLength}/300</span>
        </div>
      </div>

      <button className="submit-button" type="submit">
        Enviar mensaje
      </button>
    </form>
  );
}
