import React, { Component } from 'react';

import './App.css';
import Header from './components/Header/Header'
import Landing from './components/Landing/Landing'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div>
            <Header />
        </div>
        <div>
          <Landing />
        </div>
      </div>
    );
  }
}

export default App;
