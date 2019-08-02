import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import Signin from './Signin'
import Signup from './Signup'
import Home from './Home'
import EnterOtp from './EnterOtp'
import ForgotPassword from './ForgotPassword'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path="/Signin" component={Signin} />
      <Route path="/Signup" component={Signup} />
      <Route path="/Home" component={Home} />
      <Route path="/EnterOTP/:userid" component={EnterOtp} />
      <Route path="/ForgotPassword" component={ForgotPassword} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root