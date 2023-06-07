import { BackButton } from '@/components/BackButton';
import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import ContentService from '@/utils/content-service';
import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { IStories } from 'types/contentful';
import ReactMarkdown from 'react-markdown'

interface PageProps {
  story: IStories;
}

const Page: NextPage<PageProps> = props => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear())

    return `${day}-${month}-${year}`
  }

  const formattedText = props.story.fields.basisOpstelling?.replace(/__(.*?)__/g, "<strong>$1</strong>").replace(/\n/g, "<br>")

  return (
    <>
      <NextSeo title={props.story.fields.wedstrijd} description={props.story.fields.wedstrijd} />
      <Header textColor="black" fixed={false} />
      <BackButton mt={24} />
      <Heading as='h1' mt={4} mb={2} color='red'>{props.story.fields.wedstrijd + ' ' + props.story.fields.score}</Heading>
      <Box as='span'>
        <Text fontWeight='bold' fontSize='1.1rem'>{`${props.story.fields.competitie} | ${props.story.fields.ronde} | ${formatDate(props.story.fields.datum as string)} | ${props.story.fields.plaatsnaam}`}</Text>
      </Box>
      <Image src={props.story.fields?.thumbnail?.fields.file.url as string} alt={props.story.fields.thumbnail?.fields.title} mt={6} mb={14} h={600} w='full' objectFit='cover' />
      <Stack mb={6}>
        <Heading fontSize='1.5rem' mb={2}>Basis opstelling</Heading>
        <Box as='div' dangerouslySetInnerHTML={{ __html: formattedText as string }} />
      </Stack>
      <Stack>
        <Heading fontSize='1.5rem'>Wisselspelers</Heading>

      </Stack>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const collectie = await ContentService.instance.getEntriesByType<IStories>(
    'stories',
  );
  const story_id = ctx.query.story_id;

  const selectedStory = collectie.find(item => item.sys.id === story_id);

  return {
    props: {
      story: selectedStory,
    },
  };
};

export default Page;
