import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import { LowerHeader } from '@/components/LowerHeader';
import { PreviewCard } from '@/components/PreviewCard';
import { env } from '@/env/client.mjs';
import ContentService from '@/utils/content-service';
import { Flex } from '@chakra-ui/react';
import axios from 'axios';
import { TagLink } from 'contentful';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { type } from 'os';
import { useEffect, useRef, useState } from 'react';
import { ITicketAjaxAcMilan1995, ITicketAjaxAcMilan1995Fields } from 'types/contentful';

interface PageProps {
  items: ITicketAjaxAcMilan1995[];
}

const Page: NextPage<PageProps> = props => {
  const [searchTags, setSearchTags] = useState<string[] | []>([])
  const [preFilteredData, setPreFilteredData] = useState<ITicketAjaxAcMilan1995[]>(props.items)
  const [amount, setAmount] = useState<number>(props.items.length)
  const isInitialRender = useRef(true)

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return;
    }

    const query = searchTags.join(',')

    axios
      .get(`https://cdn.contentful.com/spaces/${env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/entries?content_type=ticketAjaxAcMilan1995&metadata.tags.sys.id[all]=${query}`, {
        headers: {
          'Authorization': `Bearer ${env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        const fetchedEntries = res.data.items
        if (searchTags.length < 1) setAmount(fetchedEntries.length)
        
      })
  }, [searchTags])

  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <Header textColor="black" fixed={true} />
      <LowerHeader amount={amount} setSearchTags={setSearchTags} setPreFilteredData={setPreFilteredData} searchTags={searchTags} isCollection />
      <Flex flexWrap="wrap" gap={6} mb={10}>
        {preFilteredData.map(item => (
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
