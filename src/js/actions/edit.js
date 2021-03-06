import { sendRequest } from 'actions';
import { getBaseUrl } from 'utils/config';

const APIs = {
  edit: '/api/edit/'
};

export const EDIT_REQUEST = 'EDIT_REQUEST';
export const EDIT_SUCCESS = 'EDIT_SUCCESS';
export const EDIT_FAILURE = 'EDIT_FAILURE';
export const EDIT_RESET = 'EDIT_RESET';

export function editPad(params) {
  const { pid: padId, parameter } = params;
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

export function resetEditState() {
  return dispatch => {
    dispatch({
      type: EDIT_RESET
    });
  };
}
