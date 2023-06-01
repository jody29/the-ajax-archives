import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { Asset } from "contentful";
import Link from "next/link";
import { useState } from "react";

export interface ImageMarkerProps {
  link: string;
  clubs: string[];
  image?: Asset;
  plaatsnaam?: string
}

export function ImageMarker(props: ImageMarkerProps) {
  const [isHovered, setIshovered] = useState(false)

  const handleMouseEnter = () => {
    setIshovered(true)
  }

  const handleMouseLeave = () => {
    setIshovered(false)
  }

  return (
    <Link href={`/verhalen/${props.link}`} passHref>
      <Flex as="a" alignItems='center' flexDir='column' position='relative' transform='translateY(-50px)'  onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Box bg='white' p={1} minW='100px' boxShadow='0 0 0 1px black' mb={4} borderRadius='4px' transform={isHovered ? 'scale(1)' : 'scale(0)'} opacity={isHovered ? 1 : 0} transition='transform 0.4s ease-in-out, opacity 0.4s ease-in-out' >
          <Text color='red' fontWeight='bold'>Club(s)</Text>
          {props.clubs.map(club => (
            <Text>{club}</Text>
          ))}
        </Box>
        <Image src={props?.image?.fields.file.url} borderRadius='50%' w={14} h={14} objectFit='cover' mb={isHovered ? 2.5 : 1} transform={isHovered ? 'scale(1.2)' : 'scale(1)'} transition='transform 0.4s ease-in-out, margin 0.4s ease-in-out' />
        <Text bg='rgba(226,59,59,.8)' py={1} px={2} color='white' fontSize='1rem'>{props.plaatsnaam}</Text>
      </Flex>
    </Link>
  );
}
