import React, { useLayoutEffect } from 'react';
import { useRouter } from 'next/router';
import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Box,
  Heading,
} from '@chakra-ui/react';

export default function Admin() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  useLayoutEffect(() => {
    onOpen();
  }, [onOpen]);

  const onDialogClose = () => {
    onClose();
    router.push('/');
  };

  const Login = (
    <>
      <Modal isOpen={isOpen} onClose={onDialogClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter admin password</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input placeholder="Password" type="password" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" width="100%">
              SUBMIT
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );

  return (
    <Box>
      <Heading>あついね</Heading>
      {Login}
    </Box>
  );
}
