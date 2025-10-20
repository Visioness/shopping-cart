import { useRef, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Cart from './components/Cart/Cart';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const checkoutRef = useRef(null);

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
        <h1 className='title'>Shodin</h1>
        <nav className='navigation'>
          <ul>
            <li>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li>
              <NavLink to='shop'>Shop</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <button type='button' onClick={handleModal}>
        CheckOut, {cart.length} items!
      </button>
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
