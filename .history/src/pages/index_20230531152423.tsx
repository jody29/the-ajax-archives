import ContentService from '@/utils/content-service';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { IHomePageFields } from 'types/contentful';

interface PageProps {}

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Homepage" description="This is the homepage" />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ctx => {
  const homePage = await ContentService.instance.getEntriesByType<IHomePageFields>('homePage');

  const homePageData = homePage.length > 0 ? homePage[0].fields : {};

  console.log(homePageData.afbeeldingenHero)

  return {
    props: {
      
    }
  }
}

export default Page;
