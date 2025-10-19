import { useEffect, useState } from 'react';

function QuantityField(props) {
  const [quantity, setQuantity] = useState(props.initialQuantity);

  useEffect(() => {
    props.setCart((previousCart) =>
      previousCart.map((product) =>
        product.info.id === props.productId ? { ...product, quantity } : product
      )
    );
  }, [quantity]);

  const incrementQuantity = () => {
    setQuantity((previous) => ++previous);
  };

  const decrementQuantity = () => {
    setQuantity((previous) => --previous);
  };

  const removeFromCart = () => {
    props.setCart((previousCart) =>
      previousCart.filter((product) => product.info.id !== props.productId)
    );
  };

  return (
    <div>
      <button
        type='button'
        onClick={quantity === 1 ? removeFromCart : decrementQuantity}>
        {quantity === 1 ? <>Delete</> : <>-</>}
      </button>
      <span>{quantity}</span>
      <button type='button' onClick={incrementQuantity}>
        +
      </button>
    </div>
  );
}

export default QuantityField;
