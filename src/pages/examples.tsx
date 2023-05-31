import {
  Alert,
  AlertDescription,
  AlertIcon,
  chakra,
  Heading,
  Link,
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { NextSeo } from 'next-seo';

const Page: NextPage = () => {
  return (
    <>
      <NextSeo title="Examples" description="Examples of the components in this setup" />

      <Alert status="warning" mb="8">
        <AlertIcon />
        <AlertDescription>
          <strong>Make sure to check Storybook</strong>. A lot of custom components that where by
          default included in this setup, have been deleted. Components that can not be found here
          anymore can be implemented with{' '}
          <Link href="https://chakra-ui.com/docs" target="_blank">
            Chakra UI components
          </Link>
          .
        </AlertDescription>
      </Alert>

      <Heading size="lg">Links to Chakra alternatives for deleted components</Heading>
      <UnorderedList fontSize="xl" mt="8" mb="12">
        <ListItem>
          <Link href="https://chakra-ui.com/docs/feedback/alert" target="_blank">
            Alert
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://chakra-ui.com/docs/disclosure/accordion" target="_blank">
            Collapse
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://chakra-ui.com/docs/data-display/divider" target="_blank">
            Divider
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://chakra-ui.com/docs/navigation/link" target="_blank">
            Hyperlink (The NextJS link wrapper Navlink is still included)
          </Link>
        </ListItem>
        <ListItem>
          Icon button (can be used via{' '}
          <chakra.pre display="inline">{'<Button variant="icon">'}</chakra.pre>)
        </ListItem>
        <ListItem>
          <Link href="https://chakra-ui.com/docs/feedback/spinner" target="_blank">
            Loader
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://chakra-ui.com/docs/overlay/menu" target="_blank">
            Menu
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://chakra-ui.com/docs/feedback/skeleton" target="_blank">
            Skeleton
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://chakra-ui.com/docs/form/switch" target="_blank">
            Switch
          </Link>
        </ListItem>
        <ListItem>
          <Link href="https://chakra-ui.com/docs/overlay/tooltip" target="_blank">
            Tooltip
          </Link>
        </ListItem>
      </UnorderedList>

      <Heading size="lg">Components that are still custom and in Storybook are:</Heading>
      <UnorderedList fontSize="xl" mt="8">
        <ListItem>Form usage examples</ListItem>
        <ListItem>Form elements (will probably be removed soon)</ListItem>
        <ListItem>Grid</ListItem>
        <ListItem>Image</ListItem>
        <ListItem>Modal (replaced with a small wrapper around the Chakra Modal)</ListItem>
        <ListItem>NavLink</ListItem>
        <ListItem>Pagination</ListItem>
        <ListItem>NoSsr</ListItem>
      </UnorderedList>
    </>
  );
};

export default Page;
