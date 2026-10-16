export default function MapaUbicacion() {
  // Coordenadas aproximadas de Salta Capital (cambiar según la ubicación deseada)
  const lat = -24.7859;
  const lon = -65.4117;
  const d = 0.008;

  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lon - d},${lat - d},${lon + d},${lat + d}&layer=mapnik&marker=${lat},${lon}`;

  return (
    <div className="mapa">
      <iframe
        title="Ubicación de Estudio Norte en el mapa"
        src={src}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
