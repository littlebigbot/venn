import { createReducerAsync } from 'redux-act-async';
import { search } from '../actions';
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'

const searchResults = createReducerAsync(search)

const rootReducer = combineReducers({
  routing,
  searchResults
})

export default rootReducer
