import { Box, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { AnimatedButton } from '../AnimatedButton';

export interface HighlightedSectionProps {
  title: string;
  buttonLink: 'collectie' | 'verhalen';
  subtitle: string;
  button: string;
  hasBg: boolean;
  children?: ReactNode;
}

export const HighlightedSection = (props: HighlightedSectionProps) => {
  return (
    <Box>
      <Box
        backgroundImage={props.hasBg ? "url('/images/mapImage.jpg')" : 'none'}
        w="100vw"
        backgroundSize="cover"
        marginX="calc((100% - 100vw) / 2)"
        h="100vh">
        <Container>
          <Flex justifyContent="center" height="100vh" flexDir="column" w="full">
            <Stack mb={12}>
              <Heading color="red">{props.title}</Heading>
              <Text fontSize="1.2rem">{props.subtitle}</Text>
            </Stack>
            {props.children}
            <Box ml="auto">
              <AnimatedButton link={`/${props.buttonLink}`}>{props.button}</AnimatedButton>
            </Box>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

