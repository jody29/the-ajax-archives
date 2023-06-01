import { Header } from '@/components/features/layout/Header';
import { LowerHeader } from '@/components/LowerHeader';
import ContentService from '@/utils/content-service';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { IStoriesFields } from 'types/contentful';
import { MapContainer } from '@/components/Map'

interface PageProps {}

const Page: NextPage<PageProps> = props => {
  

  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <Header textColor="black" fixed={false} />
      <LowerHeader />
      <MapContainer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const verhalen = await ContentService.instance.getEntriesByType<IStoriesFields>('stories');

  return {
    props: {},
    revalidate: 60,
  };
};

export default Page;
