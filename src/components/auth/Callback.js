import React, { Component } from 'react';
import loading from '../../loading.svg';
import history from './history';
import { BrowserRouter as Router, Route } from 'react-router-dom';

class Callback extends Component {
  render() {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white'
    };
    return (
      <Router history={history}>
        <div style={style}>
          <img src={loading} alt="loading" />
        </div>
      </Router>
    );
  }
}

export default Callback;
