import { getMatchScore } from './scoreCalculations';
import {
  getRoundGreensInRegulation,
  getRoundFairwayHits,
  getRoundMulligans,
  getRoundPuttsPerGreen,
  getRoundTeeAccuracyCount,
  getRoundHolePerformance
} from './roundPerformance';

const getOverallPerformanceObj = matches => {
  let totalScore = 0;
  let totalGirs = 0;
  let totalFairways = 0;
  let totalMulligans = 0;
  let totalPPG = 0;
  let totalHoles = 0;
  let totalAccuracy = {
    left: 0,
    center: 0,
    right: 0
  };
  let allTimeHolePerformance = {
    holeInOne: 0,
    albatross: 0,
    eagle: 0,
    birdie: 0,
    par: 0
  };

  let completedRounds = 0;

  matches.map(round => {
    if (round.isComplete) {
      totalScore += getMatchScore(round.holes);
      totalGirs += getRoundGreensInRegulation(round.holes);
      totalFairways += getRoundFairwayHits(round.holes);
      totalMulligans += getRoundMulligans(round.holes);
      totalPPG += getRoundPuttsPerGreen(round.holes, round.holes.length);
      totalHoles += round.holes.length;
      let thisTotalAccuracy = getRoundTeeAccuracyCount(
        round.holes,
        round.holes.lenght
      );
      let thisHolePerformance = getRoundHolePerformance(round.holes);

      allTimeHolePerformance = addHolePerformanceObject(
        allTimeHolePerformance,
        thisHolePerformance
      );
      totalAccuracy = addAccuracyObject(totalAccuracy, thisTotalAccuracy);

      completedRounds++;
    }
    return;
  });

  const avgScore = computeAvg(totalScore, completedRounds);
  const avgGirs = computeAvg(totalGirs, completedRounds);
  const avgFairways = computeAvg(totalFairways, completedRounds);
  const avgMulligans = computeAvg(totalMulligans, completedRounds);
  const avgPPG = computeAvg(totalPPG, completedRounds);
  const avgAccuracy = computeAvgAccuracyPercentages(totalAccuracy, totalHoles);
  console.log(allTimeHolePerformance);

  return {
    allTimeHolePerformance,
    avgAccuracy,
    avgFairways,
    avgGirs,
    avgMulligans,
    avgPPG,
    avgScore
  };
};

const addAccuracyObject = (total, newObj) => {
  return {
    left: total.left + newObj.left,
    center: total.center + newObj.center,
    right: total.right + newObj.right
  };
};

const computeAvgAccuracyPercentages = (totalAccuracy, totalHoles) => {
  return {
    left: computeAvg(totalAccuracy.left, totalHoles),
    center: computeAvg(totalAccuracy.center, totalHoles),
    right: computeAvg(totalAccuracy.right, totalHoles)
  };
};

const addHolePerformanceObject = (total, newObj) => {
  return {
    holeInOne: total.holeInOne + newObj.holeInOne,
    albatross: total.albatross + newObj.albatross,
    eagle: total.eagle + newObj.eagle,
    birdie: total.birdie + newObj.birdie,
    par: total.par + newObj.par
  };
};

const computeAvg = (total, denom) => {
  const avg = total / denom;
  return Math.round(avg * 100) / 100;
};

export { getOverallPerformanceObj };
