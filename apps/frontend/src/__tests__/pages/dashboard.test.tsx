import { describe, assert, test } from 'vitest';

// Vous pouvez stocker ces données dans une base mongoDb ou bien les lire directement.
// Seuls trois champs nous intéressent :
// timestamp : date du jour sous format timestamp
// highestPriceOfTheDay : le prix du jour au plus haut
// lowestPriceOfTheDay : le prix du jour au plus bas

// Nous afficherons sur le graphique le prix moyen du mois.
// Vous pouvez créer le visuel sur la route principale.

describe('Dashboard unit tests', () => {
  test.todo(
    'Should show a loading state when the component is retrieving data',
    async () => {}
  );

  test.todo(
    'Should show an error if api call fails or send an error',
    async () => {}
  );

  test.todo(
    'Should show an empty state if no data is returned',
    async () => {}
  );

  test.todo(
    'Should display the average price of the month successfully',
    async () => {}
  );

  test.todo(
    'Should handle errors when displaying the average price of the month',
    async () => {}
  );
});
