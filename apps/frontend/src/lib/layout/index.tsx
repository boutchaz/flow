import { Box } from '@chakra-ui/react';
import type { ReactNode } from 'react';

import Footer from './Footer';
import Header from './Header';
import { NavigationTabs } from './NavigationTabs';

type LayoutProps = {
  children: ReactNode;
};
const tabs = [
  { label: 'Visualisation', href: '/dashboard' },
  { label: 'Get Best Deal', href: '/best-deal' },
  { label: 'Get Rich', href: '/get-rich' },
];

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" maxWidth={800} transition="0.5s ease-out">
      <Box margin="8">
        <Header />
        <Box as="main" marginY={22}>
          <NavigationTabs tabs={tabs} />
          {children}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
};

export default Layout;
