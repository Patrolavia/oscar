import { FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS, FETCH_USERS_FAILURE } from 'actions';
import { merge } from 'lodash';

const initialState = {
  data: []
};

export default function Users(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return merge({}, state, {
        message: 'Fetching users...'
      });

    case FETCH_USERS_SUCCESS:
      return merge({}, state, action.json);

    case FETCH_USERS_FAILURE:
      return merge({}, state, action.json);

    default:
      return state;
  }
}
