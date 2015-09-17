import fetch from 'isomorphic-fetch';
import { getBaseUrl } from 'untils/config';

export const FETCH_PADS_REQUEST = 'FETCH_PADS_REQUEST';
export const FETCH_PADS_SUCCESS = 'FETCH_PADS_SUCCESS';

const APIs = {
  pads: '/api/pads'
}

export function fetchPads() {
  return dispatch => {
    dispatch({ type: FETCH_PADS_REQUEST });
    return fetch(getBaseUrl() + APIs.pads)
      .then(req => req.json())
      .then(json => dispatch({
        type: FETCH_PADS_SUCCESS,
        json
      }));
  };
}
