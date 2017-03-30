import React, { cloneElement } from 'react'
import { connect } from 'react-redux'
// import Header from 'common/components/Header'
// import { logout } from '../actions'
import _ from 'lodash';

function App(props){
  return <div>WHY THIS{props.children}</div>
}

// export default connect(state => state, {
//   logout: logout.request
// })(App)

export default App;
