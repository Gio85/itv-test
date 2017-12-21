
import React from 'react';
import Axios from 'axios';
import CategoriesSelection from './CategoriesSelection';

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

  componentDidMount() {
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
        <CategoriesSelection
          handleChange={this.handleChange}
        />
        <div>
          {this.state.selections === '' &&
            <h3>Please select a category.</h3>}
          {this.state.selections && this.state.categories.map((programme, i) =>{
            return(
              <div key={i} className="row">
                <img className="col-md-4" src={programme._embedded.latestProduction._links.image.href} />
                <div className="col-md-8">
                  <h2>{programme.title}</h2>
                  <p>{programme.synopses.ninety}</p>
                  <p>Broadcast time: {programme._embedded.latestProduction.duration.display}</p>
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
