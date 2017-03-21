import React from 'react'
import { Route, Switch } from 'react-router'
import App from './components/App'
import SearchPage from './components/SearchPage'

export default (
	<div>
	  	<Route path="/" component={App} />
	    <Route path="/search" component={SearchPage}/>
  	</div>
);
