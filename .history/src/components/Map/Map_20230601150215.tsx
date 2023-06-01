import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactMapGl, { Map, Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import { IStories } from "types/contentful";
import Link from "next/link";
import { ImageMarker } from "../ImageMarker";

export interface MapContainerProps {
  verhalen: IStories[];
}

export const MapContainer = (props: MapContainerProps) => {
  const [isClient, setIsClient] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: 50.25483,
    longitude: 6.300000,
    width: '100vw',
    height: '100vh',
    zoom: 4,
  })
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Box w='100%' overflow='hidden'>
      <ReactMapGl
      initialViewState={{
        latitude: 50.25483,
        longitude: 6.300000,
        zoom: 3.5
      }}
      style={{width: '100%', height: '600px', border: '1px solid black'}}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken='pk.eyJ1Ijoiam9keTU2OSIsImEiOiJja3g3amJ5MGowMW8wMm5zZTlwN3Fjb2t0In0.99DjUaNvteP2DPXThnnHXg' >
        {props.verhalen.map(story => (
          <Marker key={story.sys.id} latitude={story.fields.locatie.lat} longitude={story.fields.locatie.lon} >
            <ImageMarker link={story.sys.id} clubs={['schalke 04']} plaatsnaam={story.fields.plaatsnaam} image={story.fields.thumbnail} />
          </Marker>
        ))}
      </ReactMapGl>
      <Flex justifyContent='center' gap={2}>
        <Button>Nederland</Button>
        <Button>Europa</Button>
      </Flex>
    </Box>
  );
}
