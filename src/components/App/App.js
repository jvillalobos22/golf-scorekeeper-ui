import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import Header from '../Header/Header';
import Matches from '../Matches/Matches';
import MatchDetail from '../MatchDetail/MatchDetail';
import './App.css';

class App extends Component {
  render() {
    const { matches } = this.props;
    return (
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route exact path="/" render={() => {
              return <Matches matches={matches} />
            }} />
            <Route path="/matches/:matchId" render={({ match }) => {
              return <MatchDetail matches={matches} matchId={match.params.matchId} />
            }} />
          </Switch>
          
        </div>
      </Router>
    );
  }
}

export default App;
