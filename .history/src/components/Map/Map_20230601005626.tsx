import { Box, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { Map } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'

export interface MapContainerProps {}

export const MapContainer = (props: MapContainerProps) => {
  const [isClient, setIsClient] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: 52.25483,
    longitude: 6.300000,
    width: '100vw',
    height: '100vh',
    zoom: 4,
    pitch: 0,
    bearing: 0
  })
  const mapRef = useRef()
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Box h='620px' w='100%' overflow='hidden'>
      <Map
      {...viewport}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken='pk.eyJ1Ijoiam9keTU2OSIsImEiOiJja3g3amJ5MGowMW8wMm5zZTlwN3Fjb2t0In0.99DjUaNvteP2DPXThnnHXg' />
      <Map />
    </Box>
  );
}
