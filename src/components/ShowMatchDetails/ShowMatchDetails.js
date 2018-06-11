import React from 'react';
import { Link } from 'react-router-dom';
import {
  getMatchScore,
  getPrettyDate,
  getPrettyScore
} from '../MatchCard/MatchCard';
import Button from '../Button/Button';
import './ShowMatchDetails.css';

const ShowMatchDetails = ({match}) => {
  return (
    <div className="pg_width">
      <Link to="/" ><Button>
        Back
      </Button></Link>
      <div className="course_info">
        <h1>{match.course.name}</h1>
        <span>{match.course.location}</span>
        <span>Par: {match.course.par}</span>
        <span>{match.course.holes} Holes</span>
      </div>
      <div className="match_results">
        <span className="score">{getMatchScore(match.holes)} ({getPrettyScore(match.holes, match.course.par)})</span>
      </div>
      <span>{getPrettyDate(match.date)}</span>
      <div className="match_scorecard">
        <div className="scorecard_row">
          <span className="ten">Hole</span>
          <span className="ten">Par</span>
          <span className="ten">Score</span>
        </div>
      {match.holes.map((hole) => {
          return <div key={hole.id} className= "scorecard_row">
          <span className="ten">{hole.id}</span>
          <span className="ten">{hole.par}</span>
          <span className="ten">{hole.score} ({getPrettyScore([hole], hole.par)})</span>
        </div>
      })}
      </div>
    </div>
  )
}

export default ShowMatchDetails;