import React, { Component } from 'react'
import { connect } from 'react-redux'
import { search } from '../actions'
import _ from 'lodash';

class SearchPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			people: []
		}
	}
	_handleChange(i) {
		return (e) => {
			const people = this.state;
			const person = e.target.value
			people[i] = person;
			this.setState({people})
			this.props.search(person);
		}
	}
	render() {
		return (<div>
			doof
			{this.state.people.map((p, i) => <input key={i} value={p} onChange={this._handleChange(e).bind(this)} />)}
		</div>);
	}
}

SearchPage = connect(state => state, {
  search
})(SearchPage)

export default SearchPage;
