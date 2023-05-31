import { Box } from '@chakra-ui/react';
import { Story } from '@storybook/react';

import { Stagger, StaggerProps } from './Stagger';

export default {
  title: 'Atoms/Animation',
  component: Stagger,
  duration: {
    defaultValue: 2,
    control: {
      name: 'Duration',
      type: 'number',
    },
  },
  staggerDelay: {
    defaultValue: 0.2,
    control: {
      name: 'Stagger delay',
      type: 'number',
    },
  },
};

export const stagger: Story<StaggerProps> = args => {
  return (
    <Stagger key={Object.values(args).join('-')} {...args}>
      <Box bg="red.300" mb={1} p={2}>
        Child
      </Box>
      <Box bg="orange.300" mb={1} p={2}>
        Child
      </Box>
      <Box bg="yellow.300" mb={1} p={2}>
        Child
      </Box>
      <Box bg="green.300" mb={1} p={2}>
        Child
      </Box>
      <Box bg="blue.300" mb={1} p={2}>
        Child
      </Box>
      <Box bg="purple.300" mb={1} p={2}>
        Child
      </Box>
    </Stagger>
  );
};
