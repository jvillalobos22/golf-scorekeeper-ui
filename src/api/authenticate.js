const GS_API_BASE_URL = 'http://localhost:8080';

const postLogin = credentials => {
  console.log('<<<<< credentials >>>>>', credentials);

  // TODO: Sanitize Creds
  return fetch(GS_API_BASE_URL + '/user/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => {
    return res.json();
  });
};

export { postLogin };
