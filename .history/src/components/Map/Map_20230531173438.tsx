import { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";

export interface MapProps {}

const Map = (props: MapProps) => {
  const [isBrowser, setIsBrowser] = useState(false)

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  if (!isBrowser) {
    return null
  }

  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <Marker position={[51.505, -0.09]} />
    </MapContainer>
  );
}

export default Map
