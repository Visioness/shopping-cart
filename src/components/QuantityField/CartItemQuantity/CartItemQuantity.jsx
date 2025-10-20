import { DiamondMinus, DiamondPlus } from 'lucide-react';
import { useEffect, useState } from 'react';
import styles from './CartItemQuantity.module.css';
import PropTypes from 'prop-types';

function CartItemQuantity({
  productId,
  initialQuantity,
  onQuantityChange,
  onRemove,
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Sync quantity changes back to the cart state
  useEffect(() => {
    onQuantityChange(productId, quantity);
  }, [quantity, productId]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => prev - 1);
  };

  const handleRemoveFromCart = () => {
    onRemove(productId);
  };

  const isLastItem = quantity === 1;

  return (
    <div className={styles.cartItemQuantity}>
      <button
        type='button'
        onClick={isLastItem ? handleRemoveFromCart : handleDecrement}
        className={isLastItem ? styles.deleteButton : styles.decrementButton}
        aria-label={isLastItem ? 'Remove from cart' : 'Decrease quantity'}>
        <DiamondMinus size={24} color='black' strokeWidth={2} />
      </button>
      <span className={styles.value} aria-live='polite'>
        {quantity}
      </span>
      <button
        type='button'
        onClick={handleIncrement}
        className={styles.incrementButton}
        aria-label='Increase quantity'>
        <DiamondPlus size={24} color='black' strokeWidth={2} />
      </button>
    </div>
  );
}

export default CartItemQuantity;

CartItemQuantity.propTypes = {
  productId: PropTypes.number.isRequired,
  initialQuantity: PropTypes.number.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};
