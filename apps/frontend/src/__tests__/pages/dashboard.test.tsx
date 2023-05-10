import { fireEvent, render, screen } from '@testing-library/react';
import { assert, describe, test, vi } from 'vitest';
import Dashboard from '../../pages/dashboard';

// Vous pouvez stocker ces données dans une base mongoDb ou bien les lire directement.
// Seuls trois champs nous intéressent :
// timestamp : date du jour sous format timestamp
// highestPriceOfTheDay : le prix du jour au plus haut
// lowestPriceOfTheDay : le prix du jour au plus bas

// Nous afficherons sur le graphique le prix moyen du mois.
// Vous pouvez créer le visuel sur la route principale.

// Mocking the API call for testing
vi.mock('react-query', () => ({
  useQuery: () => ({
    data: null,
    isLoading: true,
    error: null,
  }),
}));
describe('Dashboard unit tests', () => {
  test('Should show a loading state when the component is retrieving data', async () => {
    render(<Dashboard />);
    const loadingState = screen.getByText('Loading...');
    assert.ok(loadingState);
  });

  test('Should show an error if api call fails or send an error', async () => {
    vi.mock('react-query', () => ({
      useQuery: () => ({
        data: null,
        isLoading: false,
        error: 'Error',
      }),
    }));
    render(<Dashboard />);
    const errorState = screen.getByText('Error');
    assert.truthy(errorState);
  });

  test('Should show an empty state if no data is returned', async () => {
    vi.mock('react-query', () => ({
      useQuery: () => ({
        data: [],
        isLoading: false,
        error: null,
      }),
    }));
    render(<Dashboard />);
    const emptyState = screen.getByText('No data available');
    assert.ok(emptyState);
  });

  test.todo(
    'Should display the average price of the month successfully',
    async () => {
      // test will added once the algorithm is implemented in the backend
    }
  );

  test.todo(
    'Should handle errors when displaying the average price of the month',
    async () => {
      // test will added once the algorithm is implemented in the backend
    }
  );
});
