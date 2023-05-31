import { Box, Container, Flex, Text, Image } from '@chakra-ui/react';
import { Asset } from 'contentful';

export interface HeroSectionProps {
  images: Asset[];
}

export const HeroSection = (props: HeroSectionProps) => {
  return (
    <Box color="white" position="relative">
      <Box
        bg="blackAlpha.700"
        w="100vw"
        marginX="calc((100% - 100vw) / 2)"
        h="full"
        position="absolute"
        left={0}></Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        width="100vw"
        height="750px"
        marginX="calc((100% - 100vw) / 2)"
        overflow={'hidden'}>
        {props.images.map(image => (
          <Image
            key={image.fields.title}
            src={`https://${image.fields.file.url}`}
            alt={image.fields.title}
            width="100%"
            height="300px"
            objectFit="cover"
          />
        ))}
      </Box>
      <Box
        position="absolute"
        top={0}
        left={0}
        right={0}
        bottom={0}
        display="flex"
        alignItems="center"
        justifyContent="center"
        zIndex={0}>
        <Box>
          <Container transform="translateY(56px)">
            <Flex alignItems="baseline">
              <Text fontSize="6.25rem" fontWeight="normal" color="white" mr={8}>
                THE
              </Text>
              <Text fontSize="6.25rem" fontWeight="bold" color="primary">
                AJAX
              </Text>
            </Flex>
            <Text fontSize="14rem" fontWeight="bold" color="white" transform="translateY(-80px)">
              ARCHIVES
            </Text>
          </Container>
        </Box>
      </Box>
    </Box>
  );
};
