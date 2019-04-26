import React, { Component } from 'react';
import { Link } from 'react-router-dom';
class Landing extends Component {
  render() {
    if (
      localStorage.getItem('user') === null ||
      localStorage.getItem('user') === ''
    )
      return (
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">PhotoVault</h1>
                  <p className="lead">Click. Upload. Publish</p>
                  <hr />
                  <Link to="/regular" className="btn btn-lg btn-info mr-2">
                    Login with PhotoVault
                  </Link>
                  <Link to="/login" className="btn btn-lg btn-light">
                    Social Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    else
      return (
        <div className="landing">
          <div className="dark-overlay landing-inner text-light">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">PhotoVault</h1>
                  <p className="lead">Click. Upload. Publish</p>
                  <hr />
                  <Link to="/gallery" className="btn btn-lg btn-info mr-2">
                    View Gallery
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}
export default Landing;
