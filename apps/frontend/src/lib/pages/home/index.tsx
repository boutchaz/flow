import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';

const Home = () => {
  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      minHeight="70vh"
      gap={4}
      mb={8}
      w="full"
    >
      <NextSeo title="Home" />
      <Box mt={8}>
        <Heading as="h2" size="md" mb={2}>
          Message to the Reviewer
        </Heading>
        <Text>
          Dear Reviewer,
          <br />
          Thank you for taking the time to review my project.
          <br />
          Best regards,
          <br />
          [@Boutchaz]
        </Text>
      </Box>
    </Flex>
  );
};

export default Home;
