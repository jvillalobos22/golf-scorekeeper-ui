import React from 'react';
import { Link } from 'react-router-dom';
import './ShowMatchDetails.css';

const ShowMatchDetails = ({match}) => {
  return (
    <div className="pg_width">
      <Link to="/" ><button type="button">
        Back
      </button></Link>
      <span>{match.course.name}</span>
      <span>{match.course.location}</span>
      <span>{match.course.par}</span>
      <span>{match.course.holes}</span>
      <span>{match.date.toString()}</span>
      <div className="match_scorecard">
        <div>
          <span>Hole</span>
          <span>Par</span>
          <span>Score</span>
        </div>
      {match.holes.map((hole) => {
        return <div>
          <span>{hole.id}</span>
          <span>{hole.par}</span>
          <span>{hole.score}</span>
        </div>
      })}
      </div>
    </div>
  )
}

export default ShowMatchDetails;