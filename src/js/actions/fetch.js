import fetch from 'isomorphic-fetch';
import { getBaseUrl } from 'untils/config';

const APIs = {
  pads: '/api/pads/',
  users: '/api/users/',
  pad: '/api/pad/'
}

const fetchAPI = (
  types,
  dispatch,
  APIUrl
) => {
  const [ REQUIRE_TYPE, SUCCESS_TYPE ] = types;
  dispatch({ type: REQUIRE_TYPE });

  return fetch(APIUrl)
    .then(req => req.json())
    .then((json => {
      dispatch({
        type: SUCCESS_TYPE,
        json
      });
    }));
}

export const FETCH_PADS_REQUEST = 'FETCH_PADS_REQUEST';
export const FETCH_PADS_SUCCESS = 'FETCH_PADS_SUCCESS';
export const FETCH_PADS_FAILURE = 'FETCH_PADS_FAILURE';

export function fetchPads() {
  const APIUrl = getBaseUrl() + APIs.pads;
  return dispatch => {
    fetchAPI(
      [FETCH_PADS_REQUEST, FETCH_PADS_SUCCESS],
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
      [FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS],
      dispatch,
      APIUrl
    );
  };
}

export const FETCH_PAD_REQUEST = 'FETCH_PAD_REQUEST';
export const FETCH_PAD_SUCCESS = 'FETCH_PAD_SUCCESS';
export const FETCH_PAD_FAILURE = 'FETCH_PAD_FAILURE';

export function fetchPad(param) {
  const APIUrl = getBaseUrl() + APIs.pad + param.pid;
  return dispatch => {
    fetchAPI(
      [FETCH_PAD_REQUEST, FETCH_PAD_SUCCESS],
      dispatch,
      APIUrl
    );
  };
}
