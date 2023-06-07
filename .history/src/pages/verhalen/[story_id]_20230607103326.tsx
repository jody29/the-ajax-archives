import { AnimatedButton } from '@/components/AnimatedButton';
import { BackButton } from '@/components/BackButton';
import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import { Image } from '@/components/shared/Image';
import { Check } from '@/icons/components';
import ContentService from '@/utils/content-service';
import { Box, Button, Flex, Heading, Icon, Modal, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IStories, ITicketAjaxAcMilan1995 } from 'types/contentful';

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

  return (
    <>
      <NextSeo title={props.story.fields.wedstrijd} description={props.story.fields.wedstrijd} />
      <Header textColor="black" fixed={false} />
      <BackButton mt={24} />
      <Heading as='h1' mt={4} color='red'>{props.story.fields.wedstrijd + ' ' + props.story.fields.score}</Heading>
      <Box as='span'>
        <Text fontWeight='bold'>{`${props.story.fields.competitie} | ${props.story.fields.ronde} | ${formatDate(props.story.fields.datum as string)} | ${props.story.fields.plaatsnaam}`}</Text>
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
