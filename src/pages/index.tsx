import React, { useState, useEffect } from 'react';
import { InferGetStaticPropsType } from 'next';
import {
  Box,
  Flex,
  Image,
  Button,
  Icon,
  Link,
  useMediaQuery,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
} from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import { AiFillBook, AiTwotoneTrophy } from 'react-icons/ai';
import { BsPersonFill } from 'react-icons/bs';
import { db } from 'src/lib/db';
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace';
import About from 'src/components/About';
import Books from 'src/components/Books';

type BookProps = {
  id?: string;
  title?: string;
  author?: string;
  imageUrl?: string;
  link?: string;
  reward?: string;
};

const shuffle = ([...array]) => {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export const getStaticProps = async () => {
  let books: BookProps[] = [];
  const bookRef = await db.collection('books').get();
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

export default function HomePage({ books }: InferGetStaticPropsType<typeof getStaticProps>) {
  const [selectedBook, setSelectedBook] = useState<string>('');
  const [bookList, setBookList] = useState<BookProps[]>(books);

  const [isBase, isSm, isMd, isLg] = useMediaQuery([
    '(min-width: 0px)',
    '(min-width: 430px)',
    '(min-width: 768px)',
    '(min-width: 960px)',
  ]);

  const onOpenDialog = (id: string | undefined) => {
    if (!id) return;
    setSelectedBook(id);
  };

  const onCloseDialog = () => {
    setSelectedBook('');
  };

  const RenderBooks = (books: BookProps[], start: number, end?: number): ReactJSXElement[] => {
    const booksJsx: ReactJSXElement[] = [];
    for (let i = start; i < books.length; i++) {
      booksJsx.push(
        <Box key={books[i].id} cursor="pointer">
          <Image
            boxSize="100%"
            boxShadow="-6px 6px 10px -2px rgb(0 27 68 / 25%), 0 0 3px rgb(0 21 60 / 10%)"
            objectFit="fill"
            src={books[i].imageUrl}
            alt={books[i].title}
            onClick={() => onOpenDialog(books[i].id)}
          />
          <AlertDialog
            isOpen={books[i].id === selectedBook}
            onClose={onCloseDialog}
            leastDestructiveRef={undefined}
          >
            <AlertDialogOverlay>
              <AlertDialogContent mt="20px">
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
                          src={books[i].imageUrl}
                          alt={books[i].title}
                        />
                      </Flex>
                      <Box my="5px">
                        <Icon as={AiFillBook} mr="15px" />
                        {books[i].title}
                      </Box>
                      <Box my="5px">
                        <Icon as={BsPersonFill} mr="15px" />
                        {books[i].author}
                      </Box>
                      <Box my="5px">
                        <Icon as={AiTwotoneTrophy} mr="15px" />
                        {books[i].reward}
                      </Box>
                      <Box mt="20px">
                        <Link href={books[i].link} isExternal _hover={{ textDecoration: 'none' }}>
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
      );
      if (i === end) break;
    }
    return booksJsx;
  };

  const about: string[] = [
    'shotottahonは何かしらの賞を獲ったことがある本をひたすら並べたサイトです',
    'あなたが手に取ったその本はこの世界の誰かが強く評価した本です',
    '読書をしたいけど何を読めばいいかわからない\nそんな人の読書への入り口になれば幸いです',
  ];

  const RenderContents = (cnt: number) => {
    const contentsJsx: ReactJSXElement[] = [];
    for (let i = 0; i < about.length; i++) {
      const prevCount = i * (cnt + 1);
      contentsJsx.push(
        <Box key={i}>
          <Books>{RenderBooks(bookList, prevCount, prevCount + cnt)}</Books>
          <About>{about[i]}</About>
        </Box>
      );
    }
    contentsJsx.push(<Books>{RenderBooks(bookList, (cnt + 1) * about.length)}</Books>);
    return contentsJsx;
  };

  useEffect(() => {
    const shuffledBooks: BookProps[] = shuffle(bookList);
    setBookList(shuffledBooks);
  }, []);

  return (
    <>
      {isLg
        ? RenderContents(9)
        : isMd
        ? RenderContents(7)
        : isSm
        ? RenderContents(5)
        : isBase
        ? RenderContents(3)
        : null}
    </>
  );
}
