import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import { HeroSection } from '@/components/HeroSection';
import ContentService from '@/utils/content-service';
import { Asset } from 'contentful';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { IHomePageFields, IStories, ITicketAjaxAcMilan1995 } from 'types/contentful';

interface PageProps {
  afbeeldingen: Asset[];
  verhalen: IStories[];
  items: ITicketAjaxAcMilan1995[]
}

const Page: NextPage<PageProps> = ({ afbeeldingen }) => {
  return (
    <>
      <NextSeo title="Homepage" description="This is the homepage" />
      <Header textColor='white' fixed={false} />
      <HeroSection images={afbeeldingen} />
      <Footer />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ctx => {
  const homePage = await ContentService.instance.getEntriesByType<IHomePageFields>('homePage');

  const homePageFields = homePage[0].fields

  return {
    props: {
      afbeeldingen: homePageFields.afbeeldingenHero,
      verhalen: homePageFields.uitgelichteVerhalen,
      items: homePageFields.uitgelichteItems
    }
  }
}

export default Page;
