import { Box } from "@chakra-ui/react";
import Map from "react-map-gl";


export interface MapProps {}

export const MapContainer = (props: MapProps) => {
  return (
    <Box h='100vh' w='100vw' position='absolute' top={0} left={0}>
      <Map initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }} />
    </Box>
  );
}
