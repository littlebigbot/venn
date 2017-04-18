import React, { Component } from 'react'
import './SearchResults.css'
import { imgPrefix } from '../utility';
import { BLANK_THUMBNAIL } from '../constants';

const THUMBNAIL_PREFIX = imgPrefix(45, 45);

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this._renderResult = this._renderResult.bind(this);
  }
  _renderResult(p){
    return <li styleName="result" key={p.id} onClick={() => this.props.onSelect(p)}>
      <img src={p.profile_path ? THUMBNAIL_PREFIX + p.profile_path : BLANK_THUMBNAIL} />
      {p.name}
    </li>
  }
	render() {
    const { results } = this.props;
		return <ul styleName="SearchResults">
			{results && results.map(this._renderResult)}
		</ul>;
	}
}

export default SearchResults;
