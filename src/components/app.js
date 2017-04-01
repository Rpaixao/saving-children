import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';

export default class App extends Component {
  render() {
    return (
        <div>
          <div className="App-intro">
              { this.props.children }
          </div>
        </div>
    );
  }
}
