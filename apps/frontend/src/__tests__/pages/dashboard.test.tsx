import { render, screen } from '@testing-library/react';
import { assert, beforeEach, describe, test, vi } from 'vitest';

import { useSeriesData } from '../../modules/dashboard/hooks';
import Dashboard from '../../pages/dashboard';

// Vous pouvez stocker ces données dans une base mongoDb ou bien les lire directement.
// Seuls trois champs nous intéressent :
// timestamp : date du jour sous format timestamp
// highestPriceOfTheDay : le prix du jour au plus haut
// lowestPriceOfTheDay : le prix du jour au plus bas

// Nous afficherons sur le graphique le prix moyen du mois.
// Vous pouvez créer le visuel sur la route principale.

// Mocking the API call for testing
// eslint-disable-next-line sonarjs/no-duplicate-string
// vi.mock('../../modules/dashboard/hooks', async () => {
//   const mod = await vi.importActual('../../modules/dashboard/hooks');
//   return {
//     ...(mod as Record<string, unknown>),
//     useSeriesData: () => {
//       return {
//         data: [],
//         isLoading: false,
//         error: null,
//       };
//     },
//   };
// });
vi.mock('../../modules/dashboard/hooks', async () => {
  const mod = await vi.importActual('../../modules/dashboard/hooks');
  const useSeriesData = vi.fn();
  return {
    ...(mod as Record<string, unknown>),
    useSeriesData,
  };
});
describe('Dashboard unit tests', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });
  test('Should show a loading state when the component is retrieving data', async () => {
    useSeriesData.mockImplementationOnce(() => {
      return {
        data: null,
        isLoading: true,
        isError: null,
      };
    });
    render(<Dashboard />);
    const loadingState = screen.getByText('Loading...');
    assert.ok(loadingState);
  });

  test('Should show an error if api call fails or send an error', async () => {
    useSeriesData.mockImplementationOnce(() => {
      return {
        data: null,
        isLoading: false,
        isError: true,
      };
    });
    render(<Dashboard />);
    const errorState = screen.getByText('Error: Something went wrong...');
    assert.ok(errorState);
  });

  test('Should show an empty state if no data is returned', async () => {
    useSeriesData.mockImplementationOnce(() => {
      return {
        data: [],
        isLoading: false,
        isError: false,
      };
    });
    render(<Dashboard />);
    const emptyState = screen.getByText('No data available');
    assert.ok(emptyState);
  });

  // test.todo(
  //   'Should display the average price of the month successfully',
  //   async () => {
  //     // test will added once the algorithm is implemented in the backend
  //   }
  // );

  // test.todo(
  //   'Should handle errors when displaying the average price of the month',
  //   async () => {
  //     // test will added once the algorithm is implemented in the backend
  //   }
  // );
});
