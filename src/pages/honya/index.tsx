import React, { useState } from 'react';
import { InferGetStaticPropsType } from 'next';
import { db } from 'src/lib/db';
import { Box, Image } from '@chakra-ui/react';
import Books from 'src/components/Books';
import BookDetailModal from 'src/components/BookDetailModal';

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
  const [book, setBook] = useState<BookProps>(books[0]);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);

  const onOpenDialog = (id: string | undefined) => {
    const book = books.find((book) => book.id === id);
    if (!book) return;
    setBook(book);
    setIsOpenDialog(true);
  };

  const onCloseDialog = () => {
    setIsOpenDialog(false);
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
          </Box>
        ))}
      </Books>
      <BookDetailModal isOpenDialog={isOpenDialog} onCloseDialog={onCloseDialog} book={book} />
    </>
  );
}
