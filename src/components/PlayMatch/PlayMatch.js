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

    this.updateScore = this.updateScore.bind(this);
  }

  componentDidMount() {
    console.log('Mounting');
    const { matches, matchId } = this.props;
    const thisMatch = this.getThisMatch(matches, matchId);
    if (thisMatch) {
      this.setState({
        scores: thisMatch.holes
      });
    }
  }

  getThisMatch = (matches, matchId) => {
    return matches.find(match => match._id === matchId);
  };

  updateScore = newHole => {
    const newScores = this.state.scores.map(hole => {
      console.log(hole.id);
      console.log(newHole);
      if (hole.id === newHole.id) {
        return newHole;
      }
      return hole;
    });
    this.setState({
      scores: newScores
    });
  };

  componentDidUpdate(prevProps) {
    console.log('receiving new props');
    const oldMatch = this.getThisMatch(prevProps.matches, prevProps.matchId);
    const newMatch = this.getThisMatch(this.props.matches, this.props.matchId);
    if (!oldMatch || oldMatch.course.holes !== newMatch.course.holes) {
      this.setState({
        scores: newMatch.holes
      });
    }
  }

  render() {
    const { matches, matchId, holeNumber } = this.props;
    const thisMatch = this.getThisMatch(matches, matchId);
    return (
      <div>
        <div className="pg_width">
          {thisMatch ? (
            <PlayHole
              holeNumber={holeNumber}
              match={thisMatch}
              holeScore={this.state.scores[holeNumber - 1]}
              updateScore={newHole => this.updateScore(newHole)}
            />
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
