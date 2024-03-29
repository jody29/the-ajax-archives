import FilterIcon from '@/icons/components/Filter';
import { Button, Flex, MenuItemOption, Select, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FieldSelect } from '../shared/Form';

export interface LowerHeaderProps {
  isCollection?: boolean;
}

const options = [
  {
    value: '2022-2023',
    label: '22-23'
  },
  {
    value: '2021-2022',
    label: '21-22'
  },
  {
    value: '2020-2021',
    label: '20-21'
  }
]

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
        <Flex ml='auto' alignItems='center' gap={2}>
          <Text fontSize='1.2rem' fontWeight='bold'>Seizoen:</Text>
          <FieldSelect name='season' options={options} />
        </Flex>
      )}
    </Flex>
  );
};
