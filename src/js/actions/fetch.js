import { sendRequest } from 'actions';
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

export const FETCH_PADS_REQUEST = 'FETCH_PADS_REQUEST';
export const FETCH_PADS_SUCCESS = 'FETCH_PADS_SUCCESS';
export const FETCH_PADS_FAILURE = 'FETCH_PADS_FAILURE';

export function fetchPads() {
  const APIUrl = getBaseUrl() + APIs.pads;
  return dispatch => {
    sendRequest(
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
export const PAD_RESET = 'PAD_RESET';

export function fetchPad(param) {
  const APIUrl = (param.pid) ? getBaseUrl() + APIs.pad + param.pid : getBaseUrl() + APIs.whale;
  return dispatch => {
    sendRequest(
      'GET',
      [FETCH_PAD_SUCCESS, FETCH_PAD_FAILURE, FETCH_PAD_REQUEST],
      dispatch,
      APIUrl
    );
  };
}

export function resetPadState() {
  return dispatch => {
    dispatch({
      type: PAD_RESET
    })
  };
}

export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export function fetchUsers() {
  const APIUrl = getBaseUrl() + APIs.users;
  return dispatch => {
    sendRequest(
      'GET',
      [FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE],
      dispatch,
      APIUrl
    );
  };
}

export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export function fetchUser(useridArray) {
  const APIUrl = getBaseUrl() + APIs.user;
  return dispatch => {
    sendRequest(
      'POST',
      [FETCH_USER_SUCCESS, FETCH_USER_FAILURE],
      dispatch,
      APIUrl,
      JSON.stringify({userid: useridArray})
    );
  };
}

export const FETCH_ME_SUCCESS = 'FETCH_ME_SUCCESS';
export const FETCH_ME_FAILURE = 'FETCH_ME_FAILURE';

export function fetchMe() {
  const APIUrl = getBaseUrl() + APIs.me;
  return dispatch => {
    sendRequest(
      'GET',
      [FETCH_ME_SUCCESS, FETCH_ME_FAILURE],
      dispatch,
      APIUrl
    );
  };
}

export const FETCH_PATHS_SUCCESS = 'FETCH_PATHS_SUCCESS';
export const FETCH_PATHS_FAILURE = 'FETCH_PATHS_FAILURE';

export function fetchPaths() {
  const APIUrl = getBaseUrl() + APIs.paths;
  return dispatch => {
    sendRequest(
      'GET',
      [FETCH_PATHS_SUCCESS, FETCH_PATHS_FAILURE],
      dispatch,
      APIUrl
    );
  };
}
