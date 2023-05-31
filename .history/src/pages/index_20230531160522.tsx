import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import { HeroSection } from '@/components/HeroSection';
import { HighlightedSection } from '@/components/HighlightedSection';
import { PreviewCard } from '@/components/PreviewCard';
import ContentService from '@/utils/content-service';
import { Flex } from '@chakra-ui/react';
import { Asset } from 'contentful';
import { GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import { IHomePageFields, IStories, ITicketAjaxAcMilan1995 } from 'types/contentful';

interface PageProps {
  afbeeldingen: Asset[];
  verhalen: IStories[];
  items: ITicketAjaxAcMilan1995[]
}

const Page: NextPage<PageProps> = ({ afbeeldingen, verhalen, items }) => {
  return (
    <>
      <NextSeo title="Homepage" description="This is the homepage" />
      <Header textColor='white' fixed={false} />
      <HeroSection images={afbeeldingen} />
      <HighlightedSection hasBg={true} title='Historische hoogtepunten' subtitle='Uitgelichte verhalen beleefd door een supporter' button='Bekijk alle verhalen' buttonLink='verhalen'>
        <Flex justifyContent='space-between' gap={6} mb={12}>
          {verhalen.map(verhaal => (
            <PreviewCard key={verhaal.fields.wedstrijd} verhaal={verhaal} isStory />
          ))}
        </Flex>
      </HighlightedSection>
      <HighlightedSection hasBg={false} title='Schatten uit het Ajax-verleden' subtitle='Uitgelichte verzamel objecten uit het archief' button='Bekijk alle objecten' buttonLink='collectie'>
        <Flex flexWrap='wrap' justifyContent='space-between' gap={6} mb={12}>
          {items.map(item => (
            <PreviewCard key={item.fields.naamItem} item={item} />
          ))}
        </Flex>
      </HighlightedSection>
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
