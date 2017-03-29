import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

export default class App extends Component {
  render() {
    return (
        <div>
          <div className="App">
              <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>Save the children</h2>
              </div>
          </div>
          <div className="App-intro">
              { this.props.children }
          </div>
        </div>
    );
  }
}
