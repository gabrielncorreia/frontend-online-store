import React, { Component } from 'react';
import { RatingView } from 'react-simple-star-rating';
import PropTypes from 'prop-types';

export default class SavedReviews extends Component {
  render() {
    const { email, rating, opinion } = this.props;
    return (
      <div id="review-div">
        <div className="review">
          <h2>{ email }</h2>
          Nota:
          <RatingView ratingValue={ rating } />
          <p>{ opinion }</p>
        </div>
      </div>
    );
  }
}

SavedReviews.propTypes = {
  email: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  opinion: PropTypes.string.isRequired,
};
