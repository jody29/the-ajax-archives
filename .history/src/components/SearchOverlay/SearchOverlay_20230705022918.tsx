import CloseNormalIcon from "@/icons/components/CloseNormal";
import SearchIcon from "@/icons/components/Search";
import { Box, Button, Container, Flex, Icon, IconButton, Image, Input, Stack, Text } from "@chakra-ui/react";
import { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from "react";
import { SuggestionButton } from "../SuggestionButton";
import { SearchCard } from "../SearchCard";
import { Asset, createClient, Entry, EntryCollection } from "contentful";
import { env } from '@/env/client.mjs'
import { ITicketAjaxAcMilan1995 } from "types/contentful";

export interface SearchOverlayProps {
  isOpen: boolean;
  setSearchOpen: Dispatch<SetStateAction<boolean>>;
}

export interface collectionProps {
  sys: {
    id: string;
  };
  fields: {
    afbeelding: Asset;
    beschrijving: string;
    naamItem: string;
    verhaalItem: string;
  }
}

export interface storyProps {
  sys: {
    id: string;
  };
  fields: {
    basisOpstelling: string;
    coach: string;
    competitie: string;
    datum: string;
    locatie: {
      lat: number;
      lon: number;
    };
    plaatsnaam: string;
    ronde: string;
    score: string;
    seizoen: string;
    thumbnail: Asset;
    verhaal: Document;
    wedstrijd: string;
    wisselSpelers: string
  }
}

const suggestions = ['Ajax - Ac Milan', 'Rot-Weiss Erfurt - Ajax', 'Uitshirt 1989', 'Tickets 1995', 'Wedstrijdsjaals']

export const SearchOverlay = (props: SearchOverlayProps) => {
  const [inputValue, setInputValue] = useState('')
  const [collectionResults, setCollectionResults] = useState<collectionProps[] | [] >([])
  const [storyResults, setStoryResults] = useState<storyProps[] | []>([])
  const [showCollection, setShowCollection] = useState(true)
  const [showStories, setShowStories] = useState(false)
  const [noResults, setNoResults] = useState(false)


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
      if (inputValue.length > 0) {
        const fetchData = async () => {
          const client = createClient({
            space: env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
            accessToken: env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
          })

          try {
            const collectionResponse = await client.getEntries({
              content_type: 'ticketAjaxAcMilan1995',
              query: inputValue.toLowerCase()
            })
            const collectionFetch = collectionResponse.items.map((entry) => entry as collectionProps)

            setCollectionResults(collectionFetch)

            const storyResponse = await client.getEntries({
              content_type: 'stories',
              query: inputValue.toLowerCase()
            })
            const storyFetch = storyResponse.items.map((entry) => entry as storyProps)

            setStoryResults(storyFetch)

 
          } catch (error) {
            console.error(error)
          }
        } 

        fetchData()
        
      } else {
        setNoResults(false)
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
              <Flex mt={10} gap={6}>
                <Button p={0} fontSize='1rem' variant='secondary' color='black' fontWeight={showCollection ? 'bold' : 'normal'} onClick={handleShowCollection}>
                  <Text>Collectie ({collectionResults.length})</Text>
                </Button>
                <Button p={0} fontSize='1rem' variant='secondary' color='black' fontWeight={showStories ? 'bold' : 'normal'} onClick={handleShowStories}>
                  <Text>Verhalen ({storyResults.length})</Text>
                </Button>
              </Flex>
              {showCollection && (
                <Flex flexWrap='wrap' gap={6} mb={10} mt={10}>
                  {collectionResults.map(item => (
                    <SearchCard key={item.fields.naamItem} item={item} />
                  ))}
                </Flex>
              )}
              {showStories && (
                <Flex flexWrap='wrap' gap={6} mb={10} mt={10}>
                  {storyResults.map(story => (
                    <SearchCard key={story.fields.wedstrijd} verhaal={story} isStory />
                  ))}
                </Flex>
              )}
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
