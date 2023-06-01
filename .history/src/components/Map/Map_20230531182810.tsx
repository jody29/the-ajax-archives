import { Box } from "@chakra-ui/react";
import Map from "react-map-gl";

export interface MapContainerProps {}

export const MapContainer = (props: MapContainerProps) => {
  const initialViewState = {
    longitude: -122.4,
    latitude: 37.8,
    zoom: 14
  }

  return (
    <Box h='100vh' w='100vw' position='absolute' top={0} left={0}>
      <Map
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/streets-v9" />
    </Box>
  );
}
