import {
  Box,
  Button,
  CloseButton,
  Flex,
  HStack,
  IconButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import Router from 'next/router';
import { AiOutlineMenu } from 'react-icons/ai';
// eslint-disable-next-line import/no-extraneous-dependencies
import { v4 as uuidv4 } from 'uuid';

interface NavigationTabsProps {
  tabs: { label: string; href: string }[];
}

export const NavigationTabs = ({ tabs }: NavigationTabsProps) => {
  const mobileNav = useDisclosure();
  return (
    <Flex alignItems="center" justifyContent="space-between" mx="auto">
      <HStack display="flex" alignItems="center" spacing={1}>
        <HStack
          spacing={1}
          mr={1}
          color="brand.500"
          display={{
            base: 'none',
            md: 'inline-flex',
          }}
        >
          {tabs.map((tab) => (
            <Button
              variant="ghost"
              key={uuidv4()}
              onClick={() => Router.push(tab.href)}
            >
              {tab.label}
            </Button>
          ))}
        </HStack>
        <Box
          display={{
            base: 'inline-flex',
            md: 'none',
          }}
        >
          <IconButton
            display={{
              base: 'flex',
              md: 'none',
            }}
            aria-label="Open menu"
            fontSize="20px"
            color="gray.800"
            _dark={{
              color: 'inherit',
            }}
            variant="ghost"
            icon={<AiOutlineMenu />}
            onClick={mobileNav.onOpen}
          />

          <VStack
            pos="absolute"
            top={0}
            left={0}
            right={0}
            display={mobileNav.isOpen ? 'flex' : 'none'}
            flexDirection="column"
            p={2}
            pb={4}
            m={2}
            spacing={3}
            rounded="sm"
            shadow="sm"
          >
            <CloseButton aria-label="Close menu" onClick={mobileNav.onClose} />
            {tabs.map((tab) => (
              <Button
                variant="ghost"
                key={uuidv4()}
                onClick={() => Router.push(tab.href)}
              >
                {tab.label}
              </Button>
            ))}
          </VStack>
        </Box>
      </HStack>
    </Flex>
  );
};
