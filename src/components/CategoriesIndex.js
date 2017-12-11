import React from 'react';
import Axios from 'axios';

class CategoriesIndex extends React.Component {
  state = {
    categories: [],
    error: null
  };

  componentDidMount(){
    Axios.get('http://discovery.hubsvc.itv.com/platform/itvonline/ctv/programmes?', {
      headers: { 'Accept': 'application/hal+json; charset=UTF-8'}})
      .then(res => this.setState({ categories: res.data }))
      .catch(err => this.setState({ error: err.response.data.message }));
  }

  render() {
    console.log('ERROR', this.state.categories);
    return(
      <main>
        <h2>Categories</h2>
        <ul id="categories">
          {this.state.categories._embedded && this.state.categories._embedded.map(category => {
            <li key={category.id}>
              <strong>{category.name}</strong>
            </li>;
          })}
        </ul>
      </main>
    );
  }


}

export default CategoriesIndex;
