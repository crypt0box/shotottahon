import React from 'react';
import { Flex, Box, Heading } from '@chakra-ui/react';

type Props = {
  children: React.ReactNode;
};

export const About: React.FC<Props> = ({ children }) => (
  <Flex justifyContent="center">
    <Box p="50px" mx="auto" maxW="960px">
      <Heading
        fontSize={{
          base: '28px',
          sm: '40px',
          md: '52px',
          lg: '64px',
        }}
        opacity="50%"
      >
        {children}
      </Heading>
    </Box>
  </Flex>
);

export default About;