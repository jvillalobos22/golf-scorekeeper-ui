import React from 'react';
import './MatchCard.css';
import { shortMonths } from '../../helpers/months';

const MatchCard = ({ match, className }) => {
  const getMatchScore = (holes) => {
    const score = holes.reduce((total, hole) => {
      return total + hole.score;
    }, 0);
    return score;
  };

  const getPrettyScore = (holes, par) => {
    const score = getMatchScore(holes);
    const prefix = (score < par) ? '-' : '+';
    return `${prefix}${Math.abs(score - par)}`
  } 

  const getPrettyDate = (date) => {
    return `${date.getDate()} ${shortMonths[date.getMonth()]} ${date.getFullYear()}`
  };

  return(
    <div className={`match_card ${className}`}>
      <h3>{match.course.name}</h3>
      <span className="course_location">{match.course.location}</span>
      <p>{getPrettyDate(match.date)}</p>
      <p>Par: {match.course.par}</p>
      <p>Holes: {match.course.holes}</p>
      <p>Score: <strong>{getMatchScore(match.holes)}</strong> ({getPrettyScore(match.holes, match.course.par)})</p>
    </div>
  )
};

export default MatchCard;