export function getEnv() {
  return process.env.NODE_ENV;
}

export function isDevEnv() {
  return getEnv() === 'development';
}

export function getBaseUrl() {
  const { origin } = window.location;
  return isDevEnv() ? origin.replace(/:4000/, ':3000') : origin;
}