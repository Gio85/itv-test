
import React from 'react';
import Axios from 'axios';

class CategoriesIndex extends React.Component {

  state = {
    categories: [],
    selections: '',
    error: []
  }

  handleChange = ({ target: { value }}) => {
    this.setState({ selections: value },
      () => this.getProgrammes() );
  }

  componentWillMount() {
    console.log('INSIDE DID-MOUNT');
    this.getProgrammes();
  }

  getProgrammes = () => {
    Axios
      .get(`http://discovery.hubsvc.itv.com/platform/itvonline/ctv/programmes?category=${this.state.selections}&broadcaster=itv&features=hls,aes`,
        {
          headers: {
            'Accept': 'application/vnd.itv.hubsvc.programme.v3+hal+json; charset=UTF-8'
          }
        })
      .then(res => this.setState({ categories: res.data._embedded.programmes }, console.log( 'THEN------>', res.data._embedded.programmes )))
      .catch(err => console.log('ERROR------>', err));
  }

  render() {
    console.log('INSIDE THE RENDER', this.state.categories);
    return(
      <main>
        <header className="row">
          <img className="logo" src="http://www.show-girls.co.uk/wp-content/uploads/2015/06/itv-logo.png" />
          <h1>ITV Programmes</h1>
          <p>Please select a category</p>
          <form
            className="col-md-6">
            <div>
              <label htmlFor="per-page"></label>
              <select
                className="form-control"
                value={this.state.selections}
                onChange={this.handleChange}
                placeholder='Select'
              >
                <option value="" disabled>Please select</option>
                <option>Children</option>
                <option>Comedy</option>
                <option value="Drama+%26+Soaps">Drama & Soaps</option>
                <option>Entertainment</option>
                <option>Factual</option>
                <option>Films</option>
                <option>News</option>
                <option>Sport</option>
              </select>
            </div>
          </form>
        </header>
        <div>
          {this.state.selections && this.state.categories.map((programme, i) =>{
            return(
              <div key={i} className="row">
                <img className="col-md-4" src={programme._embedded.latestProduction._links.image.href} />
                <div className="col-md-8">
                  <h2>{programme.title}</h2>
                  <p>{programme.synopses.ninety}</p>
                  <p>Broadcast time: {programme._embedded.latestProduction.duration.display} runtime</p>
                  <h6>{programme._embedded.latestProduction._embedded.channel.name} - {programme._embedded.latestProduction._embedded.channel.strapline}</h6>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    );
  }

}


export default CategoriesIndex;
