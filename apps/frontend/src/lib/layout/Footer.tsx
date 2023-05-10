import { Flex, Link, Text } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Flex as="footer" width="full" justifyContent="center">
      <Text fontSize="sm">
        {new Date().getFullYear()} -{' '}
        <Link
          href="https://docs.google.com/document/d/1E2_fcEXxD784Z_powGJ5ns6Y1DO0ZudKa7rEidiIpgw/edit"
          isExternal
          rel="noopener noreferrer"
        >
          FLOW-DS
        </Link>
      </Text>
    </Flex>
  );
};

export default Footer;
