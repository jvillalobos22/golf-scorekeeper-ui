import React from 'react';
import { connect } from 'react-redux';
import { matchesSelector } from '../../redux/selectors/match';
import { getOverallPerformanceObj } from '../../helpers/overallPerformance';
import './OverallStats.css';

const OverallStats = ({ matches }) => {
  const overallPerformance = getOverallPerformanceObj(matches);
  const {
    avgScore,
    avgGirs,
    avgFairways,
    avgMulligans,
    avgPPG,
    avgAccuracy,
    allTimeHolePerformance
  } = overallPerformance;

  return (
    <div className="overall_stats">
      <h3>Overall Performance</h3>
      <div>
        <strong>Avg Score:</strong>&nbsp;{avgScore}
      </div>
      <div>
        <strong>Avg GIRs:</strong>&nbsp;{avgGirs}
      </div>
      <div>
        <strong>Avg Fairways:</strong>&nbsp;{avgFairways}
      </div>
      <div>
        <strong>Avg Mulligans:</strong>&nbsp;{avgMulligans}
      </div>
      <div>
        <strong>Avg Putts Per Green:</strong>&nbsp;{avgPPG}
      </div>
      <div>
        <h6>Avg Accuracy:</h6>
        <div>
          <strong>Left: </strong>&nbsp;{Math.round(avgAccuracy.left * 100)}%
        </div>
        <div>
          <strong>Center: </strong>&nbsp;{Math.round(avgAccuracy.center * 100)}%
        </div>
        <div>
          <strong>Right: </strong>&nbsp;{Math.round(avgAccuracy.right * 100)}%
        </div>
      </div>
      <div>
        <h6>All Time Hole Performance:</h6>
        {allTimeHolePerformance.holeInOne > 0 && (
          <AllTimeHoleStat
            name="Hole in One"
            value={allTimeHolePerformance.holeInOne}
          />
        )}
        {allTimeHolePerformance.albatross > 0 && (
          <AllTimeHoleStat
            name="Albatross"
            value={allTimeHolePerformance.albatross}
          />
        )}
        <AllTimeHoleStat name="Eagle" value={allTimeHolePerformance.eagle} />
        <AllTimeHoleStat name="Birdie" value={allTimeHolePerformance.birdie} />
        <AllTimeHoleStat name="Par" value={allTimeHolePerformance.par} />
      </div>
    </div>
  );
};

const AllTimeHoleStat = ({ name, value, className }) => {
  return (
    <div className={`all_time_hole_stat${className ? ' ' + className : ''}`}>
      <span>{value}&nbsp;</span>
      <strong>{name + (value === 1 ? '' : 's')}</strong>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    matches: matchesSelector(state)
  };
};

export default connect(mapStateToProps)(OverallStats);
