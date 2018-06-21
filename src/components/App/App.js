import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from '../Header/Header';
import Matches from '../Matches/Matches';
import MatchDetail from '../MatchDetail/MatchDetail';
// import {
//   getMatches,
//   selectMatch,
//   createMatch,
//   updateMatch,
//   addCourseToMatch,
//   addHoleToMatch,
//   updateHole
// } from '../../redux/actions/match';
// import { matches, match, holes } from '../../redux/selectors/selectors';
import { doFetchMatches } from '../../redux/actions/match';
import './App.css';

class App extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     matches: []
  //   };
  // }

  componentDidMount() {
    // fetch('http://localhost:8080/matches')
    //   .then(res => res.json())
    //   .then(data => {
    //     console.log(data.matches);
    //     this.setState({
    //       matches: data.matches
    //     });
    //   })
    //   .catch(e => {});
    this.props.onFetchMatches('/matches');
  }

  render() {
    const { matches } = this.props;
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
                    matches={matches}
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

const stateToProps = state => {
  return {
    // matches: matches(state),
    // selectedMatch: match(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onFetchMatches: query => dispatch(doFetchMatches(query))
});

export default connect(
  stateToProps,
  mapDispatchToProps
)(App);
