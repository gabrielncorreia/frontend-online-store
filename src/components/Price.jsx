import React from 'react';
import PropTypes from 'prop-types';
import { brl } from './CartContext';

export default function Price({ product, large }) {
  const { price, original_price: original, free_shipping: freeShipping } = product;
  const discount = original > price ? Math.round((1 - price / original) * 100) : 0;
  return (
    <div className={ `price${large ? ' price-large' : ''}` }>
      { discount > 0 && (
        <p className="price-original">
          <s>{ brl(original) }</s>
          <span className="discount">{ `${discount}% off` }</span>
        </p>
      ) }
      <p className="price-current">{ brl(price) }</p>
      { freeShipping && <p className="free-shipping">Frete grátis</p> }
    </div>
  );
}

Price.propTypes = {
  product: PropTypes.shape({
    price: PropTypes.number.isRequired,
    original_price: PropTypes.number,
    free_shipping: PropTypes.bool,
  }).isRequired,
  large: PropTypes.bool,
};

Price.defaultProps = {
  large: false,
};
