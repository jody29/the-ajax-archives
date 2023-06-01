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
                <Box bg='red' p={2} minW='20px'>
                  <Text>Club(s)</Text>
                </Box>
                <Image src={story.fields.thumbnail?.fields.file.url} borderRadius='50%' w={14} h={14} objectFit='cover' mb={1} />
                <Text bg='rgba(0,0,0,.8)' py={1} px={2} color='white' fontWeight='bold' fontSize='1rem'>{story.fields.plaatsnaam}</Text>
              </Flex>
            </Link>
          </Marker>
        ))}
      </ReactMapGl>
    </Box>
  );
}
