import { BackButton } from '@/components/BackButton';
import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import ContentService from '@/utils/content-service';
import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { IStories } from 'types/contentful';
import ReactMarkdown from 'react-markdown'
import { ReactNode } from 'react';
import { Asset } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

interface PageProps {
  story: IStories;
}

interface EmbeddeAssetProps {
    content: {
        fields: {
            title: string,
            description: string,
            file: {
                url: string
            }
        }
    }
}

// const options = {
//     renderNode: {
//         [BLOCKS.EMBEDDED_ASSET]: (node: EmbeddeAssetProps) => {
//             const { title, file } = node.content.fields
//             const imageUrl = file.url
//             const imageAlt = title

//             return <img src={imageUrl} alt={imageAlt} />
//         }
//     }
// }

const Page: NextPage<PageProps> = props => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear())

    return `${day}-${month}-${year}`
  }

  console.log(props.story.fields.verhaal?.content[4].data)

  const formatText = (text: string) => {
    return text.replace(/__(.*?)__/g, "<strong>$1</strong>").replace(/\n/g, "<br>")
  }

//   const renderedStory = documentToReactComponents(props.story.fields.verhaal?.content, options)

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
      <Stack mb={8} gap={2}>
        <Heading fontSize='1.5rem'>Basis opstelling</Heading>
        <Box as='div' dangerouslySetInnerHTML={{ __html: formatText(props.story.fields.basisOpstelling as string) }} />
      </Stack>
      <Stack mb={8} gap={2}>
        <Heading fontSize='1.5rem'>Wisselspelers</Heading>
        <Box as='div' dangerouslySetInnerHTML={{ __html: formatText(props.story.fields.wisselSpelers as string) }} />
      </Stack>
      <Stack mb={8} gap={2}>
        <Heading fontSize='1.5rem'>Coach</Heading>
        <Text fontSize='1.1rem'>{props.story.fields.coach}</Text>
      </Stack>
      <Box>
        {props.story.fields.verhaal?.content.map(content => (
            <Text>{JSON.stringify(content)}</Text>
        ))}
      </Box>
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
