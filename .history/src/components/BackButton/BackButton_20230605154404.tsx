import { Button, Icon, Text } from "@chakra-ui/react";
import { FaChevronLeft } from "react-icons/fa";

export interface BackButtonProps {
}

export const BackButton = (props: BackButtonProps) => {
  return (
    <Button onClick={() => history.back()} variant='secondary' color='black' {...props}>
      <Icon>
        <FaChevronLeft />
      </Icon>
      <Text>terug</Text>
    </Button>
  );
}
