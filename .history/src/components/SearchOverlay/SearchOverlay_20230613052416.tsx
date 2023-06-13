import CloseNormalIcon from "@/icons/components/CloseNormal";
import SearchIcon from "@/icons/components/Search";
import ContentService from "@/utils/content-service";
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
  const [collectionResults, setCollectionResults] = useState<ITicketAjaxAcMilan1995[] | []>([])
  const [storyResults, setStoryResults] = useState<IStories[] | []>([])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  console.log(process.env.CONTENTFUL_ACCESS_TOKEN)

  useEffect(() => {
    const fetchData = async () => {
      if (inputValue.length > 0) {
        const collectie = await axios.get(`https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master/entries`, {
          params: {
            access_token: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
            content_type: 'collectie'
          }
        })
        const verhalen = await axios.get(`https://cdn.contentful.com/spaces/${process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/master/entries`, {
          params: {
            acces_token: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
            content_type: 'stories'
          }
        })

        console.log("collectie: " + collectie)
        console.log("verhalen: " + verhalen)
      } else {
        setCollectionResults([])
        setStoryResults([])
      }
    }

    fetchData()
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
