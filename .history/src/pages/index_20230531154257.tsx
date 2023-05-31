import ContentService from '@/utils/content-service';
import { Asset } from 'contentful';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { IHomePage, IHomePageFields, IStories, ITicketAjaxAcMilan1995 } from 'types/contentful';

interface PageProps {
  afbeeldingen: Asset[];
  verhalen: IStories[];
  items: ITicketAjaxAcMilan1995[]
}

const Page: NextPage<PageProps> = ({ afbeeldingen }) => {
  console.log(afbeeldingen)

  return (
    <>
      <NextSeo title="Homepage" description="This is the homepage" />
    </>
  );
};

export const getStaticProps: GetStaticProps = async ctx => {
  const homePage = await ContentService.instance.getEntriesByType<IHomePageFields>('homePage');

  const homePageFields = homePage[0].fields as IHomePageFields

  console.log(homePageFields.afbeeldingenHero)

  return {
    props: {
      afbeeldingen: homePageFields.afbeeldingenHero,
      verhalen: homePageFields.uitgelichteVerhalen,
      items: homePageFields.uitgelichteItems
    }
  }
}

export default Page;
