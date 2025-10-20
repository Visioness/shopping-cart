import { useLoaderData, useOutletContext } from 'react-router-dom';
import { fetchJson } from '../../utils/fetchJson';
import styles from './ShopPage.module.css';
import ProductCard from '../../components/ProductCard/ProductCard';

export async function loader() {
  return fetchJson('https://fakestoreapi.com/products');
}

function ShopPage() {
  const products = useLoaderData();
  const { cart, addToCart } = useOutletContext();

  return (
    <div className='shop'>
      <div className={styles.products}>
        {products.length === 0 && <p>No products available.</p>}
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
