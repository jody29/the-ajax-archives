import { BackButton } from '@/components/BackButton';
import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import ContentService from '@/utils/content-service';
import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { BLOCKS, MARKS, Node } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { IStories } from 'types/contentful';
import ReactMarkdown from 'react-markdown'
import { ReactNode } from 'react';
import { Prose } from '@nikolovlazar/chakra-ui-prose'
import { Asset } from 'contentful';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

interface PageProps {
  story: IStories;
}

interface EmbeddeAssetProps {
    data: {
        target: {
            fields: {
                title: string,
                description: string,
                file: {
                    url: string
                }
            }
        }
    }
}

console.log(Node)

const options = {
    renderMark: {
        [MARKS.BOLD]: (text: string) => <strong>{text}</strong>
    },
    renderNode: {
        [BLOCKS.PARAGRAPH]: (node: Node, children: ReactNode) => <Text fontSize='1.1rem' mb={4}>{children}</Text>,
        [BLOCKS.HEADING_2]: (node: Node, children: ReactNode) => <Heading fontWeight='bold' mb={4} w='50%' fontSize='2.3rem'>{children}</Heading>,
        [BLOCKS.QUOTE]: (node: Node, children: ReactNode) => <Prose><blockquote>{children}</blockquote></Prose>,
        [BLOCKS.EMBEDDED_ASSET]: (node: EmbeddeAssetProps) => <Image mb={4} w='full' src={node.data.target.fields.file.url} alt={node.data.target.fields.title} />
    }
}

const Page: NextPage<PageProps> = props => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = String(date.getFullYear())

    return `${day}-${month}-${year}`
  }

  const formatText = (text: string) => {
    return text.replace(/__(.*?)__/g, "<strong>$1</strong>").replace(/\n/g, "<br>")
  }

  console.log(props.story.fields.verhaal?.content[4].data.target.fields)

  const renderedStory = documentToReactComponents(props.story.fields.verhaal, options)

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
      <Box mb={20}>
        {renderedStory}
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
