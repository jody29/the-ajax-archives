import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import { LowerHeader } from '@/components/LowerHeader';
import { PreviewCard } from '@/components/PreviewCard';
import ContentService from '@/utils/content-service';
import { Flex } from '@chakra-ui/react';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { useEffect, useState } from 'react';
import { ITicketAjaxAcMilan1995, ITicketAjaxAcMilan1995Fields } from 'types/contentful';

interface PageProps {
  items: ITicketAjaxAcMilan1995[];
}

const Page: NextPage<PageProps> = props => {
  const [searchTags, setSearchTags] = useState<string[] | []>([])
  const [amount, setAmount] = useState<number>(props.items.length)

  useEffect(() => {
    console.log(searchTags)
  }, [searchTags])

  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <Header textColor="black" fixed={true} />
      <LowerHeader amount={amount} setSearchTags={setSearchTags} searchTags={searchTags} isCollection />
      <Flex flexWrap="wrap" gap={6} mb={10}>
        {props.items.map(item => (
          <PreviewCard key={item.fields.naamItem} item={item} />
        ))}
      </Flex>
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const collectie = await ContentService.instance.getEntriesByType<ITicketAjaxAcMilan1995Fields>(
    'ticketAjaxAcMilan1995',
  );

  const sortedCollectie = collectie.sort((a, b) =>
    a.fields.naamItem > b.fields.naamItem ? 1 : -1,
  );

  return {
    props: {
      items: sortedCollectie,
    },
    revalidate: 60,
  };
};

export default Page;
