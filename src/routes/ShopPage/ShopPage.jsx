import { useLoaderData, useOutletContext } from 'react-router-dom';
import styles from './ShopPage.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';

export async function loader() {
  const response = await fetch('https://fakestoreapi.com/products');
  if (!response.ok) {
    throw new Error('Fetch Error!');
  }
  return response.json();
}

function ShopPage() {
  const products = useLoaderData();
  const { cart, addToCart } = useOutletContext();

  return (
    <div className='shop'>
      <div className={styles.products}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            cart={cart}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ShopPage;
