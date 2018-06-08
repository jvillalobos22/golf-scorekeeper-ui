import React, { Component } from 'react';
import Header from '../Header/Header';
import Matches from '../Matches/Matches';
import './App.css';

class App extends Component {
  render() {
    const { matches } = this.props;
    return (
      <div className="app">
        <Header />
        <Matches matches={matches} />
      </div>
    );
  }
}

export default App;
