export default function AuthTokenFactory($window) {
  var store = $window.localStorage;
  const key = 'auth-token';

  return {
    setToken: setToken,
    getToken: getToken,
  };

  function getToken() {
      return store.getItem(key);
  }

  function setToken(token) {
      if(token) store.setItem(key, token);
      else store.removeItem(key);
  }
}
