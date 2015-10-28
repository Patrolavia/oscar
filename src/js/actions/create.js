import { sendRequest } from 'actions';
import { getBaseUrl } from 'untils/config';

const APIs = {
  create: '/api/create'
};

export const CREATE_REQUEST = 'CREATE_REQUEST';
export const CREATE_SUCCESS = 'CREATE_SUCCESS';
export const CREATE_FAILURE = 'CREATE_FAILURE';

export function createPad(parameter) {
  const APIUrl = getBaseUrl() + APIs.create;
  return dispatch => {
    sendRequest(
      'POST',
      [CREATE_SUCCESS, CREATE_FAILURE, CREATE_REQUEST],
      dispatch,
      APIUrl,
      parameter
    );
  };
}
