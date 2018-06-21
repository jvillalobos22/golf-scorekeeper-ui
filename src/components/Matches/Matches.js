import React, { Component } from 'react';
import { connect } from 'react-redux';

import { doFetchMatches } from '../../redux/actions/match';
import { matchSelector } from '../../redux/selectors/match';
import MatchCard from '../MatchCard/MatchCard';
import './Matches.css';

class Matches extends Component {
  render() {
    const { matches } = this.props;
    if (!matches || matches.length < 1) return null;
    return (
      <div className="pg_width">
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
    matches: matchSelector(state)
  };
};

export default connect(mapStateToProps)(Matches);
