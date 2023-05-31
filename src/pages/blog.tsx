import { Box, Heading, Link } from '@chakra-ui/react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

import { NavLink } from '@/components/shared/Link';

interface PageProps {}

export interface BlogPost {
  id: number;
  title: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Example blog post',
    content: 'Awesome content',
  },
  {
    id: 2,
    title: 'Another example blog post',
    content: 'More awesome content',
  },
];

const Page: NextPage<PageProps> = () => {
  return (
    <>
      <NextSeo title="Blog" description="An overview of our blog posts" />
      <Box>
        <Heading as="h1">Blogs</Heading>
        <ul>
          {blogPosts.map(item => {
            return (
              <li key={item.id}>
                <NavLink href="/blog/[postId]" as={`/blog/${item.id}`}>
                  <Link>{item.title}</Link>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </Box>
    </>
  );
};

export default Page;
