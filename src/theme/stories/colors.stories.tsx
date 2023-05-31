import { Box, Flex } from '@chakra-ui/react';

import { colors } from '../colors';

export default { title: 'Tokens/Colors', component: null };

export const customColors = () => (
  <>
    {Object.entries(colors).map(([colorName, colorValue]) => (
      <Flex
        key={colorName}
        backgroundColor="white"
        shadow="md"
        borderRadius="lg"
        display="inline-flex"
        width="150px"
        height="150px"
        m="2"
        flexDirection="column"
        textAlign="center"
      >
        <Box
          borderTopRadius="lg"
          mb="2"
          backgroundColor={colorValue as string}
          height="100px"
          borderBottom="1px solid #ccc"
        ></Box>
        {colorName}
        <pre>{colorValue as string}</pre>
      </Flex>
    ))}
  </>
);
