import { Box, Button, Flex, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import ReactMapGl, { Map, Marker } from "react-map-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import { IStories } from "types/contentful";
import Link from "next/link";
import { ImageMarker } from "../ImageMarker";
import axios from "axios";

export interface MapContainerProps {
  verhalen: IStories[];
}

interface GeocodingResponse {
  features: {
    place_name: string;
  }[];
}

export const MapContainer = (props: MapContainerProps) => {
  const [isClient, setIsClient] = useState(false)
  const initialViewport = {
    latitude: 50.25483,
    longitude: 6.300000,
    zoom: 4,
  };
  const insideNetherlandsViewport = {
    latitude: 52.1326,
    longitude: 5.2913,
    zoom: 8,
  };
  const [viewport, setViewport] = useState(initialViewport)
 
  useEffect(() => {
    setIsClient(true)
  }, [])

  const [showInsideNetherlands, setShowInsideNetherlands] = useState(false)
  const [filteredVerhalen, setFilteredVerhalen] = useState<IStories[]>([])

  const handleMapInteraction = (newViewport: any) => {
    if (showInsideNetherlands) {
      setViewport({ ...insideNetherlandsViewport, ...newViewport })
    } else {
      setViewport({ ...initialViewport, ...newViewport })
    }
  }

  const handleNetherlands = () => {
    setShowInsideNetherlands(true)
  }

  const handleEurope = () => {
    setShowInsideNetherlands(false)
  }

  useEffect(() => {
    const filterMarkers = async () => {
      const filteredVerhalen = []
      for (const story of props.verhalen) {
        const response = await axios.get<GeocodingResponse>(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${story.fields.locatie.lon},${story.fields.locatie.lat}.json?access_token=pk.eyJ1Ijoiam9keTU2OSIsImEiOiJja3g3amJ5MGowMW8wMm5zZTlwN3Fjb2t0In0.99DjUaNvteP2DPXThnnHXg`
        );
        const country = response.data.features[0].place_name

        if (showInsideNetherlands && country === 'Netherlands') {
          filteredVerhalen.push(story)
        } else if (!showInsideNetherlands && country !== 'Netherlands') {
          filteredVerhalen.push(story)
        }
      }
      console.log(filteredVerhalen)
      setFilteredVerhalen(filteredVerhalen)
    };
    
    if (isClient) {
      filterMarkers()
    }
  }, [isClient, props.verhalen, showInsideNetherlands])

  if (!isClient) {
    return null
  }

  return (
    <Box w='100%' overflow='hidden'>
      <ReactMapGl
      initialViewState={viewport}
      style={{width: '100%', height: '600px', border: '1px solid black'}}
      mapStyle="mapbox://styles/mapbox/light-v11"
      mapboxAccessToken='pk.eyJ1Ijoiam9keTU2OSIsImEiOiJja3g3amJ5MGowMW8wMm5zZTlwN3Fjb2t0In0.99DjUaNvteP2DPXThnnHXg' >
        {props.verhalen.map(story => (
          <Marker key={story.sys.id} latitude={story.fields.locatie.lat} longitude={story.fields.locatie.lon} >
            <ImageMarker link={story.sys.id} clubs={['schalke 04']} plaatsnaam={story.fields.plaatsnaam} image={story.fields.thumbnail} />
          </Marker>
        ))}
      </ReactMapGl>
      <Flex justifyContent='center' gap={2} my={4}>
        <Button variant='secondary' color='black' fontSize='1.4rem' pb={2}>Nederland</Button>
        <Button variant='secondary' color='black' fontSize='1.4rem' fontWeight='bold' borderBottom='2px solid black' pb={2}>Europa</Button>
      </Flex>
    </Box>
  );
}
