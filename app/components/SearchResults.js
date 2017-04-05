import React, { Component } from 'react'
import './SearchResults.css'

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this._select = this._select.bind(this);
    this._renderPerson = this._renderPerson.bind(this);
  }
  _select(id) {
    return () => this.props.selectPerson(id);
  }
  _renderPerson(p){
    return <div key={p.id}>
      {p.name}
      <a onClick={this._select(p)}>Select</a>
    </div>
  }
	render() {
    const { results } = this.props;
		return <div styleName="SearchResults">
			{results && results.map(this._renderPerson)}
		</div>;
	}
}

export default SearchResults;
