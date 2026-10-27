import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { CartProvider } from './components/CartContext';
import Header from './components/Header';
import Content from './components/Content';
import Cart from './components/Cart';
import Product from './components/Product';
import './App.css';

export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={ Content } />
          <Route exact path="/cart" component={ Cart } />
          <Route exact path="/product/:id" component={ Product } />
        </Switch>
      </HashRouter>
    </CartProvider>
  );
}
