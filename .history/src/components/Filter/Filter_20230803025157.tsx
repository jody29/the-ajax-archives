import CloseNormalIcon from "@/icons/components/CloseNormal";
import { Box, Button, Flex, Heading, IconButton, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Text } from "@chakra-ui/react";
import { useField, useFormik } from "formik";
import { FormEvent, useEffect } from "react";
import { FaClosedCaptioning, FaCross, FaLine } from "react-icons/fa";
import { RedCheckbox } from "../RedCheckbox";

export interface FilterProps {
  amount: number;
  isOpen: boolean;
  searchTags: string[];
  setFilter?: (isOpen: boolean) => void;
  setSearchTags?: (searchTags: string[]) => void;
}

export const Filter = (props: FilterProps) => {
  const date = new Date
  const currentYear = date.getFullYear()

  const types = [
    {
      value: 'typeSjaals',
      label: 'Sjaals'
    },
    {
      value: 'typeTickets',
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
      if (props.setFilter) props.setFilter(!props.isOpen)
    }
  })

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    formik.handleSubmit(event)
  }

  const { setFieldValue, getFieldProps, errors, values } = formik

  const handleTagChange = (newTag: string) => {
    if (props.searchTags.includes(newTag)) {
      const updatedTags = props.searchTags.filter(tag => tag !== newTag)
      if (props.setSearchTags) props.setSearchTags(updatedTags)
    } else {
      const updatedTags = [...props.searchTags, newTag]
      if (props.setSearchTags) props.setSearchTags(updatedTags)
    }
  }

  const handleValueChange = (newTag: string, name: string) => {
    const tagIndex = name === 'type' ? values.type.indexOf(newTag as never) : values.competition.indexOf(newTag as never)

    if (tagIndex !== -1) {
      const updatedTags = name === 'type' ? [...values.type] : [...values.competition]
      
      updatedTags.splice(tagIndex, 1)
      setFieldValue(name, updatedTags)
    } else {
      if (name === 'type') {
        setFieldValue(name, [...values.type, newTag])
      } else if (name === 'competition') {
        setFieldValue(name, [...values.type, newTag])
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Flex bg='white' position='fixed' zIndex={1} p='2rem' w='27rem' right={0} top={0} bottom={0} boxShadow='0 0 10px rgba(0,0,0,.5)' flexDir='column' transform={`translateX(${props.isOpen ? '0' : '100%' })`} transition='transform 0.3s ease-in-out'>
        <Flex flexDir='column' overflowY='scroll' overflowX='visible' pb={6} mb={6} borderBottom='1px solid gray'>
          <Flex alignItems='center' pb={8} mb={6} borderBottom='1px solid gray'>
            <Heading fontSize='1.8rem'>Filter</Heading>
            <IconButton aria-label="close filter" size='xs' bg='transparent' color='slatergray' icon={ <CloseNormalIcon /> } ml='auto' onClick={() => { if (props.setFilter) props.setFilter(!props.isOpen) }} />
          </Flex>
          <Stack pb={8} mt={0} borderBottom='1px solid gray'>
            <Heading fontSize='1.2rem' fontWeight='bold' mb={4}>Filter op type item</Heading>
            <Flex flexDir='column' gap={2}>
              {types.map(type => (
                <Flex key={type.value} gap={4}>
                  <RedCheckbox 
                    {...getFieldProps('type')}
                    value={type.value} 
                    label={type.label}
                    onChange={() => {
                      handleTagChange(type.value)
                      handleValueChange(type.value, 'type')
                    }}
                  />
                  <Text>{type.label}</Text>
                </Flex>
              ))}
            </Flex>
          </Stack>
          <Stack mt={6} pb={8} borderBottom='1px solid gray'>
            <Heading fontSize='1.2rem' mb={4}>Filter op competitie</Heading>
            <Flex flexDir='column' gap={2}>
              {competitions.map(competition => (
                <Flex key={competition.value} gap={4}>
                  <RedCheckbox 
                    {...getFieldProps('competition')} 
                    value={competition.value} 
                    label={competition.label} 
                    onChange={() => { 
                      handleTagChange(competition.value) 
                      handleValueChange(competition.value, 'competition')
                    }} 
                  />
                  <Text>{competition.label}</Text>
                </Flex>
              ))}
            </Flex>
          </Stack>
          <Stack mt={6} pb={2} >
            <Heading fontSize='1.2rem' mb={4}>Filter op periode</Heading>
            <Box p='0 1rem'>
              <Text mb={2}>{values.period[0]} - {values.period[1]}</Text>
              <RangeSlider min={1960} max={currentYear} defaultValue={[1960, currentYear]} onChange={value => setFieldValue('period', value)}>
                <RangeSliderTrack h='.5rem'>
                  <RangeSliderFilledTrack bg='red' />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} outline='1px solid red' />
                <RangeSliderThumb index={1} outline='1px solid red' />
              </RangeSlider>
            </Box>
          </Stack>
        </Flex>
        <Flex gap={4} mt='auto'>
          <Button variant='secondary' color='red' border='1px solid red' borderRadius='base' p={6}>Reset filter</Button>
          <Button type="submit" w='full' fontSize='1rem' borderRadius='base' >Toon {props.amount} items</Button>
        </Flex>
      </Flex>
    </form>
  );
}