import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet's CSS

// --- Marker Icon Fix (Required to show the default marker in React/Webpack environments)
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;
// --- End Marker Icon Fix

interface OSMMapProps {
  // position is a LatLngExpression (tuple or object)
  position: LatLngExpression;
  zoom?: number; // Optional zoom level
  markerText: string;
}

// Define the component using React.FC (Functional Component) with the defined props type
const OSMMap: React.FC<OSMMapProps> = ({ position, zoom = 13, markerText }) => {
  // The MapContainer sets up the map viewport and interaction.
  // The key here is the TileLayer, which uses the public OSM URL.
  return (
    <div style={{ height: '500px', width: '100%' }}>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: '100%', width: '100%' }}
      >
        {/* This TileLayer uses the OpenStreetMap community tile URL.
                    This source is FREE and requires NO Google API Key or billing.
                */}
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marker is placed at the specified position */}
        <Marker position={position}>
          <Popup>{markerText}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default OSMMap;
