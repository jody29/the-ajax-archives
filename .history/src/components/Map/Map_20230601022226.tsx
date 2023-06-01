import { Box, Flex, Image, Text } from "@chakra-ui/react";
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
  const [isHovered, setHovered] = useState(false)
  const [viewport, setViewport] = useState({
    latitude: 50.25483,
    longitude: 6.300000,
    width: '100vw',
    height: '100vh',
    zoom: 4,
  })

  const handleMouseEnter = () => {
    setHovered(true)
  }

  const handleMouseLeave = () => {
    setHovered(false)
  }
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Box h='600px' w='100%' overflow='hidden' boxShadow='0 0 0 1px black'>
      <ReactMapGl
      initialViewState={{
        latitude: 50.25483,
        longitude: 6.300000,
        zoom: 5
      }}
      scrollZoom={true}
      interactive={true}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken='pk.eyJ1Ijoiam9keTU2OSIsImEiOiJja3g3amJ5MGowMW8wMm5zZTlwN3Fjb2t0In0.99DjUaNvteP2DPXThnnHXg' >
        {props.verhalen.map(story => (
          <Marker key={story.sys.id} latitude={story.fields.locatie.lat} longitude={story.fields.locatie.lon} >
            <ImageMarker link={story.sys.id} clubs={['schalke 04']} plaatsnaam={story.fields.plaatsnaam} image={story.fields.thumbnail} />
          </Marker>
        ))}
      </ReactMapGl>
    </Box>
  );
}
