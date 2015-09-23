import fetch from 'isomorphic-fetch';
import { getBaseUrl } from 'untils/config';

const APIs = {
  pad: '/api/pad/',
  pads: '/api/pads/',
  users: '/api/users/',
  whale: '/api/whale',
  me: '/api/me'
}

const fetchAPI = (
  types,
  dispatch,
  APIUrl
) => {
  const [ REQUIRE_TYPE, SUCCESS_TYPE, FAILURE_TYPE ] = types;
  dispatch({ type: REQUIRE_TYPE });

  setTimeout(() => {
  return fetch(APIUrl)
    .then((res) => {
      if (res.status >= 400) {
        return { errorStatus: res.status };
      }
      return res.json();
    })
    .then((json) => {
      const currentType = (json.errorStatus) ? FAILURE_TYPE : SUCCESS_TYPE;
      dispatch({
        type: currentType,
        json
      });
    });
  }, 1000)
}

export const FETCH_PADS_REQUEST = 'FETCH_PADS_REQUEST';
export const FETCH_PADS_SUCCESS = 'FETCH_PADS_SUCCESS';
export const FETCH_PADS_FAILURE = 'FETCH_PADS_FAILURE';

export function fetchPads() {
  const APIUrl = getBaseUrl() + APIs.pads;
  return dispatch => {
    fetchAPI(
      [FETCH_PADS_REQUEST, FETCH_PADS_SUCCESS, FETCH_PADS_FAILURE],
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
      [FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE],
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
      [FETCH_PAD_REQUEST, FETCH_PAD_SUCCESS, FETCH_PAD_FAILURE],
      dispatch,
      APIUrl
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
      [FETCH_ME_REQUEST, FETCH_ME_SUCCESS, FETCH_ME_FAILURE],
      dispatch,
      APIUrl
    );
  };
}