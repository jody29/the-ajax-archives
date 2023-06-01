import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export interface MapContainerProps {}

export const MapContainer = (props: MapContainerProps) => {
  const [isClient, setIsClient] = useState(false)
  const [Map, setMap] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)

    import('react-map-gl').then((module) => {
      const { default: ReactMapGL } = module;
      setMap(ReactMapGL)
    })
    .catch((error) => { console.error("Error loading Map component:", error) })
  }, [])

  if (!isClient) {
    return null
  }

  if (!Map) {
    return <Text>Loading map...</Text>
  }

  const initialViewState = {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14
  }

  return (
    <Box h='100vh' w='100vw' position='absolute' top={0} left={0}>
      <Map
      {...initialViewState}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxApiAccessToken={process.env.MAPBOX_API_KEY} />
      <Map />
    </Box>
  );
}
