import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";

export interface BackButtonProps {
}

export const BackButton = (props: BackButtonProps) => {
  return (
    <Button onClick={() => history.back()} variant='secondary' color='black' {...props}>
      <Flex alignItems='center'>
        <Icon fontSize='1.4rem'>
          <FaChevronLeft />
        </Icon>
        <Text fontSize='1.2rem'>terug</Text>
      </Flex>
    </Button>
  );
}
