import { AnimatedButton } from '@/components/AnimatedButton';
import { BackButton } from '@/components/BackButton';
import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import { Image } from '@/components/shared/Image';
import ContentService from '@/utils/content-service';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { ITicketAjaxAcMilan1995 } from 'types/contentful';

interface PageProps {
  collectorsItem: ITicketAjaxAcMilan1995;
}

const Page: NextPage<PageProps> = props => {
  return (
    <>
      <NextSeo title={props.collectorsItem.fields.naamItem} description={props.collectorsItem.fields.verhaalItem} />
      <Header textColor="black" fixed={false} />
      <BackButton mt={24} />
      <Flex mt={4} mb={24} justifyContent='space-between' gap={16}>
        <Image alt={props.collectorsItem.fields.naamItem} src={props.collectorsItem.fields.afbeelding.fields.file.url} />
        <Flex flexDir='column'>
          <Heading color='red' mb={2}>{props.collectorsItem.fields.naamItem}</Heading>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{props.collectorsItem.fields.beschrijving}</span>
          <Text mt={4} mb={8} color='#888888'>{props.collectorsItem.fields.verhaalItem}</Text>
          <Box mt='auto'>
            <AnimatedButton link=''>Bekijk verhaal</AnimatedButton>
          </Box>
          <Box mt={6}>
            <Text>deel item</Text>
          </Box>
        </Flex>
      </Flex>
      <Footer />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ctx => {
  const collectie = await ContentService.instance.getEntriesByType<ITicketAjaxAcMilan1995>(
    'ticketAjaxAcMilan1995',
  );
  const item_id = ctx.query.item_id;

  const selectedItem = collectie.find(item => item.sys.id === item_id);

  return {
    props: {
      collectorsItem: selectedItem,
    }, // will be passed to the page component as props
  };
};

export default Page;
