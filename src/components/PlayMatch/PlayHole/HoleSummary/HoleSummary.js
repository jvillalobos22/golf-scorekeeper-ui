import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  getHoleResult,
  getPrettyResult
} from '../../../../helpers/scoreCalculations';

import AccuracyPerformance from './AccuracyPerformance';
import './HoleSummary.css';

const HoleSummary = ({ holeScore }) => {
  const thisHoleResult = getHoleResult(holeScore.par, holeScore.score);

  return (
    <div className="hole_summary">
      <div className="stroke_performance">
        <div className="hole_info">
          <h3 className="stat">
            <span className="label">Par:</span>
            <span className="value">{holeScore.par}</span>
          </h3>
          {/* Later will add yardage, tee color, etc. and move outside of stroke performance */}
        </div>
        <h3 className="stat">
          <span className="label">Putts:</span>
          <span className="value">{holeScore.putts}</span>
        </h3>
        <h3 className="stat">
          <span className="label">Mulligans:</span>
          <span className="value">{holeScore.mulligans}</span>
        </h3>
      </div>
      <AccuracyPerformance
        par={holeScore.par}
        score={holeScore.score}
        teeDirection={holeScore.teeDirection}
        putts={holeScore.putts}
      />
      <div className={`result ${thisHoleResult.stringValue}`}>
        <span className="label">Strokes:</span>
        <ScoreIcon result={thisHoleResult.result} strokes={holeScore.score} />
        <span className="score_string">
          {thisHoleResult.string} ({getPrettyResult(thisHoleResult.result)})
        </span>
      </div>
      {/* <h3>GIR: {holeScore.mulligans}</h3> */}
    </div>
  );
};

const ScoreIcon = ({ result, strokes }) => {
  if (result >= -1 && result <= 1) {
    // spanNumbers = 1;
    return (
      <div className="score_result">
        <span className="single_line">{strokes}</span>
      </div>
    );
  } else if (result === -2 || result === 2) {
    // spanNumbers = 2;
    return (
      <div className="score_result">
        <span className="double_line">
          <span className="single_line">{strokes}</span>
        </span>
      </div>
    );
  } else {
    // spanNumbers = 3;
    return (
      <div className="score_result">
        <span className="triple_line">
          <span className="double_line">
            <span className="single_line">{strokes}</span>
          </span>
        </span>
      </div>
    );
  }
};

export default HoleSummary;
