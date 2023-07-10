import { Box, Heading, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Text } from "@chakra-ui/react";

export interface FilterProps {}

export const Filter = (props: FilterProps) => {
  const date = new Date
  const currentYear = date.getFullYear()

  return (
    <Box bg='white' position='absolute' zIndex={2} p='2rem' w='20rem' right={0} borderRadius='10px'>
      <Heading fontSize='1.6rem'>Periode</Heading>
      <Text>1960 - {currentYear}</Text>
      <RangeSlider min={1960} max={currentYear} defaultValue={[1960, currentYear]}>
        <RangeSliderTrack>
          <RangeSliderFilledTrack bg='red' />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} border='1px solid red' />
        <RangeSliderThumb index={1} border='1px solid red' />
      </RangeSlider>
    </Box>
  );
}
