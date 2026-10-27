import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { brl, useCart } from './CartContext';
import Price from './Price';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), 1500);
    return () => clearTimeout(timer);
  }, [added]);

  return (
    <article className="product-card" data-testid="product">
      <Link
        to={ { pathname: `/product/${product.id}`, state: { product } } }
        className="product-card-link"
        data-testid="product-detail-link"
      >
        <div className="product-card-image">
          <img src={ product.thumbnail } alt="" loading="lazy" />
        </div>
        <h3>{ product.title }</h3>
        <Price product={ product } />
      </Link>
      <button
        type="button"
        className={ `button-add${added ? ' is-added' : ''}` }
        data-testid="product-add-to-cart"
        id={ product.id }
        aria-label={ `Adicionar ${product.title} ao carrinho, ${brl(product.price)}` }
        onClick={ () => { add(product); setAdded(true); } }
      >
        { added ? 'Adicionado' : 'Adicionar ao carrinho' }
      </button>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    price: PropTypes.number.isRequired,
  }).isRequired,
};
