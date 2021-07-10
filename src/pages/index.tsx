import { InferGetStaticPropsType } from 'next';
import { Flex, Box, Grid, Image, Heading } from '@chakra-ui/react';
import React from 'react';
import { db } from 'src/lib/db';

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
  return (
    <>
      <Flex justifyContent="center">
        <Box>
          <Heading>Hello World!</Heading>
        </Box>
      </Flex>
      <Flex justifyContent="center" px="20px">
        <Grid
          templateColumns={{
            base: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          }}
          gap={6}
        >
          {books.map((book) => (
            <Image
              key={book.id}
              boxSize="100%"
              boxShadow="-6px 6px 10px -2px rgb(0 27 68 / 25%), 0 0 3px rgb(0 21 60 / 10%)"
              objectFit="fill"
              src={book.imageUrl}
              alt={book.title}
            />
          ))}
        </Grid>
      </Flex>
    </>
  );
}
