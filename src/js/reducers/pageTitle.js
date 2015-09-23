import {
  FETCH_PAD_REQUEST, FETCH_PAD_SUCCESS, FETCH_PAD_FAILURE,
  FETCH_PADS_REQUEST, FETCH_PADS_SUCCESS, FETCH_PADS_FAILURE
} from 'actions';

import { merge } from 'lodash';

const initialState = {
  title: 'Loading ...'
};

const errorOccurred = {
  title: 'Error!'
}

const REQUEST_TYPES = FETCH_PAD_REQUEST || FETCH_PADS_REQUEST;
const FAILURE_TYPES = FETCH_PAD_FAILURE || FETCH_PADS_FAILURE;

export default function PageTitle(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TYPES:
      return initialState;

    case FAILURE_TYPES:
      return errorOccurred;

    case FETCH_PAD_SUCCESS:
      const padData = action.json.data;
      return merge({}, state, {
        title: (padData) ? padData.title : ''
      });
      break;

    case FETCH_PADS_SUCCESS:
      return merge({}, state, {
        title: 'Padlist'
      });

    default:
      return state;
  }
}
