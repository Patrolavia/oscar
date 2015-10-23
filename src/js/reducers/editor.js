import {
  EDIT_REQUEST, EDIT_SUCCESS, EDIT_FAILURE, EDIT_RESET,
  CREATE_REQUEST, CREATE_SUCCESS, CREATE_FAILURE
  } from 'actions';
import { merge, assign } from 'lodash';

const initialState = {
  isRequesting: false,
  data: {}
};

export default function Edit(state = initialState, action) {
  switch (action.type) {
    case EDIT_REQUEST: case CREATE_REQUEST:
      return assign({}, initialState, {
        message: 'Sending request...',
        isRequesting: true,
        result: false,
        requestData: JSON.parse(action.parameters)
      });

    case EDIT_SUCCESS: case CREATE_SUCCESS:
      return assign({}, state, action.json, {
        code: action.json.data.code,
        errorStatus: null,
        isRequesting: false
      });

    case EDIT_FAILURE: case CREATE_FAILURE:
      return merge({}, state, action.json, {
        isRequesting: false
      });

    case EDIT_RESET:
      return initialState;

    default:
      return state;
  }
}
