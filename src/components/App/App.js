import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import Matches from '../Matches/Matches';
import MatchDetail from '../MatchDetail/MatchDetail';
import { doFetchMatches } from '../../redux/actions/match';
import './App.css';

class App extends Component {
  componentDidMount() {
    this.props.onFetchMatches('/matches');
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Matches />;
              }}
            />
            <Route
              path="/matches/:matchId"
              render={({ match }) => {
                return (
                  <MatchDetail
                    // matches={matches}
                    matchId={match.params.matchId}
                  />
                );
              }}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onFetchMatches: query => dispatch(doFetchMatches(query))
});

export default connect(
  null,
  mapDispatchToProps
)(App);
