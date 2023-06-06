import { AnimatedButton } from '@/components/AnimatedButton';
import { Header } from '@/components/features/layout/Header';
import ContentService from '@/utils/content-service';
import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { ITicketAjaxAcMilan1995 } from 'types/contentful';

interface PageProps {
  collectorsItem: ITicketAjaxAcMilan1995;
}

const Page: NextPage<PageProps> = props => {
  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <Header textColor="black" fixed={false} />
      <Flex mt={24} justifyContent='space-between' gap={16}>
        <Image
          src={props.collectorsItem.fields.afbeelding.fields.file.url}
          alt={props.collectorsItem.fields.afbeelding.fields.title}
          loading="lazy"
          h={550}
          w='50%'
          objectFit='cover'
        />
        <Flex flexDir='column'>
          <Heading color='red' mb={2}>{props.collectorsItem.fields.naamItem}</Heading>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{props.collectorsItem.fields.beschrijving}</span>
          <Text mt={6} mb={8} color='#888888'>{props.collectorsItem.fields.verhaalItem}</Text>
          <Box mt='auto'>
            <AnimatedButton link=''>Bekijk verhaal</AnimatedButton>
          </Box>
          <Box mt={6}>
            <Text>deel item</Text>
          </Box>
        </Flex>
      </Flex>
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
