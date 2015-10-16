import { sendRequest } from 'actions';
import { getBaseUrl } from 'untils/config';

const APIs = {
  delete: '/api/delete/'
}

export const DELETE_INIT = 'DELETE_INIT';
export const DELETE_REQUEST = 'DELETE_REQUEST';
export const DELETE_SUCCESS = 'DELETE_SUCCESS';
export const DELETE_FAILURE = 'DELETE_FAILURE';
export const DELETE_CANCEL = 'DELETE_CANCEL';

export function initDeleteForm(params) {
  return dispatch => {
    dispatch({
      type: DELETE_INIT,
      params
    })
  }
}

export function deletePad(params) {
  const APIUrl = getBaseUrl() + APIs.delete + params.padId;
  return dispatch => {
    sendRequest(
      'POST',
      [DELETE_SUCCESS, DELETE_FAILURE, DELETE_REQUEST],
      dispatch,
      APIUrl
    );
  };
}

export function deleteCancel() {
  return dispatch => {
    dispatch({
      type: DELETE_CANCEL
    });
  };
}
