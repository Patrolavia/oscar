import { sendRequest } from 'actions';
import { getBaseUrl } from 'untils/config';

const APIs = {
  login: '/auth/',
  logout: '/api/logout'
}

export function login(path) {
  var domain = window.location.origin,
      apiConstant = APIs.login,
      apiPath = domain + apiConstant + path;
  window.location = apiPath;
}

export function logout() {
  var domain = window.location.origin,
      apiConstant = APIs.logout,
      apiPath = domain + apiConstant;
  window.location = apiPath;
}
