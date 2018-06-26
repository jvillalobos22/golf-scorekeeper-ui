const GS_API_BASE_URL = 'http://localhost:8080';

const fetchMatches = query =>
  fetch(GS_API_BASE_URL + query).then(res => res.json());

const postMatch = match => {
  // Build Payload
  console.log('postMatch: ', match);
  const emptyHoles = [];
  for (let i = 1; i <= match.holesSelect; i++) {
    emptyHoles.push({
      holeNumber: i,
      par: 4,
      score: 0
    });
  }
  console.log(match);
  let newMatch = {
    course: {
      name: match.course.name,
      location: match.course.location,
      par: match.course.par,
      holes: match.holesSelect
    },
    holes: emptyHoles,
    date: match.date
  };
  console.log('newMatch', newMatch);

  return fetch(GS_API_BASE_URL + '/matches', {
    method: 'POST',
    body: JSON.stringify(newMatch),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    console.log('res', res);
    return res.json();
  });
};

export { fetchMatches, postMatch };
