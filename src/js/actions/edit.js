import { sendRequest } from 'actions';
import { getBaseUrl } from 'untils/config';

const APIs = {
  edit: '/api/edit/'
}

export const EDIT_REQUEST = 'EDIT_REQUEST';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAILURE = 'EDIT_FAILURE';

export function editPads(padId) {
  const APIUrl = getBaseUrl() + APIs.edit + padId;
  return dispatch => {
    sendRequest(
      'POST',
      [EDIT_SUCCESS, EDIT_FAILURE, EDIT_REQUEST],
      dispatch,
      APIUrl
    );
  };
}
