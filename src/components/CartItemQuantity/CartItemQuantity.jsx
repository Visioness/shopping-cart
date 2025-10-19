import { useEffect, useState } from 'react';
import styles from './CartItemQuantity.module.css';

function CartItemQuantity({ productId, initialQuantity, setCart }) {
  const [quantity, setQuantity] = useState(initialQuantity);

  // Sync quantity changes back to the cart state
  useEffect(() => {
    setCart((previousCart) =>
      previousCart.map((product) =>
        product.info.id === productId ? { ...product, quantity } : product
      )
    );
  }, [quantity, productId, setCart]);

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => prev - 1);
  };

  const handleRemoveFromCart = () => {
    setCart((previousCart) =>
      previousCart.filter((product) => product.info.id !== productId)
    );
  };

  const isLastItem = quantity === 1;

  return (
    <div className={styles.cartItemQuantity}>
      <button
        type='button'
        onClick={isLastItem ? handleRemoveFromCart : handleDecrement}
        className={isLastItem ? styles.deleteButton : styles.decrementButton}
        aria-label={isLastItem ? 'Remove from cart' : 'Decrease quantity'}>
        {isLastItem ? 'Delete' : '-'}
      </button>
      <span className={styles.value} aria-live='polite'>
        {quantity}
      </span>
      <button
        type='button'
        onClick={handleIncrement}
        className={styles.incrementButton}
        aria-label='Increase quantity'>
        +
      </button>
    </div>
  );
}

export default CartItemQuantity;
