import { Header } from '@/components/features/layout/Header';
import ContentService from '@/utils/content-service';
import { Box, Flex, Heading, Image } from '@chakra-ui/react';
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
      <Flex mt={20} justifyContent='space-between' gap={4}>
      <Image
        src={props.collectorsItem.fields.afbeelding.fields.file.url}
        alt={props.collectorsItem.fields.afbeelding.fields.title}
        loading="lazy"
        h={550}
        w='50%'
        objectFit='cover'
      />
      <Box>
        <Heading>{props.collectorsItem.fields.naamItem}</Heading>
      </Box>
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
