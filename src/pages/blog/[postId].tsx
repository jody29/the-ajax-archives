import { ParsedUrlQuery } from 'querystring';

import { Box, Text, Heading, Link } from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { NavLink } from '@/components/shared/Link';

import { BlogPost, blogPosts } from '../blog';

interface PageProps {
  post: BlogPost;
}

interface PageParams extends ParsedUrlQuery {
  postId: string;
}

const Page: NextPage<PageProps> = ({ post }) => (
  <>
    <NextSeo title={post.title} description={post.content} />
    <Box>
      <Heading as="h1" color="primary">
        {post.title}
      </Heading>
      <Text as="p">{post.content}</Text>

      <NavLink href="/blog">
        <Link>Go back</Link>
      </NavLink>
    </Box>
  </>
);

export const getStaticProps: GetStaticProps<PageProps, PageParams> = async ctx => {
  const post = blogPosts.find(item => item.id === Number(ctx.params?.postId));

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: { post },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: blogPosts.map(item => ({ params: { postId: String(item.id) } })),
    fallback: false,
  };
};

export default Page;
