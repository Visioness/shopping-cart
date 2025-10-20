import CartItemQuantity from '../QuantityField/CartItemQuantity/CartItemQuantity';

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
    </div>
  ));

  return (
    <dialog
      className='checkout'
      ref={checkoutRef}
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}>
      Here are the items that you are going to buy...
      {cart.length > 0 && (
        <div className='cart'>
          {cartItems}
          <span>Total: ${totalPrice}</span>
          <button type='button'>Pay with...</button>
        </div>
      )}
    </dialog>
  );
}

export default Cart;
