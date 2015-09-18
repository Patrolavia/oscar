import fetch from 'isomorphic-fetch';
import { getBaseUrl } from 'untils/config';

const APIs = {
  pads: '/api/pads',
  users: '/api/users'
}

export const FETCH_PADS_REQUEST = 'FETCH_PADS_REQUEST';
export const FETCH_PADS_SUCCESS = 'FETCH_PADS_SUCCESS';
export const FETCH_PADS_FAILURE = 'FETCH_PADS_FAILURE';

export function fetchPads() {
  return dispatch => {
    dispatch({ type: FETCH_PADS_REQUEST });

    setTimeout(()=> {
    return fetch(getBaseUrl() + APIs.pads)
      .then(req => req.json())
      .then(json => dispatch({
        type: FETCH_PADS_SUCCESS,
        json
      }));
  }, 1000)
  };
}


export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';

export function fetchUsers() {
  return dispatch => {
    dispatch({ type: FETCH_USERS_REQUEST });
    return fetch(getBaseUrl() + APIs.users)
      .then(req => req.json())
      .then(json => dispatch({
        type: FETCH_USERS_SUCCESS,
        json
      }));
  };
}
