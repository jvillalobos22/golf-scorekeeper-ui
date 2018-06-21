const GS_API_BASE_URL = 'http://localhost:8080';

const fetchMatches = query =>
  fetch(GS_API_BASE_URL + query).then(res => res.json());

export { fetchMatches };
