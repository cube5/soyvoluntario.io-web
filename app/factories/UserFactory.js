export default function UserFactory(API_URL, $http, $q, AuthTokenFactory) {
  'use strict';

  return {
    login: login,
    logout: logout,
    getUser: getUser
  };

  function login(username, password) {
    return $http.post(API_URL + 'login', {
     username: username,
     password: password
    }).then(function(response) {
        AuthTokenFactory.setToken(response.data.token);
        return response;
    });
  }

  function logout() {
    AuthTokenFactory.setToken();
  }

  function getUser() {
    if(AuthTokenFactory.getToken()) {
        return $http.get('/me');
    } else {
        return $q.reject({ data: 'client has no auth token' });
    }
  }
}
