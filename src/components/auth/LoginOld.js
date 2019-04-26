import React, { Component } from 'react';
import axios from 'axios';
import classnames from 'classnames';
import jwt_decode from 'jwt-decode';
import { Navbar, Button } from 'react-bootstrap';
const constants = require('../../config/config');

class LoginOld extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  responseGoogleNotOk = response => {
    console.log('Permission denied');
  };

  responseGoogle = response => {
    //console.log(response);
    //console.log(response.profileObj.name);
    // console.log(response.tokenObj.id_token);
    localStorage.setItem('isGoogle', 'true');
    console.log(localStorage.getItem('isGoogle'));
    const newUser = {
      email: response.profileObj.email,
      isGoogle: 'true',
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName,
      errors: {}
    };

    axios
      .post(constants.auth + '/api/users/login/google', newUser)
      .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        axios.defaults.headers.common['Authorization'] = token;
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        localStorage.setItem('user', decoded.id);
        localStorage.setItem('firstName', decoded.firstName);
        localStorage.setItem('lastName', decoded.lastName);
        localStorage.setItem('userEmail', decoded.email);
        // dispatch(setCurrentUser(decoded));
        console.log(localStorage.getItem('user'));
        this.props.history.push('/gallery');
      })
      .catch(err => this.setState({ errors: err.response.data }));
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      email: this.state.email,
      password: this.state.password,
      key: 'login'
    };

    axios
      .post(constants.auth + '/api/users/login', newUser)
      .then(res => {
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        axios.defaults.headers.common['Authorization'] = token;
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // Set current user
        localStorage.setItem('user', decoded.id);
        localStorage.setItem('firstName', decoded.firstName);
        localStorage.setItem('lastName', decoded.lastName);
        localStorage.setItem('userEmail', decoded.email);
        // dispatch(setCurrentUser(decoded));
        console.log(localStorage.getItem('user'));
        this.props.history.push('/gallery');
      })
      .catch(err => this.setState({ errors: err.response.data }));
  }

  render() {
    const errors = this.state.errors;
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-4 text-center">Log In _ Blue</h1>
                <p className="lead text-center">
                  Sign in to your PhotoVault account
                </p>

                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="email"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.email
                      })}
                      placeholder="Email Address"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className="invalid-feeback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames('form-control form-control-lg', {
                        'is-invalid': errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feeback">{errors.password}</div>
                    )}
                  </div>
                  <input
                    type="submit"
                    className="btn btn-info btn-block mt-4"
                  />
                  {/* <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.checkLogin()}
                  >
                    Log In
                  </Button> */}
                  <br />
                  <p className="lead text-center">Or</p>
                  {/* <GoogleLoginButton
                    size="35px"
                    align="center"
                    onClick={this.googleLogin()}
                  /> */}
                  <div className="lead text-center" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginOld;
