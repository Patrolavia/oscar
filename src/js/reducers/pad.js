import { FETCH_PAD_REQUEST, FETCH_PAD_SUCCESS, FETCH_PAD_FAILURE } from 'actions';
import { merge } from 'lodash';

const initialState = {
  data: {}
};

export default function Pad(state = initialState, action) {
  switch (action.type) {
    case FETCH_PAD_REQUEST:
      return merge({}, state, {
        message: 'Fetching pads...'
      });

    case FETCH_PAD_SUCCESS:
      return merge({}, state, action.json);

    case FETCH_PAD_FAILURE:
      return merge({}, state, action.json);

    default:
      return state;
  }
}
