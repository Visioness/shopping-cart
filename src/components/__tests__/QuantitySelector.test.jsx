import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import QuantitySelector from '../QuantityField/QuantitySelector/QuantitySelector';

describe('QuantitySelector', () => {
  it('increments and decrements within bounds', async () => {
    const user = userEvent.setup();
    let value = 1;
    const handleChange = (v) => {
      value = v;
      rerender(
        <QuantitySelector
          value={value}
          onChange={handleChange}
          min={1}
          max={2}
        />
      );
    };

    const { rerender } = render(
      <QuantitySelector value={value} onChange={handleChange} min={1} max={2} />
    );

    // At min, decrement is disabled
    const dec = screen.getByRole('button', { name: /decrease quantity/i });
    const inc = screen.getByRole('button', { name: /increase quantity/i });
    expect(dec).toBeDisabled();

    await user.click(inc);
    expect(screen.getByText('2')).toBeInTheDocument();

    // At max, increment is disabled
    expect(inc).toBeDisabled();

    await user.click(dec);
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
