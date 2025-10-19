import { useEffect, useState } from 'react';

function QuantityField(props) {
  const [quantity, setQuantity] = useState(props.initialQuantity);

  useEffect(() => {
    setQuantity(props.initialQuantity);
  }, [props.initialQuantity]);

  useEffect(() => {
    if (props.cartView) {
      props.setCart((previousCart) =>
        previousCart.map((product) =>
          product.info.id === props.productId
            ? { ...product, quantity }
            : product
        )
      );
    }
  }, [quantity]);

  const incrementQuantity = () => {
    if (props.cartView) setQuantity((previous) => ++previous);
    else props.setQuantity((previous) => ++previous);
  };

  const decrementQuantity = () => {
    if (props.cartView) setQuantity((previous) => --previous);
    else props.setQuantity((previous) => --previous);
  };

  const removeFromCart = () => {
    if (props.cartView) {
      props.setCart((previousCart) =>
        previousCart.filter((product) => product.info.id !== props.productId)
      );
    }
  };

  return (
    <div>
      <button
        type='button'
        onClick={quantity === 1 ? removeFromCart : decrementQuantity}
        disabled={!props.cartView && quantity === 1}>
        {quantity === 1 && props.cartView ? <>Delete</> : <>-</>}
      </button>
      <span>{quantity}</span>
      <button type='button' onClick={incrementQuantity}>
        +
      </button>
    </div>
  );
}

export default QuantityField;
