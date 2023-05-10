import { describe, assert, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import NavigationTabs from '../../lib/layout/NavigationTabs';

describe('Navigation tabs', () => {
  test('renders tabs correctly', () => {
    render(
      <NavigationTabs
        tabs={[
          { label: 'Visualisation' },
          { label: 'Get Best Deal' },
          { label: 'Get Rich' },
        ]}
      />
    );
    expect(screen.getByText('Visualisation')).toBeInTheDocument();
    expect(screen.getByText('Get Best Deal')).toBeInTheDocument();
    expect(screen.getByText('Get Rich')).toBeInTheDocument();
  });

  test('tab selection', () => {
    render(
      <NavigationTabs
        tabs={[
          { label: 'Visualisation' },
          { label: 'Get Best Deal' },
          { label: 'Get Rich' },
        ]}
      />
    );
    fireEvent.click(screen.getByText('Get Best Deal'));
    expect(screen.getByText('Get Best Deal')).toHaveStyle({
      backgroundColor: 'blue',
      color: 'white',
    });
    expect(screen.getByText('Visualisation')).toHaveStyle({
      backgroundColor: 'gray',
      color: 'black',
    });
    fireEvent.click(screen.getByText('Visualisation'));
    expect(screen.getByText('Visualisation')).toHaveStyle({
      backgroundColor: 'blue',
      color: 'white',
    });
    expect(screen.getByText('Get Best Deal')).toHaveStyle({
      backgroundColor: 'gray',
      color: 'black',
    });
  });
});
