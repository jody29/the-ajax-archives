import { Box, Heading, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Text } from "@chakra-ui/react";

export interface FilterProps {}

export const Filter = (props: FilterProps) => {
  const date = new Date
  const currentYear = date.getFullYear()

  return (
    <Box bg='white' position='absolute' zIndex={2} p='2rem' w='20rem' right={0} top='2rem' borderRadius='15px' boxShadow='0 0 10px black'>
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
    </Box>
  );
}
