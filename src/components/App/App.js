import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import 'react-select/dist/react-select.css';

import Header from '../Header/Header';
import Matches from '../Matches/Matches';
import MatchDetail from '../MatchDetail/MatchDetail';
import CreateMatch from '../CreateMatch/CreateMatch';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import ProtectedPlayMatchRoute from './ProtectedRoute/ProtectedPlayMatchRoute';
import { doFetchMatches } from '../../redux/actions/match';
import { doGetUser } from '../../redux/actions/authenticate';
import './App.css';
import Authenticate from '../Authenticate/Authenticate';
import { getLoggedInUser } from '../../redux/selectors/user';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageContainerClass: ''
    };

    this.setPageContainerClass = this.setPageContainerClass.bind(this);
  }

  componentDidMount() {
    const { loggedIn, xAuth } = this.props;
    if (!loggedIn) {
      this.props.onGetUser();
    }
    if (xAuth) {
      this.props.onFetchMatches(xAuth);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { xAuth } = this.props;
    if (prevProps.xAuth !== xAuth && xAuth) {
      this.props.onFetchMatches(xAuth);
    }
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
            <ProtectedRoute exact path="/" component={Matches} />
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
            <ProtectedRoute
              path="/matches/:matchId"
              component={({ match }) => {
                return <MatchDetail matchId={match.params.matchId} />;
              }}
            />
            <ProtectedRoute path="/new-match" component={CreateMatch} />
            {/* <Route
              path="/play/:matchId/hole/:holeNumber"
              render={({ match }) => {
                return (
                  <PlayMatch
                    matchId={match.params.matchId}
                    holeNumber={match.params.holeNumber}
                  />
                );
              }}
            /> */}
            <ProtectedPlayMatchRoute />
            <ProtectedRoute component={RouteNotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

const RouteNotFound = ({ location }) => (
  <div>
    <h1>404 Not Found</h1>
    <code>{location.pathname}</code>
  </div>
);

const mapStateToProps = state => {
  const { authenticationState } = state;
  return {
    loggedIn: authenticationState.loggedIn,
    xAuth: authenticationState.xAuth,
    user: getLoggedInUser(state)
  };
};

const mapDispatchToProps = dispatch => ({
  onFetchMatches: query => dispatch(doFetchMatches(query)),
  onGetUser: () => dispatch(doGetUser())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
