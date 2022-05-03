import React, { Component } from 'react';
import { Rating } from 'react-simple-star-rating';
import SavedReviews from './SavedReviews';

export default class Review extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      email: '',
      rating: 0,
      opinion: '',
    };
  }

  componentDidMount() {
    const opinions = JSON.parse(localStorage.getItem('opinions'));
    if (!opinions) return localStorage.setItem('opinions', JSON.stringify([]));
    this.handleOpinions(opinions);
  }

  handleOpinions = (opinions) => {
    this.setState({ reviews: opinions });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleRating = (value) => {
    this.setState({ rating: value });
  }

  handleClick = () => {
    const { email, rating, opinion } = this.state;
    const actualReview = {
      email,
      rating,
      opinion,
    };
    this.setState(
      (prevState) => ({ reviews: [...prevState.reviews, actualReview] }),
      () => {
        const { reviews } = this.state;
        localStorage.setItem('opinions', JSON.stringify(reviews));
      },
    );
  }

  render() {
    const { reviews, email, rating, opinion } = this.state;
    return (
      <div>
        <h4>Avalie o produto:</h4>
        <form>
          <input
            type="email"
            name="email"
            value={ email }
            placeholder="Seu e-mail"
            onChange={ this.handleChange }
          />
          <div>
            Nota:
            <Rating onClick={ this.handleRating } ratingValue={ rating } />
          </div>
          <textarea
            data-testid="product-detail-evaluation"
            name="opinion"
            rows="5"
            cols="21"
            placeholder="Digite sua opinião aqui (opcional)"
            value={ opinion }
            onChange={ this.handleChange }
          />
          <div>
            <button
              type="button"
              onClick={ this.handleClick }
            >
              Avaliar
            </button>
          </div>
        </form>
        { reviews
        && reviews.map((review, i) => <SavedReviews key={ i } { ...review } />) }
      </div>
    );
  }
}
