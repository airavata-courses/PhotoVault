import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import setAuthToken from './utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Gallery from './components/layout/PhotoGallery';

import './App.css'; 

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
    window.location.href = '/login';
  }
}

class App extends Component {
  constructor() {
    super();

    localStorage.clear();
  }
  render() {
    const PrivateRoute = () =>
      localStorage.getItem('user') === null ? (
        <Route exact path="/gallery" component={Login} />
      ) : (
        <Route exact path="/gallery" component={Gallery} />
      );
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />

          <div className="container">
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />

            <PrivateRoute exact path="/gallery" component={Gallery} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
