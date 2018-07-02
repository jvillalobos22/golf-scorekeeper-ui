import React from 'react';
import { Link } from 'react-router-dom';
import { InlineButton, SmallButton } from '../Button/Button';
import './MatchCard.css';
import { shortMonths } from '../../helpers/months';

const MatchCard = ({ match, className }) => {
  const completedHolesObj = getFirstIncompleteHoleId(match.holes);

  return (
    <div className={`match_card ${className}`}>
      <h3>{match.title}</h3>
      <div className="course_info">
        <span>{match.course.name}</span>
        <span className="course_location">{match.course.location}</span>
        <span className="match_date">{getPrettyDate(match.date)}</span>
        <span className="course_par">Par: {match.par}</span>
      </div>
      <p className="match_holes_played">
        <span>{match.course.holes}</span> Holes
      </p>
      <div className="score">
        {match.isComplete ||
        completedHolesObj.holesScored === match.holes.length ? (
          <div>
            <span>Score:</span>
            <strong>{getMatchScore(match.holes)}</strong> ({getPrettyScore(
              match.holes,
              match.par
            )})
          </div>
        ) : (
          <div className="incomplete">
            <span>
              In Progress ({completedHolesObj.holesScored} /{' '}
              {match.holes.length})
            </span>
            <div>
              {completedHolesObj.firstIncomplete && (
                <Link
                  to={`/play/${match._id}/hole/${
                    completedHolesObj.firstIncomplete
                  }`}
                >
                  <InlineButton>Continue Match</InlineButton>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      <Link to={`/matches/${match._id}`}>
        <SmallButton>Scorecard</SmallButton>
      </Link>
    </div>
  );
};

const getMatchScore = holes => {
  let incomplete = false;
  const score = holes.reduce((total, hole) => {
    if (hole.score === 0) incomplete = true;
    return total + hole.score;
  }, 0);
  if (incomplete) {
    // return false;
  }
  return score;
};

const getPrettyScore = (holes, par) => {
  const score = getMatchScore(holes);
  if (!score) return 'DNF';
  const prefix = score < par ? '-' : '+';
  return `${prefix}${Math.abs(score - par)}`;
};

const getPrettyDate = date => {
  date = new Date(date);
  return `${date.getDate()} ${
    shortMonths[date.getMonth()]
  } ${date.getFullYear()}`;
};

const getFirstIncompleteHoleId = holes => {
  let firstIncomplete = false;
  let holesScored = 0;
  holes.map(hole => {
    if (!firstIncomplete && hole.score === 0) {
      firstIncomplete = hole.holeNumber;
    }
    holesScored = hole.score === 0 ? holesScored : holesScored + 1;
    return hole;
  });
  return {
    firstIncomplete: firstIncomplete ? firstIncomplete : false,
    holesScored
  };
};

export default MatchCard;
export {
  getMatchScore,
  getPrettyDate,
  getPrettyScore,
  getFirstIncompleteHoleId
};
