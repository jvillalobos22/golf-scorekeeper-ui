import React, { Component } from 'react';
import { connect } from 'react-redux';

import { matchesSelector } from '../../redux/selectors/match';
import {
  CreateMatchButton,
  CreateFirstMatchButton
} from '../CreateMatch/CreateMatch';
import MatchCard from '../MatchCard/MatchCard';
import MatchesHero from '../MatchesHero/MatchesHero';
import './Matches.css';

class Matches extends Component {
  render() {
    const { matches } = this.props;
    if (!matches) return null;
    return (
      <div className="matches">
        {matches.length > 1 && <MatchesHero />}
        <div className="pg_width">
          {matches.length > 1 ? (
            <div className="matches_list flex_container">
              <div className="matches_topbar">
                <CreateMatchButton />
              </div>
              {matches.map(match => (
                <MatchCard
                  key={match._id}
                  match={match}
                  className="flex_card"
                />
              ))}
            </div>
          ) : (
            <NoMatchesMessage />
          )}
        </div>
      </div>
    );
  }
}

const NoMatchesMessage = () => {
  return (
    <div className="no_matches_message">
      <h3>Welcome to myCaddie!</h3>
      <p>
        Looks like you haven't played your first round yet. Let's start tracking
        so we can start improving.
      </p>
      <CreateFirstMatchButton />
    </div>
  );
};

const mapStateToProps = state => {
  return {
    matches: matchesSelector(state)
  };
};

export default connect(mapStateToProps)(Matches);
