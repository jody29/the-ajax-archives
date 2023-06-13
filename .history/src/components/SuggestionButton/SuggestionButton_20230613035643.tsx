import { Button, Text } from "@chakra-ui/react";

export interface SuggestionButtonProps {
  suggestion: string
}

export const SuggestionButton = (props: SuggestionButtonProps) => {
  return (
    <Button variant='secondary' padding={0} color='black' w='fit-content' fontSize='1.2rem' fontWeight='bold'>
      <Text>{props.suggestion}</Text>
    </Button>
  );
}
