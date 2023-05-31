import { Box, Button, useDisclosure } from '@chakra-ui/react';

import { Modal } from './Modal';

export default {
  title: 'Molecules/Modal',
  component: Modal,
};

export const Example = () => {
  const modalDisclose = useDisclosure();
  return (
    <>
      <Button variant="secondary" onClick={modalDisclose.onOpen}>
        Open modal
      </Button>
      <Modal {...modalDisclose}>
        <Box p={50}>Content of modal</Box>
      </Modal>
    </>
  );
};
