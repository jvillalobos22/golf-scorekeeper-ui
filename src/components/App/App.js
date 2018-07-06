import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';

import Header from '../Header/Header';
import Matches from '../Matches/Matches';
import MatchDetail from '../MatchDetail/MatchDetail';
import CreateMatch from '../CreateMatch/CreateMatch';
import PlayMatch from '../PlayMatch/PlayMatch';
import { doFetchMatches } from '../../redux/actions/match';
import './App.css';
import Authenticate from '../Authenticate/Authenticate';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageContainerClass: ''
    };

    this.setPageContainerClass = this.setPageContainerClass.bind(this);
  }

  componentDidMount() {
    this.props.onFetchMatches('/matches');
  }

  setPageContainerClass = newClass => {
    this.setState({
      pageContainerClass: newClass
    });
  };

  render() {
    const { pageContainerClass } = this.state;
    return (
      <Router>
        <div className={`app ${pageContainerClass}`}>
          <Header />
          <Switch>
            <Route exact path="/" component={Matches} />
            <Route
              exact
              path="/login"
              render={({ match }) => {
                return (
                  <Authenticate
                    signup={false}
                    setPgClass={this.setPageContainerClass}
                    pgClass={this.state.pageContainerClass}
                  />
                );
              }}
            />
            <Route
              exact
              path="/signup"
              render={({ match }) => {
                return (
                  <Authenticate
                    signup={true}
                    setPgClass={this.setPageContainerClass}
                    pgClass={this.state.pageContainerClass}
                  />
                );
              }}
            />
            <Route
              path="/matches/:matchId"
              render={({ match }) => {
                return <MatchDetail matchId={match.params.matchId} />;
              }}
            />
            <Route path="/new-match" component={CreateMatch} />
            <Route
              path="/play/:matchId/hole/:holeNumber"
              render={({ match }) => {
                return (
                  <PlayMatch
                    matchId={match.params.matchId}
                    holeNumber={match.params.holeNumber}
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
