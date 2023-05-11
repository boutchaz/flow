import { useQuery } from '@tanstack/react-query';

const useSeriesData = () => {
  const fetchSeriesData = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/stock/line`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  return useQuery(['seriesData'], fetchSeriesData);
};
export default useSeriesData;
