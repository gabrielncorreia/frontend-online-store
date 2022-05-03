import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class ProductCart extends Component {
  constructor() {
    super();
    this.state = {
      isButtonDisabled: true,
    };
  }

  componentDidMount() {
    this.addProductToState();
  }

  addProductToState = () => {
    const { price } = this.props;

    this.setState({
      quantity: 1,
      price,
      originalPrice: price,
    });
  }

  addProduct = () => {
    const { originalPrice } = this.state;

    this.setState((prevState) => ({
      quantity: prevState.quantity + 1,
      isButtonDisabled: false,
      price: originalPrice * (prevState.quantity + 1),
    }));

    // console.log(quantity)
  }

  removeOneProduct = () => {
    const { quantity, originalPrice } = this.state;

    if (quantity === 2) {
      this.setState({ isButtonDisabled: true });
    }

    this.setState((prevState) => ({
      quantity: prevState.quantity - 1,
      price: prevState.price - originalPrice,
    }));

    // console.log(price)
  }

  removeWholeProduct = () => {
    console.log('removeu!');
  }

  render() {
    const { id, title, thumbnail } = this.props;
    // console.log(title);
    const { isButtonDisabled, quantity, price } = this.state;
    return (
      <div className="product-cart-div">
        <div className="name-img-div">
          <div className="product-cart-name">
            <h6 data-testid="shopping-cart-product-name">
              { title }
            </h6>
          </div>
          <div className="product-img">
            <img src={ thumbnail } alt={ title } />
          </div>
          <div />
        </div>
        <div className="quantity-price-div">
          <div className="quantity-price-div">
            <button
              type="button"
              disabled={ isButtonDisabled }
              onClick={ this.removeOneProduct }
              id={ id }
              data-testid="product-decrease-quantity"
            >
              -
            </button>
            <p
              className="product-quantity"
              data-testid="shopping-cart-product-quantity"
              id={ id }
            >
              { `Quantidade: ${quantity}` }
            </p>
            <button
              type="button"
              onClick={ this.addProduct }
              id={ id }
              data-testid="product-increase-quantity"
            >
              +
            </button>
            <p className="product-price">{`R$${price}`}</p>
            <button type="button" onClick={ this.removeWholeProduct }>Remover</button>
          </div>
        </div>
      </div>
    );
  }
}

ProductCart.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
};
