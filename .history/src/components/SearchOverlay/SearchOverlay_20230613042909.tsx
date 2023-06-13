import CloseNormalIcon from "@/icons/components/CloseNormal";
import SearchIcon from "@/icons/components/Search";
import { Box, Button, Container, Flex, Icon, IconButton, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { SuggestionButton } from "../SuggestionButton";

export interface SearchOverlayProps {
  isOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}

const suggestions = ['Ajax - Ac Milan', 'Rot-Weiss Erfurt - Ajax', 'Uitshirt 1989', 'Tickets 1995', 'Wedstrijdsjaals']

export const SearchOverlay = (props: SearchOverlayProps) => {
  const [isSearching, setSearching] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {  
    setSearchQuery(event.target.value)

    if (event.target.value.length > 0) {
      setSearching(true)
    } else {
      setSearching(false)
    }
  }

  return (
    <Box position='fixed' width='100vw' height='100vh' bg='white' top={0} transform={props.isOpen ? 'translateY(0)' : 'translateY(-100%)'} transition='transform 0.3s ease-in-out' zIndex={9999}>
      <Box py={6} w='full' borderBottom='1px solid black'>
        <Container>
          <Flex alignItems='center'>
            <Icon color='black' fontSize='1.8rem' mr={8}>
              <SearchIcon />
            </Icon>
            <Input placeholder="Zoeken" mr={8} border={0} fontSize='1.3rem' color='black' onChange={handleChange}/>
            <IconButton aria-label="close overlay" ml='auto' color='white' bg='black' p={3} borderRadius='full' onClick={() => {
              props.setSearchOpen(prevState => !prevState)
              document.body.style.overflow = 'auto'
            }}>
              <CloseNormalIcon />
            </IconButton>
          </Flex>
        </Container>
      </Box>
      <Box>
        <Container>
          {isSearching ? (
            <Box>
              <Text mt={10} mb={6} color='black'>Suggesties</Text>
              <Stack color='black' gap={0}>
                {suggestions.map(suggestion => (
                  <SuggestionButton key={suggestion} suggestion={suggestion} />
                ))}
              </Stack>
            </Box>
          ) : (
            <Box>
              <Text>Showing results for {searchQuery}</Text>
            </Box>
          )}
          
        </Container>
      </Box>
    </Box>
  );
}
