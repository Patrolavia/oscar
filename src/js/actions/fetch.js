import request from 'superagent';
import { getBaseUrl } from 'untils/config';

const APIs = {
  pad: '/api/pad/',
  pads: '/api/pads/',
  users: '/api/users/',
  user: '/api/user',
  whale: '/api/whale',
  me: '/api/me',
  paths: '/api/paths'
}

const fetchAPI = (
  type,
  actionTypes,
  dispatch,
  APIUrl,
  parameters
) => {
  const [ SUCCESS_TYPE, FAILURE_TYPE, REQUIRE_TYPE ] = actionTypes;
  if (REQUIRE_TYPE) dispatch({ type: REQUIRE_TYPE });

  return request(type, APIUrl)
    .send(parameters)
    .end((err, res) => {
      const json = res.body || {};
      if (err) {
        json.errorStatus = res.statusCode;
      }

      const currentType = (err) ? FAILURE_TYPE : SUCCESS_TYPE;
      dispatch({
        type: currentType,
        json
      });
    });
}

export const FETCH_PADS_REQUEST = 'FETCH_PADS_REQUEST';
export const FETCH_PADS_SUCCESS = 'FETCH_PADS_SUCCESS';
export const FETCH_PADS_FAILURE = 'FETCH_PADS_FAILURE';

export function fetchPads() {
  const APIUrl = getBaseUrl() + APIs.pads;
  return dispatch => {
    fetchAPI(
      'GET',
      [FETCH_PADS_SUCCESS, FETCH_PADS_FAILURE, FETCH_PADS_REQUEST],
      dispatch,
      APIUrl
    );
  };
}

export const FETCH_PAD_REQUEST = 'FETCH_PAD_REQUEST';
export const FETCH_PAD_SUCCESS = 'FETCH_PAD_SUCCESS';
export const FETCH_PAD_FAILURE = 'FETCH_PAD_FAILURE';

export function fetchPad(param) {
  const APIUrl = (param.pid) ? getBaseUrl() + APIs.pad + param.pid : getBaseUrl() + APIs.whale;
  return dispatch => {
    fetchAPI(
      'GET',
      [FETCH_PAD_SUCCESS, FETCH_PAD_FAILURE, FETCH_PAD_REQUEST],
      dispatch,
      APIUrl
    );
  };
}

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export function fetchUsers() {
  const APIUrl = getBaseUrl() + APIs.users;
  return dispatch => {
    fetchAPI(
      'GET',
      [FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE],
      dispatch,
      APIUrl
    );
  };
}

export const FETCH_USER_REQUEST = 'FETCH_USER_REQUEST';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export function fetchUser(useridArray) {
  const APIUrl = getBaseUrl() + APIs.user;
  return dispatch => {
    fetchAPI(
      'POST',
      [FETCH_USER_SUCCESS, FETCH_USER_FAILURE],
      dispatch,
      APIUrl,
      JSON.stringify({userid: useridArray})
    );
  };
}

export const FETCH_ME_REQUEST = 'FETCH_ME_REQUEST';
export const FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS';
export const FETCH_ME_FAILURE = 'FETCH_ME_FAILURE';

export function fetchMe() {
  const APIUrl = getBaseUrl() + APIs.me;
  return dispatch => {
    fetchAPI(
      'GET',
      [FETCH_ME_SUCCESS, FETCH_ME_FAILURE],
      dispatch,
      APIUrl
    );
  };
}

export const FETCH_PATHS_REQUEST = 'FETCH_PATHS_REQUEST';
export const FETCH_PATHS_SUCCESS = 'FETCH_PATHS_SUCCESS';
export const FETCH_PATHS_FAILURE = 'FETCH_PATHS_FAILURE';

export function fetchPaths() {
  const APIUrl = getBaseUrl() + APIs.paths;
  return dispatch => {
    fetchAPI(
      'GET',
      [FETCH_PATHS_SUCCESS, FETCH_PATHS_FAILURE],
      dispatch,
      APIUrl
    );
  };
}
