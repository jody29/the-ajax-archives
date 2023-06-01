import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Map } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'

export interface MapContainerProps {}

export const MapContainer = (props: MapContainerProps) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  const initialViewState = {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 5
  }

  return (
    <Box h='100vh' w='100vw' position='absolute' top={0} left={0} zIndex={-1}>
      <Map
      {...initialViewState}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken='pk.eyJ1Ijoiam9keTU2OSIsImEiOiJja3g3amJ5MGowMW8wMm5zZTlwN3Fjb2t0In0.99DjUaNvteP2DPXThnnHXg' />
      <Map />
    </Box>
  );
}
