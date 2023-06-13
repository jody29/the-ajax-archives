import { Box, Heading, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';
import { collectionProps, storyProps } from '../SearchOverlay';

export interface PreviewCardProps {
  verhaal?: storyProps;
  item?: collectionProps;
  isStory?: boolean;
}

export const PreviewCard = (props: PreviewCardProps) => {
  const [isHovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
    console.log('mouse enter');
  };

  const handleMouseLeave = () => {
    setHovered(false);
    console.log('mouse leave');
  };

  return (
    <Link
      href={
        props.isStory ? `/verhalen/${props.verhaal?.link}` : `/collectie/${props.item?.link}`
      }
      passHref>
      <Box
        as="a"
        height={props.isStory ? '500px' : '250px'}
        w="400px"
        position="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
        <Image
          src={
            props.isStory
              ? props?.verhaal?.image
              : props.item?.image
          }
          h="full"
          w="full"
          objectFit="cover"
        />
        <Box
          height="full"
          w="full"
          position="absolute"
          bg="blackAlpha.700"
          top={0}
          opacity={isHovered ? 1 : 0}
          transition="opacity 0.4s ease-in-out"
        />
        <Box bg="red" position="absolute" bottom={0} px={4} pt={4} pb={4} width="full">
          <Heading
            fontSize="1.2rem"
            color="white"
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis">
            {props.isStory ? props?.verhaal?.match : props.item?.title}
          </Heading>
          {props.isStory && (
            <Text pt={3} pb={1} lineHeight={1} color="white">
              {props?.verhaal?.location}
            </Text>
          )}
          <Box height={isHovered ? 8 : 0} transition="height 0.3s ease-in-out" position="relative">
            <Box
              as={FaChevronRight}
              position="absolute"
              right={2}
              top="50%"
              color="white"
              transform={`translateX(${isHovered ? '0' : '-200%'})`}
              transition="transform 0.4s ease-in-out, opacity 0.4s ease-in-out"
              opacity={isHovered ? 1 : 0}
            />
          </Box>
        </Box>
      </Box>
    </Link>
  );
};
