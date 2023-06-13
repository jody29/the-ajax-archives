import CloseNormalIcon from "@/icons/components/CloseNormal";
import SearchIcon from "@/icons/components/Search";
import { Box, Button, Container, Flex, Icon, IconButton, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { IStories, IStoriesFields, ITicketAjaxAcMilan1995, ITicketAjaxAcMilan1995Fields } from "types/contentful";
import { SuggestionButton } from "../SuggestionButton";
import axios from "axios";

export interface SearchOverlayProps {
  isOpen: boolean;
  collectie: ITicketAjaxAcMilan1995[];
  verhalen: IStories[];
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}

const suggestions = ['Ajax - Ac Milan', 'Rot-Weiss Erfurt - Ajax', 'Uitshirt 1989', 'Tickets 1995', 'Wedstrijdsjaals']

export const SearchOverlay = (props: SearchOverlayProps) => {
  const [inputValue, setInputValue] = useState('')
  const [collectionResults, setCollectionResults] = useState([])
  const [storyResults, setStoryResults] = useState([])

  const fakeCollection = [
    {
      image: '//images.ctfassets.net/m8mhss8s8opk/15EpDnaY7wFdo3wWJOXdxb/6be8d7509c6300b79e99e304b51acf9d/IMG_0774.JPG',
      title: 'Ticket SL Benfica - AFC Ajax 2018',
      link: '/collectie/2gnIPEogtmGLb7ZpY23xpg'
    },

  ]

  const fakeStories = [
    {
      image: '//images.ctfassets.net/m8mhss8s8opk/5gOtAGuLDqeEm8wZKwkq1I/01a6b9360d4242e07174ed998a22c2c3/C79EB0CC-BBD5-4A0E-8A8D-868F8329A1E8_1_105_c.jpeg',
      match: 'SL Benfica - AFC Ajax',
      location: 'Lissabon',
      link: '/verhalen/79hnGwwjST4fDCJjJdb8gL'
    },
    {
      image: '//images.ctfassets.net/m8mhss8s8opk/40NYUUfVHUWtU0cyOWAORU/df494b63af69035e4800b77caf54f736/schalke_04_-_ajax.jpeg',
      match: 'Schalke 04 - AFC Ajax',
      location: 'Gelsenkirchen',
      link: '/verhalen/5VGhf7GFP6KOgeOC2h1l0t'
    },
    {
      image: '//images.ctfassets.net/m8mhss8s8opk/14UNdjQOp0bcRMMCWp5UTz/67c8b543a13b3b0631c193642b4fdb3b/real_ajax_2019.jpeg',
      match: 'Real Madrid - AFC Ajax',
      location: 'Madrid',
      link: '/verhalen/73TYyQ8NzQRE371AHy6XiD'
    }
  ]


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
      if (inputValue.length > 0) {
        
        
      } else {
        setCollectionResults([])
        setStoryResults([])
      }
  }, [inputValue])

  const showSearchResults = inputValue.length > 0 && (collectionResults.length > 0 || storyResults.length > 0)

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
          {showSearchResults ? (
            <Box>
              <Text color='black'>Showing results</Text>
            </Box>
          ) : (
            <Box>
              <Text mt={10} mb={6} color='black'>Suggesties</Text>
              <Stack color='black' gap={0}>
                {suggestions.map(suggestion => (
                  <SuggestionButton key={suggestion} suggestion={suggestion} />
                ))}
              </Stack>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  );
}
