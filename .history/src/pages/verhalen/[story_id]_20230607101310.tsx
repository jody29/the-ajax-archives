import { AnimatedButton } from '@/components/AnimatedButton';
import { BackButton } from '@/components/BackButton';
import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import { Image } from '@/components/shared/Image';
import { Check } from '@/icons/components';
import ContentService from '@/utils/content-service';
import { Box, Button, Flex, Heading, Icon, Modal, ModalContent, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react';
import { GetServerSideProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ITicketAjaxAcMilan1995 } from 'types/contentful';

interface PageProps {
  collectorsItem: ITicketAjaxAcMilan1995;
}

const Page: NextPage<PageProps> = props => {
  const [copied, setCopied] = useState(false)

  const router = useRouter();
  const link = `localhost:3000${router.asPath}`

  const shareItems = [
    {
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(link)}`,
      src: 'facebook.png'
    },
    {
      url: `https://www.instagram.com/share?url=${encodeURIComponent(link)}&caption=${encodeURIComponent('Bekijk dit toffe item op The Ajax Archives!')}`,
      src: 'instagram.png'
    },
    {
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(link)}&text=${encodeURIComponent('Bekijk dit toffe item op The Ajax Archives!')}`,
      src: 'twitter.png'
    }
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 2000)
    })
  }

  const modalDisclosure = useDisclosure()

  return (
    <>
      <NextSeo title={props.collectorsItem.fields.naamItem} description={props.collectorsItem.fields.verhaalItem} />
      <Header textColor="black" fixed={false} />
      <BackButton mt={24} />
      
      <Footer />
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
    },
  };
};

export default Page;
