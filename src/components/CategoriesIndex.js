import React from 'react';
import Axios from 'axios';

class CategoriesIndex extends React.Component {

  constructor(){
    super();
    this.state = {
      selections: [],
      programmes: [],
      error: null
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({
      selections: e.target.value
    });
  }

  componentDidMount(){
    Axios
      .get(`http://discovery.hubsvc.itv.com/platform/itvonline/ctv/programmes?category=${this.state.selections}&broadcaster=itv&features=hls,aes`,
        {
          headers: {'Accept': 'application/vnd.itv.hubsvc.programme.v3+hal+json; charset=UTF-8'}
        })
      .then(res => this.setState({ programmes: res.data._embedded }, console.log('INSIDE THE----->', res.data)))
      .catch(err => console.log('ERROR----------->', err));

  }


  render() {
    console.log('INSIDE THE RENDER', this.state.programmes);
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
          {this.state.programmes && this.state.programmes.map((programme, i) =>{
            return(
              <article key={i} className="row">
                <img className="col-4" src={programme.latestProduction._links.image.href} />
                {/* <div className="col-8">
                  <h2>{programme.title}</h2>
                  <p>{programme.synopses.ninety}</p>
                  <p>Broadcast time: {programme.latestProduction.duration.display} runtime</p>
                  <p>{programme.latestProduction.guidance}</p>
                  <h6>{programme.latestProduction._embedded.channel.name} - {programme.latestProduction.channel.strapline}</h6>
                </div> */}
              </article>
            );
          })}
        </div>
      </main>
    );
  }

}


export default CategoriesIndex;
