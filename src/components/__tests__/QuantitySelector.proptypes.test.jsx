import { describe, it, expect, vi } from 'vitest';
import PropTypes from 'prop-types';
import QuantitySelector from '../QuantityField/QuantitySelector/QuantitySelector';

describe('QuantitySelector PropTypes', () => {
  it('warns when value is not a number', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    PropTypes.checkPropTypes(
      {
        value: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        min: PropTypes.number,
        max: PropTypes.number,
      },
      { value: '1', onChange: () => {} },
      'prop',
      'QuantitySelector'
    );

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
