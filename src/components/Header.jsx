import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingBag } from 'react-icons/fa';
import { useCart } from './CartContext';

export default function Header() {
  const { count } = useCart();
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <Link to="/" className="brand">Vitrine</Link>
        <Link
          to="/cart"
          className="cart-link"
          data-testid="shopping-cart-button"
          aria-label={ `Carrinho, ${count} ${count === 1 ? 'item' : 'itens'}` }
        >
          <FaShoppingBag aria-hidden="true" />
          <span>Carrinho</span>
          { count > 0 && <span className="badge" data-testid="shopping-cart-size">{ count }</span> }
        </Link>
      </div>
    </header>
  );
}
