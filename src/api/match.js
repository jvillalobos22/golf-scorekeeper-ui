const GS_API_BASE_URL = 'http://localhost:8080';

const fetchMatches = xAuth =>
  fetch(GS_API_BASE_URL + '/matches', {
    method: 'GET',
    headers: {
      'x-auth': xAuth
    }
  }).then(res => res.json());

const postMatch = match => {
  const emptyHoles = [];
  for (let i = 1; i <= match.numberHoles; i++) {
    emptyHoles.push({
      holeNumber: i,
      par: 4,
      score: 0,
      teeDirection: '-',
      putts: 0,
      mulligans: 0
    });
  }
  console.log('<<<<< match >>>>>', match);
  let newMatch = {
    course: {
      name: match.course.name,
      location: match.course.location,
      holes: match.numberHoles
    },
    holes: emptyHoles,
    date: match.date,
    title: match.title,
    par: match.par,
    numberHoles: match.numberHoles
  };

  return fetch(GS_API_BASE_URL + '/matches', {
    method: 'POST',
    body: JSON.stringify(newMatch),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json();
  });
};

const patchScoreUpdate = ({ matchId, newScores }) => {
  const formattedScores = newScores.map(hole => {
    return {
      _id: hole.id,
      holeNumber: hole.holeNumber,
      par: hole.par,
      score: hole.score,
      teeDirection: hole.teeDirection,
      putts: hole.putts,
      mulligans: hole.mulligans
    };
  });

  return fetch(GS_API_BASE_URL + `/matches/${matchId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      holes: formattedScores
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json();
  });
};

const patchCompletedMatch = matchId => {
  return fetch(GS_API_BASE_URL + `/matches/${matchId}`, {
    method: 'PATCH',
    body: JSON.stringify({
      isComplete: true
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json();
  });
};

export { fetchMatches, postMatch, patchScoreUpdate, patchCompletedMatch };
