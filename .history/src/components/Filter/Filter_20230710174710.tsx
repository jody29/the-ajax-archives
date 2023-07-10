import { Box, Heading, RangeSlider } from "@chakra-ui/react";

export interface FilterProps {}

export const Filter = (props: FilterProps) => {
  const date = new Date
  const currentYear = date.getFullYear()

  return (
    <Box bg='white' position='absolute'>
      <Heading fontSize='2rem'>Periode</Heading>
      <RangeSlider min={1960} max={currentYear} />
    </Box>
  );
}
