import { Box, Button, Heading, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Text } from "@chakra-ui/react";
import { useFormik } from "formik";
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
      <Box bg='white' position='absolute' zIndex={1} p='2rem' w='23rem' right={0} top='4rem' borderRadius='15px' boxShadow='0 0 10px rgba(0,0,0,.5)'>
        <Stack>
          <Heading fontSize='1.4rem'>Type item</Heading>
          {types.map(type => (
            <RedCheckbox {...getFieldProps('type')} label={type.label} />
          ))}
        </Stack>
        <Stack>
          <Heading fontSize='1.4rem'>Competitie</Heading>
        </Stack>
        <Stack >
          <Heading fontSize='1.4rem'>Periode</Heading>
          <Box>
            <Text>1960 - {currentYear}</Text>
            <RangeSlider min={1960} max={currentYear} defaultValue={[1960, currentYear]}>
              <RangeSliderTrack h='.5rem'>
                <RangeSliderFilledTrack bg='red' />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} outline='1px solid red' />
              <RangeSliderThumb index={1} outline='1px solid red' />
            </RangeSlider>
          </Box>
        </Stack>
        <Button w='full' fontSize='1rem' borderRadius='base' mt={6}>Toon 200 items</Button>
      </Box>
    </form>
  );
}
