import { useOutletContext } from 'react-router-dom';
import QuantityField from '../QuantityField/QuantityField';

function CheckoutPage() {
  const { cart, setCart } = useOutletContext();

  return (
    <div className='checkout'>
      Here are the items that you are going to buy...
      {cart.length > 0 && (
        <div className='cart'>
          {cart.map((product) => (
            <div key={product.info.id}>
              <h1>{product.info.title}</h1>
              <QuantityField
                initialQuantity={product.quantity}
                setCart={setCart}
                productId={product.info.id}
                cartView={true}
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
