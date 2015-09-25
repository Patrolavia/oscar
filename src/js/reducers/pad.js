import { FETCH_PAD_REQUEST, FETCH_PAD_SUCCESS, FETCH_PAD_FAILURE } from 'actions';
import { merge } from 'lodash';

const initialState = {
  isFetching: false,
  result: false,
  data: {}
};

export default function Pad(state = initialState, action) {
  switch (action.type) {
    case FETCH_PAD_REQUEST:
      return merge({}, initialState, action.json, {
        message: 'Fetching pad...',
        isFetching: true,
        result: false
      });

    case FETCH_PAD_SUCCESS:
      return merge({}, state, action.json, {
        errorStatus: null,
        isFetching: false
      });

    case FETCH_PAD_FAILURE:
      return merge({}, state, action.json, {
        isFetching: false,
        result: false
      });

    default:
      return state;
  }
}
