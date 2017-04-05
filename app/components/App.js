import React, { cloneElement } from 'react'
import { connect } from 'react-redux'
// import Header from 'common/components/Header'
// import { logout } from '../actions'
import _ from 'lodash';

// I dunno if we need this but we'll see
function App(props){
  return <div>{props.children}</div>
}

// export default connect(state => state, {
//   logout: logout.request
// })(App)

export default App;
