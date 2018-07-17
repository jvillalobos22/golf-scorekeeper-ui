import { getGreenInReg } from './scoreCalculations';

const getRoundFairwayHits = holes => {
  let fairwayhits = 0;

  holes.map(hole => {
    if (hole.par > 3 && hole.teeDirection === 'CENTER') {
      fairwayhits++;
    }
    return;
  });
  return fairwayhits;
};

const getRoundGreensInRegulation = holes => {
  let girs = 0;

  holes.map(hole => {
    if (getGreenInReg(hole.par, hole.putts, hole.score)) {
      girs++;
    }
    return;
  });
  return girs;
};

const getRoundHolePerformance = holes => {
  let holeInOne = 0;
  let albatross = 0;
  let eagle = 0;
  let birdie = 0;
  let par = 0;
  let bogey = 0;
  let doubleBogey = 0;
  let maxBogey = 0;

  holes.map(hole => {
    let holePerformance = hole.score - hole.par;
    if (holePerformance === 0) {
      par++;
    } else if (holePerformance === -1) {
      birdie++;
    } else if (holePerformance === 1) {
      bogey++;
    } else if (holePerformance === -2) {
      if (hole.par === 3) {
        holeInOne++;
      } else {
        eagle++;
      }
    } else if (holePerformance === 2) {
      doubleBogey++;
    } else if (holePerformance > 2) {
      maxBogey++;
    } else if (holePerformance === -3) {
      if (hole.par === 4) {
        holeInOne++;
      } else {
        albatross++;
      }
    } else if (holePerformance === -4 && hole.par === 5) {
      holeInOne++;
    }
  });

  return {
    holeInOne,
    albatross,
    eagle,
    birdie,
    par,
    bogey,
    doubleBogey,
    maxBogey
  };
};

const getRoundMulligans = holes => {
  let mulligans = 0;

  holes.map(hole => {
    if (hole.mulligans) {
      mulligans += hole.mulligans;
    }
    return;
  });
  return mulligans;
};

const getRoundPuttsPerGreen = (holes, holesScored) => {
  let putts = 0;

  holes.map(hole => {
    return (putts += hole.putts);
  });

  const ppg = putts / holesScored;
  const rounded = Math.round(ppg * 100) / 100;
  return rounded;
};

const getRoundTeeAccuracy = (holes, holesScored) => {
  let left = 0;
  let right = 0;
  let center = 0;

  holes.map(hole => {
    if (hole.teeDirection === 'LEFT') {
      left++;
    } else if (hole.teeDirection === 'CENTER') {
      center++;
    } else if (hole.teeDirection === 'RIGHT') {
      right++;
    }
  });

  const leftPercent = left / holesScored;
  const rightPercent = right / holesScored;
  const centerPercent = center / holesScored;

  return {
    left: Math.round(leftPercent * 100),
    right: Math.round(rightPercent * 100),
    center: Math.round(centerPercent * 100)
  };
};

export {
  getRoundFairwayHits,
  getRoundGreensInRegulation,
  getRoundHolePerformance,
  getRoundMulligans,
  getRoundPuttsPerGreen,
  getRoundTeeAccuracy
};
