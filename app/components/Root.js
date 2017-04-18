import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import 'normalize.css/normalize.css'

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
