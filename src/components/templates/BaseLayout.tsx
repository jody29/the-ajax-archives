import { Flex, Box, Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { Footer } from '../features/layout/Footer';
import { Header } from '../features/layout/Header';

interface BaseLayoutProps {
  children?: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <Flex flexDirection="column" height="100vh">
      <Header />

      <Box as="main" flex="1 0 auto" display="block">
        <Container>{children}</Container>
      </Box>

      <Footer />
    </Flex>
  );
}
