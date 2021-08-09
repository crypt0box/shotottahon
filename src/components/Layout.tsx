import React, { ReactNode } from 'react';
import { useRouter } from 'next/router';
import {
  Heading,
  Flex,
  Box,
  HStack,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Spacer,
  Divider,
  Link,
} from '@chakra-ui/react';
import { ChevronLeftIcon } from '@chakra-ui/icons';
import { AiOutlineBook, AiOutlineHome } from 'react-icons/ai';
import { BiPen, BiShoppingBag } from 'react-icons/bi';
import DrawerLink from './DrawerLink';

type Props = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: ReactNode;
};

export function Layout({ children, ...props }: Props) {
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const RenderDrawer = (
    <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">
          <HStack>
            <Box fontSize="28px">Shotottahon</Box>
            <AiOutlineBook size="28px" />
          </HStack>
        </DrawerHeader>
        <DrawerBody p={0} autoFocus={false}>
          <DrawerLink href="/">
            <Flex ml="15px">
              <Box
                as={AiOutlineHome}
                size="24px"
                color={router.pathname === '/' ? 'red.300' : undefined}
              />
              <Box ml="20px" fontSize="18px">
                ホーム
              </Box>
            </Flex>
          </DrawerLink>
          <DrawerLink href="/akutagawa">
            <Flex ml="15px">
              <Box
                as={BiPen}
                size="24px"
                color={router.pathname === '/akutagawa' ? 'red.300' : undefined}
              />
              <Box ml="20px" fontSize="18px">
                芥川賞
              </Box>
            </Flex>
          </DrawerLink>
          <DrawerLink href="/honya">
            <Flex ml="15px">
              <Box
                as={BiShoppingBag}
                size="24px"
                color={router.pathname === '/honya' ? 'red.300' : undefined}
              />
              <Box ml="20px" fontSize="18px">
                本屋大賞
              </Box>
            </Flex>
          </DrawerLink>
          <Divider orientation="horizontal" />
          <Box p="25px">
            <Link href="https://twitter.com/cryptooooon" color="blue" isExternal>
              @Twitter
            </Link>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );

  return (
    <Flex bg="gray.100" w="100vw">
      <Flex as="header" position="fixed" top={0} width="full" shadow="sm" py={4} px={8} zIndex="999">
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
      </Flex>
      <Flex justifyContent="center" position="fixed" top={0} width="full" py={4}>
        <Heading>Shotottahon</Heading>
      </Flex>
      <Box width="100%" mt={'6rem'} {...props}>
        {children}
      </Box>
    </Flex>
  );
}
