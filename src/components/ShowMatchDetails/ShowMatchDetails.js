import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getMatchScore,
  getPrettyDate,
  getPrettyScore
} from '../MatchCard/MatchCard';
import Button from '../Button/Button';
import './ShowMatchDetails.css';

const ShowMatchDetails = ({ match }) => {
  return (
    <div>
      <Link to="/">
        <Button>
          <FontAwesomeIcon icon="caret-left" size="lg" />&nbsp;Back
        </Button>
      </Link>
      <div className="course_info">
        <h1>{match.course.name}</h1>
        <span>{match.course.location}</span>
        <span>Par: {match.course.par}</span>
        <span>{match.course.holes} Holes</span>
      </div>
      <div className="match_details_date">
        <span>{getPrettyDate(match.date)}</span>
      </div>
      <div className="match_results">
        <span className="score">
          {getMatchScore(match.holes)} ({getPrettyScore(
            match.holes,
            match.course.par
          )})
        </span>
      </div>
      <div className="match_scorecard">
        <div className="scorecard_row">
          <span className="ten">Hole</span>
          <span className="ten">Par</span>
          <span className="ten">Score</span>
        </div>
        {match.holes.map(hole => {
          return (
            <Link
              className="hole_link"
              to={`/play/${match._id}/hole/${hole.holeNumber}`}
            >
              <div key={hole.id} className="scorecard_row">
                <span className="ten scorecard_holenumber">
                  <FontAwesomeIcon
                    className="hole_edit"
                    icon="pencil-alt"
                    size="sm"
                  />
                  {hole.holeNumber}
                </span>

                <span className="ten">{hole.par}</span>
                <span className="ten">
                  {hole.score} ({getPrettyScore([hole], hole.par)})
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ShowMatchDetails;
