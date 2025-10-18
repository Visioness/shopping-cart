import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import styles from './ShopPage.module.css';
import MinimalCard from '../MinimalCard/MinimalCard';
import DetailedCard from '../DetailedCard/DetailedCard';

const useProducts = () => {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('Server Error!');
        }
        return response.json();
      })
      .then((response) => setProducts(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { products, loading, error };
};

function ShopPage() {
  const [detailedView, setDetailedView] = useState(null);
  const dialogRef = useRef(null);

  const { products, loading, error } = useProducts();
  const { cart, addToCart } = useOutletContext();

  useLayoutEffect(() => {
    if (detailedView) {
      dialogRef.current?.showModal();
    } else {
      dialogRef.current?.close();
    }
  }, [detailedView]);

  return (
    <div className='shop'>
      {loading && <div>Loading...</div>}

      {products && (
        <>
          <div className={styles.products}>
            {products.map((product) => (
              <MinimalCard
                key={product.id}
                cart={cart}
                product={product}
                addToCart={addToCart}
                setDetailedView={setDetailedView}
              />
            ))}
          </div>

          {detailedView && (
            <DetailedCard
              dialogRef={dialogRef}
              cart={cart}
              product={detailedView}
              addToCart={addToCart}
              setDetailedView={setDetailedView}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ShopPage;
