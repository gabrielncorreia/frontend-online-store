import React from 'react';
import { Link } from 'react-router-dom';
import { brl, useCart } from './CartContext';

export default function Cart() {
  const { cart, count, total, setQuantity } = useCart();

  if (cart.length === 0) {
    return (
      <main className="page cart-empty">
        <h1>Carrinho</h1>
        <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
        <Link to="/" className="button-primary">Buscar produtos</Link>
      </main>
    );
  }

  return (
    <main className="page">
      <h1 className="page-title">Carrinho</h1>
      <div className="cart-layout">
        <ul className="cart-list">
          { cart.map((item) => (
            <li key={ item.id } className="cart-line">
              <Link to={ { pathname: `/product/${item.id}`, state: { product: item } } } className="cart-line-image">
                <img src={ item.thumbnail } alt="" />
              </Link>
              <div className="cart-line-info">
                <p data-testid="shopping-cart-product-name">{ item.title }</p>
                <p className="muted">{ `${brl(item.price)} cada` }</p>
              </div>
              <div className="stepper" aria-label={ `Quantidade de ${item.title}` }>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  aria-label="Diminuir quantidade"
                  disabled={ item.quantity <= 1 }
                  onClick={ () => setQuantity(item.id, item.quantity - 1) }
                >
                  −
                </button>
                <span data-testid="shopping-cart-product-quantity">{ item.quantity }</span>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  aria-label="Aumentar quantidade"
                  onClick={ () => setQuantity(item.id, item.quantity + 1) }
                >
                  +
                </button>
              </div>
              <p className="cart-line-total">{ brl(item.price * item.quantity) }</p>
              <button
                type="button"
                className="link-button"
                aria-label={ `Remover ${item.title}` }
                onClick={ () => setQuantity(item.id, 0) }
              >
                Remover
              </button>
            </li>
          )) }
        </ul>
        <aside className="summary">
          <h2>Resumo</h2>
          <p className="summary-row">
            <span>{ `${count} ${count === 1 ? 'item' : 'itens'}` }</span>
            <span>{ brl(total) }</span>
          </p>
          <p className="summary-row summary-total">
            <span>Total</span>
            <span>{ brl(total) }</span>
          </p>
          <Link to="/" className="button-secondary">Continuar comprando</Link>
        </aside>
      </div>
    </main>
  );
}
