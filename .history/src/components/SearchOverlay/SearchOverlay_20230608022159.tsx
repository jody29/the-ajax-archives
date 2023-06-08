import { Box, Button, Container, Flex, IconButton } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { FaCross } from "react-icons/fa";

export interface SearchOverlayProps {
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}

export const SearchOverlay = (props: SearchOverlayProps) => {
  return (
    <Box position='fixed' width='100vw' height='100vh' bg='white' top={0}>
      <Container>
        <Flex>
        <IconButton aria-label="close overlay" onClick={() => props.setSearchOpen(prevState => !prevState)}>
          <FaCross />
        </IconButton>
        </Flex>
      </Container>
    </Box>
  );
}
