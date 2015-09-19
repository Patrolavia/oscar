import { FETCH_PADS_REQUEST, FETCH_PADS_SUCCESS, FETCH_PADS_FAILURE } from 'actions';
import { merge } from 'lodash';

const initialState = {
  data: []
};

export default function Pads(state = initialState, action) {
  switch (action.type) {
    case FETCH_PADS_REQUEST:
      return merge({}, state, {
        message: 'Fetching pads...'
      });

    case FETCH_PADS_SUCCESS:
      return merge({}, state, action.json);

    case FETCH_PADS_FAILURE:
      return merge({}, state, action.json);

    default:
      return state;
  }
}
