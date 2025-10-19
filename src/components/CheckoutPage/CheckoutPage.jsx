import { useOutletContext } from 'react-router-dom';
import CartItemQuantity from '../CartItemQuantity/CartItemQuantity';

function CheckoutPage() {
  const { cart, setCart } = useOutletContext();

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
        initialQuantity={product.quantity}
        setCart={setCart}
        productId={product.info.id}
      />
      <span>{Number(product.quantity * product.info.price).toFixed(2)}</span>
    </div>
  ));

  return (
    <div className='checkout'>
      Here are the items that you are going to buy...
      {cart.length > 0 && (
        <div className='cart'>
          {cartItems}
          <span>Total: ${totalPrice}</span>
          <button type='button'>Pay with...</button>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
