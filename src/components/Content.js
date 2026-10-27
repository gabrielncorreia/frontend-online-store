import React, { useEffect, useState } from 'react';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';
import ProductCard from './ProductCard';

const SUGGESTIONS = ['celular', 'notebook', 'fone de ouvido', 'geladeira', 'tênis'];

export default function Content() {
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');
  const [results, setResults] = useState(null);
  const [heading, setHeading] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | error

  useEffect(() => {
    getCategories().then(setCategories).catch(() => setCategories([]));
  }, []);

  const load = async (term, categoryId, title) => {
    setStatus('loading');
    setHeading(title);
    try {
      const data = await getProductsFromCategoryAndQuery(categoryId, term);
      setResults(data.results);
      setStatus('idle');
    } catch {
      setStatus('error');
    }
  };

  const searchFor = (term) => {
    const trimmed = term.trim();
    if (!trimmed) return;
    setQuery(trimmed);
    setCategory('');
    load(trimmed, '', `Resultados para "${trimmed}"`);
  };

  const pickCategory = ({ id, name }) => {
    setQuery('');
    setCategory(id);
    load('', id, name);
  };

  return (
    <main className="home">
      <form
        className="search"
        role="search"
        onSubmit={ (event) => { event.preventDefault(); searchFor(query); } }
      >
        <label htmlFor="query-input" className="visually-hidden">Buscar produtos</label>
        <input
          id="query-input"
          type="search"
          placeholder="Buscar produtos, marcas e mais"
          value={ query }
          data-testid="query-input"
          onChange={ ({ target }) => setQuery(target.value) }
        />
        <button type="submit" className="button-primary" data-testid="query-button">Buscar</button>
      </form>

      <div className="home-layout">
        <nav className="categories" aria-label="Categorias">
          <h2>Categorias</h2>
          <ul>
            { categories.map((item) => (
              <li key={ item.id }>
                <label htmlFor={ item.id } className={ category === item.id ? 'is-active' : '' }>
                  <input
                    type="radio"
                    data-testid="category"
                    name="category"
                    id={ item.id }
                    value={ item.id }
                    checked={ category === item.id }
                    onChange={ () => pickCategory(item) }
                  />
                  { item.name }
                </label>
              </li>
            )) }
          </ul>
        </nav>

        <section className="results" aria-live="polite" aria-busy={ status === 'loading' }>
          { results === null && status === 'idle' && (
            <div className="welcome" data-testid="home-initial-message">
              <h1>Produtos reais do Mercado Livre, com preços em reais</h1>
              <p>Busque um produto ou escolha uma categoria. Mostramos os mais vendidos de cada categoria.</p>
              <div className="suggestions">
                { SUGGESTIONS.map((term) => (
                  <button key={ term } type="button" onClick={ () => searchFor(term) }>{ term }</button>
                )) }
              </div>
            </div>
          ) }

          { status === 'loading' && <p className="status">Buscando produtos...</p> }
          { status === 'error' && (
            <p className="status">Não foi possível carregar os produtos. Tente de novo em alguns segundos.</p>
          ) }

          { results !== null && status === 'idle' && (
            <>
              <h1 className="results-heading">{ heading }</h1>
              { results.length === 0 ? (
                <p className="status">Nenhum produto encontrado. Tente outra palavra ou escolha uma categoria.</p>
              ) : (
                <div className="product-grid">
                  { results.map((product) => <ProductCard key={ product.id } product={ product } />) }
                </div>
              ) }
            </>
          ) }
        </section>
      </div>
    </main>
  );
}
