import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Content from './components/Content';
import Cart from './components/Cart';
import Product from './components/Product';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Route exact path="/" component={ Content } />
          <Route exact path="/cart" component={ Cart } />
          <Route exact path="/product/:id" component={ Product } />
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
