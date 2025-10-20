import { describe, it, expect, vi } from 'vitest';
import PropTypes from 'prop-types';
import { productPropType, cartItemPropType } from '../../types/propTypes';

describe('ProductCard PropTypes', () => {
  it('warns when product has wrong shape', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {});

    PropTypes.checkPropTypes(
      {
        product: productPropType.isRequired,
        cart: PropTypes.arrayOf(cartItemPropType).isRequired,
        addToCart: PropTypes.func.isRequired,
      },
      { product: { id: 'x' }, cart: [], addToCart: () => {} },
      'prop',
      'ProductCard'
    );

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
