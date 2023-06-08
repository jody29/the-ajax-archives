import { Box, BoxProps, Container, Flex, IconButton } from '@chakra-ui/react';
import { forwardRef, useState } from 'react';

import { NavLink } from '@/components/shared/Link';
import SearchIcon from '@/icons/components/Search';
import { SearchOverlay } from '@/components/SearchOverlay';

const NavigationLink = forwardRef<any, BoxProps>((props, ref) => (
  <Box
    ref={ref}
    as="a"
    py={1}
    my={5}
    mr={16}
    display="block"
    fontSize="1.4rem"
    borderRadius={5}
    {...props}
  />
));

const items = [
  {
    href: '/',
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

interface HeaderProps {
  textColor: string;
  fixed: boolean;
}

export const Header = ({ textColor, fixed }: HeaderProps) => {
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <Box
      as="header"
      color={textColor}
      position={fixed ? 'fixed' : 'absolute'}
      bg={fixed ? 'white' : 'transparent'}
      top={0}
      zIndex={1}
      w={'100vw'}
      left={0}>
      <Container>
        <Flex alignItems="center">
          <Navigation />
          <IconButton aria-label="search" ml="auto" variant="secondary">
            <SearchIcon color={textColor} bg="transparant" />
          </IconButton>
        </Flex>
      </Container>
      {searchOpen && <SearchOverlay />}
      
    </Box>
  );
};