import { Box, Container, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export function Footer() {
  const items = [
    {
      href: '/home',
      title: 'home',
    },
    {
      href: '/collectie',
      title: 'collectie',
    },
    {
      href: '/verhalen',
      title: 'verhalen',
    },
  ];

  return (
    <Box width="100vw" marginX="calc((100% - 100vw) / 2)" as="footer">
      <Box bg="#212121" color="white" fontWeight="bold" py={14}>
        <Container>
          <Flex justifyContent="space-between">
            <Box>
              <Heading fontSize="1.4rem" mb={6}>
                The Ajax Archives
              </Heading>
              <Text fontWeight="normal">Archief voor en door supporters</Text>
            </Box>
            <Box>
              <Heading fontSize="1.4rem" mb={6}>
                Navigatie
              </Heading>
              <Stack>
                {items.map(item => (
                  <Link key={item.title} href={item.href} passHref>
                    <Box as="a" fontWeight="normal">
                      {item.title}
                    </Box>
                  </Link>
                ))}
              </Stack>
            </Box>
            <Box>
              <Heading fontSize="1.4rem" mb={6}>
                Socials
              </Heading>
            </Box>
            <Box>
              <Heading fontSize="1.4rem" mb={6}>
                Contact
              </Heading>
            </Box>
          </Flex>
        </Container>
      </Box>
      <Box bg="#1b1b1b" color="#9b9b9b" py={4}>
        <Container>
          <Text>&copy;Copyright 2023 The Ajax Archives</Text>
        </Container>
      </Box>
    </Box>
  );
}
