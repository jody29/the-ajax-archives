import { Box, RangeSlider } from "@chakra-ui/react";

export interface FilterProps {}

export const Filter = (props: FilterProps) => {
  const date = new Date
  const currentYear = date.getFullYear()

  return (
    <Box bg='white' position='absolute'>
      <RangeSlider min={1960} max={currentYear} />
    </Box>
  );
}
