import {
  Box,
  Flex,
  Image,
  Icon,
  Button,
  Link,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { AiFillBook, AiTwotoneTrophy } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';

type BookProps = {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  link: string;
  reward: string;
};

type ModalProps = {
  isOpenDialog: boolean;
  onCloseDialog: () => void;
  book: BookProps;
}

export const BookDetailModal = (props: ModalProps) => (
  <AlertDialog
    isOpen={props.isOpenDialog}
    onClose={props.onCloseDialog}
    leastDestructiveRef={undefined}
    autoFocus={false}
    isCentered
  >
    <AlertDialogOverlay>
      <AlertDialogContent>
        <AlertDialogBody>
          <Flex justifyContent="center">
            <Box>
              <Flex justifyContent="center">
                <Image
                  maxW="180px"
                  maxH="256px"
                  mt="40px"
                  mb="20px"
                  boxShadow="-6px 6px 10px -2px rgb(0 27 68 / 25%), 0 0 3px rgb(0 21 60 / 10%)"
                  boxSize="100%"
                  objectFit="fill"
                  src={props.book.imageUrl}
                  alt={props.book.title}
                />
              </Flex>
              <Box my="5px">
                <Icon as={AiFillBook} mr="15px" />
                {props.book.title}
              </Box>
              <Box my="5px">
                <Icon as={BsPersonFill} mr="15px" />
                {props.book.author}
              </Box>
              <Box my="5px">
                <Icon as={AiTwotoneTrophy} mr="15px" />
                {props.book.reward}
              </Box>
              <Box mt="20px">
                <Link href={props.book.link} isExternal _hover={{ textDecoration: 'none' }}>
                  <Button leftIcon={<ExternalLinkIcon />} w="100%" color="white" colorScheme="red">
                    楽天で詳細をみる
                  </Button>
                </Link>
              </Box>
              <Box mt="10px" mb="20px">
                <Button w="100%" onClick={props.onCloseDialog}>
                  閉じる
                </Button>
              </Box>
            </Box>
          </Flex>
        </AlertDialogBody>
      </AlertDialogContent>
    </AlertDialogOverlay>
  </AlertDialog>
);

export default BookDetailModal;
