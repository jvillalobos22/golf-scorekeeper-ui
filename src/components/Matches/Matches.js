import React, { Component } from 'react';
import { connect } from 'react-redux';

import { matchesSelector } from '../../redux/selectors/match';
import { CreateMatchButton } from '../CreateMatch/CreateMatch';
import MatchCard from '../MatchCard/MatchCard';
import './Matches.css';

class Matches extends Component {
  render() {
    const { matches } = this.props;
    if (!matches || matches.length < 1) return null;
    return (
      <div className="pg_width matches">
        <CreateMatchButton />
        <div className="matches_list flex_container">
          {matches.map(match => (
            <MatchCard key={match._id} match={match} className="flex_card" />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    matches: matchesSelector(state)
  };
};

export default connect(mapStateToProps)(Matches);
