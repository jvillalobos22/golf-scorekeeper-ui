import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  getMatchScore,
  getPrettyDate,
  getPrettyScore,
  getFirstIncompleteHoleId
} from '../MatchCard/MatchCard';
import { doCompleteMatch } from '../../redux/actions/match';
import Button, { GhostButton } from '../Button/Button';
import './ShowMatchDetails.css';

const ShowMatchDetails = ({ match, ...props }) => {
  const completedHolesObj = getFirstIncompleteHoleId(match.holes);

  return (
    <div>
      <Link to="/">
        <GhostButton>
          <FontAwesomeIcon icon="caret-left" size="lg" />&nbsp;&nbsp;All Matches
        </GhostButton>
      </Link>
      <div className="course_info">
        <h1>{match.title}</h1>
        <span>{match.course.name}</span>
        <span>{match.course.location}</span>
        <span>Par: {match.par}</span>
        <span>{match.course.holes} Holes</span>
      </div>
      <div className="match_details_date">
        <span>{getPrettyDate(match.date)}</span>
      </div>
      <div className="match_results">
        <span className="score">
          <h4 className="score_header">Score:</h4>
          <span className="match_total">{getMatchScore(match.holes)}</span>
          {match.isComplete ||
          completedHolesObj.holesScored === match.holes.length ? (
            <span className="pretty_score">
              ({getPrettyScore(match.holes, match.par)})
            </span>
          ) : (
            <span className="current_holes">
              after {completedHolesObj.holesScored} holes
            </span>
          )}
        </span>
        <div className="continue_match">
          <div className="holes_scored">
            <span
              className={`${
                completedHolesObj.holesScored === match.holes.length
                  ? 'all'
                  : 'some'
              }`}
            >
              {completedHolesObj.holesScored} / {match.holes.length}
            </span>
            Holes Scored
          </div>
          {!match.isComplete && (
            <div>
              {completedHolesObj.firstIncomplete ? (
                <Link
                  to={`/play/${match._id}/hole/${
                    completedHolesObj.firstIncomplete
                  }`}
                >
                  <Button>Continue Match</Button>
                </Link>
              ) : (
                <Button onClick={() => props.onCompleteMatch(match._id)}>
                  Complete Match
                </Button>
              )}
            </div>
          )}
        </div>
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
              key={hole.id}
            >
              <div className="scorecard_row">
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

const mapDispatchToProps = dispatch => ({
  onCompleteMatch: id => dispatch(doCompleteMatch(id))
});

export default connect(
  null,
  mapDispatchToProps
)(ShowMatchDetails);
// export default ShowMatchDetails;
