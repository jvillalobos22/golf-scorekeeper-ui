import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Button, { GhostButton } from '../../Button/Button';
import './PlayHole.css';

class PlayHole extends Component {
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
