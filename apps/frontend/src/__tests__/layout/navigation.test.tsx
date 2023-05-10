import { render, screen, fireEvent } from '@testing-library/react';
import { describe, vi, test, expect, beforeAll } from 'vitest';
import mockRouter from 'next-router-mock';

import { NavigationTabs } from '../../lib/layout/NavigationTabs';

const mockTabs = [
  { label: 'Visualisation', href: '/dashboard' },
  // eslint-disable-next-line sonarjs/no-duplicate-string
  { label: 'Get Best Deal', href: '/best-deal' },
  { label: 'Get Rich', href: '/get-rich' },
];
const mockOnOpen = vi.fn();
const mockOnClose = vi.fn();
vi.mock('@chakra-ui/react', async () => {
  const mod = await vi.importActual('@chakra-ui/react');
  return {
    ...(mod as Record<string, unknown>),
    useDisclosure: () => {
      return {
        onOpen: mockOnOpen,
        onClose: mockOnClose,
        isOpen: true,
      };
    },
  };
});

describe('Navigation tabs', () => {
  beforeAll(() => {
    vi.mock('next/router', () => require('next-router-mock'));
  });
  test('renders tabs correctly', () => {
    render(<NavigationTabs tabs={mockTabs} />);
    mockTabs.forEach((tab) => {
      expect(screen.getAllByText(tab.label).length).toBe(2);
    });
  });

  test('tab selection when click on visualtion should redirect to /dashboard', () => {
    render(<NavigationTabs tabs={mockTabs} />);
    fireEvent.click(screen.getAllByText(mockTabs[0].label)[0]);
    expect(mockRouter).toMatchObject({
      pathname: mockTabs[0].href,
    });
  });
  test('tab selection when click on get best deal should redirect to /best-deal', () => {
    render(<NavigationTabs tabs={mockTabs} />);
    fireEvent.click(screen.getAllByText(mockTabs[1].label)[0]);
    expect(mockRouter).toMatchObject({
      pathname: mockTabs[1].href,
    });
  });
  test('calls onOpen when menu button is clicked', () => {
    render(<NavigationTabs tabs={mockTabs} />);
    const buttons = screen.getAllByRole('button', { name: 'Open menu' });
    fireEvent.click(buttons[0]);
    expect(mockOnOpen).toHaveBeenCalled();
  });
  test('calls onClose when menu button is clicked', () => {
    render(<NavigationTabs tabs={mockTabs} />);
    const buttons = screen.getAllByRole('button', { name: 'Close menu' });
    fireEvent.click(buttons[1]);
    expect(mockOnClose).toHaveBeenCalled();
  });
});
