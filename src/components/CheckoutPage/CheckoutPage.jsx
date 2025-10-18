import { useOutletContext } from 'react-router-dom';

function CheckoutPage() {
  const { cart, setCart } = useOutletContext();

  const handleQuantityChange = (event, id) => {
    setCart((previousCart) =>
      previousCart.map((product) =>
        product.info.id === id
          ? { ...product, quantity: event.target.value }
          : product
      )
    );
  };

  return (
    <div className='checkout'>
      Here are the items that you are going to buy...
      {cart.length > 0 && (
        <div className='cart'>
          {cart.map((product) => (
            <div key={product.info.id}>
              <h1>{product.info.title}</h1>
              {/* TODO: Create component for the quantity input */}
              <input
                type='number'
                value={product.quantity}
                onChange={(event) =>
                  handleQuantityChange(event, product.info.id)
                }
              />
              <span>
                {Number(product.quantity * product.info.price).toFixed(2)}
              </span>
            </div>
          ))}
          <span>
            Total: $
            {cart
              .reduce(
                (accumulator, product) =>
                  accumulator + Number(product.info.price * product.quantity),
                0
              )
              .toFixed(2)}
          </span>
          <button type='button'>Pay with...</button>
        </div>
      )}
    </div>
  );
}

export default CheckoutPage;
