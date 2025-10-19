import styles from './DetailedCard.module.css';
import QuantityField from '../QuantityField/QuantityField';
import { useState } from 'react';

function DetailedCard(props) {
  const [quantity, setQuantity] = useState(1);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      props.setDetailedView(null);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      props.setDetailedView(null);
    }
  };

  return (
    <dialog
      ref={props.dialogRef}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      className={styles.dialog}>
      <div className='product-detailed'>
        <div className={styles.information}>
          <img
            src={props.product.image}
            className='product-image'
            width={120}
            height={120}
          />
          <h5 className={styles.title}>{props.product.title}</h5>
          <span className={styles.description}>
            {props.product.description}
          </span>
          <span className={styles.category}>{props.product.category}</span>
          <span className={styles.price}>{props.product.price}</span>
        </div>
        <div className={styles.actions}>
          <QuantityField
            productId={props.product.id}
            initialQuantity={quantity}
            setQuantity={setQuantity}
            cartView={false}
          />
          <button
            type='button'
            className={styles.addButton}
            onClick={() => props.addToCart(props.product, quantity)}
            disabled={props.cart.find(
              (product) => product.info.id === props.product.id
            )}>
            Add to the cart
          </button>
        </div>
      </div>
    </dialog>
  );
}

export default DetailedCard;
