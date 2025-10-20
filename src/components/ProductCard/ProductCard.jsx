import { ShoppingCart, CirclePlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { productPropType, cartItemPropType } from '../../types/propTypes';
import styles from './ProductCard.module.css';

export function AddToCart() {
  return (
    <div className={styles.addButtonInner}>
      <ShoppingCart
        className={styles.shoppingCartIcon}
        size={28}
        color='black'
        strokeWidth={2}
      />
      <CirclePlus
        className={styles.circlePlusIcon}
        size={18}
        color='black'
        strokeWidth={3}
      />
    </div>
  );
}

function ProductCard(props) {
  const navigate = useNavigate();

  const handleCardClick = (event) => {
    if (!event.target.closest('button')) {
      navigate(`/product/${props.product.id}`);
    }
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.information}>
        <img
          src={props.product.image}
          className='product-image'
          width={120}
          height={120}
        />
        <h5 className={styles.title}>{props.product.title}</h5>
        <span className={styles.price}>{props.product.price}</span>
      </div>
      <div className={styles.actions}>
        <button
          type='button'
          className={styles.addButton}
          onClick={() => props.addToCart(props.product, 1)}
          disabled={props.cart.find(
            (product) => product.info.id === props.product.id
          )}>
          <AddToCart />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;

ProductCard.propTypes = {
  product: productPropType.isRequired,
  cart: PropTypes.arrayOf(cartItemPropType).isRequired,
  addToCart: PropTypes.func.isRequired,
};
