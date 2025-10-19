import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (info, quantity) => {
    setCart([...cart, { info, quantity }]);
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
            <li>
              <NavLink to='checkout'>Checkout</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <Outlet context={{ cart, setCart, addToCart }} />
      </main>
    </div>
  );
}

export default App;
