import { CreditCard, Handbag, Trash2 } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import CartItemQuantity from '../QuantityField/CartItemQuantity/CartItemQuantity';
import styles from './Cart.module.css';

function Cart({ cart, checkoutRef, onQuantityChange, onRemove }) {
  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      checkoutRef.current.close();
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      checkoutRef.current.close();
    }
  };

  const totalPrice = cart
    .reduce(
      (accumulator, product) =>
        accumulator + Number(product.info.price * product.quantity),
      0
    )
    .toFixed(2);

  const cartItems = cart.map((product) => (
    <div key={product.info.id}>
      <h1>{product.info.title}</h1>
      <CartItemQuantity
        productId={product.info.id}
        initialQuantity={product.quantity}
        onQuantityChange={onQuantityChange}
        onRemove={onRemove}
      />
      <span>{Number(product.quantity * product.info.price).toFixed(2)}</span>
      <button type='button' onClick={() => onRemove(product.info.id)}>
        <Trash2 size={24} color='crimson' strokeWidth={2} />
      </button>
    </div>
  ));

  return (
    <dialog
      className={styles.checkout}
      ref={checkoutRef}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}>
      {cart.length > 0 ? (
        <div className={styles.cart}>
          {cartItems}
          <p>
            Total: <span>{totalPrice}</span>
          </p>
          <button type='button'>
            <CreditCard size={32} color='black' strokeWidth={2} />
            Continue...
          </button>
        </div>
      ) : (
        <>
          <p>You have no items in your cart.</p>
        </>
      )}
    </dialog>
  );
}

export default Cart;
