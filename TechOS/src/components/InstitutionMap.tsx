import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Mock Data for institutions
const institutions = [
  { id: 1, name: "Universidad Central de Venezuela", type: "Universidad", lat: 10.49, lng: -66.89 },
  { id: 2, name: "Universidad de Carabobo", type: "Universidad", lat: 10.23, lng: -68.0 },
  { id: 3, name: "Universidad del Zulia", type: "Universidad", lat: 10.67, lng: -71.63 },
  { id: 4, name: "Colegio San Ignacio de Loyola", type: "Colegio", lat: 10.48, lng: -66.85 },
];



const InstitutionMap = () => {
  const [position, setPosition] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );
  }, []);

  if (loading) {
    return <div className="text-center p-10">Loading map and location...</div>;
  }

  if (error) {
    return <div className="text-center p-10 text-red-500">Error: {error}. Please enable location services.</div>;
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Encuentra tu Institución Cercana</h2>
        {position && (
          <MapContainer center={position} zoom={13} style={{ height: "500px", width: "100%" }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {institutions.map(inst => (
              <Marker key={inst.id} position={[inst.lat, inst.lng]}>
                <Popup>
                  <b>{inst.name}</b><br />
                  {inst.type}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </section>
  );
};

export default InstitutionMap;
