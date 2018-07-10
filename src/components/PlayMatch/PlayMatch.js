import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { matchesSelector } from '../../redux/selectors/match';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import {
  SuccessNotification,
  WarningNotification
} from '../Notification/Notification';
import PlayHole from './PlayHole/PlayHole';
import {
  doSyncUpdate,
  doScoreUpdate,
  doClearError,
  doPatchScoreUpdateSuccessClear
} from '../../redux/actions/playMatch';

import './PlayMatch.css';

class PlayMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: []
    };

    this.updateScore = this.updateScore.bind(this);
    this.postScoreUpdate = this.postScoreUpdate.bind(this);
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
      if (hole.id === newHole.id) {
        return newHole;
      }
      return hole;
    });
    this.props.onSyncUpdate(false);
    this.setState({
      scores: newScores
    });
  };

  postScoreUpdate = matchId => {
    const { storeInSync, xAuth } = this.props;
    const { scores } = this.state;
    if (!storeInSync) this.props.onScoreUpdate(matchId, scores, xAuth);
  };

  componentDidUpdate(prevProps) {
    console.log('receiving new props');
    if (prevProps.holeNumber !== this.props.holeNumber) {
      this.props.onClearSuccessMessage();
    }
    const oldMatch = this.getThisMatch(prevProps.matches, prevProps.matchId);
    const newMatch = this.getThisMatch(this.props.matches, this.props.matchId);
    if (!oldMatch || oldMatch.course.holes !== newMatch.course.holes) {
      this.setState({
        scores: newMatch.holes
      });
    }
  }

  render() {
    const {
      matches,
      matchId,
      holeNumber,
      storeInSync,
      updateScoreError,
      updateScoreSuccess
    } = this.props;
    const thisMatch = this.getThisMatch(matches, matchId);
    return (
      <div>
        <div className="pg_width">
          {thisMatch ? (
            <div className="play_match">
              {!storeInSync && (
                <WarningNotification>
                  Score's have not been saved yet. Make sure to click&nbsp;
                  <strong>Save Hole</strong> to save changes to the database.
                </WarningNotification>
              )}
              {updateScoreSuccess && (
                <SuccessNotification className="update_success">
                  Score's have been successfully updated.
                  <button
                    type="button"
                    onClick={() => this.props.onClearSuccessMessage()}
                  >
                    <FontAwesomeIcon icon="window-close" />
                  </button>
                </SuccessNotification>
              )}
              {updateScoreError && (
                <div className="connection_error">
                  <ErrorMessage errorMsg="There was an issue saving to the database. It may be due to a poor connection. Continue playing and try to save your scores again later. CAUTION: Refreshing your page may wipe out any scores that have not been saved." />
                  <button
                    type="button"
                    onClick={() => this.props.onClearError()}
                  >
                    <FontAwesomeIcon icon="window-close" />
                  </button>
                </div>
              )}
              <PlayHole
                holeNumber={holeNumber}
                match={thisMatch}
                holeScore={this.state.scores[holeNumber - 1]}
                updateScore={newHole => this.updateScore(newHole)}
                onScoreSubmit={matchId => this.postScoreUpdate(matchId)}
              />
            </div>
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
    matches: matchesSelector(state),
    storeInSync: state.playMatchState.storeInSync,
    updateScoreError: state.playMatchState.updateScoreError,
    updateScoreSuccess: state.playMatchState.updateScoreSuccess,
    xAuth: state.authenticationState.xAuth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSyncUpdate: sync => dispatch(doSyncUpdate(sync)),
    onScoreUpdate: (matchId, newScores, xAuth) =>
      dispatch(doScoreUpdate(matchId, newScores, xAuth)),
    onClearError: () => dispatch(doClearError()),
    onClearSuccessMessage: () => dispatch(doPatchScoreUpdateSuccessClear())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlayMatch);

// export default PlayMatch;
