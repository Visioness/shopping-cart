import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useRouteError: () => new Error('Kaboom'),
    useNavigate: () => vi.fn(),
    Link: ({ to, children }) => <a href={to}>{children}</a>,
  };
});

import ErrorPage from '../ErrorPage/ErrorPage';

describe('ErrorPage', () => {
  it('shows message from route error', async () => {
    render(<ErrorPage />);
    expect(screen.getByText('Kaboom')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /try again/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument();
  });
});
