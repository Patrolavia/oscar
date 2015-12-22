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

export default function Auth(state = initialState, action) {
  switch (action.type) {
    case FETCH_ME_REQUEST: case FETCH_PATHS_REQUEST:
      return assign({}, state, {
        result: false
      });

    case FETCH_ME_SUCCESS:
      return assign({}, state, action.json, {
        errorStatus: null
      });

    case FETCH_PATHS_SUCCESS:
      return merge({}, state, {
        errorStatus: null,
        paths: action.json
      });

    case FETCH_ME_FAILURE: case FETCH_PATHS_FAILURE:
      return merge({}, state, action.json);

    default:
      return state;
  }
}
