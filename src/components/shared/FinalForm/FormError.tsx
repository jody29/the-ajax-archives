import { Box, Text } from '@chakra-ui/react';
import { useField } from 'react-final-form';

interface FormErrorProps {
  name: string;
}

export const FormError = ({ name }: FormErrorProps) => {
  const { meta } = useField(name);

  const showError = meta.error && meta.touched;

  if (!showError) {
    return null;
  }

  return (
    <Box mt={1}>
      <Text display="block" fontSize="xxxs" color="error">
        {meta.error}
      </Text>
    </Box>
  );
};
