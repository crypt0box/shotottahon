import React from 'react';
import { Flex, Grid } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const Books: React.FC<Props> = ({ children }) => (
  <Flex justifyContent="center" px="20px" mx="auto" maxW="960px">
    <Grid
      templateColumns={{
        base: 'repeat(2, 1fr)',
        sm: 'repeat(3, 1fr)',
        md: 'repeat(4, 1fr)',
        lg: 'repeat(5, 1fr)',
      }}
      gap={6}
    >
      {children}
    </Grid>
  </Flex>
);
export default Books;
