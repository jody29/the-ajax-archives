import { Box, BoxProps, Container, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { forwardRef } from 'react';
import { FaReact } from 'react-icons/fa';

import { NavLink } from '@/components/shared/Link';

const NavigationLink = forwardRef<any, BoxProps>((props, ref) => (
  <Box
    ref={ref}
    as="a"
    px={4}
    py={1}
    mx={3}
    my={5}
    display="block"
    fontSize="sm"
    borderRadius={5}
    fontWeight="medium"
    _hover={{
      bg: 'secondary',
    }}
    sx={{
      '&.active': {
        bg: 'gray.700',
      },
    }}
    {...props}
  />
));

const items = [
  {
    href: '/about',
    title: 'About',
  },
  {
    href: '/blog',
    title: 'Blog',
  },
  {
    href: '/examples',
    title: 'Examples',
  },
];

function Navigation() {
  return (
    <Flex as="nav">
      {items.map(item => {
        return (
          <Box key={item.title}>
            <NavLink href={item.href} passHref>
              <NavigationLink>{item.title}</NavigationLink>
            </NavLink>
          </Box>
        );
      })}
    </Flex>
  );
}

export function Header() {
  return (
    <Box as="header" bg="primary" color="white">
      <Container>
        <Flex flexShrink={0} alignItems="center">
          <Link href="/">
            <Flex as="a" mr={2} cursor="pointer">
              <FaReact size={30} />
            </Flex>
          </Link>

          <Navigation />
        </Flex>
      </Container>
    </Box>
  );
}
