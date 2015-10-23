import {
  FETCH_ME_REQUEST, FETCH_ME_SUCCESS, FETCH_ME_FAILURE,
  FETCH_PATHS_REQUEST, FETCH_PATHS_SUCCESS, FETCH_PATHS_FAILURE
 } from 'actions';
import { merge, assign } from 'lodash';

const initialState = {
  result: false,
  data: {
    name: 'Login'
  }
};

const REQUEST_TYPES = FETCH_ME_REQUEST || FETCH_PATHS_REQUEST;
const FAILURE_TYPES = FETCH_ME_FAILURE || FETCH_PATHS_FAILURE;

export default function Auth(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TYPES:
      return assign({}, state, {
        result: false
      });

    case FETCH_ME_SUCCESS:
      return assign({}, state, action.json);

    case FETCH_PATHS_SUCCESS:
      return merge({}, state, {
        paths: action.json
      });

    case FAILURE_TYPES:
      return merge({}, state, action.json);

    default:
      return state;
  }
}
