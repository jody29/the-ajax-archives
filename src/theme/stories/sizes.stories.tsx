import { Heading, Text } from '@chakra-ui/react';

export default { title: 'Tokens/Typography', component: null };

export const headingsAndText = () => (
  <>
    <Heading as="h1" size="4xl">
      Heading 1
    </Heading>
    <Heading as="h2" size="3xl">
      Heading 2
    </Heading>
    <Heading as="h3" size="2xl">
      Heading 3
    </Heading>
    <Heading as="h4" size="xl">
      Heading 4
    </Heading>
    <Heading as="h5" size="lg">
      Heading 5
    </Heading>
    <Heading as="h6" size="md">
      Heading 6
    </Heading>
    <Text as="strong" size="sm">
      Strong
    </Text>
    <Text fontSize="xs">Paragraph</Text>
    <Text fontSize="sm">Paragraph</Text>
    <Text fontSize="md">Paragraph</Text>
    <Text fontSize="lg">Paragraph</Text>
    <Text fontSize="xl">Paragraph</Text>
    <Text fontSize="2xl">Paragraph</Text>
    <Text fontSize="3xl">Paragraph</Text>
    <Text fontSize="4xl">Paragraph</Text>
  </>
);
