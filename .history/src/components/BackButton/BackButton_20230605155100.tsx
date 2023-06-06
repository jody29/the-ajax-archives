import { Button, ButtonProps, Flex, Icon, Text } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";

export interface BackButtonProps extends ButtonProps {
}

export const BackButton = (props: BackButtonProps) => {
  return (
    <Button onClick={() => history.back()} variant='secondary' color='black' p={0} {...props}>
      <Flex alignItems='center' gap={4}>
        <Icon fontSize='1.6rem'>
          <FaChevronLeft />
        </Icon>
        <Text fontSize='1.2rem'>terug</Text>
      </Flex>
    </Button>
  );
}
