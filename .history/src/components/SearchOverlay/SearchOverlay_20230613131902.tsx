import CloseNormalIcon from "@/icons/components/CloseNormal";
import SearchIcon from "@/icons/components/Search";
import { Box, Button, Container, Flex, Icon, IconButton, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { IStories, IStoriesFields, ITicketAjaxAcMilan1995, ITicketAjaxAcMilan1995Fields } from "types/contentful";
import { SuggestionButton } from "../SuggestionButton";
import axios from "axios";

export interface SearchOverlayProps {
  isOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}

interface collectionProps {
  image: string;
  title: string;
  link: string;
}

interface storyProps {
  image: string;
  match: string;
  location: string;
  link: string;
}

const suggestions = ['Ajax - Ac Milan', 'Rot-Weiss Erfurt - Ajax', 'Uitshirt 1989', 'Tickets 1995', 'Wedstrijdsjaals']

export const SearchOverlay = (props: SearchOverlayProps) => {
  const [inputValue, setInputValue] = useState('')
  const [collectionResults, setCollectionResults] = useState<collectionProps[] | []>([])
  const [storyResults, setStoryResults] = useState<storyProps[] | []>([])
  const [showCollection, setShowCollection] = useState(true)
  const [showStories, setShowStories] = useState(false)

  const fakeCollection = [
    {
      image: '//images.ctfassets.net/m8mhss8s8opk/15EpDnaY7wFdo3wWJOXdxb/6be8d7509c6300b79e99e304b51acf9d/IMG_0774.JPG',
      title: 'Ticket SL Benfica - AFC Ajax 2018',
      link: '/collectie/2gnIPEogtmGLb7ZpY23xpg'
    },
    {
      image: '//images.ctfassets.net/m8mhss8s8opk/38WABLNMvnfALgMVEzmHUy/a27f8a228655a59555453ff612bbec48/IMG_0777.JPG',
      title: 'Ticket Glasgow Rangers - AFC Ajax 2022',
      link: '/collectie/1F0jTFBSejsyT0NlMmVeaQ'
    },
    {
      image: '//images.ctfassets.net/m8mhss8s8opk/41KYK6HOIdD7vqmGlGh83h/6fc2a686e8c46b27d0bb032250566097/IMG_0776.JPG',
      title: 'Ticket Liverpool FC - AFC Ajax 2022',
      link: '/collectie/3XHfWDhtzgO36xxLjYFzfh'
    },
    {
      image: '//images.ctfassets.net/m8mhss8s8opk/2xdHBnu6JnfET9LXJAKk5G/0b61db309964e97f6c91b4b070b20e38/IMG_0735.JPG',
      title: 'Ticket Real Madrid - AFC Ajax 2019',
      link: '/collectie/520yBJvqieHZLHvqJ9X0CA'
    },
    {
      image: '//images.ctfassets.net/m8mhss8s8opk/3iJCm8oreJf6BXYm99Dmre/198e8d3cb8587f33242e63e1f227bbef/IMG_0775.JPG',
      title: 'Ticket Standard Luik - AFC Ajax 2018',
      link: '/collectie/58MTiEhIzd2ksBEE3GTYHn'
    },
    {
      image: '//images.ctfassets.net/m8mhss8s8opk/1C6HZRxHlm8iSpkwvFOu5m/1d7567dcc6fd7c030f0e5114744b9807/IMG_0743.JPG',
      title: 'Ticket Schalke 04 - AFC Ajax 2017',
      link: '/collectie/4ZEjap5pt7QQQenEavDYl4'
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
        const resultCollection = fakeCollection.filter(item => item.title.toLowerCase().includes(inputValue.toLowerCase()))
        const resultStories = fakeStories.filter(story => story.match.toLowerCase().includes(inputValue.toLowerCase()))

        setCollectionResults(resultCollection)
        setStoryResults(resultStories)
        
      } else {
        setCollectionResults([])
        setStoryResults([])
      }
  }, [inputValue])

  const showSearchResults = inputValue.length > 0 && (collectionResults.length > 0 || storyResults.length > 0)

  const handleShowCollection = () => {
    setShowCollection(true)
    setShowStories(false)
  }

  const handleShowStories = () => {
    setShowCollection(false)
    setShowStories(true)
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
          {showSearchResults ? (
            <Box>
              <Flex mt={10} gap={2}>
                <Button fontSize='1rem' variant='secondary' color='black' fontWeight={showCollection ? 'bold' : 'normal'} onClick>
                  <Text>Collectie ({collectionResults.length})</Text>
                </Button>
                <Button fontSize='1rem' variant='secondary' color='black' fontWeight={showStories ? 'bold' : 'normal'}>
                  <Text>Verhalen ({storyResults.length})</Text>
                </Button>
              </Flex>
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
