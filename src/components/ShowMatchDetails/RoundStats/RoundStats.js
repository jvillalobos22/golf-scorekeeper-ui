import React from 'react';
import { getFirstIncompleteHoleId } from '../../MatchCard/MatchCard';
import {
  getRoundFairwayHits,
  getRoundGreensInRegulation,
  getRoundHolePerformance,
  getRoundMulligans,
  getRoundPuttsPerGreen,
  getRoundTeeAccuracy
} from '../../../helpers/roundPerformance';
import './RoundStats.css';

const RoundStats = ({ holes }) => {
  const completedHolesObj = getFirstIncompleteHoleId(holes);

  const teePercentage = getRoundTeeAccuracy(
    holes,
    completedHolesObj.holesScored
  );
  const holePerformance = getRoundHolePerformance(holes);

  return (
    <div className="round_stats">
      <h3>Round Stats</h3>
      <RoundStat name="GIRs" value={getRoundGreensInRegulation(holes)} />
      <RoundStat name="Fairways" value={getRoundFairwayHits(holes)} />
      <RoundStat
        name="Putts/Green"
        value={getRoundPuttsPerGreen(holes, completedHolesObj.holesScored)}
      />
      <RoundStat name="Mulligans" value={getRoundMulligans(holes)} />
      <RoundTeePercentages teePercentage={teePercentage} />
      <HolePerformanceStat holePerformance={holePerformance} />
    </div>
  );
};

const RoundStat = ({ name, value, className }) => {
  return (
    <div className={`round_stat${className ? '' + className : ''}`}>
      <h6>{name}</h6>
      <span>{value}</span>
    </div>
  );
};

const RoundTeePercentages = ({ teePercentage }) => {
  return (
    <div className="round_tee_percentages">
      <RoundStat name="Miss Left" value={`${teePercentage.left}%`} />
      <RoundStat name="Center Fairway" value={`${teePercentage.center}%`} />
      <RoundStat name="Miss Right" value={`${teePercentage.right}%`} />
    </div>
  );
};

const HolePerformanceStat = ({ holePerformance }) => {
  return (
    <div className="hole_performance_stat">
      {holePerformance.holeInOne > 0 && (
        // <p>
        //   <strong>Hole In One:</strong> {holePerformance.holeInOne}
        // </p>
        <RoundStat name="Hole In One" value={holePerformance.holeInOne} />
      )}
      {holePerformance.albatross > 0 && (
        // <p>
        //   <strong>Albatross:</strong> {holePerformance.albatross}
        // </p>
        <RoundStat name="Albatross" value={holePerformance.albatross} />
      )}
      {holePerformance.eagle > 0 && (
        // <p>
        //   <strong>Eagle:</strong> {holePerformance.eagle}
        // </p>
        <RoundStat name="Eagle" value={holePerformance.eagle} />
      )}
      {/* <p>
        <strong>Birdie:</strong> {holePerformance.birdie}
      </p> */}
      <RoundStat name="Birdie" value={holePerformance.birdie} />
      {/* <p>
        <strong>Par:</strong> {holePerformance.par}
      </p> */}
      <RoundStat name="Par" value={holePerformance.par} />
      {/* <p>
        <strong>Bogey:</strong> {holePerformance.bogey}
      </p> */}
      <RoundStat name="Bogey" value={holePerformance.bogey} />
      {/* <p>
        <strong>Double Bogey:</strong> {holePerformance.doubleBogey}
      </p> */}
      <RoundStat name="Double Bogey" value={holePerformance.doubleBogey} />
      {holePerformance.maxBogey > 0 && (
        // <p>
        //   <strong>3+ Bogey:</strong> {holePerformance.maxBogey}
        // </p>
        <RoundStat name="3+ Bogey" value={holePerformance.maxBogey} />
      )}
    </div>
  );
};

export default RoundStats;
