import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { readCartItens } from '../services/cart';
import ProductCart from './ProductCart';

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.readStorage();
  }

  componentDidUpdate() {
    this.totalCart();
  }

  itensCount = (id) => {
    const { cart } = this.state;
    const itens = cart.filter((item) => item.id === id);

    return itens.length;
  }

  readStorage = () => {
    const cartItens = readCartItens();
    this.setState({
      cart: cartItens,
    });
  }

  removeProduct = () => {
    console.log('removeu!');
  }

  totalCart = () => {
    const { cart } = this.state;
    const allPrices = cart.map((product) => Number(product.price));
    const totalPrices = allPrices
      .reduce((prevValue, currentValue) => prevValue + currentValue, 0);

    return totalPrices;
  }

  render() {
    // console.log(this.state.cart);
    // console.log(this.totalCart)
    const { cart } = this.state;
    return (
      <div className="cart-div">
        <div className="cart-header">
          <h2>Carrinho de compras</h2>
          <Link to="/">Voltar à Home</Link>
        </div>
        <div className="cart-products-div">
          {cart.length === 0
            ? (
              <h3 data-testid="shopping-cart-empty-message">
                Seu carrinho está vazio
              </h3>
            ) : (
              cart.map((item) => (
                <div key={ item.id }>
                  <ProductCart
                    { ...item }
                    totalPriceCallback={ () => {} }
                  />
                </div>
              )))}
        </div>
        <div>
          <h3>{`Total da compra: R$${this.totalCart()}`}</h3>
        </div>
      </div>
    );
  }
}
