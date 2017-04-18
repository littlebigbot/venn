import React from 'react'
import { Route, Switch, NavLink } from 'react-router'
import HomePage from './components/HomePage'
import VennPage from './components/VennPage'
import Header from './components/Header';

export default (
  <div>
    <Header/>
    <Route exact path="/" component={HomePage} />
    <Route path="/venn" component={VennPage}/>
  </div>
);
