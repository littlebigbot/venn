import React, { Component } from 'react';
import { MAX_PEOPLE, MIN_PEOPLE } from '../constants';
import { search, addPerson, removePerson, updatePerson, selectPerson } from '../actions'
import { connect } from 'react-redux';
import { debounce, isEmpty } from 'lodash';
import './Search.css';
import SearchResults from './SearchResults';
import { imgPrefix } from '../utility';
import { BLANK_THUMBNAIL } from '../constants';

const THUMBNAIL_PREFIX = imgPrefix(45, 45);

class Search extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.renderSearchField = this.renderSearchField.bind(this);

    this.search = p => p.query.length ? this.props.search(p).catch(console.log) : () => {}
    this.debounceSearches = props.people.map(() => debounce(this.search, 3000));
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.people.length !== this.props.people.length) {
      this.debounceSearches = nextProps.people.map(() => debounce(this.search, 3000));
    }
  }
  componentDidMount() {
    if(this.firstInput) {
      this.firstInput.focus();
    }
  }
  handleChange(i) {
    const { people, updatePerson } = this.props;
    return (e) => {
      const newQuery = e.target.value;
      if(people[i].query !== newQuery) {
        updatePerson(i, newQuery)
        // pre-reducer doesnt work for api async calls
        this.debounceSearches[i]({index: i, query: newQuery})
      }
    }
  }
  handleKeyPress(i) {
    return (e) => {
      if (e.key === 'Enter') {
        this.debounceSearches[i].cancel();
        this.search({index: i, query: e.target.value})
      }
    }
  }
  handleClick(i) {
    const { people, updatePerson } = this.props;
    return (e) => {
      if(people[i].data) {
        updatePerson(i, '')
      }
    }
  }
  renderSearchField({query, data, style}, i) {
    const { people, removePerson, searchResults, selectPerson } = this.props;

    const searchInput = <input
      value={query}
      onKeyPress={this.handleKeyPress(i)}
      onChange={this.handleChange(i)}
      autoFocus={true}
      type="search"
      ref={(input) => { if(i === 0) this.firstInput = input }}
    />;

    const chosenPerson = <div styleName="chosen-person" onClick={this.handleClick(i)}>
      {data && <img src={data.profile_path ? THUMBNAIL_PREFIX + data.profile_path : BLANK_THUMBNAIL} />}
      {data && data.name}
    </div>;

    return <div styleName="search-field" key={`input-${i}`} style={style}>
      {data ? chosenPerson : searchInput}
      {people.length > MIN_PEOPLE && <a onClick={() => removePerson(i)}>Remove</a>}
      {isEmpty(data) && <SearchResults
        results={searchResults.data[i].results}
        onSelect={(person) => selectPerson({index: i, person})}
      />}
    </div>;
  }
  render(){
    const { people, addPerson } = this.props;
    const addButton = <div styleName="search-field add" key="input-add">
      <button onClick={addPerson} onKeyPress={(e) => e.key === 'Enter' && addPerson()} tabIndex="0">Add Person</button>
    </div>;
    return <div styleName="Search">
      <div styleName="gutter-count"/>
      <div styleName="instructions">
        <h1>Hi</h1>
        Serach peope that you think want you the to see them but in the thing
        we aren't the table anything ubt we mustn't destroy the hum.
      </div>
      {people.map(this.renderSearchField)}
      {people.length < MAX_PEOPLE && addButton}
    </div>
  }
}

Search = connect(state => state, {
  search,
  addPerson,
  removePerson,
  updatePerson,
  selectPerson
})(Search)

export default Search;
