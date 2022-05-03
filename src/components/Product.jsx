import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Review from './Review';
import SavedReviews from './SavedReviews';
import { saveCartItens, readCartItens } from '../services/cart';

export default class Product extends Component {
  constructor() {
    super();
    this.state = {
      cart: [],
    };
  }

  componentDidMount() {
    this.readStorage();
  }

  readStorage = () => {
    const cartItem = readCartItens();
    if (!cartItem) {
      saveCartItens([]);
    } else {
      this.setState({
        cart: cartItem,
      });
    }
  }

  handleCart = () => {
    const { location: { state: { product } } } = this.props;
    this.setState(
      (prev) => ({ cart: [...prev.cart, product] }),
      () => {
        const { cart } = this.state;
        saveCartItens(cart);
      },
    );
  };

  render() {
    const { location: { state: { name, img, price, product } } } = this.props;
    return (
      <div className="single-product-page">
        {/* <h2>Esse é o container do Produto</h2> */}
        <Link to="/">Voltar à Home</Link>
        <Link
          data-testid="shopping-cart-button"
          to="/cart"
        >
          <FaShoppingCart
            className="shopping-cart-icon"
          />
        </Link>

        <div className="single-product-detail">
          <h3 data-testid="product-detail-name">{ name }</h3>
          <img src={ img } alt="" />
          <h4>{ price }</h4>
        </div>
        <button
          data-testid="product-detail-add-to-cart"
          type="button"
          onClick={ this.handleCart }
          id={ product.id }
        >
          Adiconar ao carrinho
        </button>
        <Review />
        <SavedReviews />
      </div>
    );
  }
}

Product.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      product: PropTypes.objectOf(PropTypes.string).isRequired,
    }),
  }).isRequired,
};
