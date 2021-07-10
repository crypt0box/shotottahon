import { Box } from '@chakra-ui/react';

export default function Responsive() {
  return (
    <Box bg={{ base: 'red.200', sm: 'yellow.200', md: 'green.200', lg: 'blue.200' }}>Hello</Box>
  );
}