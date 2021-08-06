import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import { Flex, Box, Link } from '@chakra-ui/react';

type DrawerLinkProps = {
  children: ReactNode;
  href: string;
};

export const DrawerLink = ({ children, href }: DrawerLinkProps) => {
  const router = useRouter();
  return (
    <Box>
      <Link _hover={{ textDecoration: 'none' }} href={href}>
        <Flex
          p="10px"
          fontSize="18px"
          bgColor={router.pathname === href ? 'gray.100' : undefined}
          _hover={{ bgColor: 'gray.100' }}
        >
          {children}
        </Flex>
      </Link>
    </Box>
  );
};

export default DrawerLink;
