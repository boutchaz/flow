import { Flex } from '@chakra-ui/react';
import ReactECharts from 'echarts-for-react';
import { NextSeo } from 'next-seo';
import { useMemo } from 'react';

import { useSeriesData } from '../../../modules/dashboard/hooks';

const Dashboard = () => {
  const { data: seriesData, isLoading, isError } = useSeriesData();
  const option = useMemo(
    () => ({
      xAxis: {
        type: 'category',
        data: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Nov',
          'Dec',
        ],
      },
      yAxis: {
        type: 'value',
      },
      series: seriesData?.stockData || [],
      legend: {
        show: true,
      },
    }),
    [seriesData]
  );
  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span data-testid="error">Error: Something went wrong...</span>;
  }
  if (!seriesData?.stockData?.length) {
    return <span>No data available</span>;
  }
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
      <ReactECharts option={option} style={{ height: '50vh', width: '100%' }} />
    </Flex>
  );
};

export default Dashboard;
