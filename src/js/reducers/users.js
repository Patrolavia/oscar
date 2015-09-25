import {
  FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE,
  FETCH_USER_REQUEST, FETCH_USER_SUCCESS, FETCH_USER_FAILURE
} from 'actions';
import { merge, uniq } from 'lodash';

const initialState = {
  isFetching: false,
  data: []
};

export default function Users(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return merge({}, initialState, action.json, {
        message: 'Fetching users...',
        result: false
      });

    case FETCH_USER_SUCCESS:
      state.data[action.json.id] = action.json;
      return state;

    case FETCH_USERS_SUCCESS:
      return merge({}, state, action.json);

    case FETCH_USERS_FAILURE:
      return merge({}, state, action.json);

    default:
      return state;
  }
}
