import { Header } from '@/components/features/layout/Header';
import { LowerHeader } from '@/components/LowerHeader';
import { MapContainer } from '@/components/Map';
import ContentService from '@/utils/content-service';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { IStories } from 'types/contentful';

interface PageProps {
  stories: IStories[];
}

const Page: NextPage<PageProps> = props => {
  

  return (
    <>
      <NextSeo title="Page title" description="Page description" />
      <Header textColor="black" fixed={false} />
      <LowerHeader />
      <MapContainer verhalen={props.stories} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async context => {
  const verhalen = await ContentService.instance.getEntriesByType<IStories>('stories');

  return {
    props: {
      stories: verhalen
    },
    revalidate: 60,
  };
};

export default Page;
