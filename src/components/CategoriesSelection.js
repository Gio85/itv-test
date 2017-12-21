import React from 'react';

const CategoriesSelection = ({ handleChange }) => {
  const state = {
    selections: ''
  };

  return(
    <main>
      <header className="row">
        <img className="logo" src="http://www.show-girls.co.uk/wp-content/uploads/2015/06/itv-logo.png" />
        <h1>ITV Programmes</h1>
        <form
          className="col-md-6">
          <div>
            <label htmlFor="per-page"></label>
            <select
              className="form-control"
              onChange={handleChange}
              placeholder='Select'
              defaultValue={state.selections}
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
    </main>
  );

};


export default CategoriesSelection;
