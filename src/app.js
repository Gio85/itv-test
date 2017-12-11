import React from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import 'bootstrap-css-only';
import './scss/style.scss';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      categories: null,
      error: null };
  }

  componentDidMount(){
    Axios.get('http://discovery.hubsvc.itv.com/platform/itvonline/ctv/categories?', {
      headers: { 'Accept': 'application/vnd.itv.hubsvc.category.v2+hal+json; charset=UTF-8'}})
      .then(res => this.setState({ categories: res.data }), console.log(this.state) )
      .catch(err => this.setState({ error: err.response.data.message }));
  }


  render() {
    return (
      <main>
        <h1>ITV channels</h1>

      </main>
    );
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
