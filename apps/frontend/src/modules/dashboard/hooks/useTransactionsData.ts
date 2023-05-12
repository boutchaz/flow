import { useMutation } from '@tanstack/react-query';

const useTransactionsData = () => {
  const mutateTransactionData = async (user: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/engine/auto-trade`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Include body if needed. For example:
        body: JSON.stringify({ user }),
      }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  return useMutation((user: string) => mutateTransactionData(user));
};
export default useTransactionsData;
