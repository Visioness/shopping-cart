import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductCard from '../ProductCard/ProductCard';
import { MemoryRouter, useNavigate } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual('react-router-dom');
  return {
    ...mod,
    useNavigate: vi.fn(),
  };
});

describe('ProductCard', () => {
  it('navigates on card click (non-button area)', async () => {
    const user = userEvent.setup();
    const navigateMock = vi.fn();
    useNavigate.mockReturnValue(navigateMock);

    render(
      <MemoryRouter>
        <ProductCard
          product={{ id: 1, title: 'A', price: 1, image: 'x' }}
          cart={[]}
          addToCart={() => {}}
        />
      </MemoryRouter>
    );

    const title = screen.getByText('A');
    await user.click(title);
    expect(navigateMock).toHaveBeenCalledWith('/product/1');
  });
});
