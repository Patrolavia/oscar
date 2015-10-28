const APIs = {
  login: '/auth/',
  logout: '/api/logout'
};

export function login(path) {
  const domain = window.location.origin;
  const apiConstant = APIs.login;
  const apiPath = domain + apiConstant + path;
  window.location = apiPath;
}

export function logout() {
  const domain = window.location.origin;
  const apiConstant = APIs.logout;
  const apiPath = domain + apiConstant;
  window.location = apiPath;
}
