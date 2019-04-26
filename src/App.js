import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import LoginOld from './components/auth/LoginOld';
import Register from './components/auth/Register';
import Gallery from './components/layout/PhotoGallery';
import history from './components/auth/history';
import Auth from './components/auth/Auth.js';

import './App.css';
import Callback from './components/auth/Callback';
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  console.log(nextState.location.hash);
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  localStorage.setItem('user', decoded.id);

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    // Redirect to login
    window.location.href = '/';
  }
}

class App extends Component {
  constructor() {
    super();

    //localStorage.clear();
  }
  render() {
    const PrivateRoute = () => (
      <Route exact path="/gallery" component={Gallery} />
    );
    // localStorage.getItem('user') === null ? (
    //   <Route exact path="/gallery" component={Login} />
    // ) : (
    //   <Route exact path="/gallery" component={Gallery} />
    // );
    return (
      <Router history={history}>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />

          <div className="container">
            <Route
              exact
              path="/login"
              render={props => <Login auth={auth} {...props} />}
            />
            <Route exact path="/regular" component={LoginOld} />
            <Route exact path="/register" component={Register} />
            {/* <Route exact path="/callback" component={Callback} /> */}
            <PrivateRoute exact path="/gallery" component={Gallery} />
            <Route
              path="/callback"
              render={props => {
                handleAuthentication(props);
                return <Callback {...props} />;
              }}
            />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
