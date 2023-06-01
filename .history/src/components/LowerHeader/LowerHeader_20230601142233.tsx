import FilterIcon from '@/icons/components/Filter';
import { Button, Flex, Select, Text } from '@chakra-ui/react';
import Link from 'next/link';

export interface LowerHeaderProps {
  isCollection?: boolean;
}

export const LowerHeader = (props: LowerHeaderProps) => {
  return (
    <Flex mt="105px" mb={10} gap={6} alignItems="center">
      <Link href="collectie" passHref>
        <Button as="a" variant={props.isCollection ? 'active' : 'primary'}>
          Alle verzamelobjecten
        </Button>
      </Link>
      <Link href="verhalen" passHref>
        <Button as="a" variant={props.isCollection ? 'primary' : 'active'}>
          Supporters verhalen
        </Button>
      </Link>
      {props.isCollection ? (
        <Button fontSize="1.2rem" p={0} color="black" variant="secondary" ml="auto">
          <FilterIcon />
          <Text ml={4}>Filter items</Text>
        </Button>
      ) : (
        <Flex ml='auto' alignItems='center'>
          <Text fontSize='1.2rem' fontWeight='bold'>Seizoen:</Text>
          <Select />
        </Flex>
      )}
    </Flex>
  );
};
