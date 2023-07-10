import { Box, Heading, RangeSlider, RangeSliderFilledTrack, RangeSliderThumb, RangeSliderTrack, Stack, Text } from "@chakra-ui/react";

export interface FilterProps {}

export const Filter = (props: FilterProps) => {
  const date = new Date
  const currentYear = date.getFullYear()

  return (
    <Box bg='white' position='absolute' zIndex={2} p='2rem' w='20rem' right={0} borderRadius='15px'>
      <Stack gap='.5rem'>
        <Heading fontSize='1.6rem'>Periode</Heading>
        <Box>
          <Text>1960 - {currentYear}</Text>
          <RangeSlider min={1960} max={currentYear} defaultValue={[1960, currentYear]}>
            <RangeSliderTrack h='.5rem'>
              <RangeSliderFilledTrack bg='red' />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} outline='1px solid red' />
            <RangeSliderThumb index={1} border='1px solid red' />
          </RangeSlider>
        </Box>
      </Stack>
    </Box>
  );
}
