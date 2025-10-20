import styles from './ProductPage.module.css';
import QuantitySelector from '../../components/QuantityField/QuantitySelector/QuantitySelector';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import { useState } from 'react';

export async function loader({ params }) {
  const response = await fetch(
    `https://fakestoreapi.com/products/${params.id}`
  );
  if (!response.ok) {
    throw new Error('Product not found');
  }
  return response.json();
}

function ProductPage() {
  const { cart, addToCart } = useOutletContext();
  const product = useLoaderData();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setTimeout(() => navigate('/shop'), 2000);
  };

  const handleBackToShop = () => navigate('/shop');

  const alreadyInCart = cart.find((item) => item.info.id === product.id);

  return (
    <div className={styles.dialog}>
      <button type='button' onClick={handleBackToShop}>
        Back to Shop
      </button>
      <div className='product-detailed'>
        <div className={styles.information}>
          <img
            src={product.image}
            className='product-image'
            width={120}
            height={120}
          />
          <h5 className={styles.title}>{product.title}</h5>
          <span className={styles.description}>{product.description}</span>
          <span className={styles.category}>{product.category}</span>
          <span className={styles.price}>{product.price}</span>
        </div>
        <div className={styles.actions}>
          <QuantitySelector value={quantity} onChange={setQuantity} />
          <button
            type='button'
            className={styles.addButton}
            onClick={handleAddToCart}
            disabled={alreadyInCart}>
            Add to the cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
