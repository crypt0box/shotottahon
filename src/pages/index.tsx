import { InferGetStaticPropsType } from 'next';
import {
  Box,
  Image,
  Button,
  useMediaQuery,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import React, { useState } from 'react';
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
        <Box key={books[i].id}>
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
              <AlertDialogContent>
                <AlertDialogBody>{books[i].title}</AlertDialogBody>
                <AlertDialogFooter>
                  <Button onClick={onCloseDialog}>閉じる</Button>
                </AlertDialogFooter>
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
    '読書をしたいけど何を読めばいいかわからない\nそんな人の為に作りました',
  ];

  const RenderContents = (cnt: number) => {
    const contentsJsx: ReactJSXElement[] = [];
    for (let i = 0; i < about.length; i++) {
      const prevCount = i * (cnt + 1);
      contentsJsx.push(
        <Box key={i}>
          <Books>{RenderBooks(books, prevCount, prevCount + cnt)}</Books>
          <About>{about[i]}</About>
        </Box>
      );
    }
    contentsJsx.push(<Books>{RenderBooks(books, (cnt + 1) * about.length)}</Books>);
    return contentsJsx;
  };

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
