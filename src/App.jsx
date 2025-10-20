import { House, Handbag, ShoppingCart } from 'lucide-react';
import { useRef, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const checkoutRef = useRef(null);
  const location = useLocation();

  const addToCart = (info, quantity) => {
    setCart([...cart, { info, quantity }]);
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((product) => product.info.id !== id));
  };

  const quantityChange = (id, quantity) => {
    setCart(
      cart.map((product) =>
        product.info.id === id ? { ...product, quantity } : product
      )
    );
  };

  const handleModal = () => {
    checkoutRef.current.showModal();
  };

  return (
    <div className='app'>
      <header>
        <NavLink to='/'>
          <h1 className='title'>Shodin</h1>
        </NavLink>
        <nav className='navigation'>
          <ul>
            <li>
              <NavLink to='/'>
                <span>Home</span>
                <House size={32} color='black' strokeWidth={2} />
              </NavLink>
            </li>
            <li>
              <NavLink to='shop'>
                <span>Shop</span>
                <Handbag size={32} color='black' strokeWidth={2} />
              </NavLink>
            </li>
          </ul>
        </nav>
      </header>
      {(location.pathname !== '/' || cart.length > 0) && (
        <button type='button' onClick={handleModal}>
          <ShoppingCart size={32} color='black' strokeWidth={2} />
        </button>
      )}
      <main>
        <Outlet context={{ cart, addToCart, removeFromCart }} />
        <Cart
          cart={cart}
          checkoutRef={checkoutRef}
          onQuantityChange={quantityChange}
          onRemove={removeFromCart}
        />
      </main>
    </div>
  );
}

export default App;
