import React, { Component } from 'react'
import { connect } from 'react-redux'
import { search, addPerson, removePerson, updatePerson, selectPerson } from '../actions'
import SearchResults from './SearchResults';
import Intersection from './Intersection';
import { debounce, isEmpty, partial } from 'lodash';
import './SearchPage.css'

class SearchPage extends Component {
	search = debounce(this.props.search, 3000);
	constructor(props) {
		super(props);
    this._handleChange = this._handleChange.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);
    this._renderSearchResults = this._renderSearchResults.bind(this);
    this._renderSearchInput = this._renderSearchInput.bind(this);
    this.state = {
      searches: props.people.map(() => this.search)
    }
	}
  componentWillReceiveProps({people}) {
    if(this.props.people.length !== people.length) {
      this.setState({
        searches: people.map(() => this.search)
      });
    }
  }
	_handleChange(i) {
		return (e) => {
      this.props.updatePerson(i, e.target.value)
      const payload = {index: i, query: e.target.value};
      this.state.searches[i](payload);
		}
	}
  _handleKeyPress(i) {
    return (e) => {
      if (e.key === 'Enter') {
        this.state.searches[i].cancel();
        this.props.search({index: i, query: e.target.value})
      }
    }
  }
  _selectPerson(index) {
    return (person) => {
      this.props.selectPerson({index, person});
    }
  }
  _renderSearchResults({results}, i) {
    return <SearchResults results={results} key={i} selectPerson={this._selectPerson(i)} />;
  }
  _renderSearchInput({query}, i) {
    return <input key={i} value={query} onKeyPress={this._handleKeyPress(i)} onChange={this._handleChange(i)} />
  }
	render() {
    const { people, addPerson, removePerson, searchResults } = this.props;
    const noResults = searchResults.data.every(isEmpty) && !searchResults.loading
		return <div className="SearchPage">
      <header>
  			{people.map(this._renderSearchInput)}
        {people.length < 5 && <a onClick={addPerson}>Add Person</a>}
        {people.length > 2 && <a onClick={removePerson}>Remove Person</a>}
      </header>
      <div className="search-results-wrapper">
  			{noResults && <div>No Results</div>}
        {searchResults.loading && <div>Searching</div>}
        {(!searchResults.loading && !noResults) && searchResults.data.map(this._renderSearchResults)}
      </div>
      <Intersection people={people} />
		</div>;
	}
}

SearchPage = connect(state => state, {
  search,
  addPerson,
  removePerson,
  updatePerson,
  selectPerson
})(SearchPage)

export default SearchPage;
