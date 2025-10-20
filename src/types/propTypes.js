import PropTypes from 'prop-types';

export const productPropType = PropTypes.exact({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

export const cartItemPropType = PropTypes.exact({
  info: productPropType.isRequired,
  quantity: PropTypes.number.isRequired,
});
