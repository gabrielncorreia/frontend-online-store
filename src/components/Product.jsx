import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProduct } from '../services/api';
import { useCart } from './CartContext';
import Price from './Price';
import Review from './Review';

export default function Product({ match: { params: { id } }, location }) {
  const fromList = location.state && location.state.product;
  const [product, setProduct] = useState(fromList || null);
  const [status, setStatus] = useState(fromList ? 'ready' : 'loading');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { add } = useCart();

  // Opened from a shared link or after a reload: there is no list data, so fetch it.
  useEffect(() => {
    if (fromList) return;
    getProduct(id)
      .then((data) => { setProduct(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, [id, fromList]);

  if (status === 'loading') return <main className="page"><p className="status">Carregando produto...</p></main>;
  if (status === 'error') {
    return (
      <main className="page">
        <p className="status">Produto não encontrado ou sem oferta ativa.</p>
        <Link to="/" className="back-link">Voltar para a busca</Link>
      </main>
    );
  }

  return (
    <main className="page">
      <Link to="/" className="back-link">Voltar para a busca</Link>
      <article className="product-detail">
        <div className="product-detail-image">
          <img src={ product.thumbnail } alt={ product.title } />
        </div>
        <div className="product-detail-info">
          <h1 data-testid="product-detail-name">{ product.title }</h1>
          <Price product={ product } large />
          <div className="buy-row">
            <div className="stepper" aria-label="Quantidade">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                disabled={ quantity <= 1 }
                onClick={ () => setQuantity(quantity - 1) }
              >
                −
              </button>
              <span aria-live="polite">{ quantity }</span>
              <button type="button" aria-label="Aumentar quantidade" onClick={ () => setQuantity(quantity + 1) }>+</button>
            </div>
            <button
              type="button"
              className="button-primary"
              data-testid="product-detail-add-to-cart"
              onClick={ () => { add(product, quantity); setAdded(true); } }
            >
              Adicionar ao carrinho
            </button>
          </div>
          { added && (
            <p className="added-note" role="status">
              Adicionado ao carrinho.
              { ' ' }
              <Link to="/cart">Ver carrinho</Link>
            </p>
          ) }
        </div>
      </article>
      <Review productId={ product.id } />
    </main>
  );
}

Product.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) }).isRequired,
  location: PropTypes.shape({ state: PropTypes.shape({ product: PropTypes.object }) }).isRequired,
};
