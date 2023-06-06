import { Header } from '@/components/features/layout/Header';
import ContentService from '@/utils/content-service';
import { Heading, Image } from '@chakra-ui/react';
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
      <Heading mt={20}>{props.collectorsItem.fields.naamItem}</Heading>
      <Image
        src={props.collectorsItem.fields.afbeelding.fields.file.url}
        alt={props.collectorsItem.fields.afbeelding.fields.title}
        h={550}
        w='40%'
        objectFit='cover'
      />
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
