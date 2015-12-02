const APIs = {
  login: '/auth/',
  logout: '/api/logout'
};

const redirect = (url)  => {
  window.location = url;
}

export function login(path) {
  const domain = window.location.origin;
  const apiConstant = APIs.login;
  const apiPath = domain + apiConstant + path;
  redirect(apiPath);
}

export function logout() {
  const domain = window.location.origin;
  const apiConstant = APIs.logout;
  const apiPath = domain + apiConstant;
  redirect(apiPath);
}
