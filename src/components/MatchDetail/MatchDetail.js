import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchesSelector } from '../../redux/selectors/match';
import { doSetMatchId } from '../../redux/actions/match';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import ShowMatchDetails from '../ShowMatchDetails/ShowMatchDetails';

import './MatchDetail.css';

class MatchDetail extends Component {
  getThisMatch = (matches, matchId) => {
    return matches.find(match => match._id === matchId);
  };

  render() {
    const { matches, matchId } = this.props;
    const thisMatchResult = this.getThisMatch(matches, matchId);

    return (
      <div>
        {thisMatchResult ? (
          <div className="pg_width">
            <ShowMatchDetails match={thisMatchResult} />
          </div>
        ) : (
          <div className="pg_width">
            <ErrorMessage
              errorMsg={`A match with the id ${matchId} was not found.`}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    matches: matchesSelector(state)
  };
};

export default connect(
  mapStateToProps,
  null
)(MatchDetail);
