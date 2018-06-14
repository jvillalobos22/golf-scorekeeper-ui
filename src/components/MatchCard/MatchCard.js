import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./MatchCard.css";
import { shortMonths } from "../../helpers/months";

const MatchCard = ({ match, className }) => {
  return (
    <div className={`match_card ${className}`}>
      <h3>{match.course.name}</h3>
      <span className="course_location">{match.course.location}</span>
      <span className="match_date">{getPrettyDate(match.date)}</span>
      <span className="course_par">Par: {match.course.par}</span>
      <p className="match_holes_played">
        <span>{match.course.holes}</span> Holes
      </p>
      <div className="score">
        <span>Score:</span>
        <strong>{getMatchScore(match.holes)}</strong> ({getPrettyScore(
          match.holes,
          match.course.par
        )})
      </div>
      <Link to={`/matches/${match._id}`}>
        <Button>Details</Button>
      </Link>
    </div>
  );
};

const getMatchScore = holes => {
  const score = holes.reduce((total, hole) => {
    return total + hole.score;
  }, 0);
  return score;
};

const getPrettyScore = (holes, par) => {
  const score = getMatchScore(holes);
  const prefix = score < par ? "-" : "+";
  return `${prefix}${Math.abs(score - par)}`;
};

const getPrettyDate = date => {
  date = new Date(date);
  return `${date.getDate()} ${
    shortMonths[date.getMonth()]
  } ${date.getFullYear()}`;
};

export default MatchCard;
export { getMatchScore, getPrettyDate, getPrettyScore };
