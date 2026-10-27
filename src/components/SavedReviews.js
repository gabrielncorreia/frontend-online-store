import React from 'react';
import PropTypes from 'prop-types';

export default function SavedReviews({ email, rating, opinion }) {
  return (
    <li className="review">
      <p className="review-head">
        <span className="stars" aria-label={ `Nota ${rating} de 5` }>
          { '★'.repeat(rating) }
          <span className="stars-off">{ '★'.repeat(5 - rating) }</span>
        </span>
        <span className="muted">{ email }</span>
      </p>
      { opinion && <p>{ opinion }</p> }
    </li>
  );
}

SavedReviews.propTypes = {
  email: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  opinion: PropTypes.string,
};

SavedReviews.defaultProps = {
  opinion: '',
};
