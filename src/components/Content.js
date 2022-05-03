import React from 'react';
import { Link } from 'react-router-dom';
import Input from './Input';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import { saveCartItens, readCartItens } from '../services/cart';

class Content extends React.Component {
  constructor() {
    super();
    this.state = {
      inputSearch: '',
      category: '',
      itemList: [],
      categories: [],
      cart: [],
    };
  }

  componentDidMount() {
    this.getFromApi();
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

  getFromApi = async () => {
    const data = await getCategories();
    this.setState({ categories: data });
  }

  handleChange = ({ target }) => {
    this.setState({
      inputSearch: target.value,
    });
  }

  handleCategory = ({ target }) => {
    this.setState({
      inputSearch: '',
      category: target.value,
    }, this.handleButton);
  }

  handleButton = async () => {
    const { inputSearch, category } = this.state;
    const itens = await getProductsFromCategoryAndQuery(category, inputSearch);
    const { results } = itens;
    this.setState({
      itemList: results,
    });
  }

  handleCart = ({ target }) => {
    const { itemList } = this.state;
    const carrinho = itemList.find((item) => item.id === target.id);
    this.setState(
      (prev) => ({ cart: [...prev.cart, carrinho] }),
      () => {
        const { cart } = this.state;
        saveCartItens(cart);
      },
    );
  };

  render() {
    const { itemList, categories } = this.state;
    return (
      <div className="content-div">
        <div className="categories">
          <h3>Categorias:</h3>
          { categories.map((category) => (
            <label htmlFor={ category.id } key={ category.id }>
              <input
                type="radio"
                data-testid="category"
                name="category"
                id={ category.id }
                value={ category.id }
                onChange={ this.handleCategory }
              />
              { category.name }
            </label>
          )) }
        </div>
        <div className="input-products-div">
          <div className="input-div">
            <Input
              handleChange={ this.handleChange }
              value={ this.inputSearch }
              handleButton={ this.handleButton }
            />
          </div>
          <div className="all-products-div">
            {itemList.length === 0
              ? (
                <p
                  data-testid="home-initial-message"
                >
                  Digite algum termo de pesquisa ou escolha uma categoria.
                </p>)
              : (
                itemList.map((item) => (
                  <div key={ item.id }>
                    <Link
                      to={ { pathname: `/product/${item.id}`,
                        state: {
                          product: { ...item },
                          name: item.title,
                          img: item.thumbnail,
                          price: item.price,
                        },
                      } }
                      data-testid="product-detail-link"
                    >
                      <div
                        data-testid="product"
                        className="product-div"
                        key={ item.id }
                      >
                        <div className="product-name">
                          <h5>{ item.title }</h5>
                        </div>
                        <div className="product-img">
                          <img src={ item.thumbnail } alt={ item.title } />
                          <p className="product-price">{ `R$${item.price}` }</p>
                        </div>
                      </div>
                    </Link>
                    <button
                      data-testid="product-add-to-cart"
                      type="button"
                      onClick={ this.handleCart }
                      id={ item.id }
                    >
                      Adicionar ao carrinho
                    </button>
                  </div>
                )))}
          </div>
          <div />
        </div>
      </div>
    );
  }
}

export default Content;
