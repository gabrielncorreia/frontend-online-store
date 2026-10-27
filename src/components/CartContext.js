import React, { createContext, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import * as store from '../services/cart';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(store.readCart);

  useEffect(() => store.saveCart(cart), [cart]);

  const value = {
    cart,
    count: store.cartCount(cart),
    total: store.cartTotal(cart),
    add: (product, quantity) => setCart((current) => store.addItem(current, product, quantity)),
    setQuantity: (id, quantity) => setCart((current) => store.setQuantity(current, id, quantity)),
    clear: () => setCart([]),
  };

  return <CartContext.Provider value={ value }>{ children }</CartContext.Provider>;
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useCart = () => useContext(CartContext);

export const brl = (value) => Number(value)
  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
