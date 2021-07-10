import React, {useState} from 'react';
import {
  Flex,
  Box,
  IconButton,
  Spacer,
  Button,
  Heading,
  Skeleton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter
} from '@chakra-ui/react';
import { ChevronLeftIcon, EditIcon, ViewIcon, AttachmentIcon, AddIcon } from '@chakra-ui/icons';

export default function Zenn() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const onOpenDialog = () => {
    setIsDialogOpen(true);
  }

  const onCloseDialog = () => {
    setIsDialogOpen(false);
  }

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

  const Dialog = (
    <AlertDialog isOpen={isDialogOpen} onClose={onCloseDialog} leastDestructiveRef={undefined}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader>こんにちは</AlertDialogHeader>
          <AlertDialogBody>ぴえん</AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={onCloseDialog}>閉じる</Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )

  return (
    <Flex bg="gray.100" w="100vw" h="100vh">
      <Flex as="header" position="fixed" top={0} width="full" shadow="sm" py={4} px={8}>
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
        <Box>
          <Button disabled colorScheme="blue">
            保存済み
          </Button>
        </Box>
      </Flex>
      <Box mt={'6rem'} mx="auto">
        <Heading as="h1" size="lg" fontWeight="bold">
          chakra-ui を使ってみる (+create-react-app)
        </Heading>
        <Flex mt={8}>
          <Box w={'50rem'} bg="white" rounded="md" p={4} shadow="lg">
            <ParagraphSkeleton />
            <ParagraphSkeleton />
            <ParagraphSkeleton />
            <ParagraphSkeleton />
            <ParagraphSkeleton />
            <ParagraphSkeleton />
            <ParagraphSkeleton />
            <ParagraphSkeleton />
            <ParagraphSkeleton />
          </Box>
          <Box ml={6}>
            <Box bg="white" rounded="full" p={1} shadow="lg">
              <IconButton
                aria-label="edit"
                bg="gray.300"
                color="white"
                rounded="full"
                mr={1}
                icon={<EditIcon />}
              />
              <IconButton
                aria-label="view"
                bg="white"
                color="gray.400"
                rounded="full"
                icon={<ViewIcon />}
              />
            </Box>
            <Box mt={3}>
              <IconButton
                aria-label="view"
                shadow="lg"
                bg="white"
                color="gray.400"
                rounded="full"
                icon={<AttachmentIcon />}
              />
            </Box>
            <Box mt={3}>
              <IconButton
                aria-label="view"
                shadow="lg"
                bg="white"
                color="gray.400"
                rounded="full"
                icon={<AddIcon />}
                onClick={onOpenDialog}
              />
              { Dialog }
            </Box>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );
}

const ParagraphSkeleton = () => <Skeleton mb={4} h={'1rem'}></Skeleton>;
