import { useNavigate } from 'react-router-dom';
import styles from './ProductCard.module.css';

function ProductCard(props) {
  const navigate = useNavigate();

  const handleCardClick = (event) => {
    if (
      !(event.target.tagName === 'INPUT' || event.target.tagName === 'BUTTON')
    ) {
      navigate(`/product/${props.product.id}`);
    }
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <div className={styles.information}>
        <img
          src={props.product.image}
          className='product-image'
          width={120}
          height={120}
        />
        <h5 className={styles.title}>{props.product.title}</h5>
        <span className={styles.price}>{props.product.price}</span>
      </div>
      <div className={styles.actions}>
        <button
          type='button'
          className={styles.addButton}
          onClick={() => props.addToCart(props.product, 1)}
          disabled={props.cart.find(
            (product) => product.info.id === props.product.id
          )}>
          Add to the cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
