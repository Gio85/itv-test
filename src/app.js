import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';

import CategoriesIndex from './components/CategoriesIndex';

import 'bootstrap-css-only';
import './scss/style.scss';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <main>
          <img src="http://www.show-girls.co.uk/wp-content/uploads/2015/06/itv-logo.png" />
          <h1>ITV channels</h1>
          <Route path="/" component={CategoriesIndex} />
        </main>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
