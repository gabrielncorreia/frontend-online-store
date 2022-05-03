import React from 'react';
import PropTypes from 'prop-types';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

class Input extends React.Component {
  render() {
    const { handleChange, handleButton } = this.props;
    return (
      <div className="header-div">
        <h2>Loja do Grupo 02</h2>

        <div className="search-cart-div">
          <input
            type="text"
            className="search-input"
            placeholder="Digite o nome de uma categoria ou produto"
            data-testid="query-input"
            onChange={ handleChange }
          />

          <button
            type="button"
            onClick={ handleButton }
            data-testid="query-button"
            className="search-button"
          >
            Pesquisar
          </button>
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

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default Input;
