import CloseNormalIcon from "@/icons/components/CloseNormal";
import { Box, Button, Flex, Heading, IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
import { FaClosedCaptioning, FaCross, FaLine } from "react-icons/fa";
import { RedCheckbox } from "../RedCheckbox";

export interface FilterProps {}

export const Filter = (props: FilterProps) => {
  const date = new Date
  const currentYear = date.getFullYear()

  const types = [
    {
      value: 'sjaals',
      label: 'Sjaals'
    },
    {
      value: 'tickets',
      label: 'Tickets'
    },
    {
      value: 'typeProgrammaboekjes',
      label: 'Programma boekjes'
    },
    {
      value: 'typeKrantenArtikelen',
      label: 'Kranten artikelen'
    },
    {
      value: 'typeVlaggen',
      label: 'Vlaggen'
    },
    {
      value: 'typeShirts',
      label: 'Shirts'
    },
    {
      value: 'typeOverig',
      label: 'Overig'
    }
  ]

  const competitions = [
    {
      value: 'competitieEredivisie',
      label: 'Eredivisie'
    },
    {
      value: 'competitieKnvbBeker',
      label: 'KNVB Beker'
    },
    {
      value: 'competitieChampionsLeagueOfEuropaCup1',
      label: 'Champions League / Europa Cup 1'
    },
    {
      value: 'competitieEuropaCup2',
      label: 'Europa Cup 2'
    },
    {
      value: 'competitieUefaCupOfEuropaLeague',
      label: 'UEFA Cup / Europa League'
    },
    {
      value: 'competitieVriendschappelijk',
      label: 'Vriendschappelijk'
    }
  ]

  const initialValues = {
    type: [],
    competition: [],
    period: [1960, currentYear]
  }

  const formik = useFormik({
    initialValues,
    onSubmit: async values => {
      console.log(values)
    }
  })

  const { handleSubmit, setFieldValue, isValid, getFieldProps, errors, values } = formik

  return (
    <form id="filterForm" noValidate>
      <Box bg='white' position='absolute' zIndex={1} p='2rem' w='25rem' right={0} top={0} bottom={0} boxShadow='0 0 10px rgba(0,0,0,.5)'>
        <Flex alignItems='center' pb={8} mb={6} borderBottom='1px solid gray'>
          <Heading fontSize='1.8rem'>Filter</Heading>
          <IconButton aria-label="close filter" size='xs' bg='transparent' color='slatergray' icon={ <CloseNormalIcon /> } ml='auto' />
        </Flex>
        <Flex position='relative' flexDir='column' bg='purple' h='full' >
          <Stack>
            <Heading fontSize='1.2rem' fontWeight='bold' mb={1}>Filter op type item</Heading>
            <Flex flexDir='column' gap={2}>
              {types.map(type => (
                <Flex key={type.value} gap={2}>
                  <RedCheckbox {...getFieldProps('type')} label={type.label} />
                  <Text>{type.label}</Text>
                </Flex>
              ))}
            </Flex>
          </Stack>
          <Stack mt={4}>
            <Heading fontSize='1.2rem' mb={1}>Filter op competitie</Heading>
            <Flex flexDir='column' gap={2}>
              {competitions.map(competition => (
                <Flex key={competition.value} gap={2}>
                  <RedCheckbox {...getFieldProps('competition')} label={competition.label} />
                  <Text>{competition.label}</Text>
                </Flex>
              ))}
            </Flex>
          </Stack>
          <Stack mt={4} >
            <Heading fontSize='1.2rem' mb={1}>Filter op periode</Heading>
            <Box>
              <Text>{values.period[0]} - {values.period[1]}</Text>
              <RangeSlider min={1960} max={currentYear} defaultValue={[1960, currentYear]} onChange={value => setFieldValue('period', value)}>
                <RangeSliderTrack h='.5rem'>
                  <RangeSliderFilledTrack bg='red' />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} outline='1px solid red' />
                <RangeSliderThumb index={1} outline='1px solid red' />
              </RangeSlider>
            </Box>
          </Stack>
          <Flex gap={4} mt='auto'>
            <Button variant='secondary' color='red' border='1px solid red' p={6}>Wis alles</Button>
            <Button type="submit" form="filterForm" w='full' fontSize='1rem' borderRadius='base'>Toon 200 items</Button>
          </Flex>
        </Flex>
      </Box>
    </form>
  );
}
