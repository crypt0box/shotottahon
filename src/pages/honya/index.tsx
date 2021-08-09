import React, { useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import { db } from 'src/lib/db';
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
import Books from 'src/components/Books';

type BookProps = {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  link: string;
  reward: string;
};

export const getStaticProps = async () => {
  let books: BookProps[] = [];
  const bookRef = await db.collection('books').where('reward', '==', '本屋大賞').get();
  bookRef.docs.map((doc) => {
    const data: BookProps = {
      id: doc.id,
      title: doc.data().title,
      author: doc.data().author,
      imageUrl: doc.data().imageUrl,
      link: doc.data().link,
      reward: doc.data().reward,
    };
    books = [data, ...books];
  });
  return {
    props: {
      books,
    },
  };
};

export default function Akutagawa({ books }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedBook, setSelectedBook] = useState<string>('');

  const onOpenDialog = (id: string | undefined) => {
    if (!id) return;
    setSelectedBook(id);
  };

  const onCloseDialog = () => {
    setSelectedBook('');
  };
  return (
    <>
      <Books>
        {books.map((book) => (
          <Box key={book.id} cursor="pointer">
            <Image
              boxSize="100%"
              boxShadow="-6px 6px 10px -2px rgb(0 27 68 / 25%), 0 0 3px rgb(0 21 60 / 10%)"
              objectFit="fill"
              src={book.imageUrl}
              alt={book.title}
              onClick={() => onOpenDialog(book.id)}
            />
            <AlertDialog
              isOpen={book.id === selectedBook}
              onClose={onCloseDialog}
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
                            src={book.imageUrl}
                            alt={book.title}
                          />
                        </Flex>
                        <Box my="5px">
                          <Icon as={AiFillBook} mr="15px" />
                          {book.title}
                        </Box>
                        <Box my="5px">
                          <Icon as={BsPersonFill} mr="15px" />
                          {book.author}
                        </Box>
                        <Box my="5px">
                          <Icon as={AiTwotoneTrophy} mr="15px" />
                          {book.reward}
                        </Box>
                        <Box mt="20px">
                          <Link href={book.link} isExternal _hover={{ textDecoration: 'none' }}>
                            <Button
                              leftIcon={<ExternalLinkIcon />}
                              w="100%"
                              color="white"
                              colorScheme="red"
                            >
                              楽天で詳細をみる
                            </Button>
                          </Link>
                        </Box>
                        <Box mt="10px" mb="20px">
                          <Button w="100%" onClick={onCloseDialog}>
                            閉じる
                          </Button>
                        </Box>
                      </Box>
                    </Flex>
                  </AlertDialogBody>
                </AlertDialogContent>
              </AlertDialogOverlay>
            </AlertDialog>
          </Box>
        ))}
      </Books>
    </>
  );
}
