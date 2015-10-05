import { sendRequest } from 'actions';
import { getBaseUrl } from 'untils/config';

const APIs = {
  edit: '/api/edit/'
}

export const EDIT_REQUEST = 'EDIT_REQUEST';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAILURE = 'EDIT_FAILURE';
export const EDIT_RESET = 'EDIT_RESET';

export function editPad(padId, parameter) {
  const APIUrl = getBaseUrl() + APIs.edit + padId;
  return dispatch => {
    sendRequest(
      'POST',
      [EDIT_SUCCESS, EDIT_FAILURE, EDIT_REQUEST],
      dispatch,
      APIUrl,
      parameter
    );
  };
}

export function editReset() {
  return dispatch => {
    dispatch({
      type: EDIT_RESET
    });
  };
}
