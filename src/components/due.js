import React from 'react';
import Axios from 'axios';

class CategoriesIndex extends React.Component {

  state = {
    categories: [],
    selection: 'Children',
    error: []
  }

  handleChange(e){
    this.setState({
      selection: e.target.value
    });
  }

  componentWillMount() {
    console.log('INSIDE WILL MOUNT');
    Axios
      .get(`http://discovery.hubsvc.itv.com/platform/itvonline/ctv/programmes?category=${this.state.selection}&broadcaster=itv&features=hls,aes`,
        {
          headers: {'Accept': 'application/vnd.itv.hubsvc.programme.v3+hal+json; charset=UTF-8'}
        })
      .then(res => this.setState({ categories: res.data._embedded.programmes }, console.log( 'THEN------>', res.data )))
      .catch(err => console.log('ERROR------>', err));
  }

  render() {
    console.log('INSIDE THE RENDER', this.state.categories);
    return(
      <main>
        <form
          onSubmit={this.handleSubmit}
          className="input-group">
          <div>
            <label htmlFor="per-page">Categories</label>
            <select
              className="form-control"
              value={this.state.selection}
              onChange={this.handleChange}
            >
              <option value="">Please select your category</option>
              <option>Children</option>
              <option>Comedy</option>
              <option>Entertainment</option>
              <option>Factual</option>
              <option>Films</option>
              <option>News</option>
              <option>Sport</option>
            </select>
          </div>
        </form>
        <div>
          {this.state.selection && this.state.categories.map((programme, i) =>{
            return(
              <article key={i} className="row">
                <img className="col-4" src={programme._embedded.latestProduction._links.image.href} />
                <div className="col-8">
                  <h2>{programme.title}</h2>
                  <p>{programme.synopses.ninety}</p>
                  <p>Broadcast time: {programme._embedded.latestProduction.duration.display} runtime</p>
                  <h6>{programme._embedded.latestProduction._embedded.channel.name} - {programme._embedded.latestProduction._embedded.channel.strapline}</h6>
                </div>
              </article>
            );
          })}
        </div>
      </main>
    );
  }

}


export default CategoriesIndex;
