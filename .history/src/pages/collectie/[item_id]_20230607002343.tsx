import { AnimatedButton } from '@/components/AnimatedButton';
import { BackButton } from '@/components/BackButton';
import { Footer } from '@/components/features/layout/Footer';
import { Header } from '@/components/features/layout/Header';
import { Image } from '@/components/shared/Image';
import ContentService from '@/utils/content-service';
import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react';
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

  return (
    <>
      <NextSeo title={props.collectorsItem.fields.naamItem} description={props.collectorsItem.fields.verhaalItem} />
      <Header textColor="black" fixed={false} />
      <BackButton mt={24} />
      <Flex mt={4} mb={24} justifyContent='space-between' gap={16}>
        <Image 
          alt={props.collectorsItem.fields.naamItem} 
          src={props.collectorsItem.fields.afbeelding.fields.file.url}
          lazyload={true}
          h={550}
          w='50%'
          objectFit='cover' />
        <Flex flexDir='column' w='50%'>
          <Heading color='red' mb={2}>{props.collectorsItem.fields.naamItem}</Heading>
          <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{props.collectorsItem.fields.beschrijving}</span>
          <Text mt={4} mb={8} color='#888888'>{props.collectorsItem.fields.verhaalItem}</Text>
          <Box mt='auto'>
            <AnimatedButton link=''>Bekijk verhaal</AnimatedButton>
          </Box>
          <Box mt={6}>
            <Text mb={2}>deel item</Text>
            <Flex gap={2}>
              {shareItems.map(item => (
                <Link href={item.url} passHref>
                  <Box as='a' target='_blank'>
                    <Image src={`/Images/share/${item.src}`} alt={`share button for ${item.src.replace('.png', '')}`} />
                  </Box>
                </Link>
              ))}
              <Button variant='secondary' p={0} onClick={copyToClipboard}>
                <Image src='/Images/share/copy.png' alt='share button for copy to clipboard' />
              </Button>
              {copied && (
                <Box position='absolute' p={4} color='white' borderRadius='10px' bottom={10} left='50%' bg='gray' transform='translateX(-50%)'>
                  <Text>Gekopieërd naar klembord!</Text>
                </Box>
              )}
              
            </Flex>
          </Box>
        </Flex>
      </Flex>
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
    }, // will be passed to the page component as props
  };
};

export default Page;
