import React, { Component } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default class Header extends Component {
  render() {
    return (
      <div className="header-div">
        <h2>Loja do Grupo 02</h2>

        <div className="search-cart-div">
          <input
            type="text"
            className="search-input"
            placeholder="Digite o nome de uma categoria ou produto"
          />
          <Link
            to="/cart"
            data-testid="shopping-cart-button"
          >
            <FaShoppingCart
              className="shopping-cart-icon"
            />
          </Link>
        </div>
      </div>
    );
  }
}
