import React, { ReactNode } from 'react';
import {
  Heading,
  Flex,
  Box,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Spacer,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';

type Props = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: ReactNode;
};

export function Layout({ children, ...props }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const RenderDrawer = (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Basic Drawer</DrawerHeader>
        <DrawerBody>
          <p>Some contents...</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Flex bg="gray.100" w="100vw">
      <Flex
        as="header"
        position="fixed"
        top={0}
        width="full"
        shadow="sm"
        py={4}
        px={8}
      >
        <Box>
          <IconButton
            aria-label="back"
            color="black"
            rounded="full"
            icon={<ChevronLeftIcon />}
            onClick={onOpen}
          />
        </Box>
        {RenderDrawer}
        <Spacer />
        <Flex alignItems="center">
          <Heading>Shotottahon</Heading>
        </Flex>
        <Spacer />
      </Flex>
      <Box width="100%" mt={'6rem'} {...props}>
        {children}
      </Box>
    </Flex>
  );
}
