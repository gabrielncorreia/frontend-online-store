import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SavedReviews from './SavedReviews';

const VALID_EMAIL = /^\S+@\S+\.\S+$/;
const keyFor = (productId) => `reviews:${productId}`;

function readReviews(productId) {
  try {
    return JSON.parse(localStorage.getItem(keyFor(productId))) || [];
  } catch {
    return [];
  }
}

export default function Review({ productId }) {
  const [reviews, setReviews] = useState(() => readReviews(productId));
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [opinion, setOpinion] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!VALID_EMAIL.test(email)) return setError('Informe um email válido.');
    if (!rating) return setError('Escolha uma nota de 1 a 5.');
    const next = [...reviews, { email, rating, opinion: opinion.trim() }];
    localStorage.setItem(keyFor(productId), JSON.stringify(next));
    setReviews(next);
    setEmail('');
    setRating(0);
    setOpinion('');
    return setError('');
  };

  return (
    <section className="reviews" aria-labelledby="reviews-title">
      <h2 id="reviews-title">Avaliações</h2>
      <form className="review-form" onSubmit={ handleSubmit } noValidate>
        <label htmlFor="review-email" className="field">
          Email
          <input id="review-email" type="email" value={ email } placeholder="voce@email.com" onChange={ ({ target }) => setEmail(target.value) } />
        </label>
        <fieldset className="stars-input">
          <legend>Nota</legend>
          { [1, 2, 3, 4, 5].map((value) => (
            <label key={ value } htmlFor={ `star-${value}` } className={ value <= rating ? 'is-on' : '' }>
              <input
                type="radio"
                id={ `star-${value}` }
                name="rating"
                value={ value }
                checked={ rating === value }
                onChange={ () => setRating(value) }
              />
              <span aria-hidden="true">★</span>
              <span className="visually-hidden">{ `${value} de 5` }</span>
            </label>
          )) }
        </fieldset>
        <label htmlFor="review-opinion" className="field">
          Comentário (opcional)
          <textarea
            id="review-opinion"
            data-testid="product-detail-evaluation"
            rows="3"
            value={ opinion }
            placeholder="O que achou do produto?"
            onChange={ ({ target }) => setOpinion(target.value) }
          />
        </label>
        { error && <p className="form-error" role="alert">{ error }</p> }
        <button type="submit" className="button-secondary">Enviar avaliação</button>
      </form>

      { reviews.length === 0
        ? <p className="muted">Ainda não há avaliações para este produto.</p>
        : <ul className="review-list">{ reviews.map((review, i) => <SavedReviews key={ i } { ...review } />) }</ul> }
    </section>
  );
}

Review.propTypes = {
  productId: PropTypes.string.isRequired,
};
