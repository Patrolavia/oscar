import { FETCH_ME_REQUEST, FETCH_ME_SUCCESS, FETCH_ME_FAILURE } from 'actions';
import { merge } from 'lodash';

const initialState = {
  result: false,
  data: {
    name: 'Login'
  }
};

export default function Users(state = initialState, action) {
  switch (action.type) {
    case FETCH_ME_REQUEST:
      return merge({}, state, {
        result: false
      });

    case FETCH_ME_SUCCESS:
      return merge({}, state, action.json);

    case FETCH_ME_FAILURE:
      return merge({}, state, action.json);

    default:
      return state;
  }
}
