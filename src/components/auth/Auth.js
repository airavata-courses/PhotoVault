import auth0 from 'auth0-js';
import history from './history';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
const constants = require('../../config/config');

//const { userProfile, getProfile } = this.props.auth;

export default class Auth {
  constructor() {
    // this.setState({ profile: {} });

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getAccessToken = this.getAccessToken.bind(this);
    this.getIdToken = this.getIdToken.bind(this);
    this.getProfile = this.getProfile.bind(this);
    // this.renewSession = this.renewSession.bind(this);
  }

  getProfile() {
    if (!this.userProfile) {
      if (!this.accessToken) {
        console.log('Access token must exist to fetch profile');
      }

      this.auth0.client.userInfo(this.accessToken, function(err, profile) {
        if (profile) {
          //this.userProfile = profile;
          //console.log('here ', profile.nickname);
        }
      });
    } else {
    }
  }

  // getProfile(cb) {
  //   this.auth0.client.userInfo(this.accessToken, (err, profile) => {
  //     console.log('in profile');
  //     console.log(profile);
  //     if (profile) {
  //       this.userProfile = profile;
  //       console.log(this.userProfile.nickname, ' my profile');
  //       console.log(profile.sub.name);
  //       console.log(JSON.stringify(profile, null, 2));
  //     }
  //     cb(err, profile);
  //   });
  // }

  loginUser() {
    //console.log('ok');
    this.handleAuthentication();
  }

  handleAuthentication() {
    //console.log('if handleAuthentication');
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        //console.log('if setSession', authResult);

        // localStorage.setItem('user', authResult.idTokenPayload.);
        // console.log(localStorage.getItem('user'));
      } else if (err) {
        console.log(err);
        alert(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult) {
    // Set isLoggedIn flag in localStorage
    localStorage.setItem('isLoggedIn', 'true');

    // Set the time that the Access Token will expire at
    let expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
    this.accessToken = authResult.accessToken;
    this.idToken = authResult.idToken;
    this.expiresAt = expiresAt;

    // navigate to the home route
    console.log(authResult);

    //window.location.href = '/gallery';
    //this.props.history.push('/gallery');

    const newUser = {
      email: authResult.idTokenPayload.email,
      firstName: authResult.idTokenPayload.nickname
    };
    console.log('calling /google');
    axios
      .post(constants.auth + '/api/users/login/google', newUser)
      .then(res => {
        console.log(res.data);
        // Save to localStorage
        const { token } = res.data;
        // Set token to ls
        localStorage.setItem('jwtToken', token);
        // Set token to Auth header
        axios.defaults.headers.common['Authorization'] = token;
        // Decode token to get user data
        const decoded = jwt_decode(token);
        // // Set current user
        localStorage.setItem('user', decoded.id);
        localStorage.setItem('firstName', decoded.firstName);
        localStorage.setItem('lastName', decoded.lastName);
        localStorage.setItem('userEmail', decoded.email);
        //dispatch(setCurrentUser(decoded));
        //console.log(localStorage.getItem('user'));
        console.log(localStorage.getItem('user'));
        console.log(localStorage.getItem('firstName'));
        console.log(localStorage.getItem('lastName'));
        console.log(localStorage.getItem('userEmail'));
        //this.props.history.push('/gallery');
        window.location.href = '/gallery';
      });

    // .catch(err => this.setState({ errors: err.response.data }));
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }

  getAccessToken() {
    return this.accessToken;
  }

  getIdToken() {
    return this.idToken;
  }

  logout() {
    // Remove tokens and expiry time
    this.accessToken = null;
    this.idToken = null;
    this.expiresAt = 0;

    // Remove isLoggedIn flag from localStorage
    localStorage.setItem('isLoggedIn', false);
    this.userProfile = null;

    // this.auth0.logout({ return_to: window.location.origin });

    // navigate to the home route
    window.location.href = '/landing';
  }
  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = this.expiresAt;
    return new Date().getTime() < expiresAt;
  }

  auth0 = new auth0.WebAuth({
    domain: 'dev-k02c6mm5.auth0.com',
    clientID: 'OourERyoR2rtCIrXyhY0kYnetOZuL9SG',
    redirectUri: 'http://149.165.171.163/callback',
    responseType: 'token id_token',
    scope: 'openid profile email'
  });

  login() {
    this.auth0.authorize();
  }
}
