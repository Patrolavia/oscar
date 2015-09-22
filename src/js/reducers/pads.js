import { FETCH_PADS_REQUEST, FETCH_PADS_SUCCESS, FETCH_PADS_FAILURE } from 'actions';
import { merge } from 'lodash';

const initialState = {
  isFetching: false,
  data: []
};

export default function Pads(state = initialState, action) {
  switch (action.type) {
    case FETCH_PADS_REQUEST:
      return merge({}, state, {
        message: 'Fetching pads...',
        isFetching: true,
        result: false
      });

    case FETCH_PADS_SUCCESS:
      return merge({}, state, action.json, {
        isFetching: false
      });

    case FETCH_PADS_FAILURE:
      return merge({}, state, action.json, {
        isFetching: false
      });

    default:
      return state;
  }
}
