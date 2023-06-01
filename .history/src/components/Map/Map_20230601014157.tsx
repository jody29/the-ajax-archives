import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactMapGl, { Map, Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import { IStories, IStoriesFields } from "types/contentful";
import Link from "next/link";

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
    <Box h='630px' w='100%' overflow='hidden' boxShadow='0 0 0 1px black'>
      <ReactMapGl
      initialViewState={{
        latitude: 50.25483,
        longitude: 6.300000,
        zoom: 4
      }}
      scrollZoom={true}
      interactive={true}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken='pk.eyJ1Ijoiam9keTU2OSIsImEiOiJja3g3amJ5MGowMW8wMm5zZTlwN3Fjb2t0In0.99DjUaNvteP2DPXThnnHXg' >
        {props.verhalen.map(story => (
          <Marker key={story.sys.id} latitude={story.fields.locatie.lat} longitude={story.fields.locatie.lon} >
            <Link href={`/verhalen/${story.sys.id}`} passHref>
              <Flex as="a" alignItems='center' flexDir='column'>
                <Image src={story.fields.thumbnail?.fields.file.url} borderRadius='50%' w={14} h={14} objectFit='cover' mb={1} />
                <Text bg='white' color='red' fontWeight='bold' fontSize='1rem'>{story.fields.plaatsnaam}</Text>
              </Flex>
            </Link>
          </Marker>
        ))}
      </ReactMapGl>
    </Box>
  );
}
