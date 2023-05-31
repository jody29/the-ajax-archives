import { Box, Button } from '@chakra-ui/react';
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { FaChevronRight } from 'react-icons/fa';

export interface AnimatedButtonProps {
  children: ReactNode;
  link: string;
}

export const AnimatedButton = (props: AnimatedButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeavle = () => {
    setIsHovered(false);
  };

  return (
    <Link href={props.link} passHref>
      <Button
        as="a"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeavle}
        cursor="pointer"
        variant="primary"
        position="relative"
        overflow="hidden"
        pr={isHovered ? '40px' : '20px'}
        transition="padding 0.4s ease-in-out">
        <Box as="span" position="relative" bg="red" zIndex={2} display="inline-block">
          {props.children}
        </Box>
        <Box
          as={FaChevronRight}
          position="absolute"
          right={2}
          top="50%"
          transform={`translateY(-50%) translateX(${isHovered ? '0' : '-100%'})`}
          opacity={isHovered ? 1 : 0}
          transition="transform 0.4s ease-in-out, opacity 0.4s ease-in-out"
          zIndex={1}
        />
      </Button>
    </Link>
  );
};
