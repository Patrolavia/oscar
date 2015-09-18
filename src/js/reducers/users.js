import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from 'actions';
import { merge } from 'lodash';

const initialState = {
  isFetching: false,
  data: []
};

export default function Pads(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return merge({}, state, {
        isFetching: true,
        message: 'Fetching users...'
      });

    case FETCH_USERS_SUCCESS:
      return merge({}, state, action.json, {
        isFetching: false
      });

    case FETCH_USERS_FAILURE:
      return merge({}, state, action.json, {
        isFetching: false
      });

    default:
      return state;
  }
}
