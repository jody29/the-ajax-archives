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

  return (
    <>
      <NextSeo title={props.story.fields.wedstrijd} description={props.story.fields.wedstrijd} />
      <Header textColor="black" fixed={false} />
      <BackButton mt={24} />
      <Heading>{props.story.fields.wedstrijd + ' ' + props.story.fields.score}</Heading>
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
