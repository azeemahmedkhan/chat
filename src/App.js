import logo from './logo.svg';
import './App.css';
import Websocket from './components/Websocket';
import Register from './components/Register';
import Base from './components/Base';
import Products from './components/Products'
import React, { Component } from 'react';

class App extends Component {
  render() {
  return (
    <div>
      <Base></Base>
    </div>
  )
}
}

export default App;