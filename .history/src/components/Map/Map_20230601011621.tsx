import { Box, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Map, Marker } from "react-map-gl";
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
    pitch: 0,
    bearing: 0
  })
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null
  }

  return (
    <Box h='630px' w='100%' overflow='hidden'>
      <Map
      {...viewport}
      style={{width: '100%', height: '100%'}}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken='pk.eyJ1Ijoiam9keTU2OSIsImEiOiJja3g3amJ5MGowMW8wMm5zZTlwN3Fjb2t0In0.99DjUaNvteP2DPXThnnHXg' >
        {props.verhalen.map(story => (
          <Marker key={story.sys.id} latitude={story.fields.locatie.lat} longitude={story.fields.locatie.lon} >
            <Link href={`/verhalen/${story.sys.id}`} passHref>
              <Box as="a">
                <Image src={story.fields.thumbnail?.fields.file.url} borderRadius='50%' w={14} h={14} objectFit='cover' />
                <Text color='red' fontSize='1rem'>{story.fields.plaatsnaam}</Text>
              </Box>
            </Link>
          </Marker>
        ))}
      </Map>
    </Box>
  );
}
