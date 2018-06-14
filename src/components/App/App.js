import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "../Header/Header";
import Matches from "../Matches/Matches";
import MatchDetail from "../MatchDetail/MatchDetail";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:8080/matches")
      .then(res => res.json())
      .then(data => {
        console.log(data.matches);
        this.setState({
          matches: data.matches
        });
      })
      .catch(e => {});
  }

  render() {
    const { matches } = this.state;
    return (
      <Router>
        <div className="app">
          <Header />
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return <Matches matches={matches} />;
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

export default App;
