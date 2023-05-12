import {
  Button,
  Flex,
  Select,
  Text,
  useToast,
  useScrollTrigger,
} from '@chakra-ui/react';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { NextSeo } from 'next-seo';
import { ChangeEvent, useEffect } from 'react';
import { useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

import { useTransactionData } from '../../../modules/dashboard/hooks';

type TransactionType = {
  date: '2022-01-03';
  action: 'buy';
  name: 'amazon';
  unitPrice: 166.1605;
  quantity: 1;
  total: 166.1605;
  portfolio: 99833.8395;
};
const columnHelper = createColumnHelper<TransactionType>();

const columns = [
  columnHelper.accessor('date', {
    cell: (info) => info.getValue(),
    header: () => <Text w="200px">Date day by day</Text>,
  }),
  columnHelper.accessor('action', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('name', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('unitPrice', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('quantity', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('total', {
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor('portfolio', {
    cell: (info) => info.getValue(),
  }),
];
const TransactionTable = ({ transactions }: any) => {
  const table = useReactTable({
    data: transactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => {
          return (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: '5px',
                    width: '20px',
                    textAlign: 'center',
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

const GetRich = () => {
  const [user, setUser] = useState('erwan');
  const transactionMutation = useTransactionData();
  const [transactions, setTransactions] = useState([]);
  const [execution, setExecution] = useState(0);
  const [stockBalence, setStockBalence] = useState<any>(null);
  const toast = useToast();
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 1400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  const handleAutoTrade = () => {
    transactionMutation.mutate(user, {
      onSuccess: (data) => {
        setTransactions(data.transactions);
        setExecution(data.execution);
        setStockBalence(data.stockBalence);
      },
      onError: () => {
        toast({
          title: 'An error occurred.',
          description: 'no implementation for the second feature',
          status: 'error',
          duration: 9000,
          isClosable: true,
          position: 'top',
        });
      },
    });
  };
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setUser(event.target.value);
  };
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
      <NextSeo title="Dashboard" />
      <Select placeholder="Select user" w="50%" onChange={handleChange}>
        <option value="erwan">Erwan</option>
        <option value="aymen">Aymen</option>
        <option value="ayoub">Ayoub</option>
      </Select>
      <Button colorScheme="blue" onClick={handleAutoTrade}>
        Auto Trade
      </Button>
      <Text>Temps total d'éxecution: {execution} ms</Text>
      <Text>Stocks quantity of amazon: {stockBalence?.amazon}</Text>
      <Text>Stocks quantity of google: {stockBalence?.google}</Text>

      <TransactionTable transactions={transactions} />
      <Button
        position="fixed"
        bottom="4"
        right="4"
        size="md"
        variant="solid"
        colorScheme="blue"
        borderRadius="full"
        opacity={isVisible ? 1 : 0}
        transform={`translateY(${isVisible ? '0' : '20px'})`}
        transition="transform 0.3s, opacity 0.3s"
        onClick={scrollToTop}
        aria-label="Scroll to Top"
      >
        <FaArrowUp />
      </Button>
    </Flex>
  );
};

export default GetRich;
