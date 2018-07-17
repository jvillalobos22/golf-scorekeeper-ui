export const HOLE_IN_ONE = 'hole_in_one';
export const ALBATROSS = 'albatross';
export const EAGLE = 'eagle';
export const BIRDIE = 'birdie';
export const PAR = 'par';
export const BOGEY = 'bogey';
export const DOUBLE_BOGEY = 'double_bogey';
export const TRIPLE_BOGEY = 'triple_bogey';
export const MAX_BOGEY = 'max_bogey';

const getHoleResult = (par, strokes) => {
  let resultString;
  let resultStringValue;
  const scoreResult = strokes - par;

  if (scoreResult === -4) {
    // Hole in one on par 5
    resultString = 'Hole in One!';
    resultStringValue = HOLE_IN_ONE;
  } else if (scoreResult === -3) {
    // hole in one on par 4
    // albatross
    if (par === 4) {
      resultString = 'Hole in One!';
      resultStringValue = HOLE_IN_ONE;
    } else {
      resultString = 'Albatross';
      resultStringValue = ALBATROSS;
    }
  } else if (scoreResult === -2) {
    // hole in one on par 3
    // eagle
    if (par === 3) {
      resultString = 'Hole in One!';
      resultStringValue = HOLE_IN_ONE;
    } else {
      resultString = 'Eagle';
      resultStringValue = EAGLE;
    }
  } else if (scoreResult === -1) {
    // birdie
    resultString = 'Birdie';
    resultStringValue = BIRDIE;
  } else if (scoreResult === 0) {
    // par
    resultString = 'Par';
    resultStringValue = PAR;
  } else if (scoreResult === 1) {
    // bogey
    resultString = 'Bogey';
    resultStringValue = BOGEY;
  } else if (scoreResult === 2) {
    // double bogey
    resultString = 'Double Bogey';
    resultStringValue = DOUBLE_BOGEY;
  } else if (scoreResult === 3) {
    // triple bogey
    resultString = 'Triple Bogey';
    resultStringValue = TRIPLE_BOGEY;
  } else if (scoreResult > 3) {
    // triple+ bogey
    resultString = '4+ Bogey';
    resultStringValue = MAX_BOGEY;
  }

  return {
    result: scoreResult,
    string: resultString,
    stringValue: resultStringValue
  };
};

const getHoleResultStringValue = (par, strokes) => {
  let resultString;
  const scoreResult = strokes - par;

  if (scoreResult === -4) {
    // Hole in one on par 5
    resultString = HOLE_IN_ONE;
  } else if (scoreResult === -3) {
    // hole in one on par 4
    // albatross
    if (par === 4) {
      resultString = HOLE_IN_ONE;
    } else {
      resultString = ALBATROSS;
    }
  } else if (scoreResult === -2) {
    // hole in one on par 3
    // eagle
    if (par === 3) {
      resultString = HOLE_IN_ONE;
    } else {
      resultString = EAGLE;
    }
  } else if (scoreResult === -1) {
    // birdie
    resultString = BIRDIE;
  } else if (scoreResult === 0) {
    // par
    resultString = PAR;
  } else if (scoreResult === 1) {
    // bogey
    resultString = BOGEY;
  } else if (scoreResult === 2) {
    // double bogey
    resultString = DOUBLE_BOGEY;
  } else if (scoreResult === 3) {
    // triple bogey
    resultString = TRIPLE_BOGEY;
  } else if (scoreResult > 3) {
    // triple+ bogey
    resultString = MAX_BOGEY;
  }

  return resultString;
};

const getPrettyResult = result => {
  if (result === 0) {
    return 'E';
  } else if (result > 0) {
    return '+' + result;
  } else {
    return result;
  }
};

const getCalculatedPar = holes => {
  let sumOfPars = 0;
  holes.map(hole => {
    sumOfPars += hole.par;
    return;
  });
  return sumOfPars;
};

const getGreenInReg = (par, putts, score) => {
  const shotsToGreen = score - putts;
  if (par === 3) {
    return shotsToGreen === 1 ? true : false;
  }
  if (par === 4) {
    return shotsToGreen < 3 ? true : false;
  }
  if (par === 5) {
    return shotsToGreen < 4 ? true : false;
  }
  return false;
};
export {
  getHoleResult,
  getHoleResultStringValue,
  getPrettyResult,
  getCalculatedPar,
  getGreenInReg
};
