import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';

import Button, { GhostButton } from '../../Button/Button';
import './PlayHole.css';

class PlayHole extends Component {
  constructor(props) {
    super(props);
    this.state = {
      par: 4,
      score: 0
    };
  }

  setPar = newPar => {
    this.setState({
      par: newPar
    });
  };

  scoreUpdate = newScore => {
    this.setState({
      score: newScore.value
    });
  };

  render() {
    const { holeNumber, match } = this.props;
    return (
      <div>
        <PlayHoleHeader
          holeNumber={holeNumber}
          matchId={match._id}
          totalHoles={match.course.holes}
          completeMatch={() => console.log('Finished Match')}
        />
        <h1>Hole {holeNumber}</h1>
        <form onSubmit={e => e.preventDefault()}>
          <label>Par</label>
          <div className="par_buttons">
            <button
              type="button"
              className={this.state.par === 3 && 'selected'}
              onClick={() => this.setPar(3)}
            >
              3
            </button>
            <button
              type="button"
              className={this.state.par === 4 && 'selected'}
              onClick={() => this.setPar(4)}
            >
              4
            </button>
            <button
              type="button"
              className={this.state.par === 5 && 'selected'}
              onClick={() => this.setPar(5)}
            >
              5
            </button>
          </div>
          <div className="input_field">
            <label>Score</label>
            <Select
              name="score"
              value={this.state.score}
              clearable={true}
              required
              onChange={this.scoreUpdate}
              options={[
                { value: 1, label: '1 - Hole In One!' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' },
                { value: 7, label: '7' },
                { value: 8, label: '8' },
                { value: 9, label: '9' },
                { value: 10, label: '10' }
              ]}
            />
          </div>
          <div className="input_fields">
            <input className="button" type="submit" value="Save Hole" />
          </div>
        </form>
      </div>
    );
  }
}

const PlayHoleHeader = ({ holeNumber, matchId, totalHoles, completeMatch }) => (
  <div className="play_hole_btns">
    {holeNumber > 1 && (
      <Link to={`/play/${matchId}/hole/${Number(holeNumber) - 1}`}>
        <GhostButton>
          <FontAwesomeIcon icon="caret-left" />&nbsp;Prev Hole
        </GhostButton>
      </Link>
    )}
    {holeNumber < totalHoles ? (
      <Link to={`/play/${matchId}/hole/${Number(holeNumber) + 1}`}>
        <GhostButton>
          Next Hole&nbsp;<FontAwesomeIcon icon="caret-right" />
        </GhostButton>
      </Link>
    ) : (
      <Button onClick={completeMatch}>
        <FontAwesomeIcon icon="check" />&nbsp;Complete Match
      </Button>
    )}
  </div>
);

export default PlayHole;
