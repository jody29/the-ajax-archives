import { Box, Text } from '@chakra-ui/react';
import { ErrorMessage } from 'formik';

interface FormikErrorProps {
  name: string;
}

export const FormikError = ({ name }: FormikErrorProps) => {
  return (
    <Box mt={1}>
      <ErrorMessage name={name}>
        {message => {
          return (
            <Text display="block" fontSize="xxxs" color="error">
              {message}
            </Text>
          );
        }}
      </ErrorMessage>
    </Box>
  );
};
