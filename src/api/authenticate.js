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
    console.log(res.headers.get('x-auth'));
    localStorage.setItem('x-auth', res.headers.get('x-auth'));
    return res.json();
  });
};

const getUser = xAuth => {
  return fetch(GS_API_BASE_URL + '/user', {
    method: 'GET',
    headers: {
      'x-auth': xAuth
    }
  }).then(res => {
    return res.json();
  });
};

const deleteLogout = xAuth => {
  console.log('xAuth');
  console.log(xAuth);
  return fetch(GS_API_BASE_URL + '/user/logout', {
    method: 'DELETE',
    headers: {
      'x-auth': xAuth
    }
  })
    .then(res => {
      if (res.status === 200) return Promise.resolve();
      return Promise.reject();
    })
    .catch(err => {
      console.log('error', err);
      return Promise.reject();
    });
};

export { postLogin, getUser, deleteLogout };
