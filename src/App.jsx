import React, { Component } from 'react';

import './App.css';
// import {HashRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header/Header.jsx'
import Router from './Router.jsx'
// import Landing from './components/Landing/Landing'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        {Router}
      </div>
    );
  }
}

export default App;
