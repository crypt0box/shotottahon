import { InferGetStaticPropsType } from 'next';
import { Flex, Box, UnorderedList, ListItem } from '@chakra-ui/react';
import { db } from '../lib/db';

type TaskProps = {
  id: string;
  title: string;
};

export const getStaticProps = async () => {
  let tasks: TaskProps[] = [];
  const ref = await db.collection('tasks').get();
  ref.docs.map((doc) => {
    const data: TaskProps = { id: doc.id, title: doc.data().title };
    tasks = [data, ...tasks];
  });
  return {
    props: {
      tasks,
    },
  };
};

function Firebase({ tasks }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Flex justifyContent="center">
      <Box w={{ base: '80%', lg: '30%' }} bg="white" rounded="md" p={4} shadow="md">
        <UnorderedList>
          {tasks.map((task) => (
            <ListItem key={task.id}>{task.title}</ListItem>
          ))}
        </UnorderedList>
      </Box>
    </Flex>
  );
}

export default Firebase;
