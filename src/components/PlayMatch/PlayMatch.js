import React, { Component } from 'react';
import { connect } from 'react-redux';
import { matchesSelector } from '../../redux/selectors/match';
import { doSetMatchId } from '../../redux/actions/match';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import PlayHole from './PlayHole/PlayHole';

import './PlayMatch.css';

class PlayMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    };
  }

  componentDidMount() {
    console.log('Mounting');
  }

  getThisMatch = (matches, matchId) => {
    return matches.find(match => match._id === matchId);
  };

  render() {
    const { matches, matchId, holeNumber } = this.props;
    const thisMatch = this.getThisMatch(matches, matchId);
    return (
      <div>
        <div className="pg_width">
          {thisMatch ? (
            <PlayHole holeNumber={holeNumber} match={thisMatch} />
          ) : (
            <ErrorMessage
              errorMsg={`A match with the id ${matchId} was not found.`}
            />
          )}
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

export default connect(
  mapStateToProps,
  null
)(PlayMatch);

// export default PlayMatch;
