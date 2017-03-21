import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
//import { Router } from 'react-router'
import { ConnectedRouter } from 'react-router-redux'

class Root extends Component {
	render() {
		const { store, routes, history } =  this.props;
		return (
		<Provider store={store}>
		  <ConnectedRouter history={history} children={routes} />
		</Provider>
		);
	}
}

Root.propTypes = {
  store: PropTypes.object.isRequired
}
export default Root
